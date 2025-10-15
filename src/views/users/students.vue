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
              <font-awesome-icon icon="fa-solid fa-user-graduate" class="me-1 w-3 h-3 sm:w-4 sm:h-4" />
              الطلاب
            </a>
          </div>
        </li>
        <li>
          <div class="flex items-center mt-2 sm:mt-0">
            <font-awesome-icon icon="fa-solid fa-angle-left" class="w-3 h-3 text-gray-400 mx-1 hidden sm:block" />
            <div class="relative w-full sm:w-48">
              <input
                id="search"
                type="search"
                v-model="searchQuery"
                @input="debouncedSearch"
                placeholder="البحث بالاسم أو رقم الهاتف"
                required
                class="w-full border text-xs sm:text-sm border-gray-300 rounded-md px-3 py-1 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
              />
              <font-awesome-icon
                icon="fa-magnifying-glass"
                class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3 sm:w-4 sm:h-4"
              />
            </div>
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
        إضافة طالب
      </button>
    </div>
  </div>

  <!-- Loading Indicator -->
  <div v-if="isLoading" class="text-center py-4">
    <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-purple-600 w-6 h-6" />
  </div>

  <!-- Table -->
  <div v-else class="relative overflow-x-auto shadow-lg rounded-xl">
    <table class="w-full text-xs sm:text-sm text-left rtl:text-right text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800">
      <thead class="text-xs text-white uppercase" style="background: #6f225e">
        <tr>
          <th scope="col" class="px-2 sm:px-3 py-2 font-semibold">#</th>
          <th scope="col" class="px-2 sm:px-3 py-2 font-semibold">
            <font-awesome-icon icon="fa-solid fa-user" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
            الاسم
          </th>
          <th scope="col" class="px-2 sm:px-3 py-2 font-semibold hidden sm:table-cell">
            <font-awesome-icon icon="fa-solid fa-location-dot" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
            العنوان
          </th>
          <th scope="col" class="px-2 sm:px-3 py-2 font-semibold">
            <font-awesome-icon icon="fa-solid fa-phone" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
            رقم الهاتف
          </th>
          <th scope="col" class="px-2 sm:px-3 py-2 font-semibold hidden sm:table-cell">
            <font-awesome-icon icon="fa-solid fa-phone" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
            رقم هاتف ولي الأمر
          </th>
          <th scope="col" class="px-2 sm:px-3 py-2 font-semibold">
            <font-awesome-icon icon="fa-solid fa-users-viewfinder" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
            المرحلة
          </th>
          <th scope="col" class="px-2 sm:px-3 py-2 font-semibold hidden sm:table-cell">
            <font-awesome-icon icon="fa-solid fa-school" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
            المعهد
          </th>
          <th scope="col" class="px-2 sm:px-3 py-2 font-semibold">
            <font-awesome-icon icon="fa-solid fa-signal" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
            الحالة
          </th>
          <th scope="col" class="px-2 sm:px-3 py-2 font-semibold">
            <font-awesome-icon icon="fa-solid fa-user-gear" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
            الإدارة
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(student, index) in students"
          :key="student.id"
          class="odd:bg-white odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-600"
        >
          <th scope="row" class="px-2 sm:px-3 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            {{ (currentPage - 1) * perPage + index + 1 }}
          </th>
          <td class="px-2 sm:px-3 py-2">{{ student.FullName }}</td>
          <td class="px-2 sm:px-3 py-2 hidden sm:table-cell">{{ student.Address }}</td>
          <td class="px-2 sm:px-3 py-2">{{ student.phoneNumber }}</td>
          <td class="px-2 sm:px-3 py-2 hidden sm:table-cell">{{ student.Parent_phone_number }}</td>
          <td class="px-2 sm:px-3 py-2">{{ student.stage_name }}</td>
          <td class="px-2 sm:px-3 py-2 hidden sm:table-cell">{{ student.institute_name }}</td>
          <td class="px-2 sm:px-3 py-2">
            <div class="flex items-center">
              <div
                class="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full me-1 sm:me-2"
                :class="student.is_active ? 'bg-red-500' : 'bg-green-500'"
              ></div>
              {{ student.is_active ? 'غير نشط' : 'نشط' }}
            </div>
          </td>
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
                    @click.prevent="startEdit(student)"
                    class="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-blue-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-200"
                  >
                    <font-awesome-icon icon="fa-solid fa-user-edit" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                    تعديل
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    @click.prevent="confirmDelete(student.id)"
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

  <!-- Pagination -->
  <nav v-if="meta.links && Array.isArray(meta.links)" class="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4" aria-label="Table navigation">
    <span class="text-xs sm:text-sm text-gray-700 dark:text-gray-400">
      عرض
      <span class="font-semibold">{{ meta.from || 0 }}</span> إلى
      <span class="font-semibold">{{ meta.to || 0 }}</span> من
      <span class="font-semibold">{{ meta.total || 0 }}</span> سجل
    </span>
    <div class="flex items-center gap-1 sm:gap-2 flex-wrap">
      <button
        @click="changePage(links.prev)"
        :disabled="!links.prev"
        class="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        السابق
      </button>
      <button
        v-for="link in meta.links.slice(1, -1)"
        :key="link.label"
        @click="changePage(link.url)"
        :disabled="!link.url || link.active"
        :class="[
          'px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md',
          link.active
            ? 'bg-blue-600 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
        ]"
      >
        {{ link.label }}
      </button>
      <button
        @click="changePage(links.next)"
        :disabled="!links.next"
        class="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        التالي
      </button>
    </div>
  </nav>
  <div v-else class="text-xs sm:text-sm text-gray-700 dark:text-gray-400 mt-4">
    لا توجد بيانات تصفح متاحة
  </div>

  <!-- Add/Edit Modal -->
  <div v-if="showAddEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div class="relative w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl mx-4">
      <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            <font-awesome-icon icon="fa-solid fa-user-plus" class="mr-2 text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
            {{ isEditMode ? 'تعديل بيانات الطالب' : 'إضافة طالب جديد' }}
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
                    id="full_name"
                    v-model="form.FullName"
                    type="text"
                    required
                    placeholder="الاسم الرباعي"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    :class="errors.FullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-transparent'"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-user" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <p v-if="errors.FullName" class="text-red-500 text-xs mt-1">{{ errors.FullName }}</p>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">الاسم الرباعي للطالب</p>
              </div>

              <!-- Address -->
              <div class="space-y-2 col-span-1 sm:col-span-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">العنوان</label>
                <div class="relative">
                  <input
                    id="address"
                    v-model="form.Address"
                    type="text"
                    required
                    placeholder="العنوان"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    :class="errors.Address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-transparent'"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-location-dot" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <p v-if="errors.Address" class="text-red-500 text-xs mt-1">{{ errors.Address }}</p>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">العنوان الخاص بالطالب</p>
              </div>

              <!-- Phone Number -->
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">رقم الهاتف</label>
                <div class="relative">
                  <input
                    id="phone_number"
                    v-model="form.phoneNumber"
                    type="text"
                    required
                    placeholder="رقم الهاتف"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    :class="errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-transparent'"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-phone" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <p v-if="errors.phoneNumber" class="text-red-500 text-xs mt-1">{{ errors.phoneNumber }}</p>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">رقم الهاتف الخاص بالطالب<span class="text-yellow-600">(*يجب أن يكون 11 رقمًا)</span></p>
              </div>

              <!-- Parent Phone Number -->
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">رقم هاتف ولي الأمر</label>
                <div class="relative">
                  <input
                    id="parent_phone_number"
                    v-model="form.Parent_phone_number"
                    type="text"
                    required
                    placeholder="رقم هاتف ولي الأمر"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    :class="errors.Parent_phone_number ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-transparent'"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-phone" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <p v-if="errors.Parent_phone_number" class="text-red-500 text-xs mt-1">{{ errors.Parent_phone_number }}</p>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">رقم الهاتف الخاص بولي الأمر<span class="text-yellow-600">( * يجب أن يكون 11 رقمًا)</span></p>
              </div>

              <!-- Password -->
              <div class="space-y-2 col-span-1 sm:col-span-2">
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
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">كلمة المرور الخاصة بتسجيل الدخول<span class="text-yellow-600">(*يجب أن تكون أكثر من 6 خانات)</span></p>
              </div>

              <!-- Institute -->
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">المعهد</label>
                <div class="relative">
                  <select
                    v-model="form.Institute_id"
                    id="institute"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    :class="errors.Institute_id ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-transparent'"
                  >
                    <option value="" disabled selected>اختر المعهد</option>
                    <option v-for="item in institutes" :key="item.id" :value="item.id">{{ item.name }}</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-school" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <p v-if="errors.Institute_id" class="text-red-500 text-xs mt-1">{{ errors.Institute_id }}</p>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">المعهد الذي ينتمي إليه الطالب</p>
              </div>

              <!-- Stage -->
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">المرحلة</label>
                <div class="relative">
                  <select
                    v-model="form.Stage_id"
                    id="stage"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    :class="errors.Stage_id ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-transparent'"
                  >
                    <option value="" disabled selected>اختر المرحلة</option>
                    <option v-for="item in stages" :key="item.id" :value="item.id">{{ item.name }}</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-book" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <p v-if="errors.Stage_id" class="text-red-500 text-xs mt-1">{{ errors.Stage_id }}</p>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">المرحلة التي ينتمي إليها الطالب</p>
              </div>

              <!-- Is Active -->
              <div class="space-y-2 col-span-1 sm:col-span-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">الحالة</label>
                <div class="relative">
                  <input
                    id="is_active"
                    v-model="form.Is_active"
                    type="checkbox"
                    class="h-4 sm:h-5 w-4 sm:w-5 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <label for="is_active" class="ml-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{{ form.Is_active ? 'نشط' : 'غير نشط' }}</label>
                </div>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">حالة الطالب<span class="text-yellow-600">( * في حال كان غير مفعل لن يتمكن من تسجيل الدخول)</span></p>
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
            <font-awesome-icon icon="fa-solid fa-user-minus" class="mr-2 text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
            تأكيد حذف الطالب
          </h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <font-awesome-icon icon="fa-solid fa-times" class="text-base sm:text-lg" />
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-4 sm:p-6 space-y-4 text-center">
          <div class="mx-auto text-red-500 w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
          </div>
          <h3 class="text-base sm:text-lg font-medium text-gray-900 dark:text-white">هل أنت متأكد من حذف بيانات الطالب؟</h3>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            سيتم حذف جميع البيانات المرتبطة بهذا الطالب بشكل دائم، بما في ذلك جميع السجلات والإعدادات الخاصة به.
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
            @click="deleteStudent"
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
import { ref, onMounted, onBeforeUnmount } from 'vue';
import api from '../../services/api';
import { useToast } from '../../composables/useToast.ts';
import { debounce } from 'lodash'; // استيراد debounce من lodash

