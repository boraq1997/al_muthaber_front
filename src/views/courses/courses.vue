<template>  <!-- Breadcrumb + Actions -->
  <div class="flex justify-between items-center mb-4">

    <div class="flex items-center gap-2">
      <button
        @click="showAddStudentToCourseModel"
        class="flex focus:outline-none items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 mb-2 rounded shadow transition">
        <font-awesome-icon icon="fa-user-plus" />
        إضافة طلاب للدورات
      </button>

      <button 
        @click="openModal(false)"
        type="button"
        class="focus:outline-none text-white focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        style="background: #6f225e">
        <font-awesome-icon icon="fa-plus" />
        إضافة دورة جديدة
      </button>
    </div>
  </div>

  <!-- Courses Table -->
  <div class="relative overflow-x-auto shadow-lg rounded-xl">
    <table class="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800">
        <thead class="text-xs text-white uppercase" style="background: #6f225e">
            <tr>
                <th scope="col" class="px-6 py-4 font-semibold">
                    #
                </th>
                <th scope="col" class="px-6 py-4 font-semibold">
                    اسم الدورة
                </th>
                <th scope="col" class="px-6 py-4 font-semibold">
                    اسم الاستاذ
                </th>
                <th scope="col" class="px-6 py-4 font-semibold">
                    تاريخ الدورة
                </th>
                <th scope="col" class="px-6 py-4 font-semibold">
                    السعر
                </th>
                <th scope="col" class="px-6 py-4 font-semibold">
                    المادة
                </th>
                <th scope="col" class="px-6 py-4 font-semibold">
                    المرحلة
                </th>
                <th scope="col" class="px-6 py-4 font-semibold">
                    المعهد
                </th>
                <th scope="col" class="px-6 py-4 font-semibold">
                    تاريخ الإضافة
                </th>
                <th scope="col" class="px-6 py-4 font-semibold">
                    الإدارة
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(course, index) in allCourses" :key="course.id" class="odd:bg-white odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4">
                    {{ index + 1 }}
                </td>
                <td class="px-6 py-4">
                    {{ course.CourseName }}
                </td>
                <td class="px-6 py-4">
                    {{ course.teacher_name }}
                </td>
                <td class="px-6 py-4">
                    {{ course.Course_date }}
                </td>
                <td class="px-6 py-4">
                    {{ course.Course_price }}
                </td>
                <td class="px-6 py-4">
                    {{ course.subject_name }}
                </td>
                <td class="px-6 py-4">
                    {{ course.stage_name }}
                </td>
                <td class="px-6 py-4">
                    {{ course.institute_name }}
                </td>
                <td class="px-6 py-4">
                    {{ course.created_at }}
                </td>
                <td class="px-6 py-4 relative">
                  <div class="flex justify-center">
                      <button
                          @click.stop="toggleOptions(index)"
                          class="inline-flex items-center p-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          type="button"
                          :ref="el => { if (el) dropdownButton[index] = el }"
                      >
                          <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="w-4 h-4"/>
                      </button>

                      <div
                          v-show="activeOptions === index"
                          class="z-50 absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 dark:divide-gray-700 origin-top-right transition-all duration-100"
                          :class="{'scale-95 opacity-0': activeOptions !== index, 'scale-100 opacity-100': activeOptions === index}"
                          :ref="el => { if (el) dropdownMenu[index] = el }"
                      >
                        <div class="py-1">
                            <button
                                @click.stop="startEdit(course)"
                                class="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                                <font-awesome-icon icon="fa-solid fa-pen-to-square" class="mr-2 text-blue-500 w-4 h-4"/>
                                تعديل
                            </button>
                            <button
                                @click.stop="confirmDelete(course.id)"
                                class="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                                <font-awesome-icon icon="fa-solid fa-trash-alt" class="mr-2 text-red-500 w-4 h-4"/>
                                حذف
                            </button>
                        </div>
                      </div>
                  </div>
                </td>
            </tr>
        </tbody>
    </table>
  </div>

  <!-- Add/Edit Course Modal -->
<div v-if="showAddEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
  <div class="relative w-full max-w-2xl mx-4">
    <!-- Modal Container -->
    <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
      
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          <font-awesome-icon :icon="isEditMode ? 'fa-solid fa-pen-to-square' : 'fa-solid fa-plus'" class="mr-2" />
          {{ isEditMode ? 'تعديل الدورة' : 'إضافة دورة جديدة' }}
        </h3>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
          <font-awesome-icon icon="fa-solid fa-times" class="text-lg" />
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
        <form>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Course Name -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">اسم الدورة</label>
              <div class="relative">
                <input 
                  v-model="courseForm.courseName" 
                  type="text" 
                  required 
                  placeholder="اسم الدورة"
                  class="w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <font-awesome-icon icon="fa-text-width" class="text-gray-400" />
                </div>
              </div>
            </div>

            <!-- Course Price -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">سعر الدورة</label>
              <div class="relative">
                <input 
                  v-model="courseForm.coursePrice" 
                  type="number" 
                  required 
                  placeholder="سعر الدورة"
                  class="w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <font-awesome-icon icon="fa-wallet" class="text-gray-400" />
                </div>
              </div>
            </div>

            <!-- Course Date -->
            <div class="space-y-2 md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">تاريخ الدورة</label>
              <div class="relative">
                <input 
                  v-model="courseForm.courseDate" 
                  type="date" 
                  required 
                  placeholder="تاريخ الدورة"
                  class="w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <font-awesome-icon icon="fa-calendar-days" class="text-gray-400" />
                </div>
              </div>
            </div>

            <!-- Teacher Select -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">استاذ المادة</label>
              <div class="relative">
                <select 
                  v-model="courseForm.teacherName"
                  class="w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                >
                  <option value="" disabled selected>اختر استاذ المادة</option>
                  <option v-for="item in allTeachers" :key="item.id" :value="item.id">
                    {{ item.FullName }}
                  </option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <font-awesome-icon icon="fa-user-tie" class="text-gray-400" />
                </div>
              </div>
            </div>

            <!-- Institute Select -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">المعهد</label>
              <div class="relative">
                <select 
                  v-model="courseForm.instituteId"
                  class="w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                >
                  <option value="" disabled selected>اختر المعهد</option>
                  <option v-for="item in allInstitute" :key="item.id" :value="item.id">
                    {{ item.name }}
                  </option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <font-awesome-icon icon="fa-school" class="text-gray-400" />
                </div>
              </div>
            </div>

            <!-- Subject Select -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">المادة</label>
              <div class="relative">
                <select 
                  v-model="courseForm.subject"
                  class="w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                >
                  <option value="" disabled selected>اختر المادة</option>
                  <option v-for="item in allSubjects" :key="item.id" :value="item.id">
                    {{ item.subjectName }}
                  </option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <font-awesome-icon icon="fa-users-viewfinder" class="text-gray-400" />
                </div>
              </div>
            </div>

            <!-- Stage Select -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">المرحلة</label>
              <div class="relative">
                <select 
                  v-model="courseForm.stage"
                  class="w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                >
                  <option value="" disabled selected>اختر المرحلة</option>
                  <option v-for="item in allStages" :key="item.id" :value="item.id">
                    {{ item.name }}
                  </option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <font-awesome-icon icon="fa-people-roof" class="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- Modal Footer -->
      <div class="flex items-center justify-end px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <button
          @click="closeModal"
          type="button"
          class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mr-3"
        >
          إلغاء
        </button>
        <button
          @click.prevent="handleSubmit"
          type="submit"
          class="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-md shadow-sm hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          <font-awesome-icon icon="fa-solid fa-save" class="mr-2" />
          {{ isEditMode ? 'حفظ التعديلات' : 'إضافة جديد' }}
        </button>
      </div>
    </div>
  </div>
</div>

  <!-- Add Students to Courses Modal -->
<div v-if="addNewStudentToCourses" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
  <div class="relative w-full max-w-2xl mx-4">
    <!-- Modal Container -->
    <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
      
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          <font-awesome-icon icon="fa-solid fa-users" class="mr-2" />
          إضافة طلاب إلى الدورات
        </h3>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
          <font-awesome-icon icon="fa-solid fa-times" class="text-lg" />
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
        <!-- Filters Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Institute Select -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">المعهد</label>
            <div class="relative">
              <select 
                v-model="studentsCourse.instituteId"
                @change="onInstituteSelected"
                class="w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              >
                <option value="" disabled selected>اختر المعهد</option>
                <option v-for="item in allInstitute" :key="item.id" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <font-awesome-icon icon="fa-school" class="text-gray-400" />
              </div>
            </div>
          </div>

          <!-- Stage Select -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">المرحلة</label>
            <div class="relative">
              <select 
                v-model="studentsCourse.stageId"
                @change="onStageSelected"
                class="w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              >
                <option value="" disabled selected>اختر المرحلة</option>
                <option v-for="item in allStages" :key="item.id" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <font-awesome-icon icon="fa-people-roof" class="text-gray-400" />
              </div>
            </div>
          </div>

          <!-- Subject Select (Full Width) -->
          <div class="space-y-2 md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">المادة</label>
            <div class="relative">
              <select 
                v-model="studentsCourse.subjectId"
                @change="onSubjectSelected"
                class="w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              >
                <option value="" disabled selected>اختر المادة</option>
                <option v-for="item in allSubjects" :key="item.id" :value="item.id">
                  {{ item.subjectName }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <font-awesome-icon icon="fa-users-viewfinder" class="text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <!-- Courses Selector -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">الدورات</label>
          <div class="relative">
            <div class="flex flex-wrap gap-2 p-3 min-h-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent">
              <span 
                v-for="course in selectedCourses" 
                :key="course.id"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
              >
                {{ course.label }}
                <button 
                  @click="removeCourse(course.id)"
                  type="button"
                  class="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                >
                  &times;
                </button>
              </span>
              <input
                v-model="courseSearchQuery"
                @input="filterCourses"
                @focus="showCourseDropdown = true"
                @blur="hideCourseDropdown"
                :disabled="courseDisabled"
                placeholder="ابحث عن الدورات..."
                class="flex-1 min-w-[100px] bg-transparent outline-none text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 text-sm"
              />
            </div>
            
            <!-- Courses Dropdown -->
            <div 
              v-if="showCourseDropdown && filteredCourses.length"
              class="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <ul class="py-1">
                <li 
                  v-for="course in filteredCourses"
                  :key="course.id"
                  @click="addCourse(course)"
                  class="px-3 py-2 text-sm text-gray-900 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900 cursor-pointer"
                >
                  {{ course.label }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Students Selector -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">الطلاب</label>
          <div class="relative">
            <div class="flex flex-wrap gap-2 p-3 min-h-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent">
              <span 
                v-for="student in selectedStudents" 
                :key="student.id"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
              >
                {{ student.label }}
                <button 
                  @click="removeStudent(student.id)"
                  type="button"
                  class="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  &times;
                </button>
              </span>
              <input
                v-model="studentSearchQuery"
                @input="filterStudents"
                @focus="showStudentDropdown = true"
                @blur="hideStudentDropdown"
                :disabled="studentsDisabled"
                placeholder="ابحث عن الطلاب..."
                class="flex-1 min-w-[100px] bg-transparent outline-none text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 text-sm"
              />
            </div>
            
            <!-- Students Dropdown -->
            <div 
              v-if="showStudentDropdown && filteredStudents.length"
              class="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <ul class="py-1">
                <li 
                  v-for="student in filteredStudents"
                  :key="student.id"
                  @click="addStudent(student)"
                  class="px-3 py-2 text-sm text-gray-900 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer"
                >
                  {{ student.label }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div 
          v-if="studentsCourse.studentsName.length && studentsCourse.coursesName.length"
          class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <font-awesome-icon icon="fa-solid fa-info-circle" class="mr-2 text-blue-500" />
            <span>
              سيتم إضافة <span class="font-bold">{{ studentsCourse.studentsName.length }}</span> طالب إلى 
              <span class="font-bold">{{ studentsCourse.coursesName.length }}</span> دورة
              (إجمالي <span class="font-bold">{{ studentsCourse.studentsName.length * studentsCourse.coursesName.length }}</span> عملية إضافة)
            </span>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="flex items-center justify-end px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <button
          @click="closeModal"
          type="button"
          class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mr-3"
        >
          إلغاء
        </button>
        <button
          @click="handleSubmit"
          type="button"
          :disabled="!studentsCourse.studentsName.length || !studentsCourse.coursesName.length"
          class="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-md shadow-sm hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <font-awesome-icon icon="fa-solid fa-save" class="mr-2" />
          تأكيد الإضافة
        </button>
      </div>
    </div>
  </div>
</div>

  <!-- Delete Confirmation Modal -->
  <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
  <div class="relative w-full max-w-md mx-4">
    <!-- Modal Container -->
    <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 animate-fade-in">
      
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          <font-awesome-icon icon="fa-solid fa-user-shield" class="mr-2 text-red-500" />
          تأكيد حذف الدورة
        </h3>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
          <font-awesome-icon icon="fa-solid fa-times" class="text-lg" />
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 space-y-4 text-right">
        <div class="mx-auto text-red-500 w-16 h-16 flex items-center justify-center">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
        </div>
        
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">هل أنت متأكد من حذف بيانات الدورة؟</h3>
        <p class="text-gray-600 dark:text-gray-400">
          سيتم حذف جميع البيانات المرتبطة بهذه الدورة بشكل دائم.
        </p>
        <p class="text-sm text-red-500 dark:text-red-400">
          <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="mr-1" />
          لا يمكن التراجع عن هذه العملية بعد التنفيذ.
        </p>
      </div>

      <!-- Modal Footer -->
      <div class="flex items-center justify-end px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 space-x-3">
        <button
          @click="closeModal"
          type="button"
          class="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          إلغاء
        </button>
        <button
          @click="deleteCourse"
          type="button"
          class="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md shadow-sm hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
        >
          <font-awesome-icon icon="fa-solid fa-trash-can" class="mr-2" />
          تأكيد الحذف
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import api from '@/services/api'
import { formatDateTime } from '../../utils/DateFormat'

// Refs
const allCourses = ref([])
const toastMessage = ref('')
const toastType = ref('')
const showToast = ref(false)
const dropdownButton = ref([])
const dropdownMenu = ref([])
const courseID = ref(null)
const activeOptions = ref(null)
const allTeachers = ref([])
const allSubjects = ref([])
const allStages = ref([])
const allInstitute = ref([])
const showAddEditModal = ref(false)
const isEditMode = ref(false)
const showDeleteModal = ref(false)
const addNewStudentToCourses = ref(false)
const studentsDisabled = ref(true)
const courseDisabled = ref(true)
const allStudents = ref([])
const allCoursesAvailable = ref([])

// Tags Input Refs for Courses
const courseSearchQuery = ref('')
const showCourseDropdown = ref(false)
const selectedCourses = ref([])

// Tags Input Refs for Students
const studentSearchQuery = ref('')
const showStudentDropdown = ref(false)
const selectedStudents = ref([])

// Forms
const courseForm = ref({
  courseName: '',
  coursePrice: '',
  courseDate: '',
  teacherName: '',
  instituteId: '',
  subject: '',
  stage: ''
})

const studentsCourse = ref({
  instituteId: '',
  instituteName: '',
  stageId: '',
  stageName: '',
  subjectId: '',
  subjectName: '',
  studentsName: [],
  coursesName: []
})

// Tags Input Logic for Courses
watch(
  () => studentsCourse.value.coursesName,
  (newValue) => {
    selectedCourses.value = allCoursesAvailable.value
      .filter((option) => newValue.includes(option.id))
      .map((option) => ({
        id: option.id,
        label: option.label,
      }))
  },
  { immediate: true }
)

const filteredCourses = computed(() => {
  return allCoursesAvailable.value
    .filter(
      (option) =>
        !selectedCourses.value.some((item) => item.id === option.id) &&
        option.label.toLowerCase().includes(courseSearchQuery.value.toLowerCase())
    )
    .map((option) => ({
      id: option.id,
      label: option.label,
    }))
})

const addCourse = (option) => {
  selectedCourses.value.push(option)
  studentsCourse.value.coursesName = selectedCourses.value.map((item) => item.id)
  courseSearchQuery.value = ''
}

const removeCourse = (id) => {
  selectedCourses.value = selectedCourses.value.filter((item) => item.id !== id)
  studentsCourse.value.coursesName = selectedCourses.value.map((item) => item.id)
}

const filterCourses = () => {
  showCourseDropdown.value = true
}

const hideCourseDropdown = () => {
  setTimeout(() => {
    showCourseDropdown.value = false
  }, 200)
}

// Tags Input Logic for Students
watch(
  () => studentsCourse.value.studentsName,
  (newValue) => {
    selectedStudents.value = allStudents.value
      .filter((option) => newValue.includes(option.id))
      .map((option) => ({
        id: option.id,
        label: option.label,
      }))
  },
  { immediate: true }
)

const filteredStudents = computed(() => {
  return allStudents.value
    .filter(
      (option) =>
        !selectedStudents.value.some((item) => item.id === option.id) &&
        option.label.toLowerCase().includes(studentSearchQuery.value.toLowerCase())
    )
    .map((option) => ({
      id: option.id,
      label: option.label,
    }))
})

const addStudent = (option) => {
  selectedStudents.value.push(option)
  studentsCourse.value.studentsName = selectedStudents.value.map((item) => item.id)
  studentSearchQuery.value = ''
}

const removeStudent = (id) => {
  selectedStudents.value = selectedStudents.value.filter((item) => item.id !== id)
  studentsCourse.value.studentsName = selectedStudents.value.map((item) => item.id)
}

const filterStudents = () => {
  showStudentDropdown.value = true
}

const hideStudentDropdown = () => {
  setTimeout(() => {
    showStudentDropdown.value = false
  }, 200)
}

// Functions
const showToastMessage = (type, message) => {
  toastType.value = type
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => showToast.value = false, 5000)
}

const toggleOptions = (index) => {
  if (activeOptions.value === index) {
    activeOptions.value = null
  } else {
    activeOptions.value = index
  }
}

const handleClickOutside = (event) => {
  // Check if click is outside all dropdown buttons and menus
  const clickedOutside = !dropdownButton.value.some(btn => 
    btn && btn.contains(event.target)
  ) && !dropdownMenu.value.some(menu => 
    menu && menu.contains(event.target)
  )
  
  if (clickedOutside) {
    activeOptions.value = null
  }
}

// Course CRUD Operations
const fetchCourses = async () => {
  try {
    const response = await api.get('/courses')
    allCourses.value = response.data.data
  } catch (err) {
    showToastMessage('danger', 'حدث خطأ أثناء جلب بيانات الدورات')
    console.error(err)
  }
}

const openModal = async (editMode = false) => {
  isEditMode.value = editMode
  if (!editMode) resetForm()
  showAddEditModal.value = true
  await getAllTeachers()
  await getAllSubjects()
  await getAllStages()
  await getAllInstitute()
}

const startEdit = (course) => {
  courseForm.value = {
    courseName: course.CourseName,
    coursePrice: course.Course_price,
    courseDate: course.Course_date,
    teacherName: course.Teacher_id,
    instituteId: course.Institute_id,
    subject: course.Subject_id,
    stage: course.Stage_id
  }
  courseID.value = course.id
  openModal(true)
}

const handleSubmit = async () => {
  if (addNewStudentToCourses.value) {
    await addStudentsToCourse()
  } else {
    await submitCourseForm()
  }
}

const submitCourseForm = async () => {
  try {
    const payload = {
      CourseName: courseForm.value.courseName,
      Course_price: courseForm.value.coursePrice,
      Course_date: courseForm.value.courseDate,
      Teacher_id: courseForm.value.teacherName,
      Institute_id: courseForm.value.instituteId,
      Subject_id: courseForm.value.subject,
      Stage_id: courseForm.value.stage
    }

    if (isEditMode.value) {
      await api.put(`/courses/${courseID.value}`, payload)
      showToastMessage('success', 'تم تعديل الدورة بنجاح')
    } else {
      await api.post('/courses', payload)
      showToastMessage('success', 'تم إضافة الدورة بنجاح')
    }

    await fetchCourses()
    closeModal()
    resetForm()
  } catch (err) {
    showToastMessage('danger', 'حدث خطأ أثناء حفظ البيانات')
    console.error(err)
  }
}

const confirmDelete = (id) => {
  courseID.value = id
  showDeleteModal.value = true
}

const deleteCourse = async () => {
  try {
    await api.delete(`/courses/${courseID.value}`)
    await fetchCourses()
    showToastMessage('success', 'تم حذف الدورة بنجاح')
    closeModal()
  } catch (err) {
    showToastMessage('danger', 'حدث خطأ أثناء حذف الدورة')
    console.error(err)
  }
}

const resetForm = () => {
  courseForm.value = {
    courseName: '',
    coursePrice: '',
    courseDate: '',
    teacherName: '',
    instituteId: '',
    subject: '',
    stage: ''
  }
  courseID.value = null
}

// Students to Courses Operations
const showAddStudentToCourseModel = async () => {
  addNewStudentToCourses.value = true
  await getAllInstitute()
  await getAllStages()
  await getAllSubjects()
}

const onInstituteSelected = () => {
  const selected = allInstitute.value.find(i => i.id == studentsCourse.value.instituteId)
  if (selected) {
    studentsCourse.value.instituteName = selected.name
  }
  resetStudentsForm()
}

const onStageSelected = () => {
  const selected = allStages.value.find(i => i.id == studentsCourse.value.stageId)
  if (selected) {
    studentsCourse.value.stageName = selected.name
  }
  studentsCourse.value.subjectId = ''
  studentsCourse.value.subjectName = ''
  studentsCourse.value.studentsName = []
  studentsCourse.value.coursesName = []
  studentsDisabled.value = true
  courseDisabled.value = true
}

const onSubjectSelected = async () => {
  const selected = allSubjects.value.find(i => i.id == studentsCourse.value.subjectId)
  if (selected) {
    studentsCourse.value.subjectName = selected.subjectName
  }
  studentsCourse.value.studentsName = []
  studentsCourse.value.coursesName = []
  selectedCourses.value = []
  selectedStudents.value = []
  
  try {
    const [courseResponse, studentsResponse] = await Promise.all([
      api.get('/courses', {
        params: {
          'filter[subject.subjectName]': studentsCourse.value.subjectName,
          'filter[institute.name]': studentsCourse.value.instituteName,
          'filter[stage.name]': studentsCourse.value.stageName,
          'include': 'teacher'
        }
      }),
      api.get('/students', {
        params: {
          'filter[stage.name]': studentsCourse.value.stageName,
          'include': 'stage'
        }
      })
    ])

    allCoursesAvailable.value = courseResponse.data.data.map(course => ({
      ...course,
      label: `${course.CourseName} - ${course.teacher_name}`
    }))
    allStudents.value = studentsResponse.data.data.map(student => ({
      ...student,
      label: `${student.FullName} - ${student.stage_name}`
    }))
    courseDisabled.value = false
    studentsDisabled.value = false
  } catch (err) {
    showToastMessage('danger', 'حدث خطأ أثناء جلب البيانات')
    console.error(err)
  }
}

const isLoading = ref(false)

const addStudentsToCourse = async () => {
  try {
    // Fix syntax error: Replace Cyrillic 'б' with '.'
    if (!studentsCourse.value.coursesName?.length || !studentsCourse.value.studentsName?.length) {
      showToastMessage('warning', 'يجب اختيار طلاب ودورات على الأقل')
      return
    }

    // Optional: Add loading state
    isLoading.value = true // Assuming you add an isLoading ref

    let addedCount = 0
    const errors = []

    for (const courseId of studentsCourse.value.coursesName) {
      for (const studentId of studentsCourse.value.studentsName) {
        try {
          // Optional: Check for existing assignments (uncomment if needed)
          /*
          const exists = await checkExistingAssignment(courseId, studentId)
          if (exists) {
            errors.push(`الطالب ${studentId} مضاف مسبقًا إلى الدورة ${courseId}`)
            continue
          }
          */

          await api.post('/course-students', {
            course_id: courseId,
            student_id: studentId,
            grade_type: 'default',
            grade_value: 0,
            date: new Date().toISOString().split('T')[0],
            note: 'تم الإضافة عبر النظام'
          })
          addedCount++
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message
          errors.push(`خطأ في إضافة الطالب ${studentId} إلى الدورة ${courseId}: ${errorMessage}`)
          console.error(`Error adding student ${studentId} to course ${courseId}:`, err.response?.data || err)
        }
      }
    }

    // Display appropriate toast message
    if (errors.length > 0) {
      showToastMessage('danger', `تمت إضافة ${addedCount} عملية بنجاح مع ${errors.length} أخطاء: ${errors.join('; ')}`)
    } else {
      showToastMessage('success', `تم إضافة ${addedCount} عملية بنجاح`)
    }

    closeModal()
    resetStudentsForm()
  } catch (err) {
    showToastMessage('danger', `خطأ عام أثناء إضافة الطلاب إلى الدورات: ${err.message}`)
    console.error('General error:', err)
  } finally {
    // Reset loading state
    isLoading.value = false
  }
}

const resetStudentsForm = () => {
  studentsCourse.value = {
    instituteId: '',
    instituteName: '',
    stageId: '',
    stageName: '',
    subjectId: '',
    subjectName: '',
    studentsName: [],
    coursesName: []
  }
  selectedCourses.value = []
  selectedStudents.value = []
  studentsDisabled.value = true
  courseDisabled.value = true
}

const closeModal = () => {
  showAddEditModal.value = false
  showDeleteModal.value = false
  addNewStudentToCourses.value = false
  resetStudentsForm()
}

// Data Fetching
const getAllTeachers = async () => {
  try {
    const response = await api.get('/teachers')
    allTeachers.value = response.data.data
  } catch (err) {
    showToastMessage('danger', 'حدث خطأ أثناء جلب بيانات الأساتذة')
    console.error(err)
  }
}

const getAllSubjects = async () => {
  try {
    const response = await api.get('/subjects')
    allSubjects.value = response.data.data
  } catch (err) {
    showToastMessage('danger', 'حدث خطأ أثناء جلب بيانات المواد')
    console.error(err)
  }
}

const getAllStages = async () => {
  try {
    const response = await api.get('/stages')
    allStages.value = response.data.data
  } catch (err) {
    showToastMessage('danger', 'حدث خطأ أثناء جلب بيانات المراحل')
    console.error(err)
  }
}

const getAllInstitute = async () => {
  try {
    const response = await api.get('/institutes')
    allInstitute.value = response.data.data
  } catch (err) {
    showToastMessage('danger', 'حدث خطأ أثناء جلب بيانات المعاهد')
    console.error(err)
  }
}

// Lifecycle Hooks
onMounted(() => {
  dropdownButton.value = []
  dropdownMenu.value = []
  window.addEventListener('click', handleClickOutside)
  fetchCourses()
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>