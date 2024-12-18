import { createReducer, on } from '@ngrx/store';
import * as CourseActions from './course.actions';
import { initialState } from './course.state';

export const _courseReducer = createReducer(
  initialState,

  on(CourseActions.loadCourses, (state) => ({...state, loading: true})),
  
  on(CourseActions.loadCoursesSuccess, (state, { list }) => ({
    ...state,
    list,
    loading: false,
  })),
  
  on(CourseActions.loadCoursesFailure, (state, { errorMsg }) => ({
    ...state,
    list: [],
    errorMsg,
    loading: false,
  })),
  
  on(CourseActions.removeCourseSuccess, (state, { courseId }) => ({
    ...state,
    list: state.list.filter(course => course.id !== courseId),
  })),

  on(CourseActions.addCourseSuccess, (state, { course }) => ({
    ...state,
    list: [...state.list, course],
  })),

  on(CourseActions.updateCourseSuccess, (state, { course }) => ({
    ...state,
    list: state.list.map(s => s.id === course.id ? course : s),
  })),
/*
  on(CourseActions.enrollStudent, (state, { courseId, courseId }) => ({
    ...state,
    list: state.list.map(course =>
      course.id === courseId ? { ...course, courses: [...course.courses, courseId] } : course
    ),
  })),
  */
);

export function courseReducer (state: any, action: any) {
  return _courseReducer(state, action);
} 

