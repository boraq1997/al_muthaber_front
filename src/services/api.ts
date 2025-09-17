// api.ts
import axios from 'axios'
import router from '../router'

// Create a reusable Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Base API URL from environment variables
  headers: {
    Accept: 'application/json', // Default header for JSON requests
  },
})

// ======================
// Request Interceptor
// ======================
// Automatically attach the Authorization header if a token exists in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    config.headers.Accept = 'application/json';
  }
  return config
})

// ======================
// Response Interceptor
// ======================
// Handle global response errors (e.g., unauthorized access)
// If a 401 Unauthorized error occurs, remove the token and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth_token')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default api