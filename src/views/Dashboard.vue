<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- عنوان الصفحة -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">لوحة التحكم</h1>
      <p class="text-sm text-gray-500 mt-1">نظرة عامة على إحصائيات المعاهد</p>
    </div>

    <!-- قسم عرض المعاهد -->
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
    </div>
    <div v-else-if="institutes.length === 0" class="text-center text-gray-500 py-10">
      لا توجد بيانات متاحة حاليًا
    </div>
    <div v-else>
      <!-- قائمة المعاهد -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div
          v-for="institute in institutes"
          :key="institute.id"
          class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
        >
          <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ institute.name }}</h2>
          <ul class="space-y-2 text-sm text-gray-600">
            <li class="flex justify-between">
              <span>عدد المراحل:</span>
              <span class="font-medium">{{ institute.stages_count }}</span>
            </li>
            <li class="flex justify-between">
              <span>عدد المواد:</span>
              <span class="font-medium">{{ institute.subjects_count }}</span>
            </li>
            <li class="flex justify-between">
              <span>عدد اليونتات:</span>
              <span class="font-medium">{{ institute.units_count }}</span>
            </li>
            <li class="flex justify-between">
              <span>عدد الدورات:</span>
              <span class="font-medium">{{ institute.courses_count }}</span>
            </li>
            <li class="flex justify-between">
              <span>عدد الدروس:</span>
              <span class="font-medium">{{ institute.lessons_count }}</span>
            </li>
            <li class="flex justify-between">
              <span>عدد الأساتذة:</span>
              <span class="font-medium">{{ institute.teachers_count }}</span>
            </li>
            <li class="flex justify-between">
              <span>عدد الطلاب:</span>
              <span class="font-medium">{{ institute.students_count }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- قسم الشارتات -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- شارت إحصائيات المعاهد -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">إحصائيات المعاهد</h3>
          <canvas ref="statsChart" class="w-full h-64"></canvas>
        </div>

        <!-- شارت إحصائيات الصرفيات -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">إحصائيات الصرفيات</h3>
          <canvas ref="expensesChart" class="w-full h-64"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from '@/composables/useToast'
import api from '@/services/api'
import Chart from 'chart.js/auto'

const { showToastMessage } = useToast()

const isLoading = ref(true)
const institutes = ref<any[]>([])

const statsChart = ref<HTMLCanvasElement | null>(null)
const expensesChart = ref<HTMLCanvasElement | null>(null)

let statsChartInstance: Chart | null = null
let expensesChartInstance: Chart | null = null

// دالة لتجميع الصرفيات حسب الشهر
const groupExpensesByMonth = (expenses: any[]) => {
  const monthlyExpenses: { [key: string]: number } = {}
  expenses.forEach((exp: any) => {
    const date = new Date(exp.created_at)
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    monthlyExpenses[monthYear] = (monthlyExpenses[monthYear] || 0) + Number(exp.amount || 0)
  })
  return Object.entries(monthlyExpenses).map(([month, amount]) => ({
    month,
    amount,
  }))
}

// دالة جلب بيانات المعاهد وإحصائياتها
const fetchDashboardData = async () => {
  isLoading.value = true
  try {
    // جلب المعاهد
    const institutesResponse = await api.get('/institutes')
    console.log('Institutes Response:', institutesResponse.data)
    const institutesData = institutesResponse.data.data

    // جلب المراحل (مشتركة بين جميع المعاهد)
    const stagesResponse = await api.get('/stages')
    console.log('Stages Response:', stagesResponse.data)
    const stages = stagesResponse.data.data

    // لكل معهد، جلب الإحصائيات
    institutes.value = await Promise.all(
      institutesData.map(async (institute: any) => {
        // جلب الأساتذة
        const teachersResponse = await api.get(`/teachers?filter[institute.name]=${encodeURIComponent(institute.name)}`)
        console.log(`Teachers Response for ${institute.name}:`, teachersResponse.data)
        const teachers = teachersResponse.data.data

        // جلب الطلاب
        const studentsResponse = await api.get(`/students?filter[institute.name]=${encodeURIComponent(institute.name)}`)
        console.log(`Students Response for ${institute.name}:`, studentsResponse.data)
        const students = studentsResponse.data.data

        // جلب الدورات
        const coursesResponse = await api.get(`/courses?filter[institute.name]=${encodeURIComponent(institute.name)}`)
        console.log(`Courses Response for ${institute.name}:`, coursesResponse.data)
        const courses = coursesResponse.data.data

        // جلب المواد (مرتبطة بالمراحل والدورات)
        const subjectsResponse = await api.get('/subjects')
        console.log('Subjects Response:', subjectsResponse.data)
        const subjects = subjectsResponse.data.data.filter((subject: any) =>
          courses.some((course: any) => course.Subject_id === subject.id)
        )

        // جلب اليونتات (مرتبطة بالمواد)
        const unitsPromises = subjects.map((subject: any) =>
          api.get(`/units?filter[subject.id]=${subject.id}`)
        )
        const unitsResponses = await Promise.all(unitsPromises)
        console.log('Units Responses:', unitsResponses.map(res => res.data))
        const units = unitsResponses.flatMap((res: any) => res.data.data)

        // جلب الدروس (المحاضرات)
        // const lecturesResponse = await api.get('/teacher/lectures')
        // console.log('Lectures Response:', lecturesResponse.data)
        // const lectures = lecturesResponse.data.data.filter((lecture: any) =>
        //   units.some((unit: any) => unit.id === lecture.unit_id)
        // )

        // جلب الصرفيات
        const expensesResponse = await api.get('/accounts')
        console.log('Accounts Response:', expensesResponse.data)
        const expenses = expensesResponse.data.data.filter(
          (account: any) =>
            account.procedure_type === 0 && // افتراض أن 0 يعني صرفيات
            courses.some((course: any) => course.Institute_id === institute.id)
        )

        return {
          id: institute.id,
          name: institute.name,
          stages_count: stages.length, // المراحل مشتركة
          subjects_count: subjects.length,
          units_count: units.length,
          courses_count: courses.length,
          //lessons_count: lectures.length,
          teachers_count: teachers.length,
          students_count: students.length,
          expenses_data: groupExpensesByMonth(expenses),
        }
      })
    )

    // رسم الشارتات بعد جلب البيانات
    renderStatsChart()
    renderExpensesChart()
  } catch (err) {
    showToastMessage('error', 'حدث خطأ أثناء جلب البيانات: ' + (err as any).message)
    console.error('Error fetching data:', err)
  } finally {
    isLoading.value = false
  }
}

// رسم شارت إحصائيات المعاهد
const renderStatsChart = () => {
  if (statsChartInstance) statsChartInstance.destroy()
  if (!statsChart.value || institutes.value.length === 0) return

  const labels = institutes.value.map((inst) => inst.name)
  const data = {
    labels,
    datasets: [
      {
        label: 'عدد الطلاب',
        backgroundColor: 'rgba(236, 72, 153, 0.6)',
        data: institutes.value.map((inst) => inst.students_count),
      },
      {
        label: 'عدد الأساتذة',
        backgroundColor: 'rgba(249, 115, 22, 0.6)',
        data: institutes.value.map((inst) => inst.teachers_count),
      },
      {
        label: 'عدد الدورات',
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        data: institutes.value.map((inst) => inst.courses_count),
      },
    ],
  }

  statsChartInstance = new Chart(statsChart.value, {
    type: 'bar',
    data,
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  })
}

// رسم شارت الصرفيات
const renderExpensesChart = () => {
  if (expensesChartInstance) expensesChartInstance.destroy()
  if (!expensesChart.value || institutes.value.length === 0) return

  const months = institutes.value[0]?.expenses_data.map((exp: any) => exp.month) || []
  const datasets = institutes.value.map((inst: any, index: number) => ({
    label: inst.name,
    borderColor: `rgba(236, 72, 153, ${1 - index * 0.2})`,
    data: inst.expenses_data.map((exp: any) => exp.amount || 0),
    fill: false,
  }))

  expensesChartInstance = new Chart(expensesChart.value, {
    type: 'line',
    data: { labels: months, datasets },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  })
}

onMounted(() => {
  fetchDashboardData()
})
</script>

<style scoped>
/* أنماط إضافية إذا لزم الأمر */
</style>