<template>
  <div class="min-h-screen p-4 sm:p-6">
    <!-- Breadcrumb + Actions Wrapper -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
      <!-- Breadcrumb -->
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex flex-wrap items-center space-x-1 md:space-x-2 rtl:space-x-reverse text-xs sm:text-sm">
          <li class="inline-flex items-center">
            <a href="#" class="inline-flex items-center font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              <font-awesome-icon icon="fa-solid fa-home" class="me-1 w-3 h-3 sm:w-4 sm:h-4" />
              الرئيسية
            </a>
          </li>
          <li>
            <div class="flex items-center">
              <font-awesome-icon icon="fa-solid fa-angle-left" class="w-3 h-3 text-gray-400 mx-1" />
              <a href="#" class="ms-1 text-xs sm:text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                <font-awesome-icon icon="fa-solid fa-user-check" class="me-1 w-3 h-3 sm:w-4 sm:h-4" />
                إدارة الحضور
              </a>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <font-awesome-icon icon="fa-solid fa-angle-left" class="w-3 h-3 text-gray-400 mx-1" />
              <div class="relative w-full sm:w-48">
                <input
                  id="search"
                  type="search"
                  v-model="searchQuery"
                  placeholder="البحث عن طالب..."
                  class="w-full border text-xs sm:text-sm border-gray-300 rounded-md px-3 py-1.5 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                />
                <font-awesome-icon
                  icon="fa-solid fa-magnifying-glass"
                  class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3 sm:w-4 sm:h-4"
                />
              </div>
            </div>
          </li>
        </ol>
      </nav>

      <!-- Buttons -->
      <div class="flex items-center gap-2 w-full sm:w-auto">
      </div>
    </div>

    <!-- Select Inputs -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg">
      <!-- Institute -->
      <div class="space-y-2">
        <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">المعهد</label>
        <div class="relative">
          <select
            v-model="selectedInstitute"
            @change="fetchStages"
            class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 appearance-none"
            :disabled="isLoading"
          >
            <option value="">اختر معهدًا</option>
            <option v-for="institute in institutes" :key="institute.id" :value="institute.id">
              {{ institute.name }}
            </option>
          </select>
          <font-awesome-icon icon="fa-solid fa-university" class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3 sm:w-4 sm:h-4" />
        </div>
      </div>

      <!-- Stage -->
      <div class="space-y-2">
        <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">المرحلة</label>
        <div class="relative">
          <select
            v-model="selectedStage"
            @change="fetchSubjects"
            class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 appearance-none"
            :disabled="!selectedInstitute || isLoading"
          >
            <option value="">اختر مرحلة</option>
            <option v-for="stage in stages" :key="stage.id" :value="stage.id">
              {{ stage.name }}
            </option>
          </select>
          <font-awesome-icon icon="fa-solid fa-layer-group" class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3 sm:w-4 sm:h-4" />
        </div>
      </div>

      <!-- Subject -->
      <div class="space-y-2">
        <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">المادة</label>
        <div class="relative">
          <select
            v-model="selectedSubject"
            @change="fetchCourses"
            class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 appearance-none"
            :disabled="!selectedStage || isLoading"
          >
            <option value="">اختر مادة</option>
            <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
              {{ subject.subjectName }}
            </option>
          </select>
          <font-awesome-icon icon="fa-solid fa-book" class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3 sm:w-4 sm:h-4" />
        </div>
      </div>

      <!-- Course -->
      <div class="space-y-2">
        <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">الدورة</label>
        <div class="relative">
          <select
            v-model="selectedCourse"
            class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 appearance-none"
            :disabled="!selectedSubject || isLoading"
          >
            <option value="">اختر دورة</option>
            <option v-for="course in courses" :key="course.id" :value="course.id">
              {{ course.CourseName }}
            </option>
          </select>
          <font-awesome-icon icon="fa-solid fa-chalkboard-teacher" class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3 sm:w-4 sm:h-4" />
        </div>
      </div>
    </div>

    <!-- Attendance Table -->
    <div v-if="selectedCourse && students.length > 0" class="relative overflow-x-auto shadow-lg rounded-xl">
      <table class="w-full text-xs sm:text-sm text-right text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800">
        <thead class="text-xs uppercase" style="background: #6f225e; color: #ffffff;">
          <tr>
            <th scope="col" class="px-2 sm:px-3 py-2 font-semibold">
              <font-awesome-icon icon="fa-solid fa-user" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
              اسم الطالب
            </th>
            <th
              v-for="date in attendanceDates"
              :key="date"
              scope="col"
              class="px-2 sm:px-3 py-2 font-semibold"
            >
              {{ formatDateTime(date) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(student, index) in students"
            :key="student.id"
            class="odd:bg-white odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-600"
          >
            <th scope="row" class="px-2 sm:px-3 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {{ (meta.current_page - 1) * perPage + index + 1 }}. {{ student.fullName }}
            </th>
            <td
              v-for="date in attendanceDates"
              :key="`${date}-${student.id}`"
              class="px-2 sm:px-3 py-2 text-center"
            >
              <font-awesome-icon
                :icon="getAttendanceStatus(student.id, date) ? 'fa-solid fa-check-circle' : 'fa-solid fa-times-circle'"
                :class="getAttendanceStatus(student.id, date) ? 'text-green-500' : 'text-red-500'"
                class="text-base sm:text-lg"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- No Data Messages -->
    <div v-else-if="selectedCourse && students.length === 0" class="text-center text-gray-500 dark:text-gray-400 mt-8 text-sm sm:text-base">
      لا يوجد طلاب مسجلين في هذه الدورة أو لا تتطابق نتائج البحث
    </div>
    <div v-else class="text-center text-gray-500 dark:text-gray-400 mt-8 text-sm sm:text-base">
      يرجى اختيار معهد، مرحلة، مادة، ودورة لعرض بيانات الحضور
    </div>

    <!-- Pagination -->
    <nav v-if="students.length > 0" class="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4" aria-label="Table navigation">
      <span class="text-xs sm:text-sm text-gray-700 dark:text-gray-400">
        عرض
        <span class="font-semibold">{{ meta.from || 0 }}</span> إلى
        <span class="font-semibold">{{ meta.to || 0 }}</span> من
        <span class="font-semibold">{{ meta.total || 0 }}</span> طالب
      </span>
      <div class="flex items-center gap-1 sm:gap-2">
        <button
          @click="changePage(links.prev)"
          :disabled="!links.prev"
          class="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          السابق
        </button>
        <button
          v-for="link in meta.links"
          :key="link.label"
          @click="changePage(link.url)"
          :disabled="!link.url || link.active"
          :class="[
            'px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-md',
            link.active
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
          ]"
        >
          {{ link.label.includes('Previous') ? '«' : link.label.includes('Next') ? '»' : link.label }}
        </button>
        <button
          @click="changePage(links.next)"
          :disabled="!links.next"
          class="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          التالي
        </button>
      </div>
    </nav>

    <!-- Loading Indicator -->
    <div v-if="isLoading" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div class="animate-spin rounded-full h-12 sm:h-16 w-12 sm:w-16 border-t-4 border-b-4 border-purple-500"></div>
    </div>

    <!-- Toast Messages -->
    <div
      v-if="showToast"
      class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white text-xs sm:text-sm"
      :class="{
        'bg-green-500': toastType === 'success',
        'bg-red-500': toastType === 'error',
        'bg-blue-500': toastType === 'info',
        'bg-yellow-500': toastType === 'warning'
      }"
    >
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import api from '@/services/api';
import { useToast } from '@/composables/useToast';
import { formatDateTime } from '@/utils/DateFormat';

