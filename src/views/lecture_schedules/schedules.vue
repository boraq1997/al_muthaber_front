<template>
  <div class="mx-auto p-2 sm:p-4">
    <!-- Loading Indicator -->
    <div v-if="isLoading" class="text-center py-4">
      <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-blue-600 w-6 h-6" />
    </div>

    <!-- Header -->
    <div v-else class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6 gap-4">
      <h1 class="text-lg sm:text-xl font-bold text-gray-500 bg-gradient-to-r bg-clip-text text-center md:text-left">
        جدول المحاضرات الأسبوعي
      </h1>
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
        <div class="flex bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <button 
            @click="prevWeek"
            class="p-2 rounded-l-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="الأسبوع السابق"
          >
            <font-awesome-icon icon="fa-solid fa-caret-right" class="w-4 h-4" />
          </button>
          <span class="px-4 py-2 font-medium text-gray-700 dark:text-gray-200 border-x border-gray-200 dark:border-gray-700 text-xs sm:text-sm">
            الأسبوع {{ currentWeekNumber }} - 
            {{ formatDate(weekDays[0].date) }} إلى {{ formatDate(weekDays[6].date) }}
          </span>
          <button 
            @click="nextWeek"
            class="p-2 rounded-r-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="الأسبوع التالي"
          >
            <font-awesome-icon icon="fa-solid fa-caret-left" class="w-4 h-4" />
          </button>
        </div>
        <!-- Date Picker -->
        <button 
          @click="openAddLectureModal"
          class="focus:outline-none text-white focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5 mb-2 w-full sm:w-auto"
          style="background: #6f225e"
          aria-label="إضافة محاضرة"
        >
          <font-awesome-icon icon="fa-solid fa-plus" class="mr-2 w-3 h-3 sm:w-4 sm:h-4" />
          إضافة محاضرة
        </button>
      </div>
    </div>

    <!-- Timetable -->
    <div v-if="!isLoading" class="overflow-x-auto rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div class="min-w-[600px] sm:min-w-[800px] md:min-w-full grid grid-cols-8">
        <!-- Time Column -->
        <div class="col-span-1 border-r border-gray-200 dark:border-gray-700">
          <div class="h-12 sm:h-16 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center bg-gray-50 dark:bg-gray-800 font-medium text-gray-700 dark:text-gray-200 text-xs sm:text-sm">
            الوقت
          </div>
          <div 
            v-for="timeSlot in timeSlots" 
            :key="timeSlot.time"
            class="h-12 sm:h-16 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center text-xs sm:text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
          >
            {{ timeSlot.label }}
          </div>
        </div>

        <!-- Days Columns -->
        <div 
          v-for="day in weekDays" 
          :key="day.date"
          class="col-span-1 border-r border-gray-200 dark:border-gray-700 last:border-r-0"
        >
          <div 
            class="h-12 sm:h-16 border-b border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-xs sm:text-sm"
            :class="{'bg-blue-50/50 dark:bg-blue-900/50': day.isToday}"
          >
            <div class="font-medium text-gray-800 dark:text-gray-200 truncate">{{ day.name }}</div>
            <div class="text-[0.6rem] sm:text-xs text-gray-500 dark:text-gray-400">{{ day.day }} {{ day.month }}</div>
          </div>
          <div 
            v-for="timeSlot in timeSlots" 
            :key="timeSlot.time"
            class="h-12 sm:h-16 border-b border-gray-200 dark:border-gray-700 relative hover:bg-gray-50/30 dark:hover:bg-gray-900/30 transition-colors"
            @click="openAddLectureModal(day.date, timeSlot.time)"
          >
            <div 
              v-for="event in getLecturesForDayAndTime(day.date, timeSlot.time)"
              :key="event.id"
              @click.stop="openLectureModal(event)"
              :class="[
                'absolute left-1 right-1 mx-auto p-1.5 rounded text-[0.65rem] sm:text-xs truncate shadow-sm border-l-4',
                eventColors[event.color || 'blue'],
                {'border-white dark:border-gray-800': day.isToday}
              ]"
              :style="{ top: `${getLecturePosition(event, timeSlot.time)}%`, height: `${getLectureHeight(event)}%` }"
            >
              <div class="font-medium truncate">{{ event.title }}</div>
              <div class="text-[0.6rem] opacity-80">{{ event.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Modal -->
    <div v-if="selectedLecture" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="relative w-full max-w-md mx-2 sm:mx-4">
        <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              <font-awesome-icon icon="fa-solid fa-chalkboard" class="mr-2 text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
              {{ selectedLecture.title }}
            </h3>
            <button 
              @click="selectedLecture = null" 
              class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label="إغلاق النافذة"
            >
              <font-awesome-icon icon="fa-solid fa-xmark" class="text-base sm:text-lg" />
            </button>
          </div>
          <div class="p-4 sm:p-6 space-y-4 sm:space-y-6 text-sm sm:text-base">
            <div class="grid grid-cols-1 gap-4">
              <div class="space-y-1">
                <label class="block text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">اليوم</label>
                <p class="text-gray-900 dark:text-white font-medium">
                  {{ formatDate(selectedLecture.date) }}
                </p>
              </div>
              <div class="space-y-1">
                <label class="block text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">الوقت</label>
                <p class="text-gray-900 dark:text-white font-medium">
                  {{ selectedLecture.time }} - {{ selectedLecture.end_time }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 gap-2">
            <button
              @click="deleteLecture(selectedLecture.id)"
              type="button"
              class="w-full sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-800/30 rounded-md shadow-sm focus:outline-none"
            >
              <font-awesome-icon icon="fa-solid fa-trash-can" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
              حذف
            </button>
            <button
              @click="openEditLectureModal(selectedLecture)"
              type="button"
              class="w-full sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-md shadow-sm hover:from-blue-700 hover:to-blue-600"
            >
              <font-awesome-icon icon="fa-solid fa-pen-to-square" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
              تعديل
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Event Modal -->
    <div v-if="showLectureModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="relative w-full max-w-md mx-2 sm:mx-4">
        <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              <font-awesome-icon icon="fa-solid fa-chalkboard-user" class="mr-2 text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
              {{ isEditing ? 'تعديل المحاضرة' : 'إضافة محاضرة جديدة' }}
            </h3>
            <button @click="closeLectureModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" aria-label="إغلاق النافذة">
              <font-awesome-icon icon="fa-solid fa-xmark" class="text-base sm:text-lg" />
            </button>
          </div>
          <form @submit.prevent="saveLecture" class="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <!-- Course Selection -->
            <div class="space-y-2">
              <label for="course_id" class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">اختر الكورس</label>
              <div class="relative">
                <select
                  v-model="lectureForm.course_id"
                  id="course_id"
                  required
                  class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                >
                  <option disabled value="">-- اختر كورس --</option>
                  <option v-for="course in courses" :key="course.id" :value="course.id">
                    {{ course.CourseName }}
                  </option>
                </select>
                <font-awesome-icon
                  icon="fa-solid fa-book"
                  class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3 sm:w-4 sm:h-4"
                />
              </div>
            </div>

            <!-- Date Selection -->
            <div class="space-y-2">
              <label for="date" class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">اليوم</label>
              <div class="relative">
                <select
                  v-model="lectureForm.date"
                  id="date"
                  required
                  class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                >
                  <option v-for="day in weekDays" :key="day.date" :value="day.date">
                    {{ day.name }} - {{ day.day }} {{ day.month }}
                  </option>
                </select>
                <font-awesome-icon
                  icon="fa-solid fa-calendar"
                  class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3 sm:w-4 sm:h-4"
                />
              </div>
            </div>

            <!-- Time and Duration -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label for="time" class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">الوقت</label>
                <div class="relative">
                  <select
                    v-model="lectureForm.start_time"
                    id="time"
                    required
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  >
                    <option v-for="timeSlot in timeSlots" :key="timeSlot.time" :value="timeSlot.time">
                      {{ timeSlot.label }}
                    </option>
                  </select>
                  <font-awesome-icon
                    icon="fa-solid fa-clock"
                    class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3 sm:w-4 sm:h-4"
                  />
                </div>
              </div>
              <div class="space-y-2">
                <label for="duration" class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">المدة (ساعات)</label>
                <div class="relative">
                  <select
                    v-model="lectureForm.duration"
                    id="duration"
                    required
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  >
                    <option value="1">1 ساعة</option>
                    <option value="2">2 ساعة</option>
                    <option value="3">3 ساعة</option>
                  </select>
                  <font-awesome-icon
                    icon="fa-solid fa-hourglass"
                    class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3 sm:w-4 sm:h-4"
                  />
                </div>
              </div>
            </div>
          </form>
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 gap-2">
            <button
              type="button" 
              @click="closeLectureModal"
              class="w-full sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              إلغاء
            </button>
            <button
              type="submit" 
              @click="saveLecture"
              class="w-full sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-md shadow-sm hover:from-blue-700 hover:to-blue-600"
            >
              <font-awesome-icon icon="fa-solid fa-floppy-disk" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
              حفظ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import api from '../../services/api';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Arabic } from 'flatpickr/dist/l10n/ar.js';

export default {
  setup() {
    // Arabic names for days and months
    const daysOfWeek = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const months = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];

    // State variables
    const currentDate = ref(new Date());
    const lectures = ref([]);
    const isLoading = ref(false);
    const selectedLecture = ref(null);
    const showLectureModal = ref(false);
    const isEditing = ref(false);
    const courses = ref([]);

    // Form data for lecture creation/editing
    const lectureForm = ref({
      id: null,
      course_id: '',
      course_name: '',
      date: '',
      start_time: '10:00',
      end_time: '12:00',
      duration: '2',
      repeatOption: 'none',
      repeatDays: [],
      repeatWeeks: 3
    });

    // Available background/text color classes for lectures
    const eventColors = {
      blue: 'bg-blue-100 text-blue-800',
      red: 'bg-red-100 text-red-800',
      green: 'bg-green-100 text-green-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      purple: 'bg-purple-100 text-purple-800',
      pink: 'bg-pink-100 text-pink-800'
    };

    // Time slots from 9:00 to 21:00 with formatted Arabic labels
    const timeSlots = computed(() => {
      const slots = [];
      for (let hour = 9; hour <= 21; hour++) {
        const time = `${hour.toString().padStart(2, '0')}:00`;
        const label = hour <= 12 ? `${hour} ص` : `${hour - 12} م`;
        slots.push({ time, label });
      }
      return slots;
    });

    // Computed week days array based on the currentDate
    const weekDays = computed(() => {
      const today = new Date(currentDate.value);
      const currentDay = today.getDay();
      const currentDateNum = today.getDate();
      const days = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(currentDateNum - currentDay + i);
        const dayOfMonth = date.getDate();
        const monthName = months[date.getMonth()];
        const isToday = date.toDateString() === new Date().toDateString();

        days.push({
          name: daysOfWeek[i],
          day: dayOfMonth,
          month: monthName,
          date: formatDateForCalendar(date),
          isToday
        });
      }
      return days;
    });

    // Current week number
    const currentWeekNumber = computed(() => {
      const date = new Date(currentDate.value);
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      const week1 = new Date(date.getFullYear(), 0, 4);
      return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    });

    // Format a date object to 'YYYY-MM-DD' format
    function formatDateForCalendar(date) {
      return date.toISOString().split('T')[0];
    }

    // Fetch list of courses from the API
    async function fetchCourses() {
      try {
        const response = await api.get('/courses');
        courses.value = response.data.data;
      } catch (error) {
        console.error('فشل في جلب الكورسات:', error);
      }
    }

    // Watch for course ID changes and auto-fill the course name
    watch(() => lectureForm.value.course_id, (newId) => {
      const selected = courses.value.find(c => c.id === newId);
      lectureForm.value.course_name = selected ? selected.CourseName : '';
    });

    // Format a given date string to readable Arabic full date
    function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('ar-EG', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
    }

    // Calculate duration in hours between two time strings
    function calculateDuration(start, end) {
      const s = new Date(`2000-01-01T${start}`);
      const e = new Date(`2000-01-01T${end}`);
      return Math.round((e - s) / (1000 * 60 * 60));
    }

    // Calculate end time by adding duration to start time
    function calculateEndTime(startTime, duration) {
      if (!startTime || !startTime.includes(':')) {
        console.warn('Invalid startTime:', startTime);
        return '00:00';
      }
      const [hour, minute] = startTime.split(':').map(Number);
      const endHour = hour + Number(duration || 1);
      return `${endHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    }

    // Pick a random color from eventColors
    function getRandomColor() {
      const keys = Object.keys(eventColors);
      return keys[Math.floor(Math.random() * keys.length)];
    }

    // Transform lecture data fetched from API to internal format
    function transformLectureData(apiData) {
      return apiData.map(l => ({
        id: l.id.toString(),
        course_id: l.course_id,
        title: l.course_name,
        date: l.date,
        time: l.start_time.slice(0, 5),
        end_time: l.end_time.slice(0, 5),
        duration: calculateDuration(l.start_time, l.end_time),
        color: getRandomColor(),
        originalData: l
      }));
    }

    // Fetch lecture schedule data from the API
    async function fetchLectures() {
      isLoading.value = true;
      try {
        const res = await api.get('/lecture-schedules');
        const data = await res.data.data;
        lectures.value = transformLectureData(data);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        isLoading.value = false;
      }
    }

    // Save (add or update) a lecture to the database
    async function saveLecture() {
      try {
        const startTime = lectureForm.value.start_time;
        const duration = lectureForm.value.duration;

        if (!startTime || !duration) {
          alert('الرجاء إدخال وقت البدء والمدة');
          return;
        }

        const basePayload = {
          Course_id: lectureForm.value.course_id,
          course_name: lectureForm.value.course_name,
          Starttime: `${startTime}:00`,
          EndTime: `${calculateEndTime(startTime, duration)}:00`
        };

        if (lectureForm.value.repeatOption === 'none') {
          const payload = {
            ...basePayload,
            Date: lectureForm.value.date
          };

          if (isEditing.value) {
            await api.put(`/lecture-schedules/${lectureForm.value.id}`, payload);
          } else {
            await api.post('/lecture-schedules', payload);
          }
        } else {
          const baseDate = new Date(lectureForm.value.date);
          if (!isValidDate(baseDate)) {
            alert('تاريخ غير صحيح');
            return;
          }

          const dayIndices = lectureForm.value.repeatDays
            .map(day => daysOfWeek.indexOf(day))
            .filter(idx => idx !== -1);

          if (dayIndices.length === 0) {
            alert('الرجاء اختيار أيام التكرار');
            return;
          }

          const weeks = Math.min(Math.max(1, lectureForm.value.repeatWeeks || 1), 12);

          for (let week = 0; week < weeks; week++) {
            for (const dayIndex of dayIndices) {
              const newDate = new Date(baseDate);
              const dayDiff = dayIndex - baseDate.getDay();
              newDate.setDate(newDate.getDate() + dayDiff + (week * 7));
              
              const dateStr = formatDateForCalendar(newDate);
              await api.post('/lecture-schedules', {
                ...basePayload,
                Date: dateStr
              });
            }
          }
        }

        await fetchLectures();
        closeLectureModal();
        alert('تم حفظ المحاضرات بنجاح');
      } catch (error) {
        console.error('Failed to save lecture:', error);
        alert('حدث خطأ أثناء حفظ المحاضرات');
      }
    }

    // Delete a lecture by its ID
    async function deleteLecture(id) {
      try {
        await api.delete(`/lecture-schedules/${id}`);
        await fetchLectures();
        selectedLecture.value = null;
      } catch (error) {
        console.error('Failed to delete lecture:', error);
      }
    }

    // Move calendar view to previous week
    function prevWeek() {
      const d = new Date(currentDate.value);
      d.setDate(d.getDate() - 7);
      currentDate.value = d;
      fetchLectures();
    }

    // Move calendar view to next week
    function nextWeek() {
      const d = new Date(currentDate.value);
      d.setDate(d.getDate() + 7);
      currentDate.value = d;
      fetchLectures();
    }

    // Set calendar to the week containing the selected date
    function setWeekByDate(selectedDate) {
      const d = new Date(selectedDate);
      const currentDay = d.getDay();
      d.setDate(d.getDate() - currentDay); // Move to the start of the week (Sunday)
      currentDate.value = d;
      fetchLectures();
    }

    // Get lectures scheduled for a specific day and time slot
    function getLecturesForDayAndTime(date, time) {
      const targetTime = new Date(`2000-01-01T${time}:00`);

      return lectures.value.filter(lecture => {
        if (lecture.date !== date) return false;

        const start = new Date(`2000-01-01T${lecture.time}:00`);
        const end = new Date(`2000-01-01T${lecture.end_time}:00`);

        return targetTime >= start && targetTime < end;
      });
    }

    // Get vertical position (in %) of a lecture inside its time slot
    function getLecturePosition(lecture, slotTime) {
      const slot = new Date(`2000-01-01T${slotTime}:00`);
      const start = new Date(`2000-01-01T${lecture.time}:00`);

      const diffMinutes = (start - slot) / (1000 * 60);
      const percent = (diffMinutes / 60) * 100;

      return percent;
    }

    // Get height (in px) of a lecture block based on its duration
    function getLectureHeight(lecture) {
      return lecture.duration * 100;
    }

    // Open modal to add a new lecture (with optional date & time)
    function openAddLectureModal(date = '', time = '') {
      resetLectureForm();

      lectureForm.value.date = date || weekDays.value[0]?.date || '';
      if (time) {
        lectureForm.value.start_time = time;
        lectureForm.value.end_time = calculateEndTime(time, lectureForm.value.duration);
      }

      showLectureModal.value = true;
      isEditing.value = false;
    }

    // Open modal to edit an existing lecture
    function openEditLectureModal(lecture) {
      lectureForm.value = {
        id: lecture.id,
        course_id: lecture.course_id,
        course_name: lecture.course_name,
        date: lecture.date,
        start_time: lecture.time,
        duration: lecture.duration.toString(),
        end_time: lecture.end_time,
        repeatOption: 'none',
        repeatDays: [],
        repeatWeeks: 1
      };
      showLectureModal.value = true;
      isEditing.value = true;
      selectedLecture.value = null;
    }

    // Open modal to view details of a lecture
    function openLectureModal(lecture) {
      selectedLecture.value = lecture;
    }

    // Close the lecture modal
    function closeLectureModal() {
      showLectureModal.value = false;
    }

    // Reset lecture form to default values
    function resetLectureForm() {
      lectureForm.value = {
        id: null,
        course_id: '',
        course_name: '',
        date: weekDays.value[0]?.date || '',
        start_time: '10:00',
        end_time: '12:00',
        duration: '2',
        repeatOption: 'none',
        repeatDays: [],
        repeatWeeks: 3
      };
    }

    // Toggle day in repeatDays array
    function toggleRepeatDay(day) {
      const index = lectureForm.value.repeatDays.indexOf(day);
      if (index === -1) {
        lectureForm.value.repeatDays.push(day);
      } else {
        lectureForm.value.repeatDays.splice(index, 1);
      }
    }

    // Check if date is valid
    function isValidDate(date) {
      return date instanceof Date && !isNaN(date);
    }

    // Initialize flatpickr
    onMounted(() => {
      fetchLectures();
      fetchCourses();
      
    });

    return {
      daysOfWeek,
      currentDate,
      weekDays,
      timeSlots,
      lectures,
      isLoading,
      selectedLecture,
      showLectureModal,
      isEditing,
      lectureForm,
      eventColors,
      courses,
      currentWeekNumber,
      prevWeek,
      nextWeek,
      getLecturesForDayAndTime,
      getLecturePosition,
      getLectureHeight,
      openAddLectureModal,
      openEditLectureModal,
      openLectureModal,
      closeLectureModal,
      saveLecture,
      deleteLecture,
      formatDate,
      toggleRepeatDay,
    };
  }
};
</script>

<style scoped>
/* Scrollbar Customization */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 9999px;
}

.dark ::-webkit-scrollbar-thumb {
  background-color: #4b5563;
}

/* Animation Keyframes */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Responsive Adjustments */
@media (max-width: 640px) {
  .min-w-\[600px\] {
    min-width: 100%;
  }
  .grid-cols-8 {
    grid-template-columns: repeat(8, minmax(80px, 1fr));
  }
  .text-xs {
    font-size: 0.65rem;
  }
  .h-12 {
    height: 3rem;
  }
  .h-16 {
    height: 3.5rem;
  }
}

@media (min-width: 640px) {
  .min-w-\[800px\] {
    min-width: 800px;
  }
  .grid-cols-2 {
    grid-template-columns: 1fr 1fr;
  }
}

/* Shadow Classes */
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Transition Classes */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Dark Mode Adjustments */
.dark .bg-white {
  background-color: #1f2937;
}

.dark .text-gray-700 {
  color: #e5e7eb;
}

.dark .border-gray-200 {
  border-color: #374151;
}

/* Modal Styles */
.fixed.inset-0 {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.transform.scale-95 {
  transform: scale(0.95);
}

/* Flatpickr Customization */
.flatpickr-calendar {
  font-family: 'Arial', sans-serif;
  direction: rtl;
}

.flatpickr-day.selected, .flatpickr-day.startRange, .flatpickr-day.endRange {
  background: #6f225e;
  border-color: #6f225e;
  color: #fff;
}

.flatpickr-day:hover {
  background: #f0f0f0;
}
</style>