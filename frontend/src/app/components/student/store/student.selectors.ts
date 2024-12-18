import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentState } from './student.state';

export const selectStudentState = createFeatureSelector<StudentState>('student');

export const selectAllStudents = createSelector(selectStudentState, (state) => state.list);

export const selectStudentsCount = createSelector(selectStudentState, (state) => state.list.length);

export const selectStudentById = (studentId: number) => 
  createSelector(selectStudentState, (state) => state.list.find(o => o.id === studentId)
);

export const selectStudentLoading = createSelector(selectStudentState, (studentState: StudentState) => studentState.loading);

export const selectStudentError = createSelector(selectStudentState, (studentState: StudentState) => studentState.errorMsg);