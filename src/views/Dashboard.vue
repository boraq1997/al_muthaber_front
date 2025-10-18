<template>
  <div class="bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800 min-h-screen">
    <!-- Header with enhanced design -->
    <div class="relative overflow-hidden bg-white/80 backdrop-blur-sm border-b border-slate-200/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <!-- Decorative elements -->
        <div class="absolute inset-0 bg-gradient-to-r from-sky-50/50 via-transparent to-emerald-50/50"></div>
        <div class="absolute top-0 right-0 w-72 h-72 bg-sky-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob md:w-56 md:h-56 sm:w-40 sm:h-40"></div>
        <div class="absolute -top-4 -right-4 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 md:w-56 md:h-56 sm:w-40 sm:h-40"></div>
        <div class="absolute -bottom-8 left-20 w-72 h-72 bg-rose-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 md:w-56 md:h-56 sm:w-40 sm:h-40"></div>
        
        <div class="relative z-10">
          <div class="flex items-start justify-between flex-col sm:flex-row gap-4 sm:gap-0">
            <div class="flex flex-col">
              <div class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-sky-100 to-emerald-100 text-sky-700 border border-sky-200 mb-4">
                <i class="fas fa-sync-alt w-4 h-4 mr-2"></i>
                تحديث في الوقت الفعلي
              </div>
              <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                لوحة التحكم المتقدمة
              </h1>
              <p class="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
                تحليلات شاملة وتفاعلية لأداء منظومتك التعليمية مع رؤى عميقة ومؤشرات أداء رئيسية
              </p>
              <!-- Display currentPeriod and growthRate -->
              <p class="text-sm text-slate-500 mt-2">
                الفترة الحالية: {{ currentPeriod }} | معدل النمو: {{ growthRate }}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center h-[60vh]">
        <div class="flex flex-col items-center space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50">
          <div class="relative">
            <i class="fas fa-spinner fa-spin text-4xl sm:text-5xl md:text-6xl text-sky-500"></i>
          </div>
          <div class="text-center">
            <h3 class="text-lg sm:text-xl font-semibold text-slate-800 mb-2">جاري جلب البيانات وتحليلها</h3>
            <p class="text-sm sm:text-base text-slate-500">سيتم تحميل جميع الإحصائيات والرسوم البيانية في ثوانٍ</p>
          </div>
          <div class="flex space-x-2 rtl:space-x-reverse">
            <div class="w-2 h-2 bg-sky-500 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 0.1s;"></div>
            <div class="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
          </div>
        </div>
      </div>

      <!-- No Data State -->
      <div v-else-if="!isLoading && institutes.length === 0" class="text-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 border border-slate-200/50">
        <div class="max-w-md mx-auto">
          <div class="w-20 sm:w-24 h-20 sm:h-24 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
            <i class="fas fa-file-alt text-4xl sm:text-5xl text-slate-400"></i>
          </div>
          <h3 class="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">لا توجد بيانات لعرضها</h3>
          <p class="text-sm sm:text-base text-slate-600 mb-6">يبدو أن النظام لا يحتوي على أي معاهد حتى الآن. ابدأ بإضافة معهدك الأول!</p>
          <button class="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-sky-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
            إضافة معهد جديد
          </button>
        </div>
      </div>

      <!-- Dashboard Content -->
      <div v-else-if="!isLoading && institutes.length > 0" class="space-y-6 sm:space-y-8">
        <!-- Enhanced KPIs Section -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <KpiCard 
            v-for="(kpi, index) in kpiConfigs" 
            :key="index"
            :icon="kpi.icon" 
            :title="kpi.title" 
            :value="kpi.getValue(summary) || '0'" 
            :color="kpi.color" 
            :is-currency="kpi.isCurrency"
            :trend="kpi.getTrend()"
          />
        </div>

        <!-- Main Charts Row with enhanced layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <!-- Enhanced Bar Chart -->
          <div class="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border border-slate-200/50">
            <div class="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-1">مقارنة أداء المعاهد</h3>
                <p class="text-xs sm:text-sm text-slate-500">مقارنة عدد الطلاب والأساتذة عبر جميع المعاهد</p>
              </div>
              <div class="flex items-center space-x-2 rtl:space-x-reverse">
                <button 
                  @click="toggleChartView('bar')" 
                  :class="['p-2 rounded-lg transition-colors', chartView === 'bar' ? 'bg-sky-100 text-sky-600' : 'text-slate-400 hover:text-slate-600']"
                >
                  <i class="fas fa-chart-bar w-4 sm:w-5 h-4 sm:h-5"></i>
                </button>
                <button 
                  @click="toggleChartView('line')" 
                  :class="['p-2 rounded-lg transition-colors', chartView === 'line' ? 'bg-emerald-100 text-emerald-600' : 'text-slate-400 hover:text-slate-600']"
                >
                  <i class="fas fa-chart-line w-4 sm:w-5 h-4 sm:h-5"></i>
                </button>
              </div>
            </div>
            <div class="h-[300px] sm:h-[350px] md:h-[400px]">
              <apexchart 
                v-if="institutes.length > 0"
                :type="chartView" 
                height="100%" 
                :options="statsChartOptions" 
                :series="statsChartSeries" 
              />
              <div v-else class="flex items-center justify-center h-full text-slate-500">
                <div class="text-center">
                  <i class="fas fa-file-alt w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-2"></i>
                  <p class="text-xs sm:text-sm">لا توجد بيانات للعرض</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Enhanced Donut Chart -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border border-slate-200/50 flex flex-col">
            <div class="mb-4 sm:mb-6">
              <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-1">توزيع الطلاب على المعاهد</h3>
              <p class="text-xs sm:text-sm text-slate-500">نسبة كل معهد من إجمالي الطلاب</p>
            </div>
            <div class="flex-grow flex items-center justify-center relative">
              <apexchart 
                v-if="institutes.length > 0"
                type="donut" 
                height="100%" 
                :options="studentDistributionOptions" 
                :series="studentDistributionSeries" 
              />
              <div v-else class="flex items-center justify-center h-full">
                <div class="text-center text-slate-500">
                  <i class="fas fa-chart-pie w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-2"></i>
                  <p class="text-xs sm:text-sm">لا توجد بيانات للعرض</p>
                </div>
              </div>
              <div v-if="institutes.length > 0" class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div class="text-center">
                  <div class="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">{{ summary.totalStudents.toLocaleString() }}</div>
                  <div class="m-0 text-xs sm:text-sm text-slate-500">إجمالي الطلاب</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Secondary Charts Row with enhanced layout -->
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
          <!-- Enhanced Area Chart -->
          <div class="lg:col-span-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border border-slate-200/50">
            <div class="flex items-center justify-between mb-4 sm:mb-6 flex-col sm:flex-row gap-4 sm:gap-0">
              <div>
                <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-1">تحليل الحسابات الشهرية</h3>
                <p class="text-xs sm:text-sm text-slate-500">تطور القبض والصرف عبر الأشهر الماضية</p>
                <!-- Debug info -->
                <div class="text-xs text-slate-400 mt-1">
                  حسابات محملة: {{ allAccounts.length }} | شهور: {{ getFilteredMonths().length }}
                </div>
              </div>
              <select 
                v-model="selectedPeriod" 
                @change="updatePeriodData"
                style="width: 130px;"
                class="text-xs sm:text-sm border border-slate-200 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 bg-white/50 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              >
                <option value="6">آخر 6 أشهر</option>
                <option value="12">آخر 12 شهر</option>
                <option value="all">جميع الشهور</option>
              </select>
            </div>
            <div class="h-[300px] sm:h-[350px] md:h-[400px]">
              <apexchart 
                v-if="hasFinancialData && getFilteredMonths().length > 0"
                type="area" 
                height="100%" 
                :options="financialChartOptions" 
                :series="financialChartSeries" 
              />
              <div v-else class="flex items-center justify-center h-full text-slate-500">
                <div class="text-center">
                  <i class="fas fa-wallet w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-2"></i>
                  <p class="text-xs sm:text-sm">لا توجد بيانات مالية للعرض</p>
                  <p v-if="allAccounts.length === 0" class="text-xs mt-1">لم يتم تحميل أي حسابات</p>
                  <p v-else-if="getFilteredMonths().length === 0" class="text-xs mt-1">لا توجد بيانات في الفترة المختارة</p>
                </div>
              </div>
            </div>
            <!-- Financial Summary -->
            <div class="mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
              <div class="text-center p-3 bg-emerald-50/50 rounded-lg">
                <p class="text-xs sm:text-sm text-emerald-600 font-medium">إجمالي القبض</p>
                <p class="text-base sm:text-lg font-bold text-emerald-700">{{ formatCurrency(totalReceipts) }}</p>
                <p class="text-xs text-emerald-500">{{ receiptsCount }} عملية</p>
              </div>
              <div class="text-center p-3 bg-rose-50/50 rounded-lg">
                <p class="text-xs sm:text-sm text-rose-600 font-medium">إجمالي الصرف</p>
                <p class="text-base sm:text-lg font-bold text-rose-700">{{ formatCurrency(totalPayments) }}</p>
                <p class="text-xs text-rose-500">{{ paymentsCount }} عملية</p>
              </div>
            </div>
          </div>

          <!-- Enhanced Radial Bar Chart -->
          <div class="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border border-slate-200/50 flex flex-col">
            <div class="mb-4 sm:mb-6">
              <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-1">نسبة الدورات إلى المواد</h3>
              <p class="text-xs sm:text-sm text-slate-500">كفاءة البرامج التعليمية</p>
            </div>
            <div class="flex-grow flex items-center justify-center">
              <div class="w-full h-[250px] sm:h-[300px] md:h-[350px]">
                <apexchart 
                  v-if="institutes.length > 0"
                  type="radialBar" 
                  height="100%" 
                  :options="courseToSubjectRatioOptions" 
                  :series="courseToSubjectRatioSeries" 
                />
                <div v-else class="flex items-center justify-center h-full text-slate-500">
                  <div class="text-center">
                    <i class="fas fa-percentage w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-2"></i>
                    <p class="text-xs sm:text-sm">لا توجد بيانات للعرض</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="institutes.length > 0" class="mt-4 text-center">
              <p class="text-xs sm:text-sm text-slate-500">متوسط النسبة عبر جميع المعاهد</p>
              <p class="text-xl sm:text-2xl font-bold text-slate-900">
                {{ averageCourseRatio }}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, h, nextTick, type VNode } from 'vue';
