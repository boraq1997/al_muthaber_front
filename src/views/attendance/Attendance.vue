<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold text-gray-800 mb-8 flex items-center">
      <font-awesome-icon icon="fa-solid fa-user-check" class="me-3 text-pink-600" />
      إدارة الحضور
    </h1>

    <!-- اختيار المعهد، المرحلة، المادة، والدورة -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 bg-white p-6 rounded-lg shadow-md">
      <!-- اختيار المعهد -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">المعهد</label>
        <select
          v-model="selectedInstitute"
          @change="fetchStages"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-200 hover:border-pink-300"
          :disabled="isLoading"
        >
          <option value="">اختر معهدًا</option>
          <option v-for="institute in institutes" :key="institute.id" :value="institute.id">
            {{ institute.name }}
          </option>
        </select>
      </div>

      <!-- اختيار المرحلة -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">المرحلة</label>
        <select
          v-model="selectedStage"
          @change="fetchSubjects"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-200 hover:border-pink-300"
          :disabled="!selectedInstitute || isLoading"
        >
          <option value="">اختر مرحلة</option>
          <option v-for="stage in stages" :key="stage.id" :value="stage.id">
            {{ stage.name }}
          </option>
        </select>
      </div>

      <!-- اختيار المادة -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">المادة</label>
        <select
          v-model="selectedSubject"
          @change="fetchCourses"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-200 hover:border-pink-300"
          :disabled="!selectedStage || isLoading"
        >
          <option value="">اختر مادة</option>
          <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
            {{ subject.subjectName }}
          </option>
        </select>
      </div>

      <!-- اختيار الدورة -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">الدورة</label>
        <select
          v-model="selectedCourse"
          @change="fetchStudentsAndAttendance"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-200 hover:border-pink-300"
          :disabled="!selectedSubject || isLoading"
        >
          <option value="">اختر دورة</option>
          <option v-for="course in courses" :key="course.id" :value="course.id">
            {{ course.CourseName }}
          </option>
        </select>
      </div>
    </div>

    <!-- جدول الحضور -->
    <div v-if="selectedCourse && students?.length > 0" class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">
              اسم الطالب
            </th>
            <th
              v-for="date in attendanceDates"
              :key="date"
              class="px-6 py-4 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              {{ formatDateTime(date) }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="student in students" :key="student.id" class="hover:bg-gray-50 transition duration-150">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ student.fullName }}
            </td>
            <td
              v-for="date in attendanceDates"
              :key="`${date}-${student.id}`"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
            >
              <font-awesome-icon
                :icon="getAttendanceStatus(student.id, date) ? 'fa-check-circle' : 'fa-times-circle'"
                :class="getAttendanceStatus(student.id, date) ? 'text-green-500' : 'text-red-500'"
                class="text-lg"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- رسالة إذا لم يتم اختيار دورة أو عدم وجود طلاب -->
    <div v-else-if="selectedCourse && (!students || students.length === 0)" class="text-center text-gray-500 mt-8 text-lg">
      لا يوجد طلاب مسجلين في هذه الدورة
    </div>
    <div v-else class="text-center text-gray-500 mt-8 text-lg">
      يرجى اختيار معهد، مرحلة، مادة، ودورة لعرض بيانات الحضور
    </div>

    <!-- مؤشر التحميل -->
    <div v-if="isLoading" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500"></div>
    </div>

    <!-- رسائل التوست -->
    <div
      v-if="showToast"
      class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white"
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
import { ref, onMounted } from 'vue'
import api from '@/services/api' // تأكد من أن المسار صحيح
import { useToast } from '@/composables/useToast'
import { formatDateTime } from '../../../utils/DateFormat'


// تعريف الواجهات
interface Institute {
  id: number
  name: string
}

interface Stage {
  id: number
  name: string
}

interface Subject {
  id: number
  subjectName: string
}

interface Course {
  id: number
  CourseName: string
}

interface Student {
  id: number
  fullName: string
}

interface Attendance {
  id: number
  student: { id: number; name: string }
  lecture: { id: number; course_name: string }
  attendance_date: string
  is_present: number
}

// الحالات
const isLoading = ref(false)
const institutes = ref<Institute[]>([])
const stages = ref<Stage[]>([])
const subjects = ref<Subject[]>([])
const courses = ref<Course[]>([])
const students = ref<Student[]>([])
const attendance = ref<Attendance[]>([])
const attendanceDates = ref<string[]>([])
const selectedInstitute = ref<number | null>(null)
const selectedStage = ref<number | null>(null)
const selectedSubject = ref<number | null>(null)
const selectedCourse = ref<number | null>(null)
const { showToastMessage, toastMessage, showToast, toastType } = useToast()

