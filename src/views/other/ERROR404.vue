<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
    <!-- Header with Icon -->
    <div class="text-center">
      <i class="fas fa-exclamation-circle text-8xl text-red-500 mb-6 animate-pulse"></i>
      <h1 class="text-5xl sm:text-6xl font-bold text-gray-800 mb-4">404 - الصفحة غير موجودة</h1>
      <p class="text-xl sm:text-2xl text-gray-600 mb-6">عذرًا، يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>
    </div>

    <!-- Action Button -->
    <router-link
      to="/"
      class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
    >
      <i class="fas fa-home mr-2"></i>
      العودة إلى الصفحة الرئيسية
    </router-link>

    <!-- Optional Toast Notification -->
    <div v-if="showToast" class="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50">
      <div
        class="flex items-center px-4 py-3 bg-red-500 text-white rounded-lg shadow-lg"
        :class="{ 'bg-green-500': toastType === 'success', 'bg-red-500': toastType === 'danger' }"
      >
        <i :class="['fas mr-2', toastType === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle']"></i>
        <span>{{ toastMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from '@/composables/useToast'; // استيراد useToast إذا كان موجودًا

// تعريف المتغيرات لإدارة الـ Toast
const { showToastMessage } = useToast();
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('danger');

// دالة لعرض رسالة Toast (اختياري)
const triggerErrorToast = () => {
  showToastMessage('danger', 'الصفحة غير موجودة، يرجى التحقق من الرابط');
  showToast.value = true;
  toastMessage.value = 'الصفحة غير موجودة، يرجى التحقق من الرابط';
  toastType.value = 'danger';
  setTimeout(() => {
    showToast.value = false;
  }, 3000); // إخفاء الـ Toast بعد 3 ثوانٍ
};

// استدعاء الـ Toast عند تحميل الصفحة (اختياري)
triggerErrorToast();
</script>

<style scoped>
/* دعم RTL */
:where([dir="rtl"]) {
  direction: rtl;
}

/* أنماط إضافية للتحسين */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>