// Toast
const { showToastMessage } = useToast();

// Form
const form = ref({
  FullName: '',
  Address: '',
  phoneNumber: '',
  Parent_phone_number: '',
  Institute_id: '',
  Stage_id: '',
  password: '',
  Is_active: false,
});

const errors = ref({
  FullName: '',
  Address: '',
  phoneNumber: '',
  Parent_phone_number: '',
  Institute_id: '',
  Stage_id: '',
  password: '',
});

const studentId = ref(null);
const isEditMode = ref(false);
const isLoading = ref(false);

// البحث
const searchQuery = ref('');

// دالة البحث مع debounce
const debouncedSearch = debounce(() => {
  fetchStudents(1); // إعادة جلب الطلاب مع الفلتر عند كل تغيير في البحث
}, 500);

// Data
const students = ref([]);
const institutes = ref([]);
const stages = ref([]);
const currentPage = ref(1);
const perPage = ref(15);
const totalRecords = ref(0);
const meta = ref({ links: [], from: 0, to: 0, total: 0 });
const links = ref({ prev: null, next: null });

const fetchStudents = async (page = 1) => {
  isLoading.value = true;
  try {
    // بناء معلمات الاستعلام
    const queryParams = new URLSearchParams();
    queryParams.append('page', page.toString());
    if (searchQuery.value) {
      // البحث في FullName أو PhoneNumber
      queryParams.append('filter[FullName]', searchQuery.value);
      // يمكن إضافة فلتر لـ PhoneNumber إذا أردت البحث فيه أيضًا
      // queryParams.append('filter[PhoneNumber]', searchQuery.value);
    }

    const response = await api.get(`/students?${queryParams.toString()}`);
    students.value = response.data.data || [];
    meta.value = response.data.meta || { links: [], from: 0, to: 0, total: 0 };
    links.value = response.data.links || { prev: null, next: null };
    currentPage.value = response.data.meta?.current_page || 1;
    perPage.value = response.data.meta?.per_page || 15;
    totalRecords.value = response.data.meta?.total || 0;
  } catch (err) {
    showToastMessage('danger', err.response?.data?.message || 'حدث خطأ أثناء جلب بيانات الطلاب');
    console.error(err);
    students.value = [];
    meta.value = { links: [], from: 0, to: 0, total: 0 };
    links.value = { prev: null, next: null };
  } finally {
    isLoading.value = false;
  }
};