import { useToast } from '@/composables/useToast';
import api from '@/services/api';
import VueApexCharts from 'vue3-apexcharts';

const apexchart = VueApexCharts;

// Chart view state
const chartView = ref<'bar' | 'line'>('bar');

// Financial period selection
const selectedPeriod = ref('all');

// Interfaces
interface Summary {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  currentMonthExpenses: number;
}

interface Trend {
  value: number;
  isPositive: boolean;
}

interface ColorClass {
  bg: string;
  text: string;
  ring: string;
}

interface KpiCardProps {
  icon: 'users' | 'briefcase' | 'book' | 'cash';
  title: string;
  value: string | number;
  color: 'sky' | 'emerald' | 'violet' | 'rose';
  isCurrency: boolean;
  trend?: Trend;
}

interface Institute {
  id: number;
  name: string;
  stages_count: number;
  subjects_count: number;
  courses_count: number;
  teachers_count: number;
  students_count: number;
  monthly_receipts: { month: string; amount: number; monthName: string }[];
  monthly_payments: { month: string; amount: number; monthName: string }[];
}

interface Account {
  id: number;
  procedure_type: 1 | 2;
  amount: string;
  created_at: string;
  accountable_id?: number;
  accountable_type?: string;
  note?: string;
  status?: number;
  accountable_name?: string;
}

