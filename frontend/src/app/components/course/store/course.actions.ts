import { createAction, props } from '@ngrx/store';
import { Course } from '../../../app.model';

export const loadCourses = createAction('[Course] Load Courses');
export const loadCoursesSuccess = createAction('[Course] Load Courses Success', props<{ list: Course[] }>());
export const loadCoursesFailure = createAction('[Course] Load Courses Failure', props<{ errorMsg: string }>());

export const addCourse = createAction('[Course] Add Course', props<{ course: Course }>());
export const addCourseSuccess = createAction('[Course] Add Course Success', props<{ course: Course }>());

export const updateCourse = createAction('[Course] Update Course', props<{ courseId: number, course: Course }>());
export const updateCourseSuccess = createAction('[Course] Update Course Success', props<{ course: Course }>());

export const removeCourse = createAction('[Course] Remove Course', props<{ courseId: number }>());
export const removeCourseSuccess = createAction('[Course] Remove Course Success', props<{ courseId: number }>());

export const notify = createAction('notification');
