<template>
  <div class="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
    <!-- Tabs Header -->
    <div class="mb-4 sm:mb-6 border-b-2 border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <!-- Tabs List -->
      <ul
        class="flex flex-wrap overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent -mb-px text-xs sm:text-sm font-semibold text-center"
        id="courses-tab"
        role="tablist"
      >
        <li
          v-for="course in courses"
          :key="course.id"
          class="me-1 sm:me-2"
          role="presentation"
        >
          <button
            class="relative inline-block px-3 sm:px-6 py-2 sm:py-3 border-b-2 transition-all duration-300 ease-in-out text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            :id="`tab-${course.id}`"
            :class="{
              'text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400': selectedCourse?.id === course.id,
              'border-transparent hover:border-indigo-200 dark:hover:border-indigo-700': selectedCourse?.id !== course.id
            }"
            @click="selectCourse(course)"
            type="button"
            role="tab"
            :aria-selected="selectedCourse?.id === course.id"
            :aria-controls="`content-${course.id}`"
          >
            {{ course.CourseName }}
            <span
              v-if="selectedCourse?.id === course.id"
              class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 dark:bg-indigo-400 transform scale-x-100 transition-transform duration-400 ease-out"
            ></span>
          </button>
        </li>
      </ul>

      <button
        @click="openAddCourseModel"
        class="relative bg-gradient-to-r rounded-lg from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-4 sm:px-6 py-2 shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 dark:focus:ring-indigo-400/50 w-full sm:w-auto"
        style="background: #6f225e"
        aria-label="إضافة دورة جديدة"
      >
        <font-awesome-icon icon="fa-solid fa-plus" class="me-1 sm:me-2 w-3 h-3 sm:w-4 sm:h-4" />
        إضافة دورة
      </button>
    </div>

    <!-- Tabs Content -->
    <div id="course-tab-content">
      <div
        v-for="course in courses"
        :key="`content-${course.id}`"
        v-show="selectedCourse?.id === course.id"
        class="space-y-6 sm:space-y-8 animate-fade-in"
        role="tabpanel"
        :aria-labelledby="`tab-${course.id}`"
      >
        <!-- Course Info Card -->
        <div class="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-lg sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-gray-100/20 dark:border-gray-800/20 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-indigo-50/10 to-purple-50/10 dark:from-indigo-900/10 dark:to-purple-900/10 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative flex flex-col gap-4">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-slide-in" style="--animation-delay: 0ms">
              <h2 class="text-lg sm:text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {{ course.CourseName }}
              </h2>
              <div class="flex space-x-2">
                <button
                  @click="openEditCourseModal(course)"
                  class="relative bg-gradient-to-r rounded-lg from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-4 sm:px-6 py-2 shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 dark:focus:ring-indigo-400/50"
                  aria-label="تعديل بيانات الدورة"
                  style="background: #6f225e"
                >
                  <font-awesome-icon icon="fa-solid fa-pen-to-square" class="me-1 sm:me-2 w-3 h-3 sm:w-4 sm:h-4" />
                  <span class="relative z-10">تعديل</span>
                </button>
                <button
                  @click="openDeleteCourseModal(course)"
                  class="relative bg-gradient-to-r rounded-lg from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-4 sm:px-6 py-2 shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/50 dark:focus:ring-red-400/50"
                  aria-label="حذف الدورة"
                >
                  <font-awesome-icon icon="fa-solid fa-trash-can" class="me-1 sm:me-2 w-3 h-3 sm:w-4 sm:h-4" />
                  <span class="relative z-10">حذف</span>
                </button>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-200 animate-slide-in" style="--animation-delay: 100ms">
              <div class="flex items-center space-x-2 sm:space-x-3 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                <font-awesome-icon icon="fa-solid fa-book" class="text-indigo-500 dark:text-indigo-400 w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 hover:scale-110" />
                <span><strong class="font-semibold text-gray-800 dark:text-gray-100">المادة:</strong> {{ course.subject_name }}</span>
              </div>
              <div class="hidden sm:block h-4 sm:h-6 border-l border-gray-200 dark:border-gray-700"></div>
              <div class="flex items-center space-x-2 sm:space-x-3 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                <font-awesome-icon icon="fa-solid fa-building" class="text-indigo-500 dark:text-indigo-400 w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 hover:scale-110" />
                <span><strong class="font-semibold text-gray-800 dark:text-gray-100">المعهد:</strong> {{ course.institute_name }}</span>
              </div>
              <div class="hidden sm:block h-4 sm:h-6 border-l border-gray-200 dark:border-gray-700"></div>
              <div class="flex items-center space-x-2 sm:space-x-3 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                <font-awesome-icon icon="fa-solid fa-layer-group" class="text-indigo-500 dark:text-indigo-400 w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 hover:scale-110" />
                <span><strong class="font-semibold text-gray-800 dark:text-gray-100">المرحلة:</strong> {{ course.stage_name }}</span>
              </div>
              <div class="hidden sm:block h-4 sm:h-6 border-l border-gray-200 dark:border-gray-700"></div>
              <div class="flex items-center space-x-2 sm:space-x-3 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                <font-awesome-icon icon="fa-solid fa-chalkboard-teacher" class="text-indigo-500 dark:text-indigo-400 w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 hover:scale-110" />
                <span><strong class="font-semibold text-gray-800 dark:text-gray-100">المدرس:</strong> {{ course.teacher_name }}</span>
              </div>
              <div class="hidden sm:block h-4 sm:h-6 border-l border-gray-200 dark:border-gray-700"></div>
              <div class="flex items-center space-x-2 sm:space-x-3 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                <font-awesome-icon icon="fa-solid fa-calendar" class="text-indigo-500 dark:text-indigo-400 w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 hover:scale-110" />
                <span><strong class="font-semibold text-gray-800 dark:text-gray-100">التاريخ:</strong> {{ course.Course_date }}</span>
              </div>
              <div class="hidden sm:block h-4 sm:h-6 border-l border-gray-200 dark:border-gray-700"></div>
              <div class="flex items-center space-x-2 sm:space-x-3 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                <font-awesome-icon icon="fa-solid fa-money-bill" class="text-indigo-500 dark:text-indigo-400 w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 hover:scale-110" />
                <span><strong class="font-semibold text-gray-800 dark:text-gray-100">السعر:</strong> {{ formatCurrency(course.Course_price) }} دينار</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Units Card -->
        <div class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-lg sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg transition-all duration-500 hover:shadow-xl border border-gray-100/20 dark:border-gray-800/20">
          <div class="flex items-center justify-between mb-4 sm:mb-6">
            <h3 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white animate-slide-in" style="--animation-delay: 0ms">
              الوحدات المرتبطة بالدورة
            </h3>
            <button
              @click="openAddUnitModal"
              class="relative bg-gradient-to-r rounded-lg from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-4 sm:px-6 py-2 shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 dark:focus:ring-indigo-400/50"
              aria-label="إضافة وحدة جديدة"
              style="background: #6f225e"
            >
              <font-awesome-icon icon="fa-solid fa-plus" class="me-1 sm:me-2 w-3 h-3 sm:w-4 sm:h-4" />
              <span class="relative z-10">إضافة وحدة</span>
            </button>
          </div>

          <div v-if="units.length" class="flex flex-col md:flex-row gap-4 sm:gap-6">
            <ul class="flex-column space-y-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 md:mb-0 w-full md:w-56 lg:w-64">
              <li v-for="unit in units" :key="unit.id">
                <button
                  @click="selectUnit(unit)"
                  class="inline-flex items-center px-3 sm:px-4 py-2 sm:py-3 w-full rounded-lg transition-all duration-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 unit-button"
                  :class="{
                    'bg-indigo-600 text-white dark:bg-indigo-500': selectedUnit?.id === unit.id,
                    'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300': selectedUnit?.id !== unit.id
                  }"
                  :aria-pressed="selectedUnit?.id === unit.id"
                >
                  <font-awesome-icon icon="fa-solid fa-object-group" class="me-2 sm:me-3 w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 hover:scale-110" />
                  {{ unit.unitName }}
                </button>
              </li>
            </ul>

            <div class="p-4 sm:p-6 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg w-full transition-all duration-300 animate-slide-in" style="--animation-delay: 100ms">
              <div v-if="selectedUnit">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                    {{ selectedUnit.unitName }}
                  </h4>
                  <div class="relative">
                    <button
                      @click="toggleUnitDropdown"
                      class="flex items-center px-2 sm:px-3 py-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                      :aria-expanded="openUnitDropdown"
                      aria-haspopup="true"
                      aria-controls="unit-dropdown"
                    >
                      <font-awesome-icon icon="fa-solid fa-ellipsis-v" class="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <div
                      v-if="openUnitDropdown"
                      id="unit-dropdown"
                      class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-100/20 dark:border-gray-800/20 z-10 animate-dropdown"
                    >
                      <ul class="py-1 text-xs sm:text-sm text-gray-700 dark:text-gray-200" role="menu">
                        <li role="menuitem">
                          <button
                            @click="openEditUnitModal(selectedUnit)"
                            class="w-full text-right px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors duration-200"
                          >
                            <font-awesome-icon icon="fa-solid fa-pen-to-square" class="me-2 w-4 h-4" />
                            تعديل الوحدة
                          </button>
                        </li>
                        <li role="menuitem">
                          <button
                            @click="openDeleteUnitModal(selectedUnit)"
                            class="w-full text-right px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors duration-200"
                          >
                            <font-awesome-icon icon="fa-solid fa-trash-can" class="me-2 w-4 h-4" />
                            حذف الوحدة
                          </button>
                        </li>
                        <li role="menuitem">
                          <button
                            @click="openAddLectureModal"
                            class="w-full text-right px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors duration-200"
                          >
                            <font-awesome-icon icon="fa-solid fa-plus" class="me-2 w-4 h-4" />
                            إضافة درس
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                  {{ selectedUnit.unitName }}
                </p>

                <div v-if="lectures.length" class="space-y-4">
                  <h5 class="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    الدروس المرتبطة بالوحدة
                  </h5>
                  <ul class="space-y-3 text-xs sm:text-sm text-gray-600 dark:text-gray-200" role="list">
                    <li
                      v-for="lecture in lectures"
                      :key="lecture.id"
                      class="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-all duration-300"
                      role="listitem"
                    >
                      <div class="flex items-center space-x-2 sm:space-x-3">
                        <font-awesome-icon icon="fa-solid fa-video" class="text-indigo-500 dark:text-indigo-400 w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 hover:scale-110" />
                        <span>{{ lecture.lecttTitle || 'درس بدون عنوان' }}</span>
                        <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                          ({{ lecture.attachments?.length || 0 }} ملفات)
                        </span>
                      </div>
                      <div class="relative">
                        <button
                          @click="toggleDropdown(lecture.id)"
                          class="flex items-center px-2 sm:px-3 py-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                          :aria-expanded="openDropdown === lecture.id"
                          aria-haspopup="true"
                          :aria-controls="`dropdown-${lecture.id}`"
                        >
                          <font-awesome-icon icon="fa-solid fa-ellipsis-v" class="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <div
                          v-if="openDropdown === lecture.id"
                          :id="`dropdown-${lecture.id}`"
                          class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-100/20 dark:border-gray-800/20 z-10 animate-dropdown"
                        >
                          <ul class="py-1 text-xs sm:text-sm text-gray-700 dark:text-gray-200" role="menu">
                            <li role="menuitem">
                              <button
                                @click="openEditLectureModal(lecture)"
                                class="w-full text-right px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors duration-200"
                              >
                                <font-awesome-icon icon="fa-solid fa-pen-to-square" class="me-2 w-4 h-4" />
                                تعديل
                              </button>
                            </li>
                            <li role="menuitem">
                              <button
                                @click="openDeleteLectureModal(lecture)"
                                class="w-full text-right px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors duration-200"
                              >
                                <font-awesome-icon icon="fa-solid fa-trash-can" class="me-2 w-4 h-4" />
                                حذف
                              </button>
                            </li>
                            <li role="menuitem">
                              <button
                                @click="openShowLectureModal(lecture)"
                                class="w-full text-right px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors duration-200"
                              >
                                <font-awesome-icon icon="fa-solid fa-eye" class="me-2 w-4 h-4" />
                                عرض التفاصيل
                              </button>
                            </li>
                            <li role="menuitem">
                              <button
                                @click="toggleAttachmentsDropdown(lecture.id)"
                                class="w-full text-right px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors duration-200"
                              >
                                <font-awesome-icon icon="fa-solid fa-file" class="me-2 w-4 h-4" />
                                عرض الملفات
                              </button>
                            </li>
                          </ul>
                        </div>
                        <!-- Attachments Dropdown -->
                        <div
                          v-if="openAttachmentsDropdown === lecture.id"
                          :id="`attachments-dropdown-${lecture.id}`"
                          class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-100/20 dark:border-gray-800/20 z-20 animate-dropdown"
                        >
                          <ul class="py-1 text-xs sm:text-sm text-gray-700 dark:text-gray-200" role="menu">
                            <li v-if="lecture.attachments?.length === 0" class="px-4 py-2 text-center text-gray-500 dark:text-gray-400">
                              لا توجد ملفات
                            </li>
                            <li v-else v-for="attachment in lecture.attachments" :key="attachment.id" role="menuitem">
                              <button
                                @click="openAttachment(attachment.path)"
                                class="w-full text-right px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors duration-200"
                              >
                                <font-awesome-icon :icon="getAttachmentIcon(attachment.path)" class="me-2 w-4 h-4" />
                                عرض الملف {{ attachment.id }}
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div v-else class="text-gray-400 dark:text-gray-500 italic text-xs sm:text-sm">
                  لا توجد دروس مرتبطة بهذه الوحدة.
                </div>
              </div>
              <div v-else class="text-gray-400 dark:text-gray-500 italic text-xs sm:text-sm">
                اختر وحدة لعرض تفاصيلها.
              </div>
            </div>
          </div>
          <div v-else class="text-gray-400 dark:text-gray-500 italic text-xs sm:text-sm animate-slide-in" style="--animation-delay: 100ms">
            لا توجد وحدات مرتبطة بهذه الدورة.
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Course Modal -->
    <div v-if="showDeleteCourseModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="relative w-full max-w-[90%] sm:max-w-md mx-2 sm:mx-4">
        <div class="relative bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
          <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              <font-awesome-icon icon="fa-solid fa-trash-can" class="mr-2 text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
              حذف الدورة
            </h3>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <font-awesome-icon icon="fa-solid fa-xmark" class="text-base sm:text-lg" />
            </button>
          </div>
          <div class="p-4 sm:p-6 space-y-4">
            <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300">
              هل أنت متأكد من حذف الدورة "{{ form.CourseName }}"؟ هذا الإجراء لا يمكن التراجع عنه.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 gap-2">
            <button
              @click="closeModal"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
            >
              إلغاء
            </button>
            <button
              @click="() => handleDeleteCource(form.id!)"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <font-awesome-icon icon="fa-solid fa-trash-can" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
              تأكيد الحذف
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Course Modal -->
    <div v-if="showAddEditCourseModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="relative w-full max-w-[90%] sm:max-w-2xl mx-2 sm:mx-4">
        <div class="relative bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
          <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              <font-awesome-icon icon="fa-solid fa-book" class="mr-2 text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
              {{ isEditMode ? 'تعديل بيانات الدورة' : 'إضافة دورة جديدة' }}
            </h3>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <font-awesome-icon icon="fa-solid fa-xmark" class="text-base sm:text-lg" />
            </button>
          </div>
          <div class="p-4 sm:p-6 space-y-4 max-h-[80vh] sm:max-h-[70vh] overflow-y-auto">
            <form>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div class="space-y-2">
                  <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">اسم الدورة</label>
                  <div class="relative">
                    <input 
                      v-model="form.CourseName" 
                      type="text" 
                      required 
                      placeholder="اسم الدورة"
                      class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    />
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <font-awesome-icon icon="fa-solid fa-book" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>
                <div class="space-y-2">
                  <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">المادة</label>
                  <div class="relative">
                    <select 
                      v-model="form.Subject_id"
                      class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    >
                      <option value="" disabled selected>اختر المادة</option>
                      <option v-for="item in subjects" :key="item.id" :value="item.id">{{ item.subjectName }}</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <font-awesome-icon icon="fa-solid fa-book-open" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>
                <div class="space-y-2">
                  <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">المعهد</label>
                  <div class="relative">
                    <select 
                      v-model="form.Institute_id"
                      class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    >
                      <option value="" disabled selected>اختر المعهد</option>
                      <option v-for="item in institutes" :key="item.id" :value="item.id">{{ item.name }}</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <font-awesome-icon icon="fa-solid fa-school" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>
                <div class="space-y-2">
                  <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">المرحلة</label>
                  <div class="relative">
                    <select 
                      v-model="form.Stage_id"
                      class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    >
                      <option value="" disabled selected>اختر المرحلة</option>
                      <option v-for="item in stages" :key="item.id" :value="item.id">{{ item.name }}</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <font-awesome-icon icon="fa-solid fa-layer-group" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>
                <div class="space-y-2">
                  <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">المدرس</label>
                  <div class="relative">
                    <select 
                      v-model="form.Teacher_id"
                      class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    >
                      <option value="" disabled selected>اختر المدرس</option>
                      <option v-for="item in teachers" :key="item.id" :value="item.id">{{ item.FullName }}</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <font-awesome-icon icon="fa-solid fa-chalkboard-teacher" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>
                <div class="space-y-2">
                  <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">التاريخ</label>
                  <div class="relative">
                    <input 
                      v-model="form.Course_date" 
                      type="date" 
                      required 
                      class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    />
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <font-awesome-icon icon="fa-solid fa-calendar" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>
                <div class="space-y-2">
                  <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">السعر (دينار)</label>
                  <div class="relative">
                    <input 
                      v-model="form.Course_price" 
                      type="number" 
                      min="1"
                      required 
                      inputmode="numeric"
                      placeholder="السعر"
                      class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    />
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <font-awesome-icon icon="fa-solid fa-money-bill" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 gap-2">
            <button
              @click="closeModal"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
            >
              إلغاء
            </button>
            <button
              @click="submitCourseHandler"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md shadow-sm hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <font-awesome-icon icon="fa-solid fa-floppy-disk" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
              {{ isEditMode ? 'حفظ التعديلات' : 'إضافة الدورة' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Unit Modal -->
    <div v-if="showAddEditUnitModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="relative w-full max-w-[90%] sm:max-w-md mx-2 sm:mx-4">
        <div class="relative bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
          <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              <font-awesome-icon icon="fa-solid fa-object-group" class="mr-2 text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
              {{ isEditMode ? 'تعديل بيانات الوحدة' : 'إضافة وحدة جديدة' }}
            </h3>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <font-awesome-icon icon="fa-solid fa-xmark" class="text-base sm:text-lg" />
            </button>
          </div>
          <div class="p-4 sm:p-6 space-y-4">
            <form>
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">اسم الوحدة</label>
                <div class="relative">
                  <input 
                    v-model="form.unitName" 
                    type="text" 
                    required 
                    placeholder="اسم الوحدة"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-solid fa-object-group" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">المادة</label>
                <div class="relative">
                  <select 
                    v-model="form.subject_id"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  >
                    <option value="" disabled selected>اختر المادة</option>
                    <option v-for="item in subjects" :key="item.id" :value="item.id">{{ item.subjectName }}</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-solid fa-book-open" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 gap-2">
            <button
              @click="closeModal"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
            >
              إلغاء
            </button>
            <button
              @click="submitUnit(form, isEditMode ? true : false)"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md shadow-sm hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <font-awesome-icon icon="fa-solid fa-floppy-disk" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
              {{ isEditMode ? 'حفظ التعديلات' : 'إضافة الوحدة' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Unit Modal -->
    <div v-if="showDeleteUnitModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="relative w-full max-w-[90%] sm:max-w-md mx-2 sm:mx-4">
        <div class="relative bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
          <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              <font-awesome-icon icon="fa-solid fa-trash-can" class="mr-2 text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
              حذف الوحدة
            </h3>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <font-awesome-icon icon="fa-solid fa-xmark" class="text-base sm:text-lg" />
            </button>
          </div>
          <div class="p-4 sm:p-6 space-y-4">
            <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300">
              هل أنت متأكد من حذف الوحدة "{{ form.unitName }}"؟ هذا الإجراء لا يمكن التراجع عنه.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 gap-2">
            <button
              @click="closeModal"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
            >
              إلغاء
            </button>
            <button
              @click="confirmDeleteUnit(form.id!)"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <font-awesome-icon icon="fa-solid fa-trash-can" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
              تأكيد الحذف
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Lecture Modal -->
      <div v-if="showAddEditLectureModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div class="relative w-full max-w-[90%] sm:max-w-2xl mx-2 sm:mx-4">
      <div class="relative bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
        <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            <font-awesome-icon icon="fa-solid fa-video" class="mr-2 text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
            {{ isEditMode ? 'تعديل بيانات الدرس' : 'إضافة درس جديد' }}
          </h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <font-awesome-icon icon="fa-solid fa-xmark" class="text-base sm:text-lg" />
          </button>
        </div>
        <div class="p-4 sm:p-6 space-y-4 max-h-[80vh] sm:max-h-[70vh] overflow-y-auto">
          <form @submit.prevent="handleLectuarSubmit">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">الدورة</label>
                <div class="relative">
                  <select 
                    v-model="form.course_id"
                    required
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  >
                    <option value="" disabled selected>اختر الدورة</option>
                    <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.CourseName }}</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-solid fa-book" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">اسم الدرس</label>
                <div class="relative">
                  <input 
                    v-model="form.lecttTitle" 
                    type="text" 
                    required 
                    placeholder="اسم الدرس"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-solid fa-video" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">الوحدة</label>
                <div class="relative">
                  <select 
                    v-model="form.unit_id"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  >
                    <option value="" disabled selected>اختر الوحدة</option>
                    <option v-for="item in units" :key="item.id" :value="item.id">{{ item.unitName }}</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-solid fa-object-group" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">المدرس</label>
                <div class="relative">
                  <select 
                    v-model="form.teacher_id"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  >
                    <option value="" disabled selected>اختر المدرس</option>
                    <option v-for="item in teachers" :key="item.id" :value="item.id">{{ item.FullName }}</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-solid fa-chalkboard-teacher" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
              <div class="space-y-2 col-span-1 sm:col-span-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">المحتوى</label>
                <div class="relative">
                  <textarea 
                    v-model="form.lecttContent" 
                    placeholder="محتوى الدرس"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    rows="3 sm:rows-4"
                  ></textarea>
                  <div class="absolute inset-y-0 right-0 flex items-start pt-2 pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-solid fa-align-left" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
              <div class="space-y-2 col-span-1 sm:col-span-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">رابط الفيديو</label>
                <div class="relative">
                  <input 
                    v-model="form.videoUrl" 
                    type="url" 
                    placeholder="رابط الفيديو"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-solid fa-video" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
              <div class="space-y-2 col-span-1 sm:col-span-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">المرفقات</label>
                <div class="relative">
                  <input 
                    type="file" 
                    multiple 
                    @change="handleFileChange($event)"
                    accept=".pdf,.jpg,.jpeg,.png,.gif"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <font-awesome-icon icon="fa-solid fa-paperclip" class="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <div v-if="selectedFiles.length" class="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <p>الملفات المختارة: {{ selectedFiles.length }}</p>
                  <ul class="list-disc pl-5">
                    <li v-for="(file, index) in selectedFiles" :key="index">{{ file.name }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 gap-2">
          <button
            @click="closeModal"
            type="button"
            class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
          >
            إلغاء
          </button>
          <button
            @click="handleLectuarSubmit"
            type="button"
            class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md shadow-sm hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <font-awesome-icon icon="fa-solid fa-floppy-disk" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
            {{ isEditMode ? 'حفظ التعديلات' : 'إضافة الدرس' }}
          </button>
        </div>
      </div>
    </div>
  </div>

    <!-- Delete Lecture Modal -->
    <div v-if="showDeleteLectureModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="relative w-full max-w-[90%] sm:max-w-md mx-2 sm:mx-4">
        <div class="relative bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
          <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              <font-awesome-icon icon="fa-solid fa-trash-can" class="mr-2 text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
              حذف الدرس
            </h3>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <font-awesome-icon icon="fa-solid fa-xmark" class="text-base sm:text-lg" />
            </button>
          </div>
          <div class="p-4 sm:p-6 space-y-4">
            <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300">
              هل أنت متأكد من حذف الدرس "{{ form.lecttTitle }}"؟ هذا الإجراء لا يمكن التراجع عنه.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 gap-2">
            <button
              @click="closeModal"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
            >
              إلغاء
            </button>
            <button
              @click="confirmDeleteLecture"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <font-awesome-icon icon="fa-solid fa-trash-can" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
              تأكيد الحذف
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Show Lecture Modal -->
    <div v-if="showShowLectureModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-opacity duration-300">
    <div class="relative w-full max-w-[90%] sm:max-w-3xl mx-2 sm:mx-4 lg:mx-6">
      <div class="relative bg-white dark:bg-gray-900 rounded-lg sm:rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 dark:border-gray-800/50 transition-all duration-500 transform scale-100 animate-slide-in">
        <!-- Card inside Modal -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <!-- Video as Card Image -->
          <div v-if="form.videoUrl" class="relative">
            <iframe
              :src="form.videoUrl"
              title="فيديو الدرس"
              class="w-full h-40 sm:h-48 md:h-64 rounded-t-lg border-b border-gray-200 dark:border-gray-700"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div v-else class="bg-gray-100 dark:bg-gray-700 h-40 sm:h-48 md:h-64 rounded-t-lg flex items-center justify-center">
            <p class="text-gray-500 dark:text-gray-400 font-medium text-xs sm:text-sm">لا يوجد فيديو متاح</p>
          </div>

          <!-- Card Content -->
          <div class="p-4 sm:p-5 space-y-4">
            <h3 class="text-lg sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center justify-between w-full">
              <div class="flex items-center">
                <font-awesome-icon icon="fa-solid fa-video" class="mr-2 text-blue-600 dark:text-blue-400 w-4 h-4 sm:w-5 sm:h-5" />
                {{ form.lecttTitle || 'درس بدون عنوان' }}
              </div>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="حذف الدرس"
                  @click="form.id && openDeleteLectureModal(form as Lecture)"
                  class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs sm:text-sm p-2 sm:p-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  <font-awesome-icon icon="fa-solid fa-trash-can" class="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button
                  type="button"
                  aria-label="تعديل الدرس"
                  @click="form.id && openEditLectureModal(form as Lecture)"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm p-2 sm:p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <font-awesome-icon icon="fa-solid fa-pen-to-square" class="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </h3>
            <div class="space-y-3">
              <p class="text-xs sm:text-base text-gray-700 dark:text-gray-400">{{ form.lecttContent || 'لا يوجد محتوى' }}</p>
              <span class="bg-yellow-100 text-yellow-800 text-xs sm:text-sm font-medium me-2 px-2 sm:px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                الفصل: {{ form.unit?.unitName || form.unitName || 'غير محدد' }}
              </span>
              <span class="bg-green-100 text-green-800 text-xs sm:text-sm font-medium me-2 px-2 sm:px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                استاذ المادة: {{ form.teacher?.name || form.teacherName || 'غير محدد' }}
              </span>
              <div class="relative inline-block">
                <button
                  @click="form.id && toggleAttachmentsDropdown(form.id)"
                  class="inline-flex items-center px-3 py-1.5 text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                  :disabled="!form.attachments?.length"
                >
                  <font-awesome-icon icon="fa-solid fa-file" class="mr-2 w-4 h-4" />
                  الملفات ({{ form.attachments?.length || 0 }})
                </button>
                <!-- Attachments Dropdown in Modal -->
                <div
                  v-if="openAttachmentsDropdown === form.id"
                  :id="`attachments-dropdown-modal-${form.id}`"
                  class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-100/20 dark:border-gray-800/20 z-10 animate-dropdown"
                >
                  <ul class="py-1 text-xs sm:text-sm text-gray-700 dark:text-gray-200" role="menu">
                    <li v-if="!form.attachments?.length" class="px-4 py-2 text-center text-gray-500 dark:text-gray-400">
                      لا توجد ملفات
                    </li>
                    <li v-for="attachment in form.attachments" :key="attachment.id" role="menuitem">
                      <button
                        @click="openAttachment(attachment.path)"
                        class="w-full text-right px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors duration-200"
                      >
                        <font-awesome-icon :icon="getAttachmentIcon(attachment.path)" class="me-2 w-4 h-4" />
                        عرض الملف {{ attachment.id }}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <button
              @click="closeModal"
              type="button"
              class="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              إغلاق
              <svg class="rtl:rotate-180 w-3 h-3 sm:w-3.5 sm:h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal Close Button -->
        <button
          @click="closeModal"
          class="absolute top-2 sm:top-4 right-2 sm:right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
        >
          <font-awesome-icon icon="fa-solid fa-xmark" class="text-base sm:text-xl" />
        </button>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import  type { Ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { formatCurrency } from '../../../utils/format.ts';
import { useToast } from '@/composables/useToast.ts';
import api from '@/services/api.ts';
import { 
  fetchCourses, 
  fetchUnits, 
  fetchLectures, 
  fetchLectureAttachments, 
  getInstitutes, 
  getStages, 
  getTeachers, 
  fetchSubjects, 
  submitCourse, 
  confirmDeleteCourse, 
  submitUnit, 
  confirmDeleteUnit, 
  confirmDeleteLecture 
} from './courses.service.ts';

const { showToastMessage } = useToast();

// تعريف الواجهات (Interfaces) لأنواع البيانات
interface Course {
  id: number;
  CourseName: string;
  Subject_id: number;
  Institute_id: number;
  Stage_id: number;
  Teacher_id: number;
  Course_price: number;
  Course_date: string;
  subject_name?: string;
  institute_name?: string;
  stage_name?: string;
  teacher_name?: string;
}

interface Unit {
  id: number;
  unitName: string;
  subject_id: number;
}

interface Attachment {
  id: number;
  path: string;
}

interface Lecture {
  id: number;
  lecttTitle: string;
  unit: Unit;
  teacher: { id: number; name: string };
  course_id: number;
  lecttContent?: string;
  videoUrl?: string;
  attachments?: Attachment[];
}

interface Subject {
  id: number;
  subjectName: string;
}

interface Institute {
  id: number;
  name: string;
}

interface Stage {
  id: number;
  name: string;
}

interface Teacher {
  id: number;
  FullName: string;
}

// تعريف المتغيرات مع الأنواع
const courses: Ref<Course[]> = ref([]);
const selectedCourse: Ref<Course | null> = ref(null);

const units: Ref<Unit[]> = ref([]);
const selectedUnit: Ref<Unit | null> = ref(null);

const lectures: Ref<Lecture[]> = ref([]);

const subjects: Ref<Subject[]> = ref([]);
const institutes: Ref<Institute[]> = ref([]);
const stages: Ref<Stage[]> = ref([]);
const teachers: Ref<Teacher[]> = ref([]);

const openDropdown = ref<number | null>(null);
const openUnitDropdown = ref(false);
const openAttachmentsDropdown = ref<number | null>(null);

const showDeleteCourseModal = ref(false);
const showAddEditCourseModal = ref(false);
const showAddEditUnitModal = ref(false);
const showDeleteUnitModal = ref(false);
const showAddEditLectureModal = ref(false);
const showDeleteLectureModal = ref(false);
const showShowLectureModal = ref(false);

const isEditMode = ref(false);
const selectedFiles = ref<File[]>([]);

// تعريف نوع للنموذج form
type FormType = Partial<Course & Unit & Lecture & { attachments: Attachment[] }> & {
  teacherName?: string;
  subject_id?: number;
  unit_id?: number;
  teacher_id?: number;
  course_id?: number;
};

const form = ref<FormType>({
  CourseName: '',
  Subject_id: 0,
  Institute_id: 0,
  Stage_id: 0,
  Teacher_id: 0,
  Course_price: 0,
  Course_date: '',
  unitName: '',
  subject_id: 0,
  lecttTitle: '',
  unit_id: 0,
  teacher_id: 0,
  course_id: 0,
  lecttContent: '',
  videoUrl: '',
  id: 0,
  teacherName: '',
  attachments: []
});

const fetchDropdownData = async () => {
  try {
    institutes.value = await getInstitutes();
    stages.value = await getStages();
    teachers.value = await getTeachers();
    courses.value = await fetchCourses();
  } catch (err) {
    console.error('خطأ في جلب بيانات القوائم المنسدلة:', err);
    showToastMessage('error', 'حدث خطأ أثناء جلب بيانات القوائم');
  }
};

const embedVideoUrl = (url?: string) => {
  if (!url) return '';
  const videoId = url.split('v=')[1]?.split('&')[0];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const submitCourseHandler = async () => {
  try {
    await submitCourse(form.value, isEditMode.value);
    showAddEditCourseModal.value = false;
    form.value = {
      CourseName: '',
      Subject_id: 0,
      Institute_id: 0,
      Stage_id: 0,
      Teacher_id: 0,
      Course_price: 0,
      Course_date: '',
      unitName: '',
      subject_id: 0,
      lecttTitle: '',
      unit_id: 0,
      teacher_id: 0,
      course_id: 0,
      lecttContent: '',
      videoUrl: '',
      id: 0,
      teacherName: '',
      attachments: []
    };
    courses.value = await fetchCourses();
    if (courses.value.length > 0 && !selectedCourse.value) {
      selectedCourse.value = courses.value[0];
      form.value.course_id = courses.value[0].id;
      units.value = await fetchUnits(courses.value[0].subject_name || '');
      if (units.value.length > 0) {
        selectedUnit.value = units.value[0];
        lectures.value = await fetchLectures(units.value[0].unitName);
        await fetchAllAttachments();
      }
    }
    showToastMessage('success', 'تمت العملية بنجاح');
  } catch (err) {
    console.error('خطأ في إرسال الدورة:', err);
    showToastMessage('error', 'حدث خطأ أثناء إرسال الدورة');
  }
};

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    selectedFiles.value = Array.from(input.files);
  }
};

const handleLectuarSubmit = async () => {
  try {
    const requiredFields = ['lecttTitle', 'unit_id', 'teacher_id', 'course_id'];
    const missingFields = requiredFields.filter(field => !form.value[field as keyof FormType] && form.value[field as keyof FormType] !== 0);
    if (missingFields.length > 0) {
      showToastMessage('error', 'يرجى ملء جميع الحقول المطلوبة: ' + missingFields.join(', '));
      return;
    }

    const lectureData = {
      lecttTitle: form.value.lecttTitle,
      unit_id: form.value.unit_id,
      teacher_id: form.value.teacher_id,
      course_id: form.value.course_id,
      lecttContent: form.value.lecttContent || '',
      videoUrl: form.value.videoUrl || '',
    };

    let lectureId: number;
    if (isEditMode.value) {
      await api.put(`/lectures/${form.value.id}`, lectureData);
      lectureId = form.value.id as number;
      showToastMessage('success', 'تم تعديل الدرس بنجاح');
    } else {
      const response = await api.post('/lectures', lectureData);
      lectureId = response.data.data.id;
      showToastMessage('success', 'تم إضافة الدرس بنجاح');
    }

    if (selectedFiles.value.length > 0) {
      for (const file of selectedFiles.value) {
        const attachmentFormData = new FormData();
        attachmentFormData.append('path', file);
        attachmentFormData.append('lect_id', lectureId.toString());

        await api.post('/lecture-attachments', attachmentFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      showToastMessage('success', `تم إضافة ${selectedFiles.value.length} مرفق${selectedFiles.value.length > 1 ? 'ات' : ''} بنجاح`);
    }

    showAddEditLectureModal.value = false;
    form.value = {
      CourseName: '',
      Subject_id: 0,
      Institute_id: 0,
      Stage_id: 0,
      Teacher_id: 0,
      Course_price: 0,
      Course_date: '',
      unitName: '',
      subject_id: 0,
      lecttTitle: '',
      unit_id: 0,
      teacher_id: 0,
      course_id: 0,
      lecttContent: '',
      videoUrl: '',
      id: 0,
      teacherName: '',
      attachments: []
    };
    selectedFiles.value = [];
    lectures.value = await fetchLectures(selectedUnit.value?.unitName || '');
    await fetchAllAttachments();
  } catch (err: any) {
    console.error('خطأ في إرسال الدرس أو المرفقات:', err);
    showToastMessage('error', err.response?.data?.message || 'حدث خطأ أثناء إرسال الدرس أو المرفقات');
  }
};

const selectCourse = async (course: Course) => {
  selectedCourse.value = course;
  form.value.course_id = course.id;
  units.value = await fetchUnits(course.subject_name || '');
  selectedUnit.value = units.value.length ? units.value[0] : null;
  if (selectedUnit.value) {
    lectures.value = await fetchLectures(selectedUnit.value.unitName);
    await fetchAllAttachments();
  }
};

const selectUnit = async (unit: Unit) => {
  selectedUnit.value = unit;
  openUnitDropdown.value = false;
  lectures.value = await fetchLectures(unit.unitName);
  await fetchAllAttachments();
};

const fetchAllAttachments = async () => {
  for (let lecture of lectures.value) {
    lecture.attachments = await fetchLectureAttachments(lecture.id);
  }
};

const toggleDropdown = (lectureId: number) => {
  openDropdown.value = openDropdown.value === lectureId ? null : lectureId;
  openAttachmentsDropdown.value = null;
};

const toggleUnitDropdown = () => {
  openUnitDropdown.value = !openUnitDropdown.value;
};

const toggleAttachmentsDropdown = (lectureId: number) => {
  openAttachmentsDropdown.value = openAttachmentsDropdown.value === lectureId ? null : lectureId;
  openDropdown.value = null;
};

const openDeleteCourseModal = (course: Course) => {
  form.value = { CourseName: course.CourseName, id: course.id };
  showDeleteCourseModal.value = true;
};

const handleDeleteCource = async(courseId: number)=>{
  try {
    await confirmDeleteCourse(courseId);
    courses.value = await fetchCourses();
    showDeleteCourseModal.value = false;
    if (courses.value.length > 0) {
      selectedCourse.value = courses.value[0];
    } else {
      selectedCourse.value = null;
    }
    showToastMessage('success', 'تم حذف الكورس بنجاح');
  } catch (err) {
    console.log(err);
    showToastMessage('error', 'حدث خطأ أثناء حذف الكورس');
  }
}

const openEditCourseModal = async (course: Course) => {
  form.value = {
    CourseName: course.CourseName,
    Subject_id: course.Subject_id,
    Institute_id: course.Institute_id,
    Stage_id: course.Stage_id,
    Teacher_id: course.Teacher_id,
    Course_date: course.Course_date,
    Course_price: course.Course_price,
    id: course.id
  };
  isEditMode.value = true;
  showAddEditCourseModal.value = true;
  subjects.value = await fetchSubjects();
};

const openAddCourseModel = async () => {
  isEditMode.value = false;
  showAddEditCourseModal.value = true;
  subjects.value = await fetchSubjects();
};

const openAddUnitModal = async () => {
  form.value = { unitName: '', subject_id: selectedCourse.value?.Subject_id || 0 };
  isEditMode.value = false;
  showAddEditUnitModal.value = true;
  subjects.value = await fetchSubjects();
};

const openEditUnitModal = (unit: Unit) => {
  form.value = {
    unitName: unit.unitName,
    subject_id: unit.subject_id,
    id: unit.id
  };
  isEditMode.value = true;
  showAddEditUnitModal.value = true;
};

const openDeleteUnitModal = (unit: Unit) => {
  form.value = { unitName: unit.unitName, id: unit.id };
  showDeleteUnitModal.value = true;
};

const openAddLectureModal = () => {
  form.value = { 
    lecttTitle: '', 
    unit_id: selectedUnit.value?.id || 0, 
    teacher_id: 0, 
    course_id: selectedCourse.value?.id || 0,
    lecttContent: '', 
    videoUrl: '' 
  };
  selectedFiles.value = [];
  isEditMode.value = false;
  showAddEditLectureModal.value = true;
};

const openEditLectureModal = (lecture: Lecture) => {
  closeModal();
  form.value = {
    lecttTitle: lecture.lecttTitle,
    unit_id: lecture.unit.id,
    teacher_id: lecture.teacher.id,
    course_id: lecture.course_id || selectedCourse.value?.id || 0,
    lecttContent: lecture.lecttContent,
    videoUrl: lecture.videoUrl,
    id: lecture.id
  };
  selectedFiles.value = [];
  isEditMode.value = true;
  showAddEditLectureModal.value = true;
};

const openDeleteLectureModal = (lecture: Lecture) => {
  closeModal();
  form.value = { lecttTitle: lecture.lecttTitle, id: lecture.id };
  showDeleteLectureModal.value = true;
};

const openShowLectureModal = async (lecture: Lecture) => {
  if (!lecture || !lecture.id || !lecture.lecttTitle) {
    console.error('بيانات الدرس غير مكتملة:', lecture);
    showToastMessage('error', 'بيانات الدرس غير مكتملة');
    return;
  }
  form.value = {
    lecttTitle: lecture.lecttTitle || 'درس بدون عنوان',
    unit: {
      id: lecture.unit?.id || 0,
      unitName: lecture.unit?.unitName || '',
      subject_id: lecture.unit?.subject_id || 0
    },
    teacher: {
      id: lecture.teacher?.id || 0,
      name: lecture.teacher?.name || ''
    },
    course_id: lecture.course_id || selectedCourse.value?.id || 0,
    lecttContent: lecture.lecttContent || '',
    videoUrl: embedVideoUrl(lecture.videoUrl) || '',
    id: lecture.id,
    attachments: await fetchLectureAttachments(lecture.id)
  };
  showShowLectureModal.value = true;
};

const getAttachmentIcon = (path: string) => {
  if (path.endsWith('.pdf')) return 'fa-solid fa-file-pdf';
  if (path.match(/\.(jpg|jpeg|png)$/i)) return 'fa-solid fa-image';
  if (path.match(/\.(doc|docx)$/i)) return 'fa-solid fa-file-word';
  return 'fa-solid fa-file';
};

const openAttachment = (path: string) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  const fullUrl = `${baseUrl}/storage/${path}`;
  window.open(fullUrl, '_blank');
};

const closeModal = () => {
  showDeleteCourseModal.value = false;
  showAddEditCourseModal.value = false;
  showAddEditUnitModal.value = false;
  showDeleteUnitModal.value = false;
  showAddEditLectureModal.value = false;
  showDeleteLectureModal.value = false;
  showShowLectureModal.value = false;
  openAttachmentsDropdown.value = null;
  isEditMode.value = false;
  form.value = {
    CourseName: '',
    Subject_id: 0,
    Institute_id: 0,
    Stage_id: 0,
    Teacher_id: 0,
    Course_price: 0,
    Course_date: '',
    unitName: '',
    subject_id: 0,
    lecttTitle: '',
    unit_id: 0,
    teacher_id: 0,
    course_id: 0,
    lecttContent: '',
    videoUrl: '',
    id: 0,
    teacherName: '',
    attachments: []
  };
  selectedFiles.value = [];
};

onMounted(async () => {
  await fetchDropdownData();
  if (courses.value.length > 0) {
    selectedCourse.value = courses.value[0];
    form.value.course_id = courses.value[0].id;
    units.value = await fetchUnits(courses.value[0].subject_name || '');
    if (units.value.length > 0) {
      selectedUnit.value = units.value[0];
      lectures.value = await fetchLectures(units.value[0].unitName);
      await fetchAllAttachments();
    }
  }
});
</script>

<style scoped>
/* Custom Scrollbar */
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
  transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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

/* Smooth Tab Animation */
@keyframes tabPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}
button[aria-selected="true"] {
  animation: tabPulse 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover and Focus Effects for Tabs */
button:not(.unit-button):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
button:not(.unit-button):focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.4);
  transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover and Focus Effects for Unit Buttons */
.unit-button:hover {
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.unit-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.4);
}

/* Dropdown Animation */
@keyframes dropdown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-dropdown {
  animation: dropdown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Fade-In Animation for Content */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Slide-In Animation for Content */
@keyframes slideIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slide-in {
  animation: slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: var(--animation-delay);
}

/* Responsive Adjustments */
@media (max-width: 640px) {
  .container {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  ul {
    padding: 0.25rem;
  }
  button:not(.unit-button) {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
  }
  .md\\:flex {
    flex-direction: column;
  }
  .md\\:block {
    display: none;
  }
  .md\\:items-center {
    align-items: flex-start;
  }
  .md\\:w-64 {
    width: 100%;
  }
  .md\\:flex-row {
    flex-direction: column;
  }
  .md\\:justify-between {
    justify-content: flex-start;
  }
  .animate-dropdown {
    width: 36vw;
    right: -0.5rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
  button:not(.unit-button) {
    padding: 0.5rem 0.5rem;
    font-size: 0.6875rem;
  }
  .text-xs {
    font-size: 0.65rem;
  }
  .animate-dropdown {
    width: 45vw;
    right: -0.25rem;
  }
}

@media (min-width: 640px) and (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  button:not(.unit-button) {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }
}
</style>