// KPI Configurations
const kpiConfigs = [
  {
    icon: 'users' as const,
    title: 'إجمالي الطلاب',
    color: 'sky' as const,
    isCurrency: false,
    getValue: (summary: Summary) => summary?.totalStudents?.toLocaleString() || '0',
    getTrend: (): Trend => ({ value: 12.5, isPositive: true })
  },
  {
    icon: 'briefcase' as const,
    title: 'إجمالي الأساتذة',
    color: 'emerald' as const,
    isCurrency: false,
    getValue: (summary: Summary) => summary?.totalTeachers?.toLocaleString() || '0',
    getTrend: (): Trend => ({ value: 8.2, isPositive: true })
  },
  {
    icon: 'book' as const,
    title: 'إجمالي الدورات',
    color: 'violet' as const,
    isCurrency: false,
    getValue: (summary: Summary) => summary?.totalCourses?.toLocaleString() || '0',
    getTrend: (): Trend => ({ value: 15.3, isPositive: true })
  },
  {
    icon: 'cash' as const,
    title: 'صرفيات الشهر',
    color: 'rose' as const,
    isCurrency: true,
    getValue: (summary: Summary) => summary?.currentMonthExpenses || 0,
    getTrend: (): Trend => ({ value: 5.8, isPositive: false })
  }
];