// Interfaces
interface Institute {
  id: number;
  name: string;
}

interface Stage {
  id: number;
  name: string;
}

interface Subject {
  id: number;
  subjectName: string;
}

interface Course {
  id: number;
  CourseName: string;
}

interface Student {
  id: number;
  fullName: string;
}

interface Attendance {
  id: number;
  student: { id: number; name: string };
  lecture: { id: number; course_name: string };
  attendance_date: string;
  is_present: number;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface Pagination {
  from: number;
  to: number;
  total: number;
  current_page: number;
  last_page: number;
  links: PaginationLink[];
}

// State
const isLoading = ref(false);
const institutes = ref<Institute[]>([]);
const stages = ref<Stage[]>([]);
const subjects = ref<Subject[]>([]);
const courses = ref<Course[]>([]);
const students = ref<Student[]>([]);
const attendance = ref<Attendance[]>([]);
const attendanceDates = ref<string[]>([]);
const selectedInstitute = ref<number | null>(null);
const selectedStage = ref<number | null>(null);
const selectedSubject = ref<number | null>(null);
const selectedCourse = ref<number | null>(null);
const searchQuery = ref('');
const currentPage = ref(1);
const perPage = ref(15);
const meta = ref<Pagination>({
  from: 0,
  to: 0,
  total: 0,
  current_page: 1,
  last_page: 1,
  links: []
});
const links = ref<{ prev: string | null; next: string | null }>({ prev: null, next: null });
const { showToastMessage, toastMessage, showToast, toastType } = useToast();

// Fetch Functions
const fetchInstitutes = async () => {
  isLoading.value = true;
  try {
    const response = await api.get('/institutes');
    institutes.value = response.data.data || [];
  } catch (error) {
    showToastMessage('error', 'حدث خطأ أثناء جلب المعاهد');
    console.error(error);
    institutes.value = [];
  } finally {
    isLoading.value = false;
  }
};

const fetchStages = async () => {
  isLoading.value = true;
  stages.value = [];
  selectedStage.value = null;
  selectedSubject.value = null;
  selectedCourse.value = null;
  subjects.value = [];
  courses.value = [];
  students.value = [];
  attendance.value = [];
  attendanceDates.value = [];
  try {
    const response = await api.get('/stages');
    stages.value = response.data.data || [];
  } catch (error) {
    showToastMessage('error', 'حدث خطأ أثناء جلب المراحل');
    console.error(error);
    stages.value = [];
  } finally {
    isLoading.value = false;
  }
};

const fetchSubjects = async () => {
  if (!selectedStage.value) return;
  isLoading.value = true;
  subjects.value = [];
  selectedSubject.value = null;
  selectedCourse.value = null;
  courses.value = [];
  students.value = [];
  attendance.value = [];
  attendanceDates.value = [];
  try {
    const response = await api.get(`/subjects?stage_id=${selectedStage.value}`);
    subjects.value = response.data.data || [];
  } catch (error) {
    showToastMessage('error', 'حدث خطأ أثناء جلب المواد');
    console.error(error);
    subjects.value = [];
  } finally {
    isLoading.value = false;
  }
};

const fetchCourses = async () => {
  if (!selectedInstitute.value || !selectedStage.value || !selectedSubject.value) return;
  isLoading.value = true;
  courses.value = [];
  selectedCourse.value = null;
  students.value = [];
  attendance.value = [];
  attendanceDates.value = [];
  try {
    const response = await api.get(
      `/courses?institute_id=${selectedInstitute.value}&stage_id=${selectedStage.value}&subject_id=${selectedSubject.value}`
    );
    courses.value = response.data.data || [];
  } catch (error) {
    showToastMessage('error', 'حدث خطأ أثناء جلب الدورات');
    console.error(error);
    courses.value = [];
  } finally {
    isLoading.value = false;
  }
};

const fetchStudentsAndAttendance = async (page = 1) => {
  if (!selectedCourse.value) return;
  isLoading.value = true;
  students.value = [];
  attendance.value = [];
  attendanceDates.value = [];
  try {
    const params: {
      'filter[lecture.id]': number;
      per_page: number;
      page: number;
      'filter[student.FullName]'?: string;
    } = {
      'filter[lecture.id]': selectedCourse.value,
      per_page: Number(perPage.value),
      page
    };
    if (searchQuery.value) {
      params['filter[student.FullName]'] = searchQuery.value;
    }
    const response = await api.get('/attendances', { params });
    attendance.value = response.data.data || [];

    // Extract unique students
    const uniqueStudents = new Map<number, Student>();
    attendance.value.forEach((item: Attendance) => {
      if (!uniqueStudents.has(item.student.id)) {
        uniqueStudents.set(item.student.id, {
          id: item.student.id,
          fullName: item.student.name
        });
      }
    });
    students.value = Array.from(uniqueStudents.values());

    // Extract unique attendance dates
    attendanceDates.value = [...new Set(attendance.value.map((item: Attendance) => item.attendance_date))].sort();

    // Update pagination metadata
    meta.value = {
      from: response.data.meta?.from || 0,
      to: response.data.meta?.to || 0,
      total: response.data.meta?.total || 0,
      current_page: response.data.meta?.current_page || 1,
      last_page: response.data.meta?.last_page || 1,
      links: response.data.meta?.links || []
    };
    links.value = {
      prev: response.data.links?.prev || null,
      next: response.data.links?.next || null
    };
    currentPage.value = response.data.meta?.current_page || 1;
  } catch (error: any) {
    showToastMessage('error', error.response?.data?.message || 'حدث خطأ أثناء جلب بيانات الطلاب أو الحضور');
    console.error(error);
    students.value = [];
    attendance.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Attendance Status
const getAttendanceStatus = (studentId: number, date: string): boolean => {
  const record = attendance.value.find(
    (item: Attendance) => item.student.id === studentId && item.attendance_date === date
  );
  return record ? record.is_present === 1 : false;
};

// Pagination
const changePage = async (url: string | null) => {
  if (!url) return;
  const page = new URL(url).searchParams.get('page');
  if (page && page !== currentPage.value.toString()) {
    await fetchStudentsAndAttendance(Number(page));
  }
};

// Search Debouncing
// Search Debouncing
let searchTimer: ReturnType<typeof setTimeout> | undefined = undefined;
watch(searchQuery, () => {
  if (searchTimer) {
    clearTimeout(searchTimer);
  }
  searchTimer = setTimeout(() => {
    currentPage.value = 1;
    fetchStudentsAndAttendance(1);
  }, 300);
});

// Watch selectedCourse
watch(selectedCourse, () => {
  if (selectedCourse.value) {
    fetchStudentsAndAttendance(1);
  }
});

// Lifecycle Hooks
onMounted(() => {
  fetchInstitutes();
});
</script>

<style scoped>
/* Scrollbar Styling */
.scrollbar-thin {
  scrollbar-width: thin;
}
.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.dark .scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #6b7280;
}
.dark .scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

/* Fade-In Animation for Modals */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Responsive Adjustments */
@media (max-width: 640px) {
  .container {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .text-xs {
    font-size: 0.65rem;
  }
  .px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .py-1\.5 {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
  .text-xs {
    font-size: 0.6rem;
  }
  .px-2 {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
  .py-1 {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
}

@media (min-width: 640px) and (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .text-sm {
    font-size: 0.875rem;
  }
}
</style>