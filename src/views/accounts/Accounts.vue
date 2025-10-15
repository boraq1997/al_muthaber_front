<template>
  <!-- Breadcrumb + Actions Wrapper -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
    <!-- Breadcrumb -->
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex flex-wrap items-center space-x-1 md:space-x-2 rtl:space-x-reverse text-xs sm:text-sm">
        <li class="inline-flex items-center">
          <a href="#" class="inline-flex items-center font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <font-awesome-icon icon="fa-solid fa-file-invoice" class="me-1 w-3 h-3 sm:w-4 sm:h-4" />
            السجلات
          </a>
        </li>
        <li>
          <div class="flex items-center">
            <font-awesome-icon icon="fa-solid fa-angle-left" class="w-3 h-3 text-gray-400 mx-1" />
            <a href="#" class="ms-1 text-xs sm:text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
              <font-awesome-icon icon="fa-solid fa-file-lines" class="me-1 w-3 h-3 sm:w-4 sm:h-4" />
              إدارة السجلات
            </a>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <font-awesome-icon icon="fa-solid fa-angle-left" class="w-3 h-3 text-gray-400 mx-1" />
            <div class="relative w-full sm:w-48">
              <input
                id="search"
                type="search"
                v-model="searchQuery"
                placeholder="البحث"
                class="w-full border text-xs sm:text-sm border-gray-300 rounded-md px-3 py-1.5 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
              />
              <font-awesome-icon
                icon="fa-solid fa-magnifying-glass"
                class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3 sm:w-4 sm:h-4"
              />
            </div>
          </div>
        </li>
      </ol>
    </nav>

    <!-- Buttons -->
    <div class="flex items-center gap-2 w-full sm:w-auto">
      <button 
        @click="openModal(false)"
        type="button"
        class="flex items-center gap-1 text-white focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-xs sm:text-sm px-4 sm:px-5 py-2 w-full sm:w-auto"
        style="background: #6f225e"
      >
        <font-awesome-icon icon="fa-solid fa-plus" class="w-3 h-3 sm:w-4 sm:h-4" />
        إضافة سجل
      </button>
    </div>
  </div>

  <!-- Table -->
  <div class="relative overflow-x-auto shadow-lg rounded-xl">
    <table class="w-full text-xs sm:text-sm text-left rtl:text-right text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800">
      <thead class="text-xs uppercase" style="background: #6f225e; color: #ffffff;">
        <tr>
          <th scope="col" class="px-2 sm:px-3 py-2 font-semibold">
            #
          </th>
          <th scope="col" class="px-2 sm:px-3 py-2 font-semibold">
            <font-awesome-icon icon="fa-solid fa-tasks" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4"/>
            نوع الإجراء
          </th>
          <th scope="col" class="px-2 sm:px-3 py-2 font-semibold">
            <font-awesome-icon icon="fa-solid fa-user-tie" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4"/>
            النوع - الاسم
          </th>
          <th scope="col" class="px-2 sm:px-3 py-2 font-semibold">
            <font-awesome-icon icon="fa-solid fa-money-bill" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4"/>
            المبلغ
          </th>
          <th scope="col" class="px-2 sm:px-3 py-2 font-semibold hidden sm:table-cell">
            <font-awesome-icon icon="fa-solid fa-note-sticky" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4"/>
            الملاحظات
          </th>
          <th scope="col" class="px-2 sm:px-3 py-2 font-semibold">
            <font-awesome-icon icon="fa-solid fa-check-circle" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4"/>
            الحالة
          </th>
          <th scope="col" class="px-2 sm:px-3 py-2 font-semibold">
            <font-awesome-icon icon="fa-solid fa-cog" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4"/>
            الإجراءات
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(account, index) in accounts" :key="account.id" class="odd:bg-white odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-600">
          <th scope="row" class="px-2 sm:px-3 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            {{  index + 1 }}
          </th>
          <td class="px-2 sm:px-3 py-2">
            {{ account.procedure_type === 1 ? 'قبض' : account.procedure_type === 2 ? 'دفع' : account.procedure_type }}
          </td>
          <td class="px-2 sm:px-3 py-2">{{ getAccountableType(account) }} - {{ account.accountable_name }}</td>
          <td class="px-2 sm:px-3 py-2">
            {{ formatCurrency(account.amount) }}
          </td>
          <td class="px-2 sm:px-3 py-2 hidden sm:table-cell">
            {{ account.note }}
          </td>
          <td class="px-2 sm:px-3 py-2">
            <div class="flex items-center">
              <div
                class="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full me-1 sm:me-2"
                :class="account.status ? 'bg-green-500' : 'bg-red-500'"
              ></div>
              {{ account.status ? 'نشط' : 'غير نشط' }}
            </div>
          </td>
          <td class="px-2 sm:px-3 py-2">
            <button
              ref="dropdownButton"
              @click="toggleUserOptions(index)"
              id="dropdownMenuIconButton"
              data-dropdown-toggle="dropdownDots"
              class="inline-flex items-center p-1 sm:p-2 text-xs sm:text-sm font-medium text-gray-900 bg-white dark:bg-gray-700 rounded-full hover:bg-blue-100 dark:hover:bg-gray-600 focus:ring-4 focus:ring-blue-200 dark:focus:ring-gray-500 transition-colors duration-200"
            >
              <font-awesome-icon icon="fa-solid fa-ellipsis" class="text-gray-600 dark:text-gray-300 w-3 h-3 sm:w-4 sm:h-4"/>
            </button>
            <!-- Dropdown menu -->
            <div
              v-show="activeUserOptions === index"
              ref="dropdownMenu"
              class="fixed left-0 z-10 mt-2 bg-white dark:bg-gray-700 rounded-lg shadow-xl w-40 divide-y divide-gray-100 dark:divide-gray-600 transform transition-all duration-300 scale-95 origin-top"
            >
              <ul class="py-1 sm:py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                <li>
                  <a href="#" @click.prevent="startEdit(account)" class="flex items-center px-3 sm:px-4 py-1 sm:py-2 hover:bg-blue-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-200">
                    <font-awesome-icon icon="fa-solid fa-pen-to-square" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4"/>
                    تعديل
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    @click.prevent="confirmDelete(account.id)"
                    class="flex items-center px-3 sm:px-4 py-1 sm:py-2 hover:bg-blue-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-200"
                  >
                    <font-awesome-icon icon="fa-solid fa-trash-can" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4"/>
                    حذف
                  </a>
                </li>
                <li>
                  <a href="#" class="flex items-center px-3 sm:px-4 py-1 sm:py-2 hover:bg-blue-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-200">
                    <font-awesome-icon icon="fa-solid fa-eye" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4"/>
                    عرض
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
  <nav class="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4" aria-label="Table navigation">
    <span class="text-xs sm:text-sm text-gray-700 dark:text-gray-400">
      عرض
      <span class="font-semibold">{{ meta.from || 0 }}</span> إلى
      <span class="font-semibold">{{ meta.to || 0 }}</span> من
      <span class="font-semibold">{{ meta.total || 0 }}</span> سجل
    </span>
    <div class="flex items-center gap-1 sm:gap-2">
      <button
        @click="changePage(links.prev)"
        :disabled="!links.prev"
        class="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        السابق
      </button>
      <button
        v-for="link in meta.links"
        :key="link.label"
        @click="changePage(link.url)"
        :disabled="!link.url || link.active"
        :class="[
          'px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-md',
          link.active
            ? 'bg-blue-600 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
        ]"
      >
        {{ link.label.includes('Previous') ? '«' : link.label.includes('Next') ? '»' : link.label }}
      </button>
      <button
        @click="changePage(links.next)"
        :disabled="!links.next"
        class="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        التالي
      </button>
    </div>
  </nav>


  <!-- Add/Edit Modal -->
  <div v-if="showAddEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div class="relative w-full max-w-[90%] sm:max-w-2xl mx-2 sm:mx-4">
      <!-- Modal Container -->
      <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            <font-awesome-icon icon="fa-solid fa-file-shield" class="mr-2 text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
            {{ isEditMode ? 'تعديل السجل' : 'إضافة سجل جديد' }}
          </h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <font-awesome-icon icon="fa-solid fa-xmark" class="text-base sm:text-lg" />
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-4 sm:p-6 space-y-4 max-h-[80vh] sm:max-h-[70vh] overflow-y-auto">
          <form>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <!-- Procedure Type -->
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">نوع الإجراء</label>
                <div class="relative">
                  <select 
                    id="procedure_type" 
                    v-model="form.procedure_type" 
                    required 
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 appearance-none"
                  >
                    <option value="" disabled selected>اختر نوع الإجراء</option>
                    <option value="1">قبض</option>
                    <option value="2">دفع</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-solid fa-tasks" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>

              <!-- Amount -->
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">المبلغ</label>
                <div class="relative">
                  <input 
                    id="amount" 
                    v-model="form.amount" 
                    type="number" 
                    min="1"
                    required
                    inputmode="numeric"
                    placeholder="المبلغ"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-solid fa-money-bill" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>

              <!-- Accountable Type -->
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  نوع الجهة المرتبطة
                </label>
                <div class="relative">
                  <select
                    v-model="form.accountable_type"
                    required
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 appearance-none"
                  >
                    <option value="" disabled>اختر النوع</option>
                    <option v-for="t in ACCOUNTABLE_TYPES" :key="t.value" :value="t.value">
                      {{ t.label }}
                    </option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-solid fa-layer-group" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>

              <!-- Accountable (name/id) -->
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  الاسم المرتبط
                </label>

                <!-- حقل بحث اختياري -->
                <input
                  type="text"
                  placeholder="ابحث بالاسم..."
                  @input="onSearchAccountable($event.target.value)"
                  class="w-full mb-2 pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                />

                <div class="relative">
                  <select
                    v-model="form.accountable_id"
                    required
                    :disabled="isLoadingAccountables || !ACCOUNTABLE_TYPES.length"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  >
                    <option value="" disabled>
                      {{ isLoadingAccountables ? 'جارِ التحميل...' : 'اختر الاسم' }}
                    </option>
                    <option v-for="opt in accountableOptions" :key="opt.id" :value="opt.id">
                      {{ opt.name }}
                    </option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-solid fa-user" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>

              <!-- Note -->
              <div class="space-y-2 col-span-1 sm:col-span-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">الملاحظات</label>
                <div class="relative">
                  <textarea 
                    id="note" 
                    v-model="form.note" 
                    type="text" 
                    required 
                    placeholder="الملاحظات"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  ></textarea>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-solid fa-note-sticky" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>

              <!-- Status -->
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">الحالة</label>
                <div class="relative flex items-center">
                  <input 
                    id="status" 
                    v-model="form.status" 
                    type="checkbox" 
                    class="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <label for="status" class="ml-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{{ form.status ? 'مفعل' : 'غير مفعل' }}</label>
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- Modal Footer -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 gap-2">
          <button
            @click="closeModal"
            type="button"
            class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
          >
            إلغاء
          </button>
          <button
            @click.prevent="handleSubmit"
            type="button"
            class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md shadow-sm hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <font-awesome-icon icon="fa-solid fa-floppy-disk" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
            {{ isEditMode ? 'حفظ التعديلات' : 'إضافة جديد' }}
          </button>
        </div>
      </div>
    </div>
  </div>


  <!-- Delete Modal -->
  <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div class="relative w-full max-w-[90%] sm:max-w-md mx-2 sm:mx-4">
      <!-- Modal Container -->
      <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            <font-awesome-icon icon="fa-solid fa-trash-can" class="mr-2 text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
            تأكيد حذف السجل
          </h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <font-awesome-icon icon="fa-solid fa-xmark" class="text-base sm:text-lg" />
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-4 sm:p-6 space-y-4 text-right">
          <div class="mx-auto text-red-500 w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
          </div>
          <h3 class="text-base sm:text-lg font-medium text-gray-900 dark:text-white">هل أنت متأكد من حذف السجل؟</h3>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            سيتم حذف جميع البيانات المرتبطة بهذا السجل بشكل دائم.
          </p>
          <p class="text-xs sm:text-sm text-red-500 dark:text-red-400">
            <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="mr-1 w-3 h-3 sm:w-4 sm:h-4" />
            لا يمكن التراجع عن هذه العملية بعد التنفيذ.
          </p>
        </div>

        <!-- Modal Footer -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 gap-2">
          <button
            @click="closeModal"
            type="button"
            class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
          >
            إلغاء
          </button>
          <button
            @click="deleteAccount"
            type="button"
            class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md shadow-sm hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
