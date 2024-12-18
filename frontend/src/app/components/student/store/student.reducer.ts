import { createReducer, on } from '@ngrx/store';
import * as StudentActions from './student.actions';
import { initialState } from './student.state';

export const _studentReducer = createReducer(
  initialState,

  on(StudentActions.loadStudents, (state) => ({...state, loading: true})),
  
  on(StudentActions.loadStudentsSuccess, (state, { list }) => ({
    ...state,
    list,
    loading: false,
  })),
  
  on(StudentActions.loadStudentsFailure, (state, { errorMsg }) => ({
    ...state,
    list: [],
    errorMsg,
    loading: false,
  })),
  
  on(StudentActions.removeStudentSuccess, (state, { studentId }) => ({
    ...state,
    list: state.list.filter(student => student.id !== studentId),
  })),

  on(StudentActions.addStudentSuccess, (state, { student }) => ({
    ...state,
    list: [...state.list, student],
  })),

  on(StudentActions.updateStudentSuccess, (state, { student }) => ({
    ...state,
    list: state.list.map(s => s.id === student.id ? student : s),
  })),

  /*
  on(StudentActions.enrollStudent, (state, { studentId, courseId }) => ({
    ...state,
    list: state.list.map(student =>
      student.id === studentId ? { ...student, courses: [...student.courses, courseId] } : student
    ),
  })),
  */
);

export function studentReducer (state: any, action: any) {
  return _studentReducer(state, action);
} 