const getInstitutes = async () => {
  try {
    const response = await api.get('/institutes');
    institutes.value = response.data.data || [];
  } catch (err) {
    showToastMessage('danger', 'حدث خطأ أثناء جلب المعاهد');
    console.error(err);
  }
};

const getStages = async () => {
  try {
    const response = await api.get('/stages');
    stages.value = response.data.data || [];
  } catch (err) {
    showToastMessage('danger', 'حدث خطأ أثناء جلب المراحل');
    console.error(err);
  }
};

// Pagination
const changePage = (url) => {
  if (!url) return;
  const page = new URL(url).searchParams.get('page');
  if (page && page !== currentPage.value.toString()) {
    fetchStudents(page);
  }
};

// Modals
const showAddEditModal = ref(false);
const showDeleteModal = ref(false);

const openModal = async (editMode = false) => {
  isEditMode.value = editMode;
  if (!editMode) resetForm();
  showAddEditModal.value = true;
  await Promise.all([getInstitutes(), getStages()]);
};

const closeModal = () => {
  showAddEditModal.value = false;
  showDeleteModal.value = false;
  resetForm();
};

const confirmDelete = (id) => {
  studentId.value = id;
  showDeleteModal.value = !!id;
};

const deleteStudent = async () => {
  if (!studentId.value) return;
  try {
    await api.delete(`/students/${studentId.value}`);
    await fetchStudents(currentPage.value);
    studentId.value = null;
    showDeleteModal.value = false;
    showToastMessage('success', 'تم حذف بيانات الطالب بنجاح');
  } catch (err) {
    showToastMessage('danger', 'حدث خطأ أثناء العملية');
    console.error(err);
  }
};

