<template>
  <div class="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
    <!-- Loading Indicator -->
    <div v-if="isLoading" class="text-center py-4">
      <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-purple-600 w-6 h-6" />
    </div>
    <!-- Tabs Header -->
    <div v-else class="mb-4 sm:mb-6 border-b-2 border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <!-- Tabs List -->
      <ul
        class="flex flex-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent -mb-px text-xs sm:text-sm font-semibold text-center"
        id="institutes-tab"
        role="tablist"
      >
        <li
          v-for="institute in institutes"
          :key="institute.id"
          class="me-1 sm:me-2"
          role="presentation"
        >
          <button
            class="relative inline-block px-3 sm:px-6 py-2 sm:py-3 border-b-2 transition-all duration-300 ease-in-out text-gray-600 dark:text-gray-600 hover:text-indigo-600 dark:hover:text-indigo-400"
            :id="`tab-${institute.id}`"
            :class="{
              'text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400': selectedInstitute?.id === institute.id,
              'border-transparent hover:border-indigo-200 dark:hover:border-indigo-700': selectedInstitute?.id !== institute.id
            }"
            @click="selectInstitute(institute)"
            type="button"
            role="tab"
            :aria-selected="selectedInstitute?.id === institute.id"
            :aria-controls="`content-${institute.id}`"
          >
            {{ institute.name }}
            <span
              v-if="selectedInstitute?.id === institute.id"
              class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 dark:bg-indigo-400 transform scale-x-100 transition-transform duration-400 ease-out"
            ></span>
          </button>
        </li>
      </ul>
      <button
        @click="openAddInstituteModal"
        class="flex items-center gap-1 focus:outline-none text-white focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5"
        style="background: #6f225e"
        aria-label="إضافة معهد جديد"
      >
        <font-awesome-icon icon="fa-solid fa-plus" class="w-3 h-3 sm:w-4 sm:h-4" />
        إضافة معهد
      </button>
    </div>
    <!-- Tabs Content -->
    <div v-if="!isLoading" id="institute-tab-content" class="space-y-6 sm:space-y-8">
      <div
        v-for="institute in institutes"
        :key="`content-${institute.id}`"
        v-show="selectedInstitute?.id === institute.id"
        class="space-y-6 sm:space-y-8 animate-fade-in"
        role="tabpanel"
        :aria-labelledby="`tab-${institute.id}`"
      >
        <!-- Institute Info Card -->
        <div class="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-gray-100/20 dark:border-gray-800/20 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-indigo-50/10 to-purple-50/10 dark:from-indigo-900/10 dark:to-purple-900/10 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-slide-in" style="--animation-delay: 0ms">
            <h2 class="text-lg sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {{ institute.name }}
            </h2>
            <div class="flex space-x-2">
              <button
                @click="openEditInstituteModal(institute)"
                class="flex items-center gap-1 focus:outline-none text-white focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5"
                style="background: #6f225e"
                aria-label="تعديل بيانات المعهد"
              >
                <font-awesome-icon icon="fa-solid fa-edit" class="w-3 h-3 sm:w-4 sm:h-4" />
                تعديل
              </button>
              <button
                @click="openDeleteInstituteModal(institute)"
                class="flex items-center gap-1 focus:outline-none text-white focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5"
                style="background: #e04d4d"
                aria-label="حذف المعهد"
              >
                <font-awesome-icon icon="fa-solid fa-trash-can" class="w-3 h-3 sm:w-4 sm:h-4" />
                حذف
              </button>
            </div>
          </div>
        </div>
        <!-- Stages Card -->
        <div class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-lg transition-all duration-500 hover:shadow-xl border border-gray-100/20 dark:border-gray-800/20">
          <div class="flex items-center justify-between mb-4 sm:mb-6">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white animate-slide-in" style="--animation-delay: 0ms">
              المراحل
            </h3>
            <button
              @click="openAddStageModal"
              class="flex items-center gap-1 focus:outline-none text-white focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5"
              style="background: #6f225e"
              aria-label="إضافة مرحلة جديدة"
            >
              <font-awesome-icon icon="fa-solid fa-plus" class="w-3 h-3 sm:w-4 sm:h-4" />
              إضافة مرحلة
            </button>
          </div>
          <div v-if="stages.length" class="flex flex-col gap-4 sm:gap-6">
            <ul class="flex-column space-y-2 sm:space-y-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 w-full">
              <li v-for="stage in stages" :key="stage.id">
                <button
                  @click="selectStage(stage)"
                  class="inline-flex items-center px-3 sm:px-4 py-2 sm:py-3 w-full rounded-lg transition-all duration-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 stage-button"
                  :class="{
                    'bg-indigo-600 text-white dark:bg-indigo-500': selectedStage?.id === stage.id,
                    'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300': selectedStage?.id !== stage.id
                  }"
                  :aria-pressed="selectedStage?.id === stage.id"
                >
                  <font-awesome-icon icon="fa-solid fa-layer-group" class="me-2 sm:me-3 w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 hover:scale-110" />
                  {{ stage.name }}
                </button>
              </li>
            </ul>
            <div class="p-4 sm:p-6 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg w-full transition-all duration-300 animate-slide-in" style="--animation-delay: 100ms">
              <div v-if="selectedStage">
                <div class="flex items-center justify-between mb-3 sm:mb-4">
                  <h4 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                    {{ selectedStage.name }}
                  </h4>
                  <div class="relative">
                    <button
                      ref="stageDropdownButton"
                      @click="toggleStageDropdown"
                      class="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                      :aria-expanded="openStageDropdown"
                      aria-haspopup="true"
                      aria-controls="stage-dropdown"
                    >
                      <font-awesome-icon icon="fa-solid fa-ellipsis-v" class="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <div
                      v-if="openStageDropdown"
                      ref="stageDropdownMenu"
                      id="stage-dropdown"
                      class="absolute left-0 mt-2 w-36 sm:w-40 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-100/20 dark:border-gray-800/20 z-50 animate-dropdown"
                    >
                      <ul class="py-1 text-xs sm:text-sm text-gray-700 dark:text-gray-200" role="menu">
                        <li role="menuitem">
                          <button
                            @click="openEditStageModal(selectedStage)"
                            class="w-full text-right px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors duration-200"
                          >
                            <font-awesome-icon icon="fa-solid fa-edit" class="me-1 sm:me-2 w-3 h-3 sm:w-4 sm:h-4" />
                            تعديل المرحلة
                          </button>
                        </li>
                        <li role="menuitem">
                          <button
                            @click="openDeleteStageModal(selectedStage)"
                            class="w-full text-right px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors duration-200"
                          >
                            <font-awesome-icon icon="fa-solid fa-trash-can" class="me-1 sm:me-2 w-3 h-3 sm:w-4 sm:h-4" />
                            حذف المرحلة
                          </button>
                        </li>
                        <li role="menuitem">
                          <button
                            @click="openAddSubjectModal"
                            class="w-full text-right px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors duration-200"
                          >
                            <font-awesome-icon icon="fa-solid fa-plus" class="me-1 sm:me-2 w-3 h-3 sm:w-4 sm:h-4" />
                            إضافة مادة
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div v-if="subjects.length" class="space-y-3 sm:space-y-4">
                  <h5 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    المواد المرتبطة بالمرحلة
                  </h5>
                  <ul class="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600 dark:text-gray-200" role="list">
                    <li
                      v-for="subject in subjects"
                      :key="subject.id"
                      class="p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-all duration-300"
                      role="listitem"
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2 sm:space-x-3">
                          <font-awesome-icon icon="fa-solid fa-book" class="text-indigo-500 dark:text-indigo-400 w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 hover:scale-110" />
                          <span>{{ subject.subjectName }}</span>
                        </div>
                        <div class="relative">
                          <button
                            ref="subjectDropdownButton"
                            @click="toggleSubjectDropdown(subject.id)"
                            class="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                            :aria-expanded="openSubjectDropdown === subject.id"
                            aria-haspopup="true"
                            :aria-controls="`dropdown-${subject.id}`"
                          >
                            <font-awesome-icon icon="fa-solid fa-ellipsis-v" class="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <div
                            v-if="openSubjectDropdown === subject.id"
                            ref="subjectDropdownMenu"
                            :id="`dropdown-${subject.id}`"
                            class="absolute left-0 mt-2 w-36 sm:w-40 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-100/20 dark:border-gray-800/20 z-10 animate-dropdown"
                          >
                            <ul class="py-1 text-xs sm:text-sm text-gray-700 dark:text-gray-200" role="menu">
                              <li role="menuitem">
                                <button
                                  @click="openEditSubjectModal(subject)"
                                  class="w-full text-right px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors duration-200"
                                >
                                  <font-awesome-icon icon="fa-solid fa-edit" class="me-1 sm:me-2 w-3 h-3 sm:w-4 sm:h-4" />
                                  تعديل
                                </button>
                              </li>
                              <li role="menuitem">
                                <button
                                  @click="openDeleteSubjectModal(subject)"
                                  class="w-full text-right px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors duration-200"
                                >
                                  <font-awesome-icon icon="fa-solid fa-trash-can" class="me-1 sm:me-2 w-3 h-3 sm:w-4 sm:h-4" />
                                  حذف
                                </button>
                              </li>
                              <li role="menuitem">
                                <button
                                  @click="openAddUnitModal(subject)"
                                  class="w-full text-right px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors duration-200"
                                >
                                  <font-awesome-icon icon="fa-solid fa-plus" class="me-1 sm:me-2 w-3 h-3 sm:w-4 sm:h-4" />
                                  إضافة فصل
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <!-- Units List under Subject -->
                      <div v-if="subject.units?.length" class="mt-2 sm:mt-3 space-y-2 pl-6 sm:pl-8">
                        <h6 class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">الفصول:</h6>
                        <ul class="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-200" role="list">
                          <li
                            v-for="unit in subject.units"
                            :key="unit.id"
                            class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-all duration-300"
                            role="listitem"
                          >
                            <div class="flex items-center space-x-2 sm:space-x-3">
                              <font-awesome-icon icon="fa-solid fa-object-group" class="text-indigo-500 dark:text-indigo-400 w-3 h-3 sm:w-4 sm:h-4 transform transition-transform duration-300 hover:scale-110" />
                              <span>{{ unit.unitName }}</span>
                            </div>
                            <div class="relative">
                              <button
                                ref="unitDropdownButton"
                                @click="toggleUnitDropdown(unit.id)"
                                class="flex items-center px-1.5 sm:px-2 py-1 sm:py-1.5 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                :aria-expanded="openUnitDropdown === unit.id"
                                aria-haspopup="true"
                                :aria-controls="`dropdown-unit-${unit.id}`"
                              >
                                <font-awesome-icon icon="fa-solid fa-ellipsis-v" class="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                              <div
                                v-if="openUnitDropdown === unit.id"
                                ref="unitDropdownMenu"
                                :id="`dropdown-unit-${unit.id}`"
                                class="absolute left-0 mt-2 w-36 sm:w-40 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-100/20 dark:border-gray-800/20 z-10 animate-dropdown"
                              >
                                <ul class="py-1 text-xs sm:text-sm text-gray-700 dark:text-gray-200" role="menu">
                                  <li role="menuitem">
                                    <button
                                      @click="openEditUnitModal(unit)"
                                      class="w-full text-right px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors duration-200"
                                    >
                                      <font-awesome-icon icon="fa-solid fa-edit" class="me-1 sm:me-2 w-3 h-3 sm:w-4 sm:h-4" />
                                      تعديل
                                    </button>
                                  </li>
                                  <li role="menuitem">
                                    <button
                                      @click="openDeleteUnitModal(unit)"
                                      class="w-full text-right px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors duration-200"
                                    >
                                      <font-awesome-icon icon="fa-solid fa-trash-can" class="me-1 sm:me-2 w-3 h-3 sm:w-4 sm:h-4" />
                                      حذف
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div v-else class="mt-2 text-gray-400 dark:text-gray-500 italic pl-6 sm:pl-8 text-xs sm:text-sm">
                        لا توجد فصول مرتبطة بهذه المادة.
                      </div>
                    </li>
                  </ul>
                </div>
                <div v-else class="text-gray-400 dark:text-gray-500 italic text-xs sm:text-sm">
                  لا توجد مواد مرتبطة بهذه المرحلة.
                </div>
              </div>
              <div v-else class="text-gray-400 dark:text-gray-500 italic text-xs sm:text-sm">
                اختر مرحلة لعرض تفاصيلها.
              </div>
            </div>
          </div>
          <div v-else class="text-gray-400 dark:text-gray-500 italic text-xs sm:text-sm animate-slide-in" style="--animation-delay: 100ms">
            لا توجد مراحل متاحة.
          </div>
        </div>
      </div>
      <div v-if="!institutes.length" class="text-center text-gray-400 dark:text-gray-500 italic text-xs sm:text-sm">
        لا توجد معاهد متاحة.
      </div>
    </div>
    <!-- Delete Institute Modal -->
    <div v-if="showDeleteInstituteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="relative w-full max-w-full sm:max-w-md mx-2 sm:mx-4">
        <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
          <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              <font-awesome-icon icon="fa-solid fa-trash-can" class="mr-2 text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
              حذف المعهد
            </h3>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <font-awesome-icon icon="fa-solid fa-xmark" class="text-base sm:text-lg" />
            </button>
          </div>
          <div class="p-4 sm:p-6 space-y-4 text-center">
            <div class="mx-auto text-red-500 w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
            </div>
            <p class="text-xs sm:text-base text-gray-700 dark:text-gray-300">
              هل أنت متأكد من حذف المعهد "{{ form.name }}"؟ سيتم حذف جميع البيانات المرتبطة بهذا المعهد بشكل دائم.
            </p>
            <p class="text-xs sm:text-sm text-red-500 dark:text-red-400">
              <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="mr-1 w-3 h-3 sm:w-4 sm:h-4" />
              لا يمكن التراجع عن هذه العملية بعد التنفيذ.
            </p>
          </div>
          <div class="flex items-center justify-end px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 space-x-2 sm:space-x-3">
            <button
              @click="closeModal"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              إلغاء
            </button>
            <button
              @click="handleConfirmDeleteInstitute"
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
    <!-- Add/Edit Institute Modal -->
    <div v-if="showAddEditInstituteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="relative w-full max-w-full sm:max-w-md mx-2 sm:mx-4">
        <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
          <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              <font-awesome-icon icon="fa-solid fa-building" class="mr-2 text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
              {{ isEditMode ? 'تعديل بيانات المعهد' : 'إضافة معهد جديد' }}
            </h3>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <font-awesome-icon icon="fa-solid fa-xmark" class="text-base sm:text-lg" />
            </button>
          </div>
          <div class="p-4 sm:p-6 space-y-4">
            <form>
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">اسم المعهد</label>
                <div class="relative">
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="اسم المعهد"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  />
                  <font-awesome-icon
                    icon="fa-solid fa-building"
                    class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3 sm:w-4 sm:h-4"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="flex items-center justify-end px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 space-x-2 sm:space-x-3">
            <button
              @click="closeModal"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              إلغاء
            </button>
            <button
              @click="handleSubmitInstitute"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <font-awesome-icon icon="fa-solid fa-floppy-disk" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
              {{ isEditMode ? 'حفظ التعديلات' : 'إضافة المعهد' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Add/Edit Stage Modal -->
    <div v-if="showAddEditStageModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="relative w-full max-w-full sm:max-w-md mx-2 sm:mx-4">
        <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
          <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              <font-awesome-icon icon="fa-solid fa-layer-group" class="mr-2 text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
              {{ isEditMode ? 'تعديل بيانات المرحلة' : 'إضافة مرحلة جديدة' }}
            </h3>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <font-awesome-icon icon="fa-solid fa-xmark" class="text-base sm:text-lg" />
            </button>
          </div>
          <div class="p-4 sm:p-6 space-y-4">
            <form>
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">اسم المرحلة</label>
                <div class="relative">
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="اسم المرحلة"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  />
                  <font-awesome-icon
                    icon="fa-solid fa-layer-group"
                    class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3 sm:w-4 sm:h-4"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="flex items-center justify-end px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 space-x-2 sm:space-x-3">
            <button
              @click="closeModal"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              إلغاء
            </button>
            <button
              @click="handleSubmitStage"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <font-awesome-icon icon="fa-solid fa-floppy-disk" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
              {{ isEditMode ? 'حفظ التعديلات' : 'إضافة المرحلة' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Delete Stage Modal -->
    <div v-if="showDeleteStageModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="relative w-full max-w-full sm:max-w-md mx-2 sm:mx-4">
        <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
          <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              <font-awesome-icon icon="fa-solid fa-trash-can" class="mr-2 text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
              حذف المرحلة
            </h3>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <font-awesome-icon icon="fa-solid fa-xmark" class="text-base sm:text-lg" />
            </button>
          </div>
          <div class="p-4 sm:p-6 space-y-4 text-center">
            <div class="mx-auto text-red-500 w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
            </div>
            <p class="text-xs sm:text-base text-gray-700 dark:text-gray-300">
              هل أنت متأكد من حذف المرحلة "{{ form.name }}"؟ سيتم حذف جميع البيانات المرتبطة بهذه المرحلة بشكل دائم.
            </p>
            <p class="text-xs sm:text-sm text-red-500 dark:text-red-400">
              <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="mr-1 w-3 h-3 sm:w-4 sm:h-4" />
              لا يمكن التراجع عن هذه العملية بعد التنفيذ.
            </p>
          </div>
          <div class="flex items-center justify-end px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 space-x-2 sm:space-x-3">
            <button
              @click="closeModal"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              إلغاء
            </button>
            <button
              @click="handleConfirmDeleteStage"
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
    <!-- Add/Edit Subject Modal -->
    <div v-if="showAddEditSubjectModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="relative w-full max-w-full sm:max-w-md mx-2 sm:mx-4">
        <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
          <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              <font-awesome-icon icon="fa-solid fa-book" class="mr-2 text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
              {{ isEditMode ? 'تعديل بيانات المادة' : 'إضافة مادة جديدة' }}
            </h3>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <font-awesome-icon icon="fa-solid fa-xmark" class="text-base sm:text-lg" />
            </button>
          </div>
          <div class="p-4 sm:p-6 space-y-4">
            <form>
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">اسم المادة</label>
                <div class="relative">
                  <input
                    v-model="form.subjectName"
                    type="text"
                    required
                    placeholder="اسم المادة"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  />
                  <font-awesome-icon
                    icon="fa-solid fa-book"
                    class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3 sm:w-4 sm:h-4"
                  />
                </div>
              </div>
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">المرحلة</label>
                <div class="relative">
                  <select
                    v-model="form.stage_id"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  >
                    <option value="" disabled selected>اختر المرحلة</option>
                    <option v-for="item in stages" :key="item.id" :value="item.id">{{ item.name }}</option>
                  </select>
                  <font-awesome-icon
                    icon="fa-solid fa-layer-group"
                    class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3 sm:w-4 sm:h-4"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="flex items-center justify-end px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 space-x-2 sm:space-x-3">
            <button
              @click="closeModal"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              إلغاء
            </button>
            <button
              @click="handleSubmitSubject"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <font-awesome-icon icon="fa-solid fa-floppy-disk" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
              {{ isEditMode ? 'حفظ التعديلات' : 'إضافة المادة' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Delete Subject Modal -->
    <div v-if="showDeleteSubjectModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="relative w-full max-w-full sm:max-w-md mx-2 sm:mx-4">
        <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
          <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              <font-awesome-icon icon="fa-solid fa-trash-can" class="mr-2 text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
              حذف المادة
            </h3>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <font-awesome-icon icon="fa-solid fa-xmark" class="text-base sm:text-lg" />
            </button>
          </div>
          <div class="p-4 sm:p-6 space-y-4 text-center">
            <div class="mx-auto text-red-500 w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
            </div>
            <p class="text-xs sm:text-base text-gray-700 dark:text-gray-300">
              هل أنت متأكد من حذف المادة "{{ form.subjectName }}"؟ سيتم حذف جميع البيانات المرتبطة بهذه المادة بشكل دائم.
            </p>
            <p class="text-xs sm:text-sm text-red-500 dark:text-red-400">
              <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="mr-1 w-3 h-3 sm:w-4 sm:h-4" />
              لا يمكن التراجع عن هذه العملية بعد التنفيذ.
            </p>
          </div>
          <div class="flex items-center justify-end px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 space-x-2 sm:space-x-3">
            <button
              @click="closeModal"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              إلغاء
            </button>
            <button
              @click="handleConfirmDeleteSubject"
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
    <!-- Add/Edit Unit Modal -->
    <div v-if="showAddEditUnitModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="relative w-full max-w-full sm:max-w-md mx-2 sm:mx-4">
        <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
          <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              <font-awesome-icon icon="fa-solid fa-object-group" class="mr-2 text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
              {{ isEditMode ? 'تعديل بيانات الفصل' : 'إضافة فصل جديد' }}
            </h3>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <font-awesome-icon icon="fa-solid fa-xmark" class="text-base sm:text-lg" />
            </button>
          </div>
          <div class="p-4 sm:p-6 space-y-4">
            <form>
              <div class="space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">اسم الفصل</label>
                <div class="relative">
                  <input
                    v-model="form.unitName"
                    type="text"
                    required
                    placeholder="اسم الفصل"
                    class="w-full pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  />
                  <font-awesome-icon
                    icon="fa-solid fa-object-group"
                    class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3 sm:w-4 sm:h-4"
                  />
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
                  <font-awesome-icon
                    icon="fa-solid fa-book"
                    class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3 sm:w-4 sm:h-4"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="flex items-center justify-end px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 space-x-2 sm:space-x-3">
            <button
              @click="closeModal"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              إلغاء
            </button>
            <button
              @click="handleSubmitUnit"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <font-awesome-icon icon="fa-solid fa-floppy-disk" class="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
              {{ isEditMode ? 'حفظ التعديلات' : 'إضافة الفصل' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Delete Unit Modal -->
    <div v-if="showDeleteUnitModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="relative w-full max-w-full sm:max-w-md mx-2 sm:mx-4">
        <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
          <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              <font-awesome-icon icon="fa-solid fa-trash-can" class="mr-2 text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
              حذف الفصل
            </h3>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <font-awesome-icon icon="fa-solid fa-xmark" class="text-base sm:text-lg" />
            </button>
          </div>
          <div class="p-4 sm:p-6 space-y-4 text-center">
            <div class="mx-auto text-red-500 w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
            </div>
            <p class="text-xs sm:text-base text-gray-700 dark:text-gray-300">
              هل أنت متأكد من حذف الفصل "{{ form.unitName }}"؟ سيتم حذف جميع البيانات المرتبطة بهذا الفصل بشكل دائم.
            </p>
            <p class="text-xs sm:text-sm text-red-500 dark:text-red-400">
              <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="mr-1 w-3 h-3 sm:w-4 sm:h-4" />
              لا يمكن التراجع عن هذه العملية بعد التنفيذ.
            </p>
          </div>
          <div class="flex items-center justify-end px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 space-x-2 sm:space-x-3">
            <button
              @click="closeModal"
              type="button"
              class="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              إلغاء
            </button>
            <button
              @click="handleConfirmDeleteUnit"
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import api from '@/services/api';
import { useToast } from '@/composables/useToast';

// Interfaces
interface Institute {
  id: number;
  name: string;
}

interface Stage {
  id: number;
  name: string;
}

interface Subject {
  id: number;
  subjectName: string;
  stage_id: number;
  units?: Unit[];
}

interface Unit {
  id: number;
  unitName: string;
  subject_id: number;
}

interface FormData {
  name?: string;
  subjectName?: string;
  stage_id?: string | number;
  unitName?: string;
  subject_id?: string | number;
  id?: string | number;
}

// Toast
const { showToastMessage } = useToast();

// Data
const institutes = ref<Institute[]>([]);
const selectedInstitute = ref<Institute | null>(null);
const stages = ref<Stage[]>([]);
const selectedStage = ref<Stage | null>(null);
const subjects = ref<Subject[]>([]);
const isLoading = ref<boolean>(false);

// Dropdowns
const openStageDropdown = ref<boolean>(false);
const openSubjectDropdown = ref<number | null>(null);
const openUnitDropdown = ref<number | null>(null);
const stageDropdownButton = ref<HTMLElement | null>(null);
const stageDropdownMenu = ref<HTMLElement | null>(null);
const subjectDropdownButton = ref<HTMLElement[]>([]);
const subjectDropdownMenu = ref<HTMLElement[]>([]);
const unitDropdownButton = ref<HTMLElement[]>([]);
const unitDropdownMenu = ref<HTMLElement[]>([]);

// Modals
const showDeleteInstituteModal = ref<boolean>(false);
const showAddEditInstituteModal = ref<boolean>(false);
const showAddEditStageModal = ref<boolean>(false);
const showDeleteStageModal = ref<boolean>(false);
const showAddEditSubjectModal = ref<boolean>(false);
const showDeleteSubjectModal = ref<boolean>(false);
const showAddEditUnitModal = ref<boolean>(false);
const showDeleteUnitModal = ref<boolean>(false);
const isEditMode = ref<boolean>(false);
const form = ref<FormData>({});

// API Functions
const fetchInstitutes = async (): Promise<Institute[]> => {
  isLoading.value = true;
  try {
    const response = await api.get('/institutes');
    return response.data.data || [];
  } catch (err: any) {
    showToastMessage('error', 'حدث خطأ أثناء جلب المعاهد');
    console.error('خطأ في جلب المعاهد:', err);
    return [];
  } finally {
    isLoading.value = false;
  }
};

const submitInstitute = async (data: FormData, isEditMode: boolean): Promise<void> => {
  try {
    if (isEditMode) {
      await api.put(`/institutes/${data.id}`, { name: data.name });
      showToastMessage('success', 'تم تعديل المعهد بنجاح');
    } else {
      await api.post('/institutes', { name: data.name });
      showToastMessage('success', 'تم إضافة المعهد بنجاح');
    }
  } catch (err: any) {
    showToastMessage('error', err.response?.data?.message || 'حدث خطأ أثناء إرسال المعهد');
    console.error('خطأ في إرسال المعهد:', err);
    throw err;
  }
};

const confirmDeleteInstitute = async (id: number): Promise<void> => {
  try {
    await api.delete(`/institutes/${id}`);
    showToastMessage('success', 'تم حذف المعهد بنجاح');
  } catch (err: any) {
    showToastMessage('error', err.response?.data?.message || 'حدث خطأ أثناء حذف المعهد');
    console.error('خطأ في حذف المعهد:', err);
    throw err;
  }
};

const fetchStages = async (): Promise<Stage[]> => {
  isLoading.value = true;
  try {
    const response = await api.get('/stages');
    return response.data.data || [];
  } catch (err: any) {
    showToastMessage('error', 'حدث خطأ أثناء جلب المراحل');
    console.error('خطأ في جلب المراحل:', err);
    return [];
  } finally {
    isLoading.value = false;
  }
};

const submitStage = async (data: FormData, isEditMode: boolean): Promise<void> => {
  try {
    if (isEditMode) {
      await api.put(`/stages/${data.id}`, { name: data.name });
      showToastMessage('success', 'تم تعديل المرحلة بنجاح');
    } else {
      await api.post('/stages', { name: data.name });
      showToastMessage('success', 'تم إضافة المرحلة بنجاح');
    }
  } catch (err: any) {
    showToastMessage('error', err.response?.data?.message || 'حدث خطأ أثناء إرسال المرحلة');
    console.error('خطأ في إرسال المرحلة:', err);
    throw err;
  }
};

const confirmDeleteStage = async (id: number): Promise<void> => {
  try {
    await api.delete(`/stages/${id}`);
    showToastMessage('success', 'تم حذف المرحلة بنجاح');
  } catch (err: any) {
    showToastMessage('error', err.response?.data?.message || 'حدث خطأ أثناء حذف المرحلة');
    console.error('خطأ في حذف المرحلة:', err);
    throw err;
  }
};

const fetchSubjects = async (stageId: number): Promise<Subject[]> => {
  isLoading.value = true;
  try {
    const response = await api.get(`/subjects?stage_id=${stageId}`);
    const subjects: Subject[] = response.data.data || [];
    if (subjects.length) {
      const unitsPromises = subjects.map(subject =>
        api.get(`/units?filter[subject.id]=${subject.id}`).then(res => ({
          ...subject,
          units: res.data.data || []
        }))
      );
      return await Promise.all(unitsPromises);
    }
    return subjects;
  } catch (err: any) {
    showToastMessage('error', 'حدث خطأ أثناء جلب المواد');
    console.error('خطأ في جلب المواد:', err);
    return [];
  } finally {
    isLoading.value = false;
  }
};

const submitSubject = async (data: FormData, isEditMode: boolean): Promise<void> => {
  try {
    if (isEditMode) {
      await api.put(`/subjects/${data.id}`, { subjectName: data.subjectName, stage_id: data.stage_id });
      showToastMessage('success', 'تم تعديل المادة بنجاح');
    } else {
      await api.post('/subjects', { subjectName: data.subjectName, stage_id: data.stage_id });
      showToastMessage('success', 'تم إضافة المادة بنجاح');
    }
  } catch (err: any) {
    showToastMessage('error', err.response?.data?.message || 'حدث خطأ أثناء إرسال المادة');
    console.error('خطأ في إرسال المادة:', err);
    throw err;
  }
};

const confirmDeleteSubject = async (id: number): Promise<void> => {
  try {
    await api.delete(`/subjects/${id}`);
    showToastMessage('success', 'تم حذف المادة بنجاح');
  } catch (err: any) {
    showToastMessage('error', err.response?.data?.message || 'حدث خطأ أثناء حذف المادة');
    console.error('خطأ في حذف المادة:', err);
    throw err;
  }
};

const submitUnit = async (data: FormData, isEditMode: boolean): Promise<void> => {
  try {
    if (isEditMode) {
      await api.put(`/units/${data.id}`, { unitName: data.unitName, subject_id: data.subject_id });
      showToastMessage('success', 'تم تعديل الفصل بنجاح');
    } else {
      await api.post('/units', { unitName: data.unitName, subject_id: data.subject_id });
      showToastMessage('success', 'تم إضافة الفصل بنجاح');
    }
  } catch (err: any) {
    showToastMessage('error', err.response?.data?.message || 'حدث خطأ أثناء إرسال الفصل');
    console.error('خطأ في إرسال الفصل:', err);
    throw err;
  }
};

const confirmDeleteUnit = async (id: number): Promise<void> => {
  try {
    await api.delete(`/units/${id}`);
    showToastMessage('success', 'تم حذف الفصل بنجاح');
  } catch (err: any) {
    showToastMessage('error', err.response?.data?.message || 'حدث خطأ أثناء حذف الفصل');
    console.error('خطأ في حذف الفصل:', err);
    throw err;
  }
};

// Data Fetching
const fetchData = async (): Promise<void> => {
  isLoading.value = true;
  try {
    const [institutesData, stagesData] = await Promise.all([fetchInstitutes(), fetchStages()]);
    institutes.value = institutesData;
    stages.value = stagesData;
    if (institutes.value.length > 0) {
      selectedInstitute.value = institutes.value[0];
      if (stages.value.length > 0) {
        selectedStage.value = stages.value[0];
        subjects.value = await fetchSubjects(stages.value[0].id);
      } else {
        subjects.value = [];
      }
    } else {
      selectedInstitute.value = null;
      selectedStage.value = null;
      subjects.value = [];
    }
    // Wait for DOM update to ensure refs are assigned
    await nextTick();
  } catch (err: any) {
    showToastMessage('error', 'حدث خطأ أثناء جلب البيانات');
    console.error('خطأ في جلب البيانات:', err);
  } finally {
    isLoading.value = false;
  }
};

// Selection Handlers
const selectInstitute = async (institute: Institute): Promise<void> => {
  selectedInstitute.value = institute;
  selectedStage.value = stages.value.length ? stages.value[0] : null;
  openStageDropdown.value = false;
  openSubjectDropdown.value = null;
  openUnitDropdown.value = null;
  if (selectedStage.value) {
    subjects.value = await fetchSubjects(selectedStage.value.id);
  } else {
    subjects.value = [];
  }
  // Wait for DOM update
  await nextTick();
};

const selectStage = async (stage: Stage): Promise<void> => {
  selectedStage.value = stage;
  openStageDropdown.value = false;
  openSubjectDropdown.value = null;
  openUnitDropdown.value = null;
  subjects.value = await fetchSubjects(stage.id);
  // Wait for DOM update
  await nextTick();
};

// Dropdown Handlers
const toggleStageDropdown = async (): Promise<void> => {
  openStageDropdown.value = !openStageDropdown.value;
  openSubjectDropdown.value = null;
  openUnitDropdown.value = null;
  // Wait for DOM update to ensure stageDropdownMenu is available
  if (openStageDropdown.value) {
    await nextTick();
  }
};

const toggleSubjectDropdown = (subjectId: number): void => {
  openSubjectDropdown.value = openSubjectDropdown.value === subjectId ? null : subjectId;
  openStageDropdown.value = false;
  openUnitDropdown.value = null;
};

const toggleUnitDropdown = (unitId: number): void => {
  openUnitDropdown.value = openUnitDropdown.value === unitId ? null : unitId;
  openStageDropdown.value = false;
  openSubjectDropdown.value = null;
};

const handleClickOutside = (event: MouseEvent): void => {
  // Stage dropdown
  if (openStageDropdown.value) {
    const isInsideStageDropdown = stageDropdownMenu.value && stageDropdownMenu.value.contains(event.target as Node);
    const isInsideStageButton = stageDropdownButton.value && stageDropdownButton.value.contains(event.target as Node);
    if (!isInsideStageDropdown && !isInsideStageButton) {
      openStageDropdown.value = false;
    }
  }

  // Subject dropdowns
  if (openSubjectDropdown.value) {
    const isInsideSubjectDropdown = subjectDropdownMenu.value.some(menu => menu?.contains(event.target as Node));
    const isInsideSubjectButton = subjectDropdownButton.value.some(btn => btn?.contains(event.target as Node));
    if (!isInsideSubjectDropdown && !isInsideSubjectButton) {
      openSubjectDropdown.value = null;
    }
  }

  // Unit dropdowns
  if (openUnitDropdown.value) {
    const isInsideUnitDropdown = unitDropdownMenu.value.some(menu => menu?.contains(event.target as Node));
    const isInsideUnitButton = unitDropdownButton.value.some(btn => btn?.contains(event.target as Node));
    if (!isInsideUnitDropdown && !isInsideUnitButton) {
      openUnitDropdown.value = null;
    }
  }
};

// Modal Handlers
const openDeleteInstituteModal = (institute: Institute): void => {
  form.value = { name: institute.name, id: institute.id };
  showDeleteInstituteModal.value = true;
};

const openEditInstituteModal = (institute: Institute): void => {
  form.value = { name: institute.name, id: institute.id };
  isEditMode.value = true;
  showAddEditInstituteModal.value = true;
};

const openAddInstituteModal = (): void => {
  form.value = { name: '' };
  isEditMode.value = false;
  showAddEditInstituteModal.value = true;
};

const openAddStageModal = (): void => {
  form.value = { name: '' };
  isEditMode.value = false;
  showAddEditStageModal.value = true;
};

const openEditStageModal = (stage: Stage): void => {
  form.value = { name: stage.name, id: stage.id };
  isEditMode.value = true;
  showAddEditStageModal.value = true;
};

const openDeleteStageModal = (stage: Stage): void => {
  form.value = { name: stage.name, id: stage.id };
  showDeleteStageModal.value = true;
};

const openAddSubjectModal = (): void => {
  form.value = { subjectName: '', stage_id: selectedStage.value?.id || '' };
  isEditMode.value = false;
  showAddEditSubjectModal.value = true;
};

const openEditSubjectModal = (subject: Subject): void => {
  form.value = { subjectName: subject.subjectName, stage_id: subject.stage_id, id: subject.id };
  isEditMode.value = true;
  showAddEditSubjectModal.value = true;
};

const openDeleteSubjectModal = (subject: Subject): void => {
  form.value = { subjectName: subject.subjectName, id: subject.id };
  showDeleteSubjectModal.value = true;
};

const openAddUnitModal = (subject: Subject): void => {
  form.value = { unitName: '', subject_id: subject.id };
  isEditMode.value = false;
  showAddEditUnitModal.value = true;
};

const openEditUnitModal = (unit: Unit): void => {
  form.value = { unitName: unit.unitName, subject_id: unit.subject_id, id: unit.id };
  isEditMode.value = true;
  showAddEditUnitModal.value = true;
};

const openDeleteUnitModal = (unit: Unit): void => {
  form.value = { unitName: unit.unitName, id: unit.id };
  showDeleteUnitModal.value = true;
};

const closeModal = (): void => {
  showDeleteInstituteModal.value = false;
  showAddEditInstituteModal.value = false;
  showAddEditStageModal.value = false;
  showDeleteStageModal.value = false;
  showAddEditSubjectModal.value = false;
  showDeleteSubjectModal.value = false;
  showAddEditUnitModal.value = false;
  showDeleteUnitModal.value = false;
  form.value = {};
  isEditMode.value = false;
};

const handleSubmitInstitute = async (): Promise<void> => {
  if (!form.value.name?.trim()) {
    showToastMessage('error', 'يرجى إدخال اسم المعهد');
    return;
  }
  try {
    await submitInstitute(form.value, isEditMode.value);
    showAddEditInstituteModal.value = false;
    form.value = {};
    await fetchData();
  } catch (err) {
    // Error handled in submitInstitute
  }
};

const handleConfirmDeleteInstitute = async (): Promise<void> => {
  try {
    await confirmDeleteInstitute(Number(form.value.id));
    showDeleteInstituteModal.value = false;
    form.value = {};
    await fetchData();
  } catch (err) {
    // Error handled in confirmDeleteInstitute
  }
};

const handleSubmitStage = async (): Promise<void> => {
  if (!form.value.name?.trim()) {
    showToastMessage('error', 'يرجى إدخال اسم المرحلة');
    return;
  }
  try {
    await submitStage(form.value, isEditMode.value);
    showAddEditStageModal.value = false;
    form.value = {};
    await fetchData();
  } catch (err) {
    // Error handled in submitStage
  }
};

const handleConfirmDeleteStage = async (): Promise<void> => {
  try {
    await confirmDeleteStage(Number(form.value.id));
    showDeleteStageModal.value = false;
    form.value = {};
    await fetchData();
  } catch (err) {
    // Error handled in confirmDeleteStage
  }
};

const handleSubmitSubject = async (): Promise<void> => {
  if (!form.value.subjectName?.trim()) {
    showToastMessage('error', 'يرجى إدخال اسم المادة');
    return;
  }
  if (!form.value.stage_id) {
    showToastMessage('error', 'يرجى اختيار المرحلة');
    return;
  }
  try {
    await submitSubject(form.value, isEditMode.value);
    showAddEditSubjectModal.value = false;
    form.value = {};
    if (selectedStage.value) {
      subjects.value = await fetchSubjects(selectedStage.value.id);
    }
  } catch (err) {
    // Error handled in submitSubject
  }
};

const handleConfirmDeleteSubject = async (): Promise<void> => {
  try {
    await confirmDeleteSubject(Number(form.value.id));
    showDeleteSubjectModal.value = false;
    form.value = {};
    if (selectedStage.value) {
      subjects.value = await fetchSubjects(selectedStage.value.id);
    }
  } catch (err) {
    // Error handled in confirmDeleteSubject
  }
};

const handleSubmitUnit = async (): Promise<void> => {
  if (!form.value.unitName?.trim()) {
    showToastMessage('error', 'يرجى إدخال اسم الفصل');
    return;
  }
  if (!form.value.subject_id) {
    showToastMessage('error', 'يرجى اختيار المادة');
    return;
  }
  try {
    await submitUnit(form.value, isEditMode.value);
    showAddEditUnitModal.value = false;
    form.value = {};
    if (selectedStage.value) {
      subjects.value = await fetchSubjects(selectedStage.value.id);
    }
  } catch (err) {
    // Error handled in submitUnit
  }
};

const handleConfirmDeleteUnit = async (): Promise<void> => {
  try {
    await confirmDeleteUnit(Number(form.value.id));
    showDeleteUnitModal.value = false;
    form.value = {};
    if (selectedStage.value) {
      subjects.value = await fetchSubjects(selectedStage.value.id);
    }
  } catch (err) {
    // Error handled in confirmDeleteUnit
  }
};

// Lifecycle Hooks
onMounted(async () => {
  await fetchData();
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* Custom Scrollbar */
.scrollbar-thin {
  scrollbar-width: thin;
}
.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
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
button:not(.stage-button) {
  padding: 0.75rem 1.5rem;
}
button:not(.stage-button):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
button:not(.stage-button):focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.4);
  transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover and Focus Effects for Stage Buttons */
.stage-button:hover {
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.stage-button:focus {
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
@media (max-width: 768px) {
  .container {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  ul {
    padding: 0.5rem;
  }
  button:not(.stage-button) {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
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
}

@media (max-width: 480px) {
  button:not(.stage-button) {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
  }
}
</style>