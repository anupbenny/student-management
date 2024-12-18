import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { StudentService } from '../../../services/student.service'; // Assuming you have this service for API calls
import * as StudentActions from './student.actions';
import { NotificationService } from '../../../services/notification.service';

@Injectable()
export class StudentEffects {
  actions$ = inject(Actions);
  studentService = inject(StudentService);
  notificationService = inject(NotificationService);

  loadAllStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.loadStudents),
      mergeMap(() =>
        this.studentService.getStudents().pipe(
          map((data) => StudentActions.loadStudentsSuccess({ list: data })),
          catchError((error) => {
            console.error('Error loading students:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return of(StudentActions.loadStudentsFailure({ errorMsg: errorMessage }));
          })
        )
      )
    )
  }
  )

  removeStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.removeStudent),
      switchMap((action) =>
        this.studentService.deleteStudent(action.studentId).pipe(
          switchMap((data) => of(
            StudentActions.removeStudentSuccess({ studentId: action.studentId }),
            this.notify('Student record deleted successfully', 'success')
          )),
            catchError((error) => {
              console.error('Error removing student:', error);
              const errorMessage = error instanceof Error ? error.message : 'Unknown error';
              return of(this.notify(errorMessage, 'failure'));
            })
          )
        )
      )
  }
  )

  addStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.addStudent),
      switchMap((action) =>
        this.studentService.addStudent(action.student).pipe(
          switchMap((data) => of(
            StudentActions.addStudentSuccess({ student: data }),
            this.notify('Student record added successfully', 'success')
          )),
            catchError((error) => {
              console.error('Error adding student:', error);
              const errorMessage = error instanceof Error ? error.message : 'Unknown error';
              return of(this.notify(errorMessage, 'failure'));
            })
          )
        )
      )
  }
  )

  updateStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.updateStudent),
      switchMap((action) =>
        this.studentService.updateStudent(action.studentId, action.student).pipe(
          switchMap((data) => of(
            StudentActions.updateStudentSuccess({ student: data }),
            this.notify('Student record updated successfully', 'success')
          )),
            catchError((error) => {
              console.error('Error updating student:', error);
              const errorMessage = error instanceof Error ? error.message : 'Unknown error';
              return of(this.notify(errorMessage, 'failure'));
            })
          )
        )
      )
  }
  )

  notify(message: string, severity: string) {
    this.notificationService.showMessage(message, severity);
    return StudentActions.notify();
  }

  // constructor(private actions$: Actions, private studentService: StudentService) {}
}