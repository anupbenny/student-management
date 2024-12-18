import { createAction, props } from '@ngrx/store';
import { Student } from '../../../app.model';

export const loadStudents = createAction('[Student] Load Students');
export const loadStudentsSuccess = createAction('[Student] Load Students Success', props<{ list: Student[] }>());
export const loadStudentsFailure = createAction('[Student] Load Students Failure', props<{ errorMsg: string }>());

export const addStudent = createAction('[Student] Add Student', props<{ student: Student }>());
export const addStudentSuccess = createAction('[Student] Add Student Success', props<{ student: Student }>());

export const updateStudent = createAction('[Student] Update Student', props<{ studentId: number, student: Student }>());
export const updateStudentSuccess = createAction('[Student] Update Student Success', props<{ student: Student }>());

export const removeStudent = createAction('[Student] Remove Student', props<{ studentId: number }>());
export const removeStudentSuccess = createAction('[Student] Remove Student Success', props<{ studentId: number }>());

export const enrollStudent = createAction('[Student] Enroll Student', props<{ studentId: number; courseId: number }>());

export const notify = createAction('notification');
