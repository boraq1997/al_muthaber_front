import {ref} from 'vue'

const toastMessage = ref('')
const toastType = ref('')
const showToast = ref(false)

const showToastMessage = (type, message) => {
    toastType.value = type
    toastMessage.value = message
    showToast.value = true
    setTimeout(() => {
        showToast.value = false
    }, 5000)
}

export function useToast() {
    return {
        toastMessage,
        toastType,
        showToast,
        showToastMessage
    }
}