// Dropdown Options
const activeUserOptions = ref(null);
const dropdownButton = ref([]);
const dropdownMenu = ref([]);

const toggleUserOptions = (index) => {
  activeUserOptions.value = activeUserOptions.value === index ? null : index;
};

const handleClickOutside = (event) => {
  const isInsideAnyDropdown = dropdownMenu.value.some((menu) => menu?.contains(event.target));
  const isInsideAnyButton = dropdownButton.value.some((btn) => btn?.contains(event.target));
  if (!isInsideAnyDropdown && !isInsideAnyButton) {
    activeUserOptions.value = null;
  }
};

// Form Handling
const resetForm = () => {
  form.value = {
    FullName: '',
    Address: '',
    phoneNumber: '',
    Parent_phone_number: '',
    Institute_id: '',
    Stage_id: '',
    password: '',
    Is_active: false,
  };
  errors.value = {
    FullName: '',
    Address: '',
    phoneNumber: '',
    Parent_phone_number: '',
    Institute_id: '',
    Stage_id: '',
    password: '',
  };
  studentId.value = null;
  isEditMode.value = false;
};

const startEdit = (student) => {
  form.value = {
    FullName: student.FullName,
    Address: student.Address,
    phoneNumber: student.phoneNumber,
    Parent_phone_number: student.Parent_phone_number,
    Institute_id: student.Institute_id,
    Stage_id: student.Stage_id,
    password: '',
    Is_active: Boolean(student.Is_active),
  };
  errors.value = {
    FullName: '',
    Address: '',
    phoneNumber: '',
    Parent_phone_number: '',
    Institute_id: '',
    Stage_id: '',
    password: '',
  };
  studentId.value = student.id;
  openModal(true);
};

