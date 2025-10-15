<template>
  <!-- Breadcrumb + Actions Wrapper -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
    <!-- Breadcrumb -->
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 sm:space-x-2 rtl:space-x-reverse flex-wrap">
        <li class="inline-flex items-center">
          <a href="#" class="inline-flex items-center text-xs sm:text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <font-awesome-icon icon="fa-solid fa-users" class="me-1 w-3 h-3 sm:w-4 sm:h-4" />
            المستخدمين
          </a>
        </li>
        <li>
          <div class="flex items-center">
            <font-awesome-icon icon="fa-solid fa-angle-left" class="w-3 h-3 text-gray-400 mx-1 hidden sm:block" />
            <a href="#" class="ms-1 text-xs sm:text-sm font-medium text-gray-700 hover:text-blue-600 sm:ms-2 dark:text-gray-400 dark:hover:text-white">
              <font-awesome-icon icon="fa-solid fa-user-tie" class="me-1 w-3 h-3 sm:w-4 sm:h-4" />
              الإداريين
            </a>
          </div>
        </li>
        <li>
          <div class="flex items-center mt-2 sm:mt-0">
            <font-awesome-icon icon="fa-solid fa-angle-left" class="w-3 h-3 text-gray-400 mx-1 hidden sm:block" />
          </div>
        </li>
      </ol>
    </nav>

    <!-- Buttons -->
    <div class="flex items-center gap-2 flex-wrap">
      <button
        @click="openModal(false)"
        type="button"
        class="flex items-center gap-1 text-white focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5"
        style="background: #6f225e"
      >
        <font-awesome-icon icon="fa-plus" class="w-3 h-3 sm:w-4 sm:h-4" />
        إضافة مدير
      </button>
    </div>
  </div>

  <!-- Table -->
  <div class="relative overflow-x-auto shadow-lg rounded-xl">
    <table class="w-full text-xs sm:text-sm text-left rtl:text-right text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800">
      <thead class="text-xs text-white uppercase" style="background: #6f225e">
        <tr>
          <th scope="col" class="px-2 sm:px-3 py-2 font-semibold"> # </th>
          <th scope="col" class="px-2 sm:px-3 py-2 font-semibold">
            <font-awesome-icon icon="fa-solid fa-user" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
            الاسم
          </th>
          <th scope="col" class="px-2 sm:px-3 py-2 font-semibold">
            <font-awesome-icon icon="fa-solid fa-user-tag" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
            اسم المستخدم
          </th>
          <th scope="col" class="px-2 sm:px-3 py-2 font-semibold hidden sm:table-cell">
            <font-awesome-icon icon="fa-solid fa-phone" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
            رقم الهاتف
          </th>
          <th scope="col" class="px-2 sm:px-3 py-2 font-semibold"> الإدارة </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(admin, index) in admins"
          :key="index"
          class="odd:bg-white odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-600"
        >
          <th scope="row" class="px-2 sm:px-3 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            {{ index + 1 }}
          </th>
          <td class="px-2 sm:px-3 py-2">{{ admin.full_name }}</td>
          <td class="px-2 sm:px-3 py-2">{{ admin.username }}</td>
          <td class="px-2 sm:px-3 py-2 hidden sm:table-cell">{{ admin.phone_number }}</td>
          <td class="px-2 sm:px-3 py-2">
            <button
              ref="dropdownButton"
              @click="toggleUserOptions(index)"
              class="inline-flex items-center p-1.5 sm:p-2 text-sm font-medium text-gray-900 bg-white dark:bg-gray-700 rounded-full hover:bg-blue-100 dark:hover:bg-gray-600 focus:ring-4 focus:ring-blue-200 dark:focus:ring-gray-500 transition-colors duration-200"
            >
              <font-awesome-icon icon="fa-solid fa-ellipsis" class="text-gray-600 dark:text-gray-300 w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <div
              v-show="activeUserOptions === index"
              ref="dropdownMenu"
              class="z-10 mt-2 fixed bg-white dark:bg-gray-700 rounded-lg shadow-xl w-36 sm:w-44 divide-y divide-gray-100 dark:divide-gray-600 transform transition-all duration-300 scale-95 origin-top"
            >
              <ul class="py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                <li>
                  <a
                    href="#"
                    @click.prevent="startEdit(admin)"
                    class="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-blue-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-200"
                  >
                    <font-awesome-icon icon="fa-solid fa-user-edit" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                    تعديل
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    @click.prevent="confirmDelete(admin.id)"
                    class="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-blue-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-200"
                  >
                    <font-awesome-icon icon="fa-solid fa-user-minus" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                    حذف
                  </a>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Add/Edit Modal -->
  <div v-if="showAddEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div class="relative w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl mx-4">
      <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            <font-awesome-icon icon="fa-solid fa-user-shield" class="mr-2 text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
            {{ isEditMode ? 'تعديل بيانات المدير' : 'إضافة مدير جديد' }}
          </h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <font-awesome-icon icon="fa-solid fa-times" class="text-base sm:text-lg" />
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-4 sm:p-6 space-y-4 max-h-[80vh] sm:max-h-[70vh] overflow-y-auto">
          <form @submit.prevent="handleSubmit">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <!-- Full Name -->
              <div class="space-y-2 col-span-1 sm:col-span-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">الاسم الرباعي</label>
                <div class="relative">
                  <input
                    id="name"
                    v-model="form.fullname"
                    type="text"
                    required
                    placeholder="الاسم الرباعي"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    :class="errors.fullname ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-transparent'"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-user" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <p v-if="errors.fullname" class="text-red-500 text-xs mt-1">{{ errors.fullname }}</p>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">الاسم الرباعي للمدير</p>
              </div>

              <!-- Phone Number -->
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">رقم الهاتف</label>
                <div class="relative">
                  <input
                    id="phoneNumber"
                    v-model="form.phone_number"
                    type="text"
                    required
                    placeholder="رقم الهاتف"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    :class="errors.phone_number ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-transparent'"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-phone" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <p v-if="errors.phone_number" class="text-red-500 text-xs mt-1">{{ errors.phone_number }}</p>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">رقم الهاتف الخاص بالمدير<span class="text-yellow-600">( * يجب ان يكون فقط 11 رقم)</span></p>
              </div>

              <!-- Username -->
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">اسم المستخدم</label>
                <div class="relative">
                  <input
                    id="username"
                    v-model="form.username"
                    type="text"
                    required
                    placeholder="اسم المستخدم"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    :class="errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-transparent'"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-user-tag" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <p v-if="errors.username" class="text-red-500 text-xs mt-1">{{ errors.username }}</p>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">اسم المستخدم الخاص بتسجل الدخول<span class="text-yellow-600">(* يجب ان يكون اسم فريد غير مستخدم سابقا)</span></p>
              </div>

              <!-- Password -->
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">كلمة المرور</label>
                <div class="relative">
                  <input
                    id="password"
                    v-model="form.password"
                    type="password"
                    :required="!isEditMode"
                    placeholder="كلمة المرور"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    :class="errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-transparent'"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-lock" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">كلمة المرور الخاصه بتسجيل الدخول<span class="text-yellow-600">(* يجب ان تكون اكثر من 6 احرف واستخدم كلمة مرور قوية)</span></p>
              </div>

              <!-- Institute -->
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">المعهد</label>
                <div class="relative">
                  <select
                    v-model="form.instituteId"
                    :attr="form"
                    id="institute"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    :class="errors.instituteId ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-transparent'"
                  >
                    <option value="" disabled selected>اختر المعهد</option>
                    <option v-for="item in institute" :key="item.id" :value="item.id">{{ item.name }}</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-school" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <p v-if="errors.instituteId" class="text-red-500 text-xs mt-1">{{ errors.instituteId }}</p>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">اختر المعهد الخاص بالمدير</p>
              </div>
            </div>
          </form>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end px-3 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <button
            @click="closeModal"
            type="button"
            class="px-3 sm:px-4 py-1.5 mr-1 ml-2 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mr-3"
          >
            إلغاء
          </button>
          <button
            @click="handleSubmit"
            type="button"
            class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md shadow-sm hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <font-awesome-icon icon="fa-solid fa-save" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
            {{ isEditMode ? 'حفظ التعديلات' : 'إضافة جديد' }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Delete Modal -->
  <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div class="relative w-full max-w-full sm:max-w-md mx-4">
      <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            <font-awesome-icon icon="fa-solid fa-user-shield" class="mr-2 text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
            تأكيد حذف المدير
          </h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <font-awesome-icon icon="fa-solid fa-times" class="text-base sm:text-lg" />
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-4 sm:p-6 space-y-4 text-right">
          <div class="mx-auto text-red-500 w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
          </div>
          <h3 class="text-base sm:text-lg font-medium text-gray-900 dark:text-white">هل أنت متأكد من حذف بيانات المدير؟</h3>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            سيتم حذف جميع البيانات المرتبطة بهذا المدير بشكل دائم، بما في ذلك جميع الصلاحيات والإعدادات الخاصة به.
          </p>
          <p class="text-xs sm:text-sm text-red-500 dark:text-red-400">
            <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="mr-1 w-3 h-3 sm:w-4 sm:h-4" />
            لا يمكن التراجع عن هذه العملية بعد التنفيذ.
          </p>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end px-3 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 space-x-2 sm:space-x-3">
          <button
            @click="closeModal"
            type="button"
            class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            إلغاء
          </button>
          <button
            @click="deleteAdmin"
            type="button"
            class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md shadow-sm hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
          >
            <font-awesome-icon icon="fa-solid fa-trash-can" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
            تأكيد الحذف
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import api from '../../services/api'
import { useToast } from '../../composables/useToast.ts'

// Toast
const { showToastMessage } = useToast()

// Form
const form = ref({
  fullname: '',
  phone_number: '',
  username: '',
  password: '',
  instituteId: ''
})

const errors = ref({
  fullname: '',
  phone_number: '',
  username: '',
  password: '',
  instituteId: ''
})

const AdminId = ref(null)
const isEditMode = ref(false)

const resetForm = () => {
  form.value = {
    fullname: '',
    phone_number: '',
    username: '',
    password: '',
    instituteId: ''
  }
  errors.value = {
    fullname: '',
    phone_number: '',
    username: '',
    password: '',
    instituteId: ''
  }
  AdminId.value = null
  isEditMode.value = false
}

const startEdit = async (admin) => {
  await getInstitute() // تحميل قائمة المعاهد أولاً
  form.value = {
    fullname: admin.full_name,
    phone_number: admin.phone_number,
    username: admin.username,
    password: '',
    instituteId: admin.institute_id ? String(admin.institute_id) :  ''
  }
  errors.value = {
    fullname: '',
    phone_number: '',
    username: '',
    password: '',
    instituteId: ''
  }
  AdminId.value = admin.id
  openModal(true)
}

const validateForm = () => {
  let isValid = true
  errors.value = {
    fullname: '',
    phone_number: '',
    username: '',
    password: '',
    instituteId: ''
  }

  if (!form.value.fullname) {
    errors.value.fullname = 'الاسم الرباعي مطلوب'
    isValid = false
  }
  if (!form.value.phone_number) {
    errors.value.phone_number = 'رقم الهاتف مطلوب'
    isValid = false
  }
  if (!form.value.username) {
    errors.value.username = 'اسم المستخدم مطلوب'
    isValid = false
  }
  if (!isEditMode.value && !form.value.password) {
    errors.value.password = 'كلمة المرور مطلوبة'
    isValid = false
  } else if (!isEditMode.value && form.value.password.length < 6) {
    errors.value.password = 'كلمة المرور يجب أن تكون 6 خانات على الأقل'
    isValid = false
  }
  if (!form.value.instituteId) {
    errors.value.instituteId = 'المعهد مطلوب'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  try {
    const payload = {
      full_name: form.value.fullname,
      phone_number: form.value.phone_number,
      username: form.value.username,
      password: form.value.password,
      institute_id: form.value.instituteId
    }

    if (isEditMode.value) {
      const response = await api.put(`/admins/${AdminId.value}`, payload)
    } else {
      const response = await api.post('/admins', payload)
    }

    await fetchAdmins()
    closeModal()
    showToastMessage('success', isEditMode.value ? 'تم تعديل بيانات المدير بنجاح' : 'تمت إضافة بيانات المدير بنجاح')
    resetForm()
  } catch (err) {
    if (err.response && err.response.status === 422) {
      const apiErrors = err.response.data.errors
      if (apiErrors.username) {
        errors.value.username = 'اسم المستخدم موجود مسبقًا'
      }
      if (apiErrors.phone_number) {
        errors.value.phone_number = 'رقم الهاتف موجود مسبقًا'
      }
      showToastMessage('danger', 'حدث خطأ في التحقق من البيانات')
    } else {
      showToastMessage('danger', 'حدث خطأ أثناء العملية')
    }
    console.error(err)
  }
}

// Data
const admins = ref([])
const institute = ref([])

const fetchAdmins = async () => {
  try {
    const response = await api.get('/admins')
    admins.value = response.data.data
  } catch (err) {
    showToastMessage('danger', 'حدث خطأ أثناء العملية')
    console.error(err)
  }
}

const getInstitute = async () => {
  try {
    const response = await api.get('/institutes')
    institute.value = response.data.data
  } catch (err) {
    showToastMessage('danger', 'حدث خطأ أثناء العملية')
    console.error(err)
  }
}

// Modals
const showAddEditModal = ref(false)
const showDeleteModal = ref(false)

const openModal = async (editMode = false) => {
  isEditMode.value = editMode
  if (!editMode) resetForm()
  await getInstitute()
  showAddEditModal.value = true
}

const closeModal = () => {
  showAddEditModal.value = false
  showDeleteModal.value = false
  resetForm()
}

const confirmDelete = (id) => {
  AdminId.value = id
  showDeleteModal.value = !!id
}

const deleteAdmin = async () => {
  if (!AdminId.value) return
  try {
    await api.delete(`/admins/${AdminId.value}`)
    await fetchAdmins()
    AdminId.value = null
    showDeleteModal.value = false
    showToastMessage('success', 'تم حذف بيانات المدير بنجاح')
  } catch (err) {
    showToastMessage('danger', 'حدث خطأ أثناء العملية')
    console.error(err)
  }
}

// Dropdown Options
const activeUserOptions = ref(null)
const dropdownButton = ref([])
const dropdownMenu = ref([])

const toggleUserOptions = (index) => {
  activeUserOptions.value = activeUserOptions.value === index ? null : index
}

const handleClickOutside = (event) => {
  const isInsideAnyDropdown = dropdownMenu.value.some((menu) => menu?.contains(event.target))
  const isInsideAnyButton = dropdownButton.value.some((btn) => btn?.contains(event.target))
  if (!isInsideAnyDropdown && !isInsideAnyButton) {
    activeUserOptions.value = null
  }
}

// Lifecycle
onMounted(() => {
  window.addEventListener('click', handleClickOutside)
  fetchAdmins()
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>