// ---------------------- Imports ----------------------
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import api from '../../services/api'
import { useToast } from '../../composables/useToast.ts'
import { formatCurrency } from "../../utils/format.ts";

// ---------------------- Toast ----------------------
const { showToastMessage } = useToast()

// ---------------------- Form ----------------------
const form = ref({
  procedure_type: '',
  amount: '',
  note: '',
  status: false,
  accountable_id: 5,
  accountable_type: "App\\Models\\Student",
  accountable_name: null
})

const accountId = ref(null)
const isEditMode = ref(false)

const resetForm = () => {
  form.value = {
    procedure_type: '',
    amount: '',
    note: '',
    status: false,
    accountable_id: 5,
    accountable_type: "App\\Models\\Student",
    accountable_name: null
  }
  accountId.value = null
  isEditMode.value = false
}

const startEdit = (account) => {
  form.value = {
    procedure_type: account.procedure_type,
    amount: account.amount,
    note: account.note,
    status: Boolean(account.status),
    accountable_id: account.accountable_id,
    accountable_type: account.accountable_type,
    accountable_name: account.accountable_name
  }
  accountId.value = account.id
  openModal(true)
}

const handleSubmit = async () => {
  try {
    const payload = {
      procedure_type: Number(form.value.procedure_type),
      accountable_id: Number(form.value.accountable_id),
      accountable_type: form.value.accountable_type,
      amount: Number(form.value.amount),
      note: form.value.note || null,
      status: !!form.value.status,
    }

    if (isEditMode.value) {
      await api.put(`/accounts/${accountId.value}`, payload)
    } else {
      await api.post('/accounts', payload)
    }

    await fetchAccounts(currentPage.value)
    closeModal()
    showToastMessage('success', isEditMode.value ? 'تم تعديل السجل بنجاح' : 'تمت إضافة السجل بنجاح')
    resetForm()
  } catch (err) {
    showToastMessage('danger', err.response?.data?.message || 'حدث خطأ أثناء العملية')
    console.error(err)
  } finally {
    fetchAccounts();
  }
}

