import api from '@/services/api';
import { useToast } from '../../composables/useToast.ts';

const { showToastMessage } = useToast();


export const fetchCourses = async () => {
  try {
    const response = await api.get('/courses');
    return response.data.data;
  } catch (err) {
    console.error('خطأ في جلب الدورات:', err);
    throw err;
  }
};

export const fetchUnits = async (subjectName: string) => {
  if (!subjectName) return [];
  try {
    const res = await api.get(`/units?filter[subject.subjectName]=${encodeURIComponent(subjectName)}`);
    return res.data.data;
  } catch (err) {
    console.error('خطأ في جلب الوحدات:', err);
    return [];
  }
};

export const fetchLectures = async (unitName: string) => {
  if (!unitName) return [];
  try {
    const res = await api.get(`/lectures?filter[unit.UnitName]=${encodeURIComponent(unitName)}`);
    return res.data.data;
  } catch (err) {
    console.error('خطأ في جلب الدروس:', err);
    return [];
  }
};

export const getInstitutes = async () => {
  try {
    const response = await api.get('/institutes');
    return response.data.data;
  } catch (err) {
    showToastMessage('error', 'حدث خطأ أثناء جلب المعاهد');
    throw err;
  }
};

export const getStages = async () => {
  try {
    const response = await api.get('/stages');
    return response.data.data;
  } catch (err) {
    showToastMessage('error', 'حدث خطأ أثناء جلب المراحل');
    throw err;
  }
};

export const getTeachers = async () => {
  try {
    const response = await api.get('/teachers');
    return response.data.data;
  } catch (err) {
    showToastMessage('error', 'حدث خطأ أثناء جلب المعلمين');
    throw err;
  }
};

export const fetchSubjects = async () => {
  try {
    const response = await api.get(`/subjects`);
    return response.data.data;
  } catch (err) {
    showToastMessage('error', 'حدث خطأ أثناء جلب بيانات المواد');
    throw err;
  }
};

export const submitCourse = async (form:any, isEditMode:boolean) => {
  try {
    const requiredFields = ['CourseName', 'Subject_id', 'Institute_id', 'Stage_id', 'Teacher_id', 'Course_price', 'Course_date'];
    const missingFields = requiredFields.filter(field => !form[field] && form[field] !== 0);
    if (missingFields.length > 0) {
      showToastMessage('error', 'يرجى ملء جميع الحقول المطلوبة: ' + missingFields.join(', '));
      throw new Error('حقول مفقودة: ' + missingFields.join(', '));
    }

    if (isEditMode) {
      const response = await api.put(`/courses/${form.id}`, form);
      showToastMessage('success', 'تم تحديث بيانات الكورس بنجاح');
      return response.data;
    } else {
      const response = await api.post('/courses', form);
      showToastMessage('success', 'تم إضافة الكورس بنجاح');
      return response.data;
    }
  } catch (err) {
    showToastMessage('error', 'حدث خطأ أثناء العملية');
    throw err;
  }
};

export const confirmDeleteCourse = async (courseId:any) => {
  try {
    const response = await api.delete(`/courses/${courseId}`);
    showToastMessage('success', 'تم حذف الكورس بنجاح');
    return response.data;
  } catch (err) {
    showToastMessage('error', 'حدث خطأ أثناء العملية');
    throw err;
  }
};

export const submitUnit = async (form: any, isEditMode: boolean) => {
  try {
    if (isEditMode) {
      const response = await api.put(`/units/${form.id}`, form);
      showToastMessage('success', 'تم تحديث بيانات الوحدة بنجاح');
      return response.data;
    } else {
      const response = await api.post('/units', form);
      showToastMessage('success', 'تم إضافة وحدة جديدة إلى الدورة');
      return response.data;
    }
  } catch (err) {
    console.error('خطأ في حفظ الوحدة:', err);
    showToastMessage('error', 'حدث خطأ أثناء العملية');
    throw err;
  }
};

export const confirmDeleteUnit = async (unitId:number) => {
  try {
    const id = unitId;
    const response = await api.delete(`/units/${id}`);
    showToastMessage('success', 'تم حذف الوحدة بنجاح');
    return response.data;
  } catch (err) {
    console.error('خطأ في حذف الوحدة:', err);
    showToastMessage('error', 'حدث خطأ أثناء العملية');
    throw err;
  }
};

export const submitLecture = async (form:any, isEditMode:boolean) => {
  try {
    if (isEditMode) {
      const response = await api.put(`/lectures/${form.id}`, form);
      showToastMessage('success', 'تم تحديث بيانات المحاضرة بنجاح');
      return response.data;
    } else {
      const response = await api.post('/lectures', form);
      showToastMessage('success', 'تم إضافة الدرس بنجاح');
      return response.data;
    }
  } catch (err) {
    showToastMessage('error', 'حدث خطأ أثناء العملية');
    throw err;
  }
};

export const confirmDeleteLecture = async (lectureId:any) => {
  try {
    const response = await api.delete(`/lectures/${lectureId}`);
    showToastMessage('success', 'تم حذف بيانات الدرس بنجاح');
    return response.data;
  } catch (err) {
    console.error('خطأ في حذف الدرس:', err);
    showToastMessage('error', 'حدث خطأ أثناء العملية');
    throw err;
  }
};

export const fetchLectureAttachments = async (lectId: any) => {
  try {
    const response = await api.get(`/lecture-attachments?lect_id=${lectId}`);
    return response.data.data || [];
  } catch (err) {
    showToastMessage('error', 'حدث خطأ أثناء جلب المرفقات');
    console.error(err);
    return [];
  }
};