// جلب المعاهد
const fetchInstitutes = async () => {
  isLoading.value = true
  try {
    const response = await api.get('/institutes')
    institutes.value = response.data.data || []
  } catch (err) {
    showToastMessage('error', 'حدث خطأ أثناء جلب المعاهد')
    console.error(err)
    institutes.value = []
  } finally {
    isLoading.value = false
  }
}

// جلب المراحل
const fetchStages = async () => {
  isLoading.value = true
  stages.value = []
  selectedStage.value = null
  selectedSubject.value = null
  selectedCourse.value = null
  subjects.value = []
  courses.value = []
  students.value = []
  attendance.value = []
  attendanceDates.value = []
  try {
    const response = await api.get('/stages')
    stages.value = response.data.data || []
  } catch (err) {
    showToastMessage('error', 'حدث خطأ أثناء جلب المراحل')
    console.error(err)
    stages.value = []
  } finally {
    isLoading.value = false
  }
}

// جلب المواد
const fetchSubjects = async () => {
  if (!selectedStage.value) return
  isLoading.value = true
  subjects.value = []
  selectedSubject.value = null
  selectedCourse.value = null
  courses.value = []
  students.value = []
  attendance.value = []
  attendanceDates.value = []
  try {
    const response = await api.get(`/subjects?stage_id=${selectedStage.value}`)
    subjects.value = response.data.data || []
  } catch (err) {
    showToastMessage('error', 'حدث خطأ أثناء جلب المواد')
    console.error(err)
    subjects.value = []
  } finally {
    isLoading.value = false
  }
}

// جلب الدورات
const fetchCourses = async () => {
  if (!selectedInstitute.value || !selectedStage.value || !selectedSubject.value) return
  isLoading.value = true
  courses.value = []
  selectedCourse.value = null
  students.value = []
  attendance.value = []
  attendanceDates.value = []
  try {
    const response = await api.get(
      `/courses?institute_id=${selectedInstitute.value}&stage_id=${selectedStage.value}&subject_id=${selectedSubject.value}`
    )
    courses.value = response.data.data || []
  } catch (err) {
    showToastMessage('error', 'حدث خطأ أثناء جلب الدورات')
    console.error(err)
    courses.value = []
  } finally {
    isLoading.value = false
  }
}

// جلب الطلاب وبيانات الحضور
const fetchStudentsAndAttendance = async () => {
  if (!selectedCourse.value) return
  isLoading.value = true
  students.value = []
  attendance.value = []
  attendanceDates.value = []
  try {
    // جلب بيانات الحضور فقط
    const attendanceResponse = await api.get(`/attendances?filter[lecture.id]=${selectedCourse.value}`)
    attendance.value = attendanceResponse.data.data || []

    // استخراج قائمة الطلاب من بيانات الحضور
    const uniqueStudents = new Map<number, Student>()
    attendance.value.forEach((item: Attendance) => {
      if (!uniqueStudents.has(item.student.id)) {
        uniqueStudents.set(item.student.id, {
          id: item.student.id,
          fullName: item.student.name
        })
      }
    })
    students.value = Array.from(uniqueStudents.values())

    // استخراج تواريخ الحضور
    attendanceDates.value = [...new Set(attendance.value.map((item: Attendance) => item.attendance_date))].sort()
  } catch (err) {
    showToastMessage('error', 'حدث خطأ أثناء جلب بيانات الطلاب أو الحضور')
    console.error(err)
    students.value = []
    attendance.value = []
  } finally {
    isLoading.value = false
  }
}

// التحقق من حالة الحضور للطالب في تاريخ معين
const getAttendanceStatus = (studentId: number, date: string): boolean => {
  const record = attendance.value.find(
    (item: Attendance) => item.student.id === studentId && item.attendance_date === date
  )
  return record ? record.is_present === 1 : false
}

// جلب المعاهد والمراحل عند تحميل الصفحة
onMounted(() => {
  fetchInstitutes()
  fetchStages()
})
</script>

<style scoped>
table {
  direction: rtl;
}

select {
  background-color: #fff;
  transition: all 0.2s ease-in-out;
}

select:focus {
  box-shadow: 0 0 0 3px rgba(219, 39, 119, 0.1);
}

th,
td {
  border-left: 1px solid #e5e7eb;
}

th:first-child,
td:first-child {
  border-left: none;
}

tr:hover {
  background-color: #f9fafb;
}
</style>