// ---------------------- Data ----------------------
const accounts = ref([])
const currentPage = ref(1)
const perPage = ref(15) // Ensure perPage is initialized as an integer
const totalAccounts = ref(0)
const meta = ref({})
const links = ref({})
const isLoading = ref(false)
const searchQuery = ref('')
let searchTimer = null

const fetchAccounts = async (page = 1) => {
  isLoading.value = true
  try {
    const params = {
      page,
      per_page: Number(perPage.value), // Explicitly cast to integer
    }
    if (searchQuery.value) {
      params['filter[accountable_name]'] = searchQuery.value
    }
    const response = await api.get('/accounts', { params })
    accounts.value = response.data.data
    meta.value = response.data.meta
    links.value = response.data.links
    currentPage.value = response.data.meta.current_page || 1
    perPage.value = Number(response.data.meta.per_page) || 15 // Ensure perPage is updated as an integer
    totalAccounts.value = response.data.meta.total || 0
  } catch (err) {
    showToastMessage('danger', err.response?.data?.message || 'حدث خطأ أثناء جلب السجلات')
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const ACCOUNTABLE_TYPES = [
  { label: 'طالب', value: 'App\\Models\\Student', api: '/students' },
  { label: 'مدير موقع', value: 'App\\Models\\Admin', api: '/admins' },
  { label: 'استاذ', value: 'App\\Models\\Teacher', api: '/teachers' },
]

const accountableOptions = ref([])
const isLoadingAccountables = ref(false)

const currentType = () =>
  ACCOUNTABLE_TYPES.find(t => t.value === form.value.accountable_type)

const loadAccountables = async (search = '') => {
  const type = currentType()
  if (!type) { accountableOptions.value = []; return }

  isLoadingAccountables.value = true
  try {
    const res = await api.get(type.api, {
      params: {
        'filter[FullName]': search,
        per_page: 20
      }
    })
    const items = res.data?.data ?? res.data ?? []
    accountableOptions.value = items.map((i) => ({
      id: i.id,
      name: i.FullName || i.name || i.full_name || `#${i.id}`,
    }))
  } catch (e) {
    showToastMessage('danger', 'تعذر جلب قائمة الأسماء')
    console.error(e)
  } finally {
    isLoadingAccountables.value = false
  }
}

watch(() => form.value.accountable_type, () => {
  form.value.accountable_id = ''
  form.value.accountable_name = null
  loadAccountables()
})

const onSearchAccountable = (q) => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => loadAccountables(q), 300)
}

