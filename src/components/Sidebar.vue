<template>
  <div>
    <!-- Mobile toggle button for sidebar -->
    <button
      @click="toggleSidebar"
      class="fixed top-4 left-4 z-50 md:hidden p-2 bg-white/90 rounded-lg shadow-md hover:bg-white transition-all duration-200"
      aria-label="Toggle sidebar"
    >
      <font-awesome-icon
        :icon="isSidebarOpen ? 'fa-times' : 'fa-bars'"
        class="w-6 h-6 text-gray-800"
      />
    </button>

    <!-- Overlay on mobile when sidebar is open -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300"
      @click="toggleSidebar"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed top-0 right-0 z-40 h-screen bg-white border-l border-gray-200 transition-all duration-300 overflow-hidden',
        isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 translate-x-full md:w-64 md:translate-x-0'
      ]"
      style="background: #6f225e"
      aria-label="Sidebar"
    >
      <div class="h-full flex flex-col justify-between py-4 px-3 overflow-y-auto relative">
        <!-- Top section: Logo + User dropdown -->
        <div>
          <!-- Logo -->
          <div class="flex items-center justify-center mb-6 px-2 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300">
            <img src="/icon2.png" alt="Logo" class="object-contain h-8 filter drop-shadow-lg" />
          </div>

          <!-- User dropdown -->
          <div class="relative mb-6 px-2">
            <button
              @click="toggleUserDropdown"
              class="w-full text-white px-3 py-2 rounded-lg flex justify-between items-center hover:bg-white/20 transition-colors duration-200"
            >
              <div class="flex items-center space-x-2 rtl:space-x-reverse">
                <!-- User avatar with first letter of username -->
                <div
                  class="w-8 h-8 flex items-center justify-center rounded-full bg-pink-700 text-white font-semibold text-sm select-none hover:bg-pink-600 transition-colors"
                >
                  {{ username?.charAt(0).toUpperCase() }}
                </div>
                <span class="text-sm font-medium">{{ username }}</span>
              </div>
              <font-awesome-icon
                :icon="userDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down'"
                class="w-3 h-3 transition-transform duration-200"
                :class="{ 'rotate-180': userDropdownOpen }"
              />
            </button>

            <!-- Dropdown menu -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <ul
                v-show="userDropdownOpen"
                class="absolute z-50 w-full mt-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl text-sm overflow-hidden border border-white/20"
              >
                <li>
                  <a href="#" class="block px-4 py-2.5 hover:bg-pink-50 text-gray-700 transition items-center">
                    <font-awesome-icon icon="fa-user" class="me-2 text-pink-600 w-3.5 h-3.5" />
                    Profile
                  </a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2.5 hover:bg-pink-50 text-gray-700 transition items-center">
                    <font-awesome-icon icon="fa-key" class="me-2 text-pink-600 w-3.5 h-3.5" />
                    تغيير كلمة المرور
                  </a>
                </li>
              </ul>
            </transition>
          </div>

          <!-- Navigation menu -->
          <ul class="space-y-1 font-medium">
            <!-- Dashboard -->
            <li>
              <router-link
                to="/dashboard"
                class="flex items-center p-2.5 rounded-lg text-white hover:bg-white/20 hover:shadow-sm transition-all duration-200 group"
                active-class="bg-white/30 font-semibold shadow-md"
                @click="closeSidebarOnMobile"
              >
                <font-awesome-icon icon="fa-solid fa-house" class="w-5 h-5 text-white group-hover:text-white" />
                <span class="ms-3">الرئيسية</span>
                <span v-if="$route.path === '/dashboard'" class="ms-auto w-1.5 h-6 bg-white rounded-full"></span>
              </router-link>
            </li>

            <!-- Collapsible Users Section -->
            <li class="mt-2">
              <button
                @click="toggleUsersSection"
                class="w-full flex items-center justify-between p-2.5 rounded-lg text-white hover:bg-white/20 transition-all duration-200"
              >
                <div class="flex items-center">
                  <font-awesome-icon icon="fa-solid fa-users" class="w-5 h-5 text-white" />
                  <span class="ms-3 font-semibold">المستخدمين</span>
                </div>
                <font-awesome-icon
                  :icon="usersSectionOpen ? 'fa-chevron-up' : 'fa-chevron-down'"
                  class="w-3 h-3 text-white transition-transform duration-200"
                  :class="{ 'rotate-180': usersSectionOpen }"
                />
              </button>

              <!-- Nested users menu -->
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform -translate-y-2 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="transform translate-y-0 opacity-100"
                leave-to-class="transform -translate-y-2 opacity-0"
              >
                <ul v-show="usersSectionOpen" class="mt-1 pl-9 space-y-1 text-sm text-white">
                  <li v-if="role === 'superadmin'">
                    <router-link
                      to="/users/admins"
                      class="flex items-center px-3 py-2 rounded text-white hover:bg-white/20 transition-all duration-200 relative"
                      active-class="font-medium"
                      @click="closeSidebarOnMobile"
                    >
                      <font-awesome-icon icon="fa-user-shield" class="me-2 text-white w-3.5 h-3.5" />
                      المدراء
                      <span v-if="$route.path === '/users/admins'" class="ms-auto w-1.5 h-4 bg-white rounded-full"></span>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      to="/users/teachers"
                      class="flex items-center px-3 py-2 rounded text-white hover:bg-white/20 transition-all duration-200 relative"
                      active-class="font-medium"
                      @click="closeSidebarOnMobile"
                    >
                      <font-awesome-icon icon="fa-chalkboard-teacher" class="me-2 text-white w-3.5 h-3.5" />
                      الاساتذة
                      <span v-if="$route.path === '/users/teachers'" class="ms-auto w-1.5 h-4 bg-white rounded-full"></span>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      to="/users/students"
                      class="flex items-center px-3 py-2 rounded text-white hover:bg-white/20 transition-all duration-200 relative"
                      active-class="font-medium"
                      @click="closeSidebarOnMobile"
                    >
                      <font-awesome-icon icon="fa-user-graduate" class="me-2 text-white w-3.5 h-3.5" />
                      الطلاب
                      <span v-if="$route.path === '/users/students'" class="ms-auto w-1.5 h-4 bg-white rounded-full"></span>
                    </router-link>
                  </li>
                </ul>
              </transition>
            </li>

            <!-- Other navigation links -->
            <li>
              <router-link
                to="/courses"
                class="flex items-center p-2.5 rounded-lg text-white hover:bg-white/20 hover:shadow-sm transition-all duration-200 group"
                active-class="bg-white/30 font-semibold shadow-md"
                @click="closeSidebarOnMobile"
              >
                <font-awesome-icon icon="fa-solid fa-home" class="w-5 h-5 text-white group-hover:text-white" />
                <span class="ms-3">الدورات</span>
                <span v-if="$route.path === '/courses'" class="ms-auto w-1.5 h-6 bg-white rounded-full"></span>
              </router-link>
            </li>

            <li>
              <router-link to="/course.students" class="flex items-center p-2.5 rounded-lg text-white hover:bg-white/20 group"
                active-class="bg-white/30 font-semibold shadow-md" @click="closeSidebarOnMobile">
                <font-awesome-icon icon="fa-solid fa-graduation-cap" class="w-5 h-5 text-white" />
                <span class="ms-3">دورات الطلاب</span>
              </router-link>
            </li>

            <li>
              <router-link to="/grades" class="flex items-center p-2.5 rounded-lg text-white hover:bg-white/20 group"
                active-class="bg-white/30 font-semibold shadow-md" @click="closeSidebarOnMobile">
                <font-awesome-icon icon="fa-solid fa-graduation-cap" class="w-5 h-5 text-white" />
                <span class="ms-3">درجات الطلاب</span>
              </router-link>
            </li>

            <li>
              <router-link to="/schedules" class="flex items-center p-2.5 rounded-lg text-white hover:bg-white/20 group"
                active-class="bg-white/30 font-semibold shadow-md" @click="closeSidebarOnMobile">
                <font-awesome-icon icon="fa-solid fa-calendar" class="w-5 h-5 text-white" />
                <span class="ms-3">المحاضرات</span>
              </router-link>
            </li>

            <li>
              <router-link to="/stages" class="flex items-center p-2.5 rounded-lg text-white hover:bg-white/20 group"
                active-class="bg-white/30 font-semibold shadow-md" @click="closeSidebarOnMobile">
                <font-awesome-icon icon="fa-solid fa-layer-group" class="w-5 h-5 text-white" />
                <span class="ms-3">المعاهد</span>
              </router-link>
            </li>

            <li>
              <router-link to="/attendance" class="flex items-center p-2.5 rounded-lg text-white hover:bg-white/20 group"
                active-class="bg-white/30 font-semibold shadow-md" @click="closeSidebarOnMobile">
                <font-awesome-icon icon="fa-solid fa-user-check" class="w-5 h-5 text-white" />
                <span class="ms-3">الحضور</span>
              </router-link>
            </li>

            <li v-if="role === 'superadmin'">
              <router-link to="/notifications" class="flex items-center p-2.5 rounded-lg text-white hover:bg-white/20 group"
                active-class="bg-white/30 font-semibold shadow-md" @click="closeSidebarOnMobile">
                <font-awesome-icon icon="fa-solid fa-bell" class="w-5 h-5 text-white" />
                <span class="ms-3">الاشعارات</span>
              </router-link>
            </li>

            <li v-if="role === 'superadmin'">
              <router-link to="/accounts" class="flex items-center p-2.5 rounded-lg text-white hover:bg-white/20 group"
                active-class="bg-white/30 font-semibold shadow-md" @click="closeSidebarOnMobile">
                <font-awesome-icon icon="fa-solid fa-cash-register" class="w-5 h-5 text-white" />
                <span class="ms-3">الحسابات</span>
              </router-link>
            </li>

          </ul>
        </div>

        <!-- Logout button -->
        <div class="mt-4 px-2">
          <button
            @click="logout"
            class="w-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <font-awesome-icon icon="fa-right-from-bracket" class="me-2" />
            تسجيل الخروج
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
/**
 * State and logic for sidebar component
 */
