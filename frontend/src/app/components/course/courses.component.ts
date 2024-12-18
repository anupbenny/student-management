import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../app.model';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { CourseFormComponent } from './course-form/course-form.component';
import * as CourseActions from './store/course.actions';
import { selectAllCourses, selectCourseError, selectCourseLoading, selectCoursesCount } from './store/course.selectors';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  loading: boolean = false;
  error: string | null = null;

  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  courses$: Observable<Course[]>;
  

  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate', 'minGpa', 'actions'];
  dataSource: MatTableDataSource<Course>;

  constructor(private store: Store, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
    this.loading$ = this.store.select(selectCourseLoading);
    this.error$ = this.store.select(selectCourseError);
    this.courses$ = this.store.select(selectAllCourses);
    
  }

  ngOnInit(): void {
    
    this.courses$.subscribe((list) => {
      this.dataSource.data = list;
    });
  }

  removeCourse(courseId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      height: 'auto',
      data: {
        title: "Are you sure?",
        text: `Are you sure you want to delete course:  ${courseId}`
      }
    });

    dialogRef.afterClosed().subscribe(results => {
      if (results) {
        this.store.dispatch(CourseActions.removeCourse({ courseId }));
      }
    });
  }

  update(course: Course) {
    console.log('Edit Dialog data:', course);
    const addDialog = this.dialog.open(CourseFormComponent, {
      width: '40%',
      height: 'auto',
      data: { action: 'edit', course: course }
    });
    addDialog.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }

  add() {
    const addDialog = this.dialog.open(CourseFormComponent, {
      width: '40%',
      height: 'auto',
      data: { action: 'add' }
    });
    addDialog.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }
}
