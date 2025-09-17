// useToast.ts
import { ref } from 'vue'

/**
 * Reactive state for toast notifications
 */
const toastMessage = ref('')  
// The message displayed inside the toast

const toastType = ref<'success' | 'error' | 'info' | 'warning' | ''>('')  
// The type of toast (success, error, info, warning, or none)

const showToast = ref(false)  
// Whether the toast is currently visible

/**
 * Show a toast notification
 * @param type - Type of the toast ("success" | "error" | "info" | "warning")
 * @param message - Text message to display inside the toast
 */
const showToastMessage = (
  type: 'success' | 'error' | 'info' | 'warning',
  message: string
) => {
  toastType.value = type
  toastMessage.value = message
  showToast.value = true

  // Auto-hide toast after 5 seconds
  setTimeout(() => {
    showToast.value = false
  }, 5000)
}

/**
 * Composable function that provides toast state and actions
 */
export function useToast() {
  return {
    toastMessage,
    toastType,
    showToast,
    showToastMessage,
  }
}