import { ref, onMounted } from 'vue'

const userDropdownOpen = ref(false) // Controls user dropdown open/close
const usersSectionOpen = ref(true)  // Controls collapsible "Users" section
const isSidebarOpen = ref(true)     // Controls sidebar open/close
const username = localStorage.getItem('username') // Get username from storage

/** Toggle user dropdown */
function toggleUserDropdown() {
  userDropdownOpen.value = !userDropdownOpen.value
}

/** Toggle collapsible "Users" section */
function toggleUsersSection() {
  usersSectionOpen.value = !usersSectionOpen.value
}

/** Toggle sidebar (used on mobile and desktop) */
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

/** Close sidebar automatically on mobile after navigation */
function closeSidebarOnMobile() {
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false
  }
}

const role = ref(localStorage.getItem('role'));

/** Logout: remove user data and reload */
function logout() {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('username')
  location.reload()
}

onMounted(()=>{
  role.value = localStorage.getItem('role')
})
</script>

<style scoped>
/* Fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Slide animation */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Mobile-specific styles */
@media (max-width: 767px) {
  aside {
    width: 100%;
    max-width: 14rem; /* w-56 */
  }
  .text-sm {
    font-size: 0.875rem;
  }
  .p-2\.5 {
    padding: 0.5rem 0.75rem;
  }
  .space-y-1 > li {
    margin-top: 0.25rem;
  }
}
</style>