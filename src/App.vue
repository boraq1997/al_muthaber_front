<template>
  <div class="flex h-screen">
    <!-- Sidebar (hidden on login page) -->
    <Sidebar
      v-if="!isLoginPage"
      :isSidebarOpen="isSidebarOpen"
      @toggleSidebar="toggleSidebar"
    />

    <!-- Main content area -->
    <main :class="mainClass">
      <router-view />
    </main>
  </div>

  <!-- Toast Notification -->
  <div
    v-if="showToast"
    :class="[
      'fixed top-5 end-5 z-50 transition-opacity duration-300',
      'flex items-center w-full max-w-xs p-4 text-sm rounded-lg shadow-sm',
      toastType === 'success'
        ? 'bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400'
        : '',
      toastType === 'error'
        ? 'bg-white text-red-500 dark:bg-gray-800 dark:text-red-400'
        : ''
    ]"
  >
    <!-- Success Icon -->
    <div
      v-if="toastType === 'success'"
      class="inline-flex items-center justify-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
    >
      <font-awesome-icon icon="fa-solid fa-check" />
    </div>

    <!-- Error Icon -->
    <div
      v-else-if="toastType === 'error'"
      class="inline-flex items-center justify-center w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
    >
      <font-awesome-icon icon="fa-solid fa-xmark" />
    </div>

    <!-- Toast message -->
    <div class="ms-3 text-sm font-normal">{{ toastMessage }}</div>

    <!-- Close button -->
    <button
      @click="showToast = false"
      type="button"
      class="ms-auto text-gray-400 hover:text-gray-900 dark:hover:text-white"
    >
      <font-awesome-icon icon="fa-solid fa-xmark" class="w-3 h-3" />
    </button>
  </div>
</template>

<script setup lang="ts">
/**
 * Imports
 */
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import { useToast } from './composables/useToast.ts'

/**
 * Toast state and functions (from composable)
 */
const { toastMessage, toastType, showToast } = useToast()

/**
 * Route and layout state
 */
const route = useRoute()
const isSidebarOpen = ref(true) // Sidebar open/close state
const isLoginPage = computed(() => route.path === '/login') // Check if current route is login page

/**
 * Toggle sidebar open/close
 */
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

/**
 * Dynamic main layout classes
 * - Different layout for login page vs other pages
 * - Adds margin when sidebar is open
 */
const mainClass = computed(() => {
  if (isLoginPage.value) {
    return 'transition-all duration-300 flex-1 bg-gray-100'
  }

  return [
    'transition-all duration-300 flex-1 bg-gray-100 p-4 sm:p-6',
    isSidebarOpen.value ? 'md:mr-64' : 'md:mr-0'
  ]
})
</script>