// KpiCard Component
const KpiCard = (props: KpiCardProps) => {
  const icons: Record<string, VNode> = {
    users: h('i', { class: 'fas fa-users text-xl sm:text-2xl' }),
    briefcase: h('i', { class: 'fas fa-briefcase w-5 sm:w-6 h-5 sm:h-6' }),
    book: h('i', { class: 'fas fa-book w-5 sm:w-6 h-5 sm:h-6' }),
    cash: h('i', { class: 'fas fa-money-bill w-5 sm:w-6 h-5 sm:h-6' })
  };

  const colorClasses: Record<string, ColorClass> = {
    sky: { bg: 'bg-gradient-to-br from-sky-500/10 to-sky-600/10', text: 'text-sky-700', ring: 'ring-sky-500/20' },
    emerald: { bg: 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/10', text: 'text-emerald-700', ring: 'ring-emerald-500/20' },
    violet: { bg: 'bg-gradient-to-br from-violet-500/10 to-violet-600/10', text: 'text-violet-700', ring: 'ring-violet-500/20' },
    rose: { bg: 'bg-gradient-to-br from-rose-500/10 to-rose-600/10', text: 'text-rose-700', ring: 'ring-rose-500/20' }
  };

  const formattedValue = computed(() => {
    try {
      if (props.isCurrency) {
        return new Intl.NumberFormat('ar-IQ', {
          style: 'currency',
          currency: 'IQD',
          minimumFractionDigits: 0
        }).format(Number(props.value || 0));
      }
      return props.value || '0';
    } catch (error) {
      return props.value || '0';
    }
  });

  const trend = props.trend;
  const trendColor = trend?.isPositive ? 'text-emerald-600' : 'text-rose-600';
  const trendIcon = trend?.isPositive ? '↑' : '↓';
  const colorClass = colorClasses[props.color] || colorClasses.sky;

  return h('div', {
    class: 'group bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-200/60 p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300/70 cursor-pointer'
  }, [
    h('div', { class: 'flex items-start justify-between' }, [
      h('div', { class: 'flex items-center space-x-3 sm:space-x-4 rtl:space-x-reverse' }, [
        h('div', {
          class: `w-12 sm:w-16 h-12 sm:h-16 rounded-2xl flex-shrink-0 flex items-center justify-center ${colorClass.bg} border border-white/20 group-hover:${colorClass.ring} transition-all duration-200`
        }, [icons[props.icon]]),
        h('div', { class: 'space-y-1 sm:space-y-2' }, [
          h('p', { class: 'text-slate-600 text-xs sm:text-sm font-medium leading-tight' }, props.title),
          h('p', { class: 'text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-tight' }, formattedValue.value),
          trend && h('p', {
            class: `text-xs sm:text-sm font-medium flex items-center ${trendColor}`
          }, [
            h('span', { class: 'mr-1' }, trendIcon),
            `${trend.value}% ${trend.isPositive ? 'زيادة' : 'نقصان'}`
          ])
        ])
      ]),
      h('div', { class: 'flex-shrink-0' }, [
        h('div', {
          class: `w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-gradient-to-r ${trend?.isPositive ? 'from-emerald-400 to-green-500' : 'from-rose-400 to-red-500'} animate-pulse`
        })
      ])
    ])
  ]);
};
KpiCard.props = ['icon', 'title', 'value', 'color', 'isCurrency', 'trend'];

// Main Script
const { showToastMessage } = useToast();
const isLoading = ref(true);
const institutes = ref<Institute[]>([]);
const allAccounts = ref<Account[]>([]);

// Computed properties for header
const currentPeriod = computed(() => {
  const now = new Date();
  const month = now.toLocaleString('ar-IQ', { month: 'long' });
  return `${month} ${now.getFullYear()}`;
});

const growthRate = computed(() => {
  if (institutes.value.length < 2) return 0;
  const totalStudents = institutes.value.reduce((sum, i) => sum + (i.students_count || 0), 0);
  return Math.round((totalStudents / institutes.value.length) * 0.1);
});

// Safe date parsing function
const safeParseDate = (dateString: any): Date | null => {
  if (!dateString) return null;
  
  try {
    if (typeof dateString === 'string') {
      const date = new Date(dateString.replace(' ', 'T') + 'Z');
      if (isNaN(date.getTime())) {
        return null;
      }
      return date;
    } else if (dateString instanceof Date) {
      return isNaN(dateString.getTime()) ? null : dateString;
    }
    return null;
  } catch (error) {
    console.warn('Invalid date format:', dateString, error);
    return null;
  }
};

// Safe date to ISO month string
const safeDateToMonthString = (date: Date | null): string | null => {
  if (!date || isNaN(date.getTime())) return null;
  try {
    return date.toISOString().slice(0, 7);
  } catch (error) {
    return null;
  }
};

// Safe helper functions
const safeReduce = <T, U>(array: T[], callback: (acc: U, curr: T, index: number, arr: T[]) => U, initialValue: U): U => {
  if (!Array.isArray(array) || array.length === 0) return initialValue;
  return array.reduce(callback, initialValue);
};

const safeMap = <T, U>(array: T[], callback: (value: T, index: number, array: T[]) => U): U[] => {
  if (!Array.isArray(array) || array.length === 0) return [];
  return array.map(callback);
};

// Safe summary computation
const summary = computed((): Summary => {
  if (!institutes.value || institutes.value.length === 0) {
    return {
      totalStudents: 0,
      totalTeachers: 0,
      totalCourses: 0,
      currentMonthExpenses: 0,
    };
  }

  const currentMonth = new Date().toISOString().slice(0, 7);
  
  return {
    totalStudents: safeReduce(institutes.value, (sum: number, i: Institute) => sum + (i.students_count || 0), 0),
    totalTeachers: safeReduce(institutes.value, (sum: number, i: Institute) => sum + (i.teachers_count || 0), 0),
    totalCourses: safeReduce(institutes.value, (sum: number, i: Institute) => sum + (i.courses_count || 0), 0),
    currentMonthExpenses: calculateCurrentMonthExpenses(currentMonth),
  };
});

// Calculate current month expenses
const calculateCurrentMonthExpenses = (currentMonth: string) => {
  if (!allAccounts.value || allAccounts.value.length === 0) return 0;
  
  const currentMonthPayments = allAccounts.value.filter(account => {
    const accountMonth = safeDateToMonthString(safeParseDate(account?.created_at) || new Date());
    return account.procedure_type === 2 && accountMonth === currentMonth;
  });
  
  return safeReduce(currentMonthPayments, (sum: number, account: Account) => {
    const amount = parseFloat(account?.amount || '0');
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);
};

// Safe average calculation
const averageCourseRatio = computed(() => {
  if (!institutes.value || institutes.value.length === 0) return 0;
  
  const ratios = safeMap(institutes.value, (i: Institute): number => {
    if (i?.subjects_count > 0) {
      return Math.round((i.courses_count / i.subjects_count) * 100);
    }
    return 0;
  });
  
  return ratios.length > 0 ? Math.round(ratios.reduce((a: number, b: number) => a + b, 0) / ratios.length) : 0;
});

// Financial data calculations
const totalReceipts = computed(() => {
  if (!allAccounts.value || allAccounts.value.length === 0) return 0;
  
  const receipts = allAccounts.value.filter(account => account.procedure_type === 1);
  return safeReduce(receipts, (sum: number, account: Account) => {
    const amount = parseFloat(account?.amount || '0');
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);
});

const totalPayments = computed(() => {
  if (!allAccounts.value || allAccounts.value.length === 0) return 0;
  
  const payments = allAccounts.value.filter(account => account.procedure_type === 2);
  return safeReduce(payments, (sum: number, account: Account) => {
    const amount = parseFloat(account?.amount || '0');
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);
});

const receiptsCount = computed(() => {
  return allAccounts.value.filter(account => account.procedure_type === 1).length;
});

const paymentsCount = computed(() => {
  return allAccounts.value.filter(account => account.procedure_type === 2).length;
});

const hasFinancialData = computed(() => {
  return allAccounts.value && allAccounts.value.length > 0;
});

// Format currency helper
const formatCurrency = (amount: number) => {
  try {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'currency',
      currency: 'IQD',
      minimumFractionDigits: 0
    }).format(Number(amount));
  } catch (error) {
    return '0 د.ع';
  }
};

// Chart view toggle
const toggleChartView = (view: 'bar' | 'line') => {
  chartView.value = view;
};

// Period update
const updatePeriodData = () => {
};

// Fetch dashboard data
const fetchDashboardData = async () => {
  isLoading.value = true;
  try {
    
    const institutesResponse = await api.get('/institutes');
    const institutesData = institutesResponse?.data?.data || [];
    
    if (institutesData.length === 0) {
      institutes.value = [];
      return;
    }

    const accountsResponse = await api.get('/accounts').catch(() => ({ data: { data: [] } }));
    const rawAccounts = accountsResponse?.data?.data || [];

    allAccounts.value = rawAccounts.filter((account: any) => {
      if (!account || typeof account !== 'object') {
        console.warn('Invalid account object:', account);
        return false;
      }
      
      if (![1, 2].includes(account.procedure_type)) {
        console.warn('Unsupported procedure_type:', account.procedure_type, 'for account:', account.id);
        return false;
      }
      
      const amount = parseFloat(account.amount);
      if (isNaN(amount) || amount <= 0) {
        console.warn('Invalid amount:', account.amount, 'for account:', account.id);
        return false;
      }
      
      // const accountDate = safeParseDate(account.created_at) || new Date();
      if (!account.created_at) {
        console.warn('Missing created_at for account:', account.id, 'using current date as fallback');
      }
      
      return true;
    });
    
    const [stagesResponse, subjectsResponse] = await Promise.all([
      api.get('/stages').catch(() => ({ data: { data: [] } })),
      api.get('/subjects').catch(() => ({ data: { data: [] } }))
    ]);
    
    const stages = stagesResponse?.data?.data || [];
    const allSubjects = subjectsResponse?.data?.data || [];
    
    const processedInstitutes = await Promise.all(
      institutesData.map(async (institute: any) => {
        try {
          
          const [teachersResponse, studentsResponse, coursesResponse, accountsResponse] = await Promise.all([
            api.get(`/teachers?filter[institute.name]=${encodeURIComponent(institute.name)}`).catch(() => ({ data: { data: [] } })),
            api.get(`/students?filter[institute.name]=${encodeURIComponent(institute.name)}`).catch(() => ({ data: { data: [] } })),
            api.get(`/courses?filter[institute.name]=${encodeURIComponent(institute.name)}`).catch(() => ({ data: { data: [] } })),
            api.get(`/accounts?filter[institute_id]=${institute.id}`).catch(() => ({ data: { data: [] } }))
          ]);
          
          const courses = coursesResponse?.data?.data || [];
          const subjects = allSubjects.filter((subject: any) =>
            courses.some((course: any) => course?.Subject_id === subject?.id)
          );
          
          const instituteAccounts = accountsResponse?.data?.data || [];
          
          // console.log(`Institute ${institute.name}:`, {
          //   teachers: teachersResponse?.data?.data?.length || 0,
          //   students: studentsResponse?.data?.data?.length || 0,
          //   courses: courses.length,
          //   subjects: subjects.length,
          //   accounts: instituteAccounts.length
          // });
          
          return {
            id: institute?.id || 0,
            name: institute?.name || 'غير معروف',
            stages_count: stages.length,
            subjects_count: subjects.length,
            courses_count: courses.length,
            teachers_count: teachersResponse?.data?.data?.length || 0,
            students_count: studentsResponse?.data?.data?.length || 0,
            monthly_receipts: groupAccountsByMonth(instituteAccounts.filter((a: Account) => a.procedure_type === 1), 'receipt'),
            monthly_payments: groupAccountsByMonth(instituteAccounts.filter((a: Account) => a.procedure_type === 2), 'payment'),
          };
        } catch (error) {
          console.warn(`Error processing institute ${institute?.name}:`, error);
          return null;
        }
      })
    );
    
    institutes.value = processedInstitutes.filter((institute): institute is Institute => institute !== null);
    
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    showToastMessage('error', 'فشل تحميل البيانات: ' + (err as any)?.message || 'خطأ غير معروف');
    institutes.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Group accounts by month
const groupAccountsByMonth = (accounts: Account[], _type: 'receipt' | 'payment') => {
  if (!Array.isArray(accounts)) return [];
  
  
  const monthly: { [key: string]: number } = {};
  accounts.forEach(account => {
    try {
      const accountDate = safeParseDate(account?.created_at) || new Date();
      const accountMonth = safeDateToMonthString(accountDate);
      
      
      if (accountMonth) {
        const amount = parseFloat(account?.amount || '0');
        if (!isNaN(amount) && amount > 0) {
          monthly[accountMonth] = (monthly[accountMonth] || 0) + amount;
        }
      } else {
        console.warn(`Skipping account ${account.id}: No valid date`);
      }
    } catch (error) {
      console.warn('Error processing account for grouping:', account, error);
    }
  });
  
  const result = Object.entries(monthly)
    .filter(([month]) => month !== null)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([month, amount]) => {
      const safeDate = safeParseDate(`${month}-01`);
      const monthName = safeDate ?
        safeDate.toLocaleDateString('ar-IQ', { month: 'short', year: 'numeric' }) :
        month;
      
      return {
        month,
        amount: Number(amount),
        monthName
      };
    });
    
  return result;
};

onMounted(() => {
  fetchDashboardData();
  nextTick(() => {
    document.documentElement.classList.add('animate-loaded');
  });
});

// Enhanced Chart Theme
const chartTheme = {
  chart: {
    foreColor: '#475569',
    fontFamily: "'Inter', 'Almarai', sans-serif",
    background: 'transparent',
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 2,
      opacity: 0.1,
      color: '#64748b'
    }
  },
  colors: ['#0ea5e9', '#10b981', '#8b5cf6', '#ec4899', '#f97316'],
  xaxis: {
    labels: {
      style: {
        colors: '#64748b',
        fontSize: '12px',
        fontWeight: 500
      }
    },
    axisBorder: { color: '#e2e8f0' },
    axisTicks: { color: '#e2e8f0' },
    crosshairs: {
      show: true,
      position: 'back',
      stroke: {
        color: '#e2e8f0',
        width: 0,
        dashArray: 3,
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: '#64748b',
        fontSize: '12px',
        fontWeight: 500
      },
      formatter: (val: number) => Number(val).toLocaleString()
    }
  },
  grid: {
    borderColor: '#f1f5f9',
    strokeDashArray: 4,
    position: 'back',
    xaxis: {
      lines: { show: true }
    }
  },
  tooltip: {
    theme: 'light',
    cssClass: 'shadow-lg rounded-xl border border-slate-200',
    x: {
      formatter: undefined
    }
  },
  legend: {
    labels: {
      useSeriesColors: false,
      colors: '#475569'
    },
    markers: {
      width: 12,
      height: 12,
      radius: 12
    },
    itemMargin: {
      horizontal: 8,
      vertical: 4
    }
  },
  markers: {
    size: 0,
    hover: {
      size: 6
    }
  }
};

// Enhanced Bar/Line Chart
const statsChartOptions = computed(() => {
  if (!institutes.value || institutes.value.length === 0) {
    return {
      ...chartTheme,
      chart: {
        ...chartTheme.chart,
        type: 'bar',
        height: 400,
        toolbar: { show: false }
      },
      xaxis: {
        ...chartTheme.xaxis,
        categories: []
      }
    };
  }

  return {
    ...chartTheme,
    chart: {
      ...chartTheme.chart,
      type: chartView.value,
      height: 400,
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    ...(chartView.value === 'bar' && {
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '70%',
          borderRadius: 8
        }
      },
      stroke: {
        show: true,
        width: 4,
        colors: ['transparent']
      },
      fill: {
        opacity: 1,
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: ['#0ea5e9', '#10b981'],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100]
        }
      }
    }),
    xaxis: {
      ...chartTheme.xaxis,
      categories: institutes.value.map(i => i.name || 'غير معروف'),
      labels: {
        ...chartTheme.xaxis.labels,
        rotate: -45,
        rotateAlways: false,
        style: {
          ...chartTheme.xaxis.labels.style,
          fontSize: '11px'
        }
      }
    },
    yaxis: {
      ...chartTheme.yaxis,
      title: {
        text: 'العدد',
        style: {
          color: '#64748b',
          fontSize: '12px',
          fontWeight: 600
        }
      }
    }
  };
});

