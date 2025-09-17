<template>
  <!-- تمت إضافة حالة التحميل -->
  <div v-if="isLoading" class="text-center p-10">
    <p class="text-gray-500 dark:text-gray-400">جاري تحميل البيانات...</p>
  </div>

  <div v-else-if="groupedCourses.length === 0" class="text-center p-10">
    <p class="text-gray-500 dark:text-gray-400">لا توجد دورات مسجلة حاليًا.</p>
  </div>

  <div
    v-for="courseGroup in groupedCourses"
    :key="courseGroup.course.id"
    class="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-6"
  >
    <!-- تبويبات -->
    <ul
      class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
      :id="`tabs-${courseGroup.course.id}`"
      role="tablist"
    >
      <li class="me-2">
        <button
          :id="`course-tab-${courseGroup.course.id}`"
          :data-tabs-target="`#course-${courseGroup.course.id}`"
          type="button"
          role="tab"
          :aria-controls="`course-${courseGroup.course.id}`"
          aria-selected="true"
          class="inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500"
        >
          الدورة
        </button>
      </li>
      <li class="me-2">
        <button
          :id="`students-tab-${courseGroup.course.id}`"
          :data-tabs-target="`#students-${courseGroup.course.id}`"
          type="button"
          role="tab"
          :aria-controls="`students-${courseGroup.course.id}`"
          aria-selected="false"
          class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
        >
          الطلاب <span class="bg-red-100 text-red-100 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-500 dark:text-red-100">{{ courseGroup.students.length }}</span>
        </button>
      </li>
    </ul>

    <!-- المحتوى -->
    <div :id="`tabs-content-${courseGroup.course.id}`">
      <!-- Tab الدورة -->
      <div
        class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
        :id="`course-${courseGroup.course.id}`"
        role="tabpanel"
        :aria-labelledby="`course-tab-${courseGroup.course.id}`"
      >
        <h2 class="text-lg sm:text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-5">
            {{ courseGroup.course.CourseName }}
        </h2>

        <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-200">
          <!-- بيانات الدورة -->
          <div class="flex items-center space-x-2 rtl:space-x-reverse hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
            <span class="font-semibold text-gray-800 dark:text-gray-100">
                <font-awesome-icon icon="fa-solid fa-book" class="text-indigo-500 dark:text-indigo-400 w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 hover:scale-110" />
                المادة:
            </span> {{ courseGroup.course.subject_name }}
          </div>
          <div class="hidden sm:block h-4 sm:h-6 border-l border-gray-200 dark:border-gray-700"></div>
          <div class="flex items-center space-x-2 rtl:space-x-reverse hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
            <span class="font-semibold text-gray-800 dark:text-gray-100">
                <font-awesome-icon icon="fa-solid fa-building" class="text-indigo-500 dark:text-indigo-400 w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 hover:scale-110" />
                المعهد:
            </span> {{ courseGroup.course.institute_name }}
          </div>
          <div class="hidden sm:block h-4 sm:h-6 border-l border-gray-200 dark:border-gray-700"></div>
          <div class="flex items-center space-x-2 rtl:space-x-reverse hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
            <span class="font-semibold text-gray-800 dark:text-gray-100">
                <font-awesome-icon icon="fa-solid fa-chalkboard-teacher" class="text-indigo-500 dark:text-indigo-400 w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 hover:scale-110" />
                المدرس:
            </span> {{ courseGroup.course.teacher_name }}
          </div>
          <div class="hidden sm:block h-4 sm:h-6 border-l border-gray-200 dark:border-gray-700"></div>
          <div class="flex items-center space-x-2 rtl:space-x-reverse hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
            <span class="font-semibold text-gray-800 dark:text-gray-100">
                <font-awesome-icon icon="fa-solid fa-calendar" class="text-indigo-500 dark:text-indigo-400 w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 hover:scale-110" />
                التاريخ:
            </span> {{ courseGroup.course.Course_date }}
          </div>
          <div class="hidden sm:block h-4 sm:h-6 border-l border-gray-200 dark:border-gray-700"></div>
          <div class="flex items-center space-x-2 rtl:space-x-reverse hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
            <span class="font-semibold text-gray-800 dark:text-gray-100">
                <font-awesome-icon icon="fa-solid fa-money-bill" class="text-indigo-500 dark:text-indigo-400 w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 hover:scale-110" />
                السعر:
            </span> {{ formatCurrency(courseGroup.course.Course_price) }} دينار
          </div>
        </div>
      </div>

      <!-- Tab الطلاب -->
      <div
        class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
        :id="`students-${courseGroup.course.id}`"
        role="tabpanel"
        :aria-labelledby="`students-tab-${courseGroup.course.id}`"
      >
        <h2 class="mb-3 text-lg font-bold text-gray-900 dark:text-white">قائمة الطلاب المنتمين الى الدورة</h2>
        
        <div class="flex items-center gap-2 flex-wrap">
          <button
            @click="openAddEditStudentModal(false, courseGroup.course.id)"
            type="button"
            class="flex items-center gap-1 mb-3 text-white focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5"
            style="background: #6f225e"
          >
            <font-awesome-icon icon="fa-plus" class="w-3 h-3 sm:w-4 sm:h-4" />
            إضافة طالب
          </button>
        </div>

        <div class="relative overflow-x-auto shadow-lg rounded-xl">
           <table class="w-full text-xs sm:text-sm text-left rtl:text-right text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800">
              <thead class="text-xs text-white uppercase" style="background: #6f225e">
                  <tr>
                      <th scope="col" class="px-2 sm:px-3 py-2 font-semibold">#</th>
                      <th scope="col" class="px-2 sm:px-3 py-2 font-semibold">اسم الطالب</th>
                      <th scope="col" class="px-2 sm:px-3 py-2 font-semibold">رقم الهاتف</th>
                      <th scope="col" class="px-2 sm:px-3 py-2 font-semibold">رقم هاتف ولي الامر</th>
                      <th scope="col" class="px-2 sm:px-3 py-2 font-semibold">العنوان</th>
                      <th scope="col" class="px-2 sm:px-3 py-2 font-semibold">الاجراءات</th>
                  </tr>
              </thead>
              <tbody>
                  <tr
                    class="odd:bg-white odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-600"
                    v-for="(student, index) in courseGroup.students"
                    :key="student.relation_id"
                  >
                      <th scope="row" class="px-2 sm:px-3 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">{{ index + 1 }}</th>
                      <td class="px-2 sm:px-3 py-2">{{ student.FullName }}</td>
                      <td class="px-2 sm:px-3 py-2">{{ student.phoneNumber }}</td>
                      <td class="px-2 sm:px-3 py-2">{{ student.Parent_phone_number }}</td>
                      <td class="px-2 sm:px-3 py-2">{{ student.Address }}</td>
                      <td class="px-2 sm:px-3 py-2">
                        
                        <div class="relative inline-block">
                          <button
                            @click="toggleUserOptions(student.relation_id, $event)"
                            class="inline-flex items-center p-1.5 sm:p-2 text-sm font-medium text-gray-900 bg-white dark:bg-gray-700 rounded-full hover:bg-blue-100 dark:hover:bg-gray-600 focus:ring-4 focus:ring-blue-200 dark:focus:ring-gray-500 transition-colors duration-200"
                          >
                            <font-awesome-icon icon="fa-solid fa-ellipsis" class="text-gray-600 dark:text-gray-300 w-3 h-3 sm:w-4 sm:h-4" />
                          </button>

                          <div
                            v-show="activeUserOptions === student.relation_id"
                            :style="dropdownStyle"
                            class="z-[9999] fixed bg-white dark:bg-gray-700 rounded-lg shadow-xl w-36 sm:w-44 divide-y divide-gray-100 dark:divide-gray-600 transition-all duration-200"
                          >
                            <ul class="py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-200">
                              <li>
                                <a
                                  href="#"
                                  @click.prevent="startEdit(student, courseGroup.course.id)"
                                  class="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-blue-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-200"
                                >
                                  <font-awesome-icon icon="fa-solid fa-user-edit" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                                  تعديل
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  @click.prevent="openDeleteModal(student.relation_id)"
                                  class="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-red-100 dark:hover:bg-red-600 dark:hover:text-white text-red-600 dark:text-red-400 transition-colors duration-200"
                                >
                                  <font-awesome-icon icon="fa-solid fa-trash" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                                  حذف
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                      </td>
                  </tr>
              </tbody>
          </table>
        </div>

        <!-- Modal -->
        <div v-if="openAddEditStudentModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div class="relative w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl mx-4">
            <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
              <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  <font-awesome-icon icon="fa-solid fa-user-shield" class="mr-2 text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
                  {{ isEditMode ? 'تعديل' : 'إضافة جديد' }}
                </h3>
                <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  <font-awesome-icon icon="fa-solid fa-times" class="text-base sm:text-lg" />
                </button>
              </div>

              <div class="p-4 sm:p-6 space-y-4 max-h-[80vh] sm:max-h-[70vh] overflow-y-auto">
                <form @submit.prevent="handleSubmit">

                    <div>
                      <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">الدورة</label>
                        <div class="relative">
                          <select
                            v-model="form.course_id"
                            id="course_id"
                            class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                          >
                            <option value="" disabled>اختر الدورة</option>
                            <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.CourseName }}</option>
                          </select>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <font-awesome-icon icon="fa-school" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                      </div>
                      <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">اختر الدورة</p>
                    </div>  

                    <div>
                      <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">الطالب</label>
                        <div class="relative">
                          <select
                            v-model="form.student_id"
                            id="student_id"
                            class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                          >
                            <option value="" disabled>اختر الطالب</option>
                            <option v-for="student in students" :key="student.id" :value="student.id">{{ student.FullName }}</option>
                          </select>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <font-awesome-icon icon="fa-school" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                      </div>
                      <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">اختر الطالب</p>
                    </div>

                </form>
              </div>

              <div class="flex items-center justify-end px-3 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <button
                  @click="closeModal"
                  type="button"
                  class="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mr-2 sm:mr-3"
                >إلغاء</button>
                <button
                  @click="handleSubmit"
                  type="button"
                  class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md shadow-sm hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <font-awesome-icon icon="fa-solid fa-save" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                  {{ isEditMode ? 'حفظ التعديلات' : 'إضافة جديد' }}
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

<div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div class="relative w-full max-w-full sm:max-w-md mx-4">
      <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            <font-awesome-icon icon="fa-solid fa-user-shield" class="mr-2 text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
            تأكيد حذف المدير
          </h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <font-awesome-icon icon="fa-solid fa-times" class="text-base sm:text-lg" />
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-4 sm:p-6 space-y-4 text-right">
          <div class="mx-auto text-red-500 w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
          </div>
          <h3 class="text-base sm:text-lg font-medium text-gray-900 dark:text-white">هل أنت متأكد من حذف البيانات</h3>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            سيتم حذف جميع البيانات المرتبطة بهذا الطالب فيما يخص الدورة بشكل دائم، .
          </p>
          <p class="text-xs sm:text-sm text-red-500 dark:text-red-400">
            <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="mr-1 w-3 h-3 sm:w-4 sm:h-4" />
            لا يمكن التراجع عن هذه العملية بعد التنفيذ.
          </p>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end px-3 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 space-x-2 sm:space-x-3">
          <button
            @click="closeModal"
            type="button"
            class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            إلغاء
          </button>
          <button
            @click="handleDeleteCourseStudent"
            type="button"
            class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md shadow-sm hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
          >
            <font-awesome-icon icon="fa-solid fa-trash-can" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
            تأكيد الحذف
          </button>
        </div>
      </div>
    </div>
  </div>


</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed, watch, onBeforeUnmount } from 'vue'
import api from '@/services/api'
import { useToast } from '../../composables/useToast'
import { Tabs } from 'flowbite'
import type { TabsOptions, TabItem, TabsInterface } from 'flowbite'
import { formatCurrency } from '../../../utils/format.ts';


// Toast
const { showToastMessage } = useToast()

// --- Interfaces ---
interface Student {
  id: number;
  FullName: string;
  phoneNumber: string | number;
  Parent_phone_number: string | number;
  Address: string;
}

interface StudentWithRelation extends Student {
  relation_id: number; // معرّف جدول الرابط بين الطالب والدورة
}

interface Course {
  id: number;
  CourseName: string;
  subject_name: string;
  teacher_name: string;
  institute_name: string;
  Course_price: string;
  Course_date: string;
}

// Api raw item
interface ApiResponseItem {
  id: number;        // relation id between course and student
  course: Course;
  student: Student;
}

// Grouped type
interface GroupedCourse {
  course: Course;
  students: StudentWithRelation[];
}

// --- State ---
const isLoading = ref<boolean>(true);
const rawData = ref<ApiResponseItem[]>([]);
const tabInstances = ref<TabsInterface[]>([]);
const activeUserOptions = ref<number | null>(null);

const showDeleteModal = ref(false);
const pendingRelationId = ref<number | null>(null);

const students = ref<Student[]>([]);
const courses = ref<Course[]>([]);

// form
const form = ref({
  student_id: '' as string | number,
  course_id: '' as string | number
});

const openAddEditStudentModalVisible = ref(false);
const isEditMode = ref(false);
const infoId = ref<number | null>(null); // relation id for edit

// computed: group rawData but keep relation id
const groupedCourses = computed<GroupedCourse[]>(() => {
  if (!rawData.value || rawData.value.length === 0) return [];

  const courseMap = new Map<number, GroupedCourse>();

  for (const item of rawData.value) {
    if (!courseMap.has(item.course.id)) {
      courseMap.set(item.course.id, {
        course: item.course,
        students: []
      });
    }
    // push student with relation id
    courseMap.get(item.course.id)!.students.push({
      ...item.student,
      relation_id: item.id
    });
  }

  return Array.from(courseMap.values());
});

// initialize Flowbite tabs when groupedCourses changes
const initializeTabs = async () => {
  // destroy previous
  tabInstances.value.forEach(t => t.destroy());
  tabInstances.value = [];

  // create new instances
  for (const courseGroup of groupedCourses.value) {
    const tabsElement = document.getElementById(`tabs-${courseGroup.course.id}`) as HTMLElement | null;
    if (!tabsElement) continue;

    const courseTrigger = document.getElementById(`course-tab-${courseGroup.course.id}`) as HTMLElement | null;
    const courseTarget = document.getElementById(`course-${courseGroup.course.id}`) as HTMLElement | null;
    const studentsTrigger = document.getElementById(`students-tab-${courseGroup.course.id}`) as HTMLElement | null;
    const studentsTarget = document.getElementById(`students-${courseGroup.course.id}`) as HTMLElement | null;

    if (!courseTrigger || !courseTarget || !studentsTrigger || !studentsTarget) continue;

    const tabItems: TabItem[] = [
      { id: `course-${courseGroup.course.id}`, triggerEl: courseTrigger, targetEl: courseTarget },
      { id: `students-${courseGroup.course.id}`, triggerEl: studentsTrigger, targetEl: studentsTarget }
    ];

    const options: TabsOptions = { defaultTabId: `course-${courseGroup.course.id}` };
    const tabs: TabsInterface = new Tabs(tabsElement, tabItems, options);
    tabInstances.value.push(tabs);
  }
};

watch(groupedCourses, async () => {
  await nextTick();
  initializeTabs();
});

// fetchers
const fetchAllCoursesForStudents = async () => {
  isLoading.value = true;
  try {
    const response = await api.get<{ data: ApiResponseItem[] }>('/course-students');
    rawData.value = response.data.data || [];
    showToastMessage('success', 'تم تحميل البيانات بنجاح');
  } catch (err) {
    console.error(err);
    showToastMessage('error', 'حدث خطأ أثناء جلب البيانات');
  } finally {
    isLoading.value = false;
  }
};

const fetchStudents = async () => {
  try {
    const res = await api.get('/students');
    students.value = res.data.data || [];
  } catch (err) {
    console.error(err);
    showToastMessage('error', 'حدث خطاء اثناء جلب بيانات الطلاب');
  }
};

const fetchCourses = async () => {
  try {
    const res = await api.get('/courses');
    courses.value = res.data.data || [];
  } catch (err) {
    console.error(err);
    showToastMessage('error', 'حدث خطاء اثناء جلب بيانات الدورات');
  }
};

// modal open/close
const openAddEditStudentModal = (editMode = false, courseId: number | null = null) => {
  isEditMode.value = editMode;
  if (!editMode) {
    resetForm();
    if (courseId) form.value.course_id = courseId;
  }
  openAddEditStudentModalVisible.value = true;
  // ensure students & courses loaded
  fetchStudents();
  fetchCourses();
};

const startEdit = (student: StudentWithRelation, courseId: number) => {
  isEditMode.value = true;
  infoId.value = student.relation_id;
  form.value = {
    student_id: student.id,
    course_id: courseId
  };
  openAddEditStudentModalVisible.value = true;
};

const closeModal = () => {
  openAddEditStudentModalVisible.value = false;
  isEditMode.value = false;
  infoId.value = null;
  showDeleteModal.value = false;
  pendingRelationId.value = null
  resetForm();
};

const resetForm = () => {
  form.value = {
    student_id: '',
    course_id: ''
  };
};

// submit (create or update)
const handleSubmit = async () => {
  try {
    const payload = {
      student_id: form.value.student_id,
      course_id: form.value.course_id
    };

    if (isEditMode.value && infoId.value) {
      // update relation
      await api.put(`/course-students/${infoId.value}`, payload);
      showToastMessage('success', 'تم تعديل البيانات');
    } else {
      await api.post('/course-students', payload);
      showToastMessage('success', 'تمت إضافة البيانات');
    }

    await fetchAllCoursesForStudents();
    closeModal();
  } catch (err) {
    console.error(err);
    showToastMessage('error', isEditMode.value ? 'حدث خطأ أثناء تعديل البيانات' : 'حدث خطأ أثناء إضافة البيانات');
  }
};

const openDeleteModal = (relationId: number)=> {
  pendingRelationId.value = relationId;
  showDeleteModal.value = true;
}

// delete relation
const handleDeleteCourseStudent = async () => {
  if (!pendingRelationId.value) return;

  try {
    await api.delete(`/course-students/${pendingRelationId.value}`);
    showToastMessage('success', 'تم حذف الطالب من الدورة');
    // refresh
    await fetchAllCoursesForStudents();
    // close any open dropdown
    activeUserOptions.value = null;
  } catch (err) {
    console.error(err);
    showToastMessage('error', 'حدث خطأ أثناء الحذف');
  } finally {
    closeModal();
  }
};

// dropdown toggle & outside click close
const dropdownStyle = ref({});

function toggleUserOptions(id: any, event: any) {
  if (activeUserOptions.value === id) {
    activeUserOptions.value = null;
    return;
  }
  activeUserOptions.value = id;

  // احسب موقع الزر
  const rect = event.currentTarget.getBoundingClientRect();
  dropdownStyle.value = {
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`
  };
}

const onDocumentClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  // إذا النقر داخل زر الخيارات أو داخل قائمة الخيارات لا تغلق
  if (!target.closest('.relative.inline-block')) {
    activeUserOptions.value = null;
  }
};


onMounted(async () => {
  await fetchAllCoursesForStudents();
  document.addEventListener('click', onDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick);
});
</script>