const validateForm = () => {
  let isValid = true;
  errors.value = {
    FullName: '',
    Address: '',
    phoneNumber: '',
    Parent_phone_number: '',
    Institute_id: '',
    Stage_id: '',
    password: '',
  };

  if (!form.value.FullName) {
    errors.value.FullName = 'الاسم الرباعي مطلوب';
    isValid = false;
  }
  if (!form.value.Address) {
    errors.value.Address = 'العنوان مطلوب';
    isValid = false;
  }
  if (!form.value.phoneNumber) {
    errors.value.phoneNumber = 'رقم الهاتف مطلوب';
    isValid = false;
  }
  if (!form.value.Parent_phone_number) {
    errors.value.Parent_phone_number = 'رقم هاتف ولي الأمر مطلوب';
    isValid = false;
  }
  if (!isEditMode.value && !form.value.password) {
    errors.value.password = 'كلمة المرور مطلوبة';
    isValid = false;
  } else if (!isEditMode.value && form.value.password.length < 6) {
    errors.value.password = 'كلمة المرور يجب أن تكون 6 خانات على الأقل';
    isValid = false;
  }
  if (!form.value.Institute_id) {
    errors.value.Institute_id = 'المعهد مطلوب';
    isValid = false;
  }
  if (!form.value.Stage_id) {
    errors.value.Stage_id = 'المرحلة مطلوبة';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    const payload = {
      FullName: form.value.FullName,
      Address: form.value.Address,
      phoneNumber: form.value.phoneNumber,
      Parent_phone_number: form.value.Parent_phone_number,
      Institute_id: form.value.Institute_id,
      Stage_id: form.value.Stage_id,
      Is_active: form.value.Is_active,
    };
    if (form.value.password) {
      payload.password = form.value.password;
    }

    if (isEditMode.value) {
      await api.put(`/students/${studentId.value}`, payload);
    } else {
      await api.post('/students', payload);
    }

    await fetchStudents(currentPage.value);
    closeModal();
    showToastMessage('success', isEditMode.value ? 'تم تعديل بيانات الطالب بنجاح' : 'تمت إضافة بيانات الطالب بنجاح');
    resetForm();
  } catch (err) {
    if (err.response && err.response.status === 422) {
      const apiErrors = err.response.data.errors;
      if (apiErrors.phoneNumber) {
        errors.value.phoneNumber = 'رقم الهاتف موجود مسبقًا';
      }
      if (apiErrors.Parent_phone_number) {
        errors.value.Parent_phone_number = 'رقم هاتف ولي الأمر موجود مسبقًا';
      }
      showToastMessage('danger', 'حدث خطأ في التحقق من البيانات');
    } else {
      showToastMessage('danger', err.response?.data?.message || 'حدث خطأ أثناء العملية');
    }
    console.error(err);
  }
};

// Lifecycle
onMounted(() => {
  window.addEventListener('click', handleClickOutside);
  fetchStudents();
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>