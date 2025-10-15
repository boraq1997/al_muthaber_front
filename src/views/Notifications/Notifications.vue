<template>
  <!-- Breadcrumb -->
  <nav class="flex mb-6" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 sm:space-x-2 rtl:space-x-reverse flex-wrap">
      <li class="inline-flex items-center">
        <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
          <font-awesome-icon icon="fa-solid fa-bell" class="me-2 w-4 h-4" />
          الإشعارات
        </a>
      </li>
      <li>
        <div class="flex items-center">
          <font-awesome-icon icon="fa-solid fa-angle-left" class="w-3 h-3 text-gray-400 mx-1" />
          <span class="text-sm font-medium text-gray-500 dark:text-gray-400">إرسال إشعار جديد</span>
        </div>
      </li>
    </ol>
  </nav>

  <!-- Loading Indicator -->
  <div v-if="isLoading" class="text-center py-8">
    <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-purple-600 w-8 h-8" />
  </div>

  <!-- Notification Form -->
  <div v-else class="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
      <font-awesome-icon icon="fa-solid fa-paper-plane" class="mr-2 text-blue-500" />
      إرسال إشعار جديد
    </h2>
    <form @submit.prevent="sendNotification">
      <div class="space-y-6">
        <!-- Course Selection -->
        <div>
          <label for="course_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">الدورة</label>
          <select
            id="course_id"
            v-model="form.course_id"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            @change="fetchCourseStudents"
            :class="{ 'border-red-500': errors.course_id }"
          >
            <option value="" disabled>اختر الدورة</option>
            <option v-for="course in courses" :key="course.id" :value="course.id">
              {{ course.CourseName }}
            </option>
          </select>
          <p v-if="errors.course_id" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.course_id }}</p>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">اختر الدورة لتحديد الطلاب المنتمين إليها</p>
        </div>

        <!-- Send to All Students in Course Checkbox -->
        <div>
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              v-model="form.send_to_all_in_course"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
            />
            <span class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">إرسال إلى جميع الطلاب في الدورة المختارة</span>
          </label>
        </div>

        <!-- Students Selection -->
        <div v-if="!form.send_to_all_in_course">
          <label for="student_ids" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">الطلاب المستلمون</label>
          <select
            id="student_ids"
            v-model="form.student_ids"
            multiple
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :class="{ 'border-red-500': errors.student_ids }"
          >
            <option value="" disabled>اختر الطلاب</option>
            <option v-for="student in students" :key="student.id" :value="student.id">
              {{ student.FullName }}
            </option>
          </select>
          <p v-if="errors.student_ids" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.student_ids }}</p>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">اختر الطلاب الذين سيتلقون الإشعار</p>
        </div>

        <!-- Title -->
        <div>
          <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">عنوان الإشعار</label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="عنوان الإشعار"
            :class="{ 'border-red-500': errors.title }"
          />
          <p v-if="errors.title" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.title }}</p>
        </div>

        <!-- Message -->
        <div>
          <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">نص الإشعار</label>
          <textarea
            id="message"
            v-model="form.message"
            rows="4"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="اكتب نص الإشعار هنا..."
            :class="{ 'border-red-500': errors.message }"
          ></textarea>
          <p v-if="errors.message" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.message }}</p>
        </div>

        <!-- URL -->
        <div>
          <label for="url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">رابط (اختياري)</label>
          <input
            id="url"
            v-model="form.url"
            type="url"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="https://example.com"
            :class="{ 'border-red-500': errors.url }"
          />
          <p v-if="errors.url" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.url }}</p>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">أدخل رابطًا إذا كنت تريد إرفاقه مع الإشعار</p>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <button
            type="submit"
            class="text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            :disabled="isSubmitting"
          >
            <font-awesome-icon icon="fa-solid fa-paper-plane" class="mr-2" />
            إرسال الإشعار
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../services/api';
import { useToast } from '../../composables/useToast.ts';

// Toast
const { showToastMessage } = useToast();

// Form
const form = ref({
  course_id: '',
  student_ids: [],
  send_to_all_in_course: false,
  title: '',
  message: '',
  url: '',
});

const errors = ref({
  course_id: '',
  student_ids: '',
  title: '',
  message: '',
  url: '',
});

const courses = ref([]);
const students = ref([]);
const isLoading = ref(false);
const isSubmitting = ref(false);

// Fetch Courses
const fetchCourses = async () => {
  isLoading.value = true;
  try {
    const response = await api.get('/courses');
    courses.value = response.data.data || [];
  } catch (err) {
    showToastMessage('danger', err.response?.data?.message || 'حدث خطأ أثناء جلب بيانات الدورات');
    console.error(err);
    courses.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Fetch Students for Selected Course
const fetchCourseStudents = async () => {
  if (!form.value.course_id) {
    students.value = [];
    form.value.student_ids = [];
    return;
  }

  isLoading.value = true;
  try {
    const response = await api.get(`/courses/${form.value.course_id}/students`);
    students.value = response.data.students || [];
    form.value.student_ids = []; // Reset selected students when course changes
  } catch (err) {
    showToastMessage('danger', err.response?.data?.message || 'حدث خطأ أثناء جلب بيانات الطلاب');
    console.error(err);
    students.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Validate Form
const validateForm = () => {
  let isValid = true;
  errors.value = {
    course_id: '',
    student_ids: '',
    title: '',
    message: '',
    url: '',
  };

  if (!form.value.course_id) {
    errors.value.course_id = 'يجب اختيار دورة';
    isValid = false;
  }

  if (!form.value.send_to_all_in_course && form.value.student_ids.length === 0) {
    errors.value.student_ids = 'يجب اختيار طالب واحد على الأقل';
    isValid = false;
  }

  if (!form.value.title) {
    errors.value.title = 'عنوان الإشعار مطلوب';
    isValid = false;
  }

  if (!form.value.message) {
    errors.value.message = 'نص الإشعار مطلوب';
    isValid = false;
  }

  if (form.value.url && !/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(form.value.url)) {
    errors.value.url = 'الرابط غير صالح';
    isValid = false;
  }

  return isValid;
};

// Send Notification
const sendNotification = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;
  try {
    const payload = {
      student_ids: form.value.send_to_all_in_course
        ? students.value.map(student => student.id) // Extract all student IDs from the course
        : form.value.student_ids,
      title: form.value.title,
      message: form.value.message,
    };

    if (form.value.url) {
      payload.url = form.value.url;
    }

    const response = await api.post('/send-notification', payload);
    showToastMessage('success', 'تم إرسال الإشعار بنجاح');
    form.value = { course_id: '', student_ids: [], send_to_all_in_course: false, title: '', message: '', url: '' }; // Reset form
    students.value = []; // Clear students list
  } catch (err) {
    if (err.response?.status === 422) {
      showToastMessage('danger', err.response.data.message || 'حدث خطأ في التحقق من البيانات');
    } else if (err.response?.status === 404) {
      showToastMessage('danger', 'لم يتم العثور على معرفات الأجهزة للطلاب المحددين');
    } else {
      showToastMessage('danger', err.response?.data?.message || 'حدث خطأ أثناء إرسال الإشعار');
    }
    console.error(err);
  } finally {
    isSubmitting.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchCourses();
});
</script>