<template>
  <div class="flex flex-col xl:flex-row min-h-screen">
    <!-- =========================
         Left Image Section (Visible on xl+ screens)
    ========================== -->
    <div
      class="hidden xl:flex xl:w-1/2 items-center justify-center rounded-bl-2xl rounded-tl-2xl"
      style="background: linear-gradient(180deg, #6a1e55 0%, #ab47bc 100%)"
    >
      <img
        src="/login.png"
        alt="Login Illustration"
        class="max-w-xs sm:max-w-sm lg:max-w-md"
      />
    </div>

    <!-- =========================
         Login Form Section
    ========================== -->
    <div class="w-full flex items-center justify-center bg-[#FFEEFA] px-4 sm:px-6">
      <div class="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md sm:mt-50">
        <!-- Page Title -->
        <h2 class="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-gray-900">
          تسجيل الدخول
        </h2>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-5 sm:space-y-6">
          <!-- Username Field -->
          <div class="relative">
            <input
              id="username"
              v-model="form.username"
              type="text"
              required
              placeholder="اسم المستخدم"
              class="w-full border border-gray-300 rounded-md px-3 py-2 sm:py-3 pr-10
                     focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
            />
            <font-awesome-icon
              icon="fa-user"
              class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>

          <!-- Password Field -->
          <div class="relative">
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              placeholder="كلمة المرور"
              class="w-full border border-gray-300 rounded-md px-3 py-2 sm:py-3 pr-10
                     focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
            />
            <font-awesome-icon
              icon="fa-lock"
              class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            style="background: #6f225e"
            class="w-full text-white font-semibold py-2 sm:py-3 rounded-md shadow-sm
                   transition hover:bg-purple-800"
          >
            <font-awesome-icon icon="fa-solid fa-right-to-bracket" class="me-2" />
            دخول
          </button>
        </form>

        <!-- Error Message -->
        <div
          v-if="error"
          class="flex items-center p-3 sm:p-4 mt-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
          role="alert"
        >
          <font-awesome-icon icon="fa-solid fa-circle-exclamation" class="me-2" />
          <span>خطاء في اسم المستخدم أو كلمة المرور</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

const router = useRouter()

// Redirect to dashboard if user is already authenticated
if (localStorage.getItem('auth_token')) {
  router.push('/dashboard')
}

// Reactive form data
const form = ref({
  username: '',
  password: ''
})

// Error message state
const error = ref('')

// =========================
// Handle Login Submission
// =========================
const handleLogin = async () => {
  error.value = ''
  try {
    const res = await api.post('/admin/login', form.value)
    const token = res.data.token
    const username = res.data.admin.full_name

    // Save user data in localStorage
    localStorage.setItem('username', username)
    localStorage.setItem('auth_token', token)

    // Redirect to dashboard
    router.push('/dashboard')
  } catch (err: any) {
    // Display error message from backend or fallback
    error.value = err?.response?.data?.message || 'Login failed'
  }
}
</script>