// Import Vue Router core functions
import { createRouter, createWebHistory } from 'vue-router'

// Import main views
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'

// Import Users related views
import Users from '../views/Users.vue'
import Admins from '../views/users/Admins.vue'
import Students from '../views/users/Students.vue'
import Teachers from '../views/users/Teachers.vue'

// Import Courses related views
import Courses from '../views/courses/courses.vue'
import Co from '@/views/courses/co.vue'

// Import other views
import Grades from '@/views/grades/grades.vue'
import Schedules from '@/views/lecture_schedules/schedules.vue'
import AllStages from '@/views/stages/AllStages.vue'
import Accounts from '@/views/accounts/Accounts.vue'
import Attendance from '@/views/attendance/Attendance.vue'
import CoursesStudents from '@/views/CoursesStudents/CoursesStudents.vue'

// ========================
// Define application routes
// ========================
const routes = [
  // Public route for login page
  { path: '/login', name: 'login', component: Login },

  // Redirect root to login
  { path: '/', redirect: '/login' },

  // Protected routes (requires authentication)
  { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true } },

  // Users module
  { path: '/users', name: 'users', component: Users, meta: { requiresAuth: true } },
  { path: '/users/admins', name: 'admins', component: Admins, meta: { requiresAuth: true } },
  { path: '/users/students', name: 'students', component: Students, meta: { requiresAuth: true } },
  { path: '/users/teachers', name: 'teachers', component: Teachers, meta: { requiresAuth: true } },

  // Courses module
  { path: '/courses', name: 'courses', component: Co, meta: { requiresAuth: true } },
  { path: '/co', name: 'co', component: Courses, meta: { requiresAuth: true } },

  // Other modules
  { path: '/grades', name: 'grades', component: Grades, meta: { requiresAuth: true } },
  { path: '/schedules', name: 'schedules', component: Schedules, meta: { requiresAuth: true } },
  { path: '/stages', name: 'stages', component: AllStages, meta: { requiresAuth: true } },
  { path: '/accounts', name: 'accounts', component: Accounts, meta: { requiresAuth: true } },
  { path: '/attendance', name: 'attendance', component: Attendance, meta: { requiresAuth: true } },
  {path: '/course.students', name: "course.students", component: CoursesStudents, meta: { requiresAuth: true }},
]

// ========================
// Create router instance
// ========================
const router = createRouter({
  // Use HTML5 history mode (clean URLs without #)
  history: createWebHistory(import.meta.env.BASE_URL),

  // Attach defined routes
  routes,
})

// ========================
// Navigation guards
// ========================
router.beforeEach((to, _from, next) => {
  // Retrieve token from local storage
  const token = localStorage.getItem('auth_token')

  // Check if user is authenticated (true if token exists)
  const isAuthenticated = !!token

  // If trying to access protected route without authentication → redirect to login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')

  // If already logged in and trying to go to login page → redirect to dashboard
  } else if (to.path === '/login' && isAuthenticated) {
    next('/dashboard')

  // Otherwise, allow navigation
  } else {
    next()
  }
})

// ========================
// Export router instance
// ========================
export default router