const getAccountableType = (account) => {
  const type = account.accountable_type.split('\\').pop()
  switch (type) {
    case 'Admin':
      return 'مدير'
    case 'Student':
      return 'طالب'
    case 'Teacher':
      return 'أستاذ'
    default:
      return type
  }
}

// ---------------------- Search ----------------------
watch(searchQuery, (newQuery) => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    currentPage.value = 1
    fetchAccounts(1)
  }, 300)
})

// ---------------------- Pagination ----------------------
const changePage = (url) => {
  if (!url) return
  const page = new URL(url).searchParams.get('page')
  if (page && page !== currentPage.value.toString()) {
    fetchAccounts(page)
  }
}

// ---------------------- Modals ----------------------
const showAddEditModal = ref(false)
const showDeleteModal = ref(false)

const openModal = (editMode = false) => {
  isEditMode.value = editMode
  if (!editMode) resetForm()
  showAddEditModal.value = true
}

const closeModal = () => {
  showAddEditModal.value = false
  showDeleteModal.value = false
}

const confirmDelete = (id) => {
  accountId.value = id
  showDeleteModal.value = !!id
}

const deleteAccount = async () => {
  if (!accountId.value) return
  try {
    await api.delete(`/accounts/${accountId.value}`)
    await fetchAccounts(currentPage.value)
    accountId.value = null
    showDeleteModal.value = false
    showToastMessage('success', 'تم حذف السجل بنجاح')
  } catch (err) {
    showToastMessage('danger', 'حدث خطأ أثناء العملية')
    console.error(err)
  } finally {
    fetchAccounts();
  }
}

// ---------------------- Dropdown Options ----------------------
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

// ---------------------- Lifecycle ----------------------
onMounted(() => {
  window.addEventListener('click', handleClickOutside)
  fetchAccounts()
  loadAccountables()
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Scrollbar Styling */
.scrollbar-thin {
  scrollbar-width: thin;
}
.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.dark .scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #6b7280;
}
.dark .scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

/* Fade-In Animation for Modals */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Dropdown Animation */
@keyframes dropdown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-dropdown {
  animation: dropdown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Responsive Adjustments */
@media (max-width: 640px) {
  .container {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .text-xs {
    font-size: 0.65rem;
  }
  .px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .py-1\.5 {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
  }
  .w-36 {
    width: 32vw;
  }
  .sm\:table-cell {
    display: none;
  }
}

@media (max-width: 480px) {
  .container {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
  .text-xs {
    font-size: 0.6rem;
  }
  .px-2 {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
  .py-1 {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
  .w-36 {
    width: 40vw;
  }
}

@media (min-width: 640px) and (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .text-sm {
    font-size: 0.875rem;
  }
}
</style>