const statsChartSeries = computed(() => {
  if (!institutes.value || institutes.value.length === 0) {
    return [];
  }
  
  return [
    {
      name: 'الطلاب',
      data: institutes.value.map(i => i.students_count || 0)
    },
    {
      name: 'الأساتذة',
      data: institutes.value.map(i => i.teachers_count || 0)
    }
  ];
});

// Enhanced Donut Chart
const studentDistributionOptions = computed(() => {
  if (!institutes.value || institutes.value.length === 0) {
    return {
      ...chartTheme,
      chart: {
        ...chartTheme.chart,
        type: 'donut',
        height: 320
      },
      labels: []
    };
  }

  return {
    ...chartTheme,
    chart: {
      ...chartTheme.chart,
      type: 'donut',
      height: 320
    },
    labels: institutes.value.map(i => i.name || 'غير معروف'),
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          background: 'transparent',
          labels: {
            show: true,
            name: { show: false },
            value: { show: false },
            total: {
              show: true,
              label: 'الإجمالي',
              color: '#64748b',
              formatter: () => summary.value.totalStudents.toLocaleString()
            }
          }
        }
      }
    },
    dataLabels: { enabled: false },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      fontWeight: 500,
      itemMargin: {
        horizontal: 12,
        vertical: 8
      },
      markers: {
        width: 12,
        height: 12,
        radius: 12
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: { width: 300 },
        legend: { position: 'bottom' }
      }
    }]
  };
});

const studentDistributionSeries = computed(() => {
  if (!institutes.value || institutes.value.length === 0) {
    return [];
  }
  return institutes.value.map(i => i.students_count || 0);
});

// Enhanced Financial Area Chart
const financialChartOptions = computed(() => {
  const months = getFilteredMonths();
  
  if (!allAccounts.value || allAccounts.value.length === 0 || months.length === 0) {
    return {
      ...chartTheme,
      chart: {
        ...chartTheme.chart,
        type: 'area',
        height: 400,
        zoom: { enabled: false },
        toolbar: { show: false }
      },
      xaxis: {
        ...chartTheme.xaxis,
        categories: ['لا توجد بيانات']
      },
      yaxis: {
        ...chartTheme.yaxis,
        labels: {
          ...chartTheme.yaxis.labels,
          formatter: () => '0 د.ع'
        }
      }
    };
  }
  
  
  return {
    ...chartTheme,
    chart: {
      ...chartTheme.chart,
      type: 'area',
      height: 400,
      zoom: { enabled: false },
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 3,
      lineCap: 'round'
    },
    xaxis: {
      ...chartTheme.xaxis,
      type: 'category',
      categories: months.map(m => m.monthName),
      labels: {
        ...chartTheme.xaxis.labels,
        rotate: -45
      }
    },
    yaxis: {
      ...chartTheme.yaxis,
      labels: {
        ...chartTheme.yaxis.labels,
        formatter: (val: number) => `${Number(val).toLocaleString()} د.ع`
      },
      title: {
        text: 'المبلغ (دينار عراقي)',
        style: {
          color: '#64748b',
          fontSize: '12px',
          fontWeight: 600
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    legend: {
      ...chartTheme.legend,
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      offsetY: -10,
      fontSize: '14px'
    },
    tooltip: {
      ...chartTheme.tooltip,
      y: {
        formatter: (val: number) => `${Number(val).toLocaleString()} د.ع`
      }
    }
  };
});

const financialChartSeries = computed(() => {
  const months = getFilteredMonths();
  
  if (!allAccounts.value || allAccounts.value.length === 0 || months.length === 0) {
    return [
      { name: 'القبض', data: [0], color: '#10b981' },
      { name: 'الصرف', data: [0], color: '#ef4444' }
    ];
  }
  
  
  const receiptsData = months.map(monthData => {
    const monthReceipts = allAccounts.value.filter(account => {
      const accountDate = safeParseDate(account?.created_at) || new Date();
      const accountMonth = safeDateToMonthString(accountDate);
      return account.procedure_type === 1 && accountMonth === monthData.month;
    });
    
    const total = safeReduce(monthReceipts, (sum: number, account: Account) => {
      const amount = parseFloat(account?.amount || '0');
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
    
    return total;
  });
  
  const paymentsData = months.map(monthData => {
    const monthPayments = allAccounts.value.filter(account => {
      const accountDate = safeParseDate(account?.created_at) || new Date();
      const accountMonth = safeDateToMonthString(accountDate);
      return account.procedure_type === 2 && accountMonth === monthData.month;
    });
    
    const total = safeReduce(monthPayments, (sum: number, account: Account) => {
      const amount = parseFloat(account?.amount || '0');
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
    
    return total;
  });
  
  const series = [
    {
      name: 'القبض',
      data: receiptsData,
      color: '#10b981'
    },
    {
      name: 'الصرف',
      data: paymentsData,
      color: '#ef4444'
    }
  ];
  
  return series;
});

// Get filtered months
const getFilteredMonths = () => {
  if (!allAccounts.value || allAccounts.value.length === 0) {
    return [];
  }
  
  const validMonths = allAccounts.value
    .map(account => {
      const accountDate = safeParseDate(account?.created_at) || new Date();
      const monthString = safeDateToMonthString(accountDate);
      return monthString;
    })
    .filter((month): month is string => month !== null && month !== undefined)
    .filter((month, index, self) => self.indexOf(month) === index)
    .sort();
  
  
  if (validMonths.length === 0) {
    return [];
  }
  
  const monthsCount = parseInt(selectedPeriod.value) || 12;
  
  let filteredMonths: string[];
  
  if (selectedPeriod.value === 'all') {
    filteredMonths = validMonths;
  } else {
    const cutoffIndex = Math.max(0, validMonths.length - monthsCount);
    filteredMonths = validMonths.slice(cutoffIndex);
  }
  
  const result = filteredMonths.map(month => {
    const safeDate = safeParseDate(`${month}-01`);
    const monthName = safeDate ?
      safeDate.toLocaleDateString('ar-IQ', { month: 'short', year: 'numeric' }) :
      month;
    
    return { month, monthName };
  });
  
  return result;
};

// Enhanced Radial Bar Chart
const courseToSubjectRatioOptions = computed(() => {
  if (!institutes.value || institutes.value.length === 0) {
    return {
      ...chartTheme,
      chart: {
        ...chartTheme.chart,
        type: 'radialBar',
        height: 350,
        offsetY: -10
      },
      labels: []
    };
  }

  return {
    ...chartTheme,
    chart: {
      ...chartTheme.chart,
      type: 'radialBar',
      height: 350,
      offsetY: -10
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: '70%',
          background: '#f8fafc'
        },
        dataLabels: {
          name: {
            fontSize: '18px',
            color: '#64748b',
            offsetY: 10
          },
          value: {
            fontSize: '20px',
            color: '#1e293b',
            fontWeight: 700,
            offsetY: -30,
            formatter: (val: number) => `${Number(val)}%`
          },
          total: {
            show: true,
            label: 'متوسط النسبة',
            color: '#64748b',
            fontSize: '14px',
            formatter: () => `${averageCourseRatio.value}%`
          }
        },
        track: {
          background: '#f1f5f9',
          strokeWidth: '100%',
          margin: 15,
          shadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: '#999',
            opacity: 0.1,
            blur: 2
          }
        }
      }
    },
    stroke: { lineCap: 'round' },
    labels: institutes.value.map(i => i.name || 'غير معروف'),
    responsive: [{
      breakpoint: 480,
      options: {
        chart: { offsetY: -20 },
        legend: { show: false }
      }
    }]
  };
});

const courseToSubjectRatioSeries = computed(() => {
  if (!institutes.value || institutes.value.length === 0) {
    return [];
  }
  
  return institutes.value.map(i => {
    if (i?.subjects_count > 0) {
      return Math.round((i.courses_count / i.subjects_count) * 100);
    }
    return 0;
  });
});
</script>

<style scoped>
/* Font family for consistent typography */
.font-sans {
  font-family: 'Inter', 'Almarai', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Blob animation for decorative elements */
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(20px, -30px) scale(1.1); }
  66% { transform: translate(-10px, 10px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
  animation: blob 7s infinite;
  animation-play-state: paused; /* Disable on mobile for performance */
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* ApexCharts custom styles */
:deep(.apexcharts-canvas) {
  border-radius: 12px !important;
  width: 100% !important;
}

:deep(.apexcharts-legend) {
  padding: 8px 0 !important;
}

:deep(.apexcharts-tooltip.apexcharts-theme-light) {
  background: white !important;
  border: 1px solid #e2e8f0 !important;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
  border-radius: 8px !important;
}

:deep(.apexcharts-tooltip-title) {
  background: #f8fafc !important;
  border-bottom: 1px solid #e2e8f0 !important;
  padding: 6px 10px !important;
  border-radius: 8px 8px 0 0 !important;
  font-weight: 600 !important;
  color: #1e293b !important;
}

:deep(.apexcharts-tooltip-series-group) {
  padding: 6px 10px !important;
}

:deep(.apexcharts-tooltip-marker) {
  margin-right: 6px !important;
}

/* Loading animation */
.animate-loaded * {
  animation-fill-mode: both;
}

.animate-loaded .animate-blob {
  animation-play-state: running;
}

/* Button hover effects */
button:hover {
  transform: translateY(-1px);
}

/* Responsive styles */
@media (max-width: 640px) {
  /* Disable animations for performance on small screens */
  .animate-blob {
    animation: none;
  }

  /* Reduce padding and margins for container */
  .max-w-7xl {
    padding-left: 12px;
    padding-right: 12px;
  }

  /* Stack header elements */
  .flex.items-start.justify-between {
    flex-direction: column;
    gap: 16px;
  }

  /* Adjust font sizes for header */
  h1 {
    font-size: 1.5rem; /* 24px */
  }

  p {
    font-size: 0.875rem; /* 14px */
  }

  /* KPI cards: single column */
  .grid-cols-1.sm\:grid-cols-2.lg\:grid-cols-3.xl\:grid-cols-4 {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  /* Main charts: stack vertically */
  .grid-cols-1.lg\:grid-cols-3 {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .lg\:col-span-2 {
    grid-column: span 1 / span 1;
  }

  /* Secondary charts: stack vertically */
  .grid-cols-1.lg\:grid-cols-5 {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .lg\:col-span-3 {
    grid-column: span 1 / span 1;
  }

  .lg\:col-span-2 {
    grid-column: span 1 / span 1;
  }

  /* Adjust chart heights */
  .h-\[300px\] {
    height: 250px;
  }

  .h-\[350px\] {
    height: 300px;
  }

  .h-\[400px\] {
    height: 300px;
  }

  /* Loading state */
  .h-\[60vh\] {
    height: 50vh;
  }

  /* No data state */
  .p-6.sm\:p-8.md\:p-12 {
    padding: 24px;
  }

  /* Financial summary */
  .grid-cols-2 {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

@media (min-width: 640px) and (max-width: 768px) {
  /* KPI cards: two columns */
  .grid-cols-1.sm\:grid-cols-2.lg\:grid-cols-3.xl\:grid-cols-4 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  /* Main charts: stack vertically */
  .grid-cols-1.lg\:grid-cols-3 {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .lg\:col-span-2 {
    grid-column: span 1 / span 1;
  }

  /* Secondary charts: stack vertically */
  .grid-cols-1.lg\:grid-cols-5 {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .lg\:col-span-3 {
    grid-column: span 1 / span 1;
  }

  .lg\:col-span-2 {
    grid-column: span 1 / span 1;
  }

  /* Adjust chart heights */
  .h-\[300px\] {
    height: 300px;
  }

  .h-\[350px\] {
    height: 320px;
  }

  .h-\[400px\] {
    height: 350px;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  /* KPI cards: three columns */
  .grid-cols-1.sm\:grid-cols-2.lg\:grid-cols-3.xl\:grid-cols-4 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  /* Main charts: two columns */
  .grid-cols-1.lg\:grid-cols-3 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .lg\:col-span-2 {
    grid-column: span 1 / span 1;
  }

  /* Secondary charts: adjust columns */
  .grid-cols-1.lg\:grid-cols-5 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .lg\:col-span-3 {
    grid-column: span 1 / span 1;
  }

  .lg\:col-span-2 {
    grid-column: span 1 / span 1;
  }
}

@media (min-width: 1024px) and (max-width: 1280px) {
  /* KPI cards: three columns */
  .grid-cols-1.sm\:grid-cols-2.lg\:grid-cols-3.xl\:grid-cols-4 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  /* Main charts: maintain layout */
  .grid-cols-1.lg\:grid-cols-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }

  /* Secondary charts: maintain layout */
  .grid-cols-1.lg\:grid-cols-5 {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 32px;
  }
}

@media (min-width: 1280px) {
  /* Full layout for large screens */
  .grid-cols-1.sm\:grid-cols-2.lg\:grid-cols-3.xl\:grid-cols-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  .grid-cols-1.lg\:grid-cols-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }

  .grid-cols-1.lg\:grid-cols-5 {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 32px;
  }
}
</style>