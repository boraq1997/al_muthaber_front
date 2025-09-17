<!-- src/views/grades/Grades.vue -->
<template>
  <div class="container mx-auto px-4 py-6">
    <!-- Breadcrumb -->
    <nav class="flex mb-6" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li class="inline-flex items-center">
          <router-link
            to="/dashboard"
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <font-awesome-icon icon="fa-solid fa-house" class="me-1" />
            لوحة التحكم
          </router-link>
        </li>
        <li>
          <div class="flex items-center">
            <font-awesome-icon icon="fa-solid fa-angle-left" class="w-3 h-3 text-gray-400 mx-1" />
            <router-link
              to="/grades"
              class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
            >
              <font-awesome-icon icon="fa-solid fa-graduation-cap" class="me-1" />
              درجات الطلاب
            </router-link>
          </div>
        </li>
      </ol>
    </nav>

    <!-- خيارات التصفية -->
    <div
      class="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-lg transition-all duration-500 hover:shadow-xl border border-gray-100/20 dark:border-gray-800/20 mb-6"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-50/10 to-purple-50/10 dark:from-indigo-900/10 dark:to-purple-900/10 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
      <div class="relative grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- اختيار المعهد -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">المعهد</label>
          <select
            v-model="selectedInstitute"
            @change="fetchCourses"
            class="w-full p-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="">اختر المعهد</option>
            <option v-for="institute in institutes" :key="institute.id" :value="institute.name">
              {{ institute.name }}
            </option>
          </select>
        </div>

        <!-- اختيار المرحلة -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">المرحلة</label>
          <select
            v-model="selectedStage"
            @change="fetchCourses"
            class="w-full p-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="">اختر المرحلة</option>
            <option v-for="stage in stages" :key="stage.id" :value="stage.name">
              {{ stage.name }}
            </option>
          </select>
        </div>

        <!-- اختيار الدورة -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">الدورة</label>
          <select
            v-model="selectedCourse"
            @change="fetchGrades"
            class="w-full p-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            :disabled="!selectedStage || !selectedInstitute"
          >
            <option value="">اختر الدورة</option>
            <option v-for="course in courses" :key="course.id" :value="course.CourseName">
              {{ course.CourseName }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- جدول الدرجات -->
    <div
      class="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-lg transition-all duration-500 hover:shadow-xl border border-gray-100/20 dark:border-gray-800/20"
    >
      <div v-if="isLoading" class="text-center py-4">
        <font-awesome-icon icon="fa-spinner" spin class="text-pink-500 text-2xl" />
        <span class="text-gray-600 dark:text-gray-300">جارٍ التحميل...</span>
      </div>
      <div v-else-if="Object.keys(groupedGrades).length === 0" class="text-center py-4 text-gray-500 dark:text-gray-400">
        لا توجد درجات متاحة
      </div>
      <div v-else class="relative overflow-x-auto">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-200"
        >
          <thead class="text-xs text-white uppercase" style="background: #6f225e">
            <tr>
              <th scope="col" class="px-3 py-2 font-semibold">
                <font-awesome-icon icon="fa-solid fa-user" class="mr-2" />
                اسم الطالب
              </th>
              <th scope="col" class="px-3 py-2 font-semibold">
                <font-awesome-icon icon="fa-solid fa-book" class="mr-2" />
                اسم الدورة
              </th>
              <th scope="col" class="px-3 py-2 font-semibold">
                <font-awesome-icon icon="fa-solid fa-clipboard-check" class="mr-2" />
                نوع الدرجة
              </th>
              <th scope="col" class="px-3 py-2 font-semibold">
                <font-awesome-icon icon="fa-solid fa-star" class="mr-2" />
                الدرجة
              </th>
              <th scope="col" class="px-3 py-2 font-semibold">
                <font-awesome-icon icon="fa-solid fa-calendar" class="mr-2" />
                التاريخ
              </th>
              <th scope="col" class="px-3 py-2 font-semibold">
                <font-awesome-icon icon="fa-solid fa-note-sticky" class="mr-2" />
                ملاحظات
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(student, studentId) in groupedGrades" :key="studentId">
              <tr
                class="odd:bg-white odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-600"
              >
                <td class="px-3 py-2">
                  <button
                    @click="toggleGrades(studentId)"
                    class="flex items-center text-gray-900 dark:text-gray-100"
                  >
                    <font-awesome-icon
                      :icon="expandedStudents[studentId] ? 'fa-chevron-up' : 'fa-chevron-down'"
                      class="mr-2 w-3 h-3"
                    />
                    {{ student.name }}
                  </button>
                </td>
                <td class="px-3 py-2">{{ student.grades[0].course_name }}</td>
                <td class="px-3 py-2">-</td>
                <td class="px-3 py-2">-</td>
                <td class="px-3 py-2">-</td>
                <td class="px-3 py-2">-</td>
              </tr>
              <tr
                v-if="expandedStudents[studentId]"
                v-for="grade in student.grades"
                :key="grade.id"
                class="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 transition-all duration-200"
              >
                <td class="px-3 py-2 pl-8"></td>
                <td class="px-3 py-2">{{ grade.course_name }}</td>
                <td class="px-3 py-2">{{ grade.grade_type }}</td>
                <td class="px-3 py-2">{{ grade.grade_value }}</td>
                <td class="px-3 py-2">{{ formatDateTime(grade.date) }}</td>
                <td class="px-3 py-2">{{ grade.note || 'لا يوجد' }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- التوست -->
    <div
      v-if="showToast"
      class="fixed bottom-4 left-4 p-4 rounded-lg shadow-lg text-white"
      :class="{
        'bg-green-500': toastType === 'success',
        'bg-red-500': toastType === 'error',
        'bg-blue-500': toastType === 'info',
        'bg-yellow-500': toastType === 'warning',
      }"
    >
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import api from '@/services/api'
import { useToast } from '../../composables/useToast'
import { formatDateTime } from '../../../utils/DateFormat'

/* ========= Types ========= */
interface Institute {
  id: number
  name: string
}

interface Stage {
  id: number
  name: string
}

interface Course {
  id: number
  CourseName: string
}

interface Grade {
  id: number
  student_id: number
  student_name: string
  course_name: string
  grade_type: string
  grade_value: number
  date: string
  note?: string
}

interface Student {
  name: string
  grades: Grade[]
}

/* ========= Toast ========= */
const { showToastMessage, toastMessage, toastType, showToast } = useToast()

/* ========= State ========= */
const isLoading = ref(false)

const institutes = ref<Institute[]>([])
const stages = ref<Stage[]>([])
const courses = ref<Course[]>([])
const grades = ref<Grade[]>([])

const selectedInstitute = ref<string>('')
const selectedStage = ref<string>('')
const selectedCourse = ref<string>('')

const expandedStudents = ref<Record<number, boolean>>({})

/* ========= Computed ========= */
const groupedGrades = computed<Record<number, Student>>(() => {
  const grouped: Record<number, Student> = {}
  grades.value.forEach((grade) => {
    const studentId = grade.student_id
    if (!grouped[studentId]) {
      grouped[studentId] = {
        name: grade.student_name,
        grades: []
      }
    }
    grouped[studentId].grades.push(grade)
  })
  return grouped
})

/* ========= Methods ========= */
const toggleGrades = (studentId: number) => {
  expandedStudents.value[studentId] = !expandedStudents.value[studentId]
}

const fetchInstitutes = async () => {
  isLoading.value = true
  try {
    const response = await api.get('/institutes')
    institutes.value = response.data.data as Institute[]
  } catch (err) {
    showToastMessage('error', 'حدث خطأ أثناء جلب المعاهد')
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const fetchStages = async () => {
  isLoading.value = true
  try {
    const response = await api.get('/stages')
    stages.value = response.data.data as Stage[]
  } catch (err) {
    showToastMessage('error', 'حدث خطأ أثناء جلب المراحل')
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const fetchCourses = async () => {
  if (!selectedInstitute.value || !selectedStage.value) {
    courses.value = []
    grades.value = []
    selectedCourse.value = ''
    expandedStudents.value = {}
    return
  }
  isLoading.value = true
  try {
    const response = await api.get(
      `/courses?filter[institute.name]=${encodeURIComponent(selectedInstitute.value)}&filter[stage.name]=${encodeURIComponent(selectedStage.value)}`
    )
    courses.value = response.data.data as Course[]
    grades.value = []
    selectedCourse.value = ''
    expandedStudents.value = {}
  } catch (err) {
    showToastMessage('error', 'حدث خطأ أثناء جلب الدورات')
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const fetchGrades = async () => {
  if (!selectedCourse.value) {
    grades.value = []
    expandedStudents.value = {}
    return
  }
  isLoading.value = true
  try {
    const response = await api.get(`/grades?filter[course.CourseName]=${encodeURIComponent(selectedCourse.value)}`)
    grades.value = response.data.data as Grade[]
    expandedStudents.value = {}
  } catch (err) {
    showToastMessage('error', 'حدث خطأ أثناء جلب الدرجات')
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

/* ========= Lifecycle ========= */
fetchInstitutes()
fetchStages()
</script>

<style scoped>
/* Custom Scrollbar */
.scrollbar-thin {
  scrollbar-width: thin;
}
.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 6px;
  transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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

/* Fade-In Animation for Content */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Slide-In Animation for Content */
@keyframes slideIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slide-in {
  animation: slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: var(--animation-delay);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>