import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.state';

export const selectCourseState = createFeatureSelector<CourseState>('course');

export const selectAllCourses = createSelector(selectCourseState, (state) => state.list);

export const selectCoursesCount = createSelector(selectCourseState, (state) => state.list.length);

export const selectCourseById = (courseId: number) =>
  createSelector(selectCourseState, (courseState: CourseState) => courseState.list.find(course => course.id === courseId)
);

export const selectCourseLoading = createSelector(selectCourseState, (courseState: CourseState) => courseState.loading);

export const selectCourseError = createSelector(selectCourseState, (courseState: CourseState) => courseState.errorMsg);