import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { CourseService } from '../../../services/course.service'; // Assuming you have this service for API calls
import * as CourseActions from './course.actions';
import { NotificationService } from '../../../services/notification.service';

@Injectable()
export class CourseEffects {
  actions$ = inject(Actions);
  courseService = inject(CourseService);
  notificationService = inject(NotificationService);

  loadAllCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      mergeMap(() =>
        this.courseService.getCourses().pipe(
          map((data) => CourseActions.loadCoursesSuccess({ list: data })),
          catchError((error) => {
            console.error('Error loading courses:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return of(CourseActions.loadCoursesFailure({ errorMsg: errorMessage }));
          })
        )
      )
    )
  }
  )

  removeCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.removeCourse),
      switchMap((action) =>
        this.courseService.deleteCourse(action.courseId).pipe(
          switchMap((data) => of(
            CourseActions.removeCourseSuccess({ courseId: action.courseId }),
            this.notify('Course record deleted successfully', 'success')
          )),
            catchError((error) => {
              console.error('Error removing course:', error);
              const errorMessage = error instanceof Error ? error.message : 'Unknown error';
              return of(this.notify(errorMessage, 'failure'));
            })
          )
        )
      )
  }
  )

  addCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.addCourse),
      switchMap((action) =>
        this.courseService.addCourse(action.course).pipe(
          switchMap((data) => of(
            CourseActions.addCourseSuccess({ course: data }),
            this.notify('Course record added successfully', 'success')
          )),
            catchError((error) => {
              console.error('Error adding course:', error);
              const errorMessage = error instanceof Error ? error.message : 'Unknown error';
              return of(this.notify(errorMessage, 'failure'));
            })
          )
        )
      )
  }
  )

  updateCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.updateCourse),
      switchMap((action) =>
        this.courseService.updateCourse(action.courseId, action.course).pipe(
          switchMap((data) => of(
            CourseActions.updateCourseSuccess({ course: data }),
            this.notify('Course record updated successfully', 'success')
          )),
            catchError((error) => {
              console.error('Error updating course:', error);
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
    return CourseActions.notify();
  }

}