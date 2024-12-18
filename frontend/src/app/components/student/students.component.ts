import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs'
import { StudentListComponent } from './student-list/student-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { StudentFormComponent } from './student-form/student-form.component';
import { Store } from '@ngrx/store';
import { loadStudents } from './store/student.actions';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Observable, of } from 'rxjs';
import { selectAllStudents, selectStudentById, selectStudentLoading } from './store/student.selectors';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Course, Student } from '../../app.model';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { selectAllCourses } from '../course/store/course.selectors';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule  } from '@angular/material/checkbox';
import { loadCourses } from '../course/store/course.actions';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSelectModule,
    MatListModule,
    MatCheckboxModule,
    StudentListComponent,
    RouterModule
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {
  loading$: Observable<boolean>;
  selectedTabIndex: number;
  students$!: Observable<Student[]>;
  courses$!: Observable<Course[]>;
  selectedStudentId!: number;
  courses!: Course[];
  enrolledCourses$!: Observable<any>;
  selectedStudent!: Student | undefined;

  constructor(private store: Store, private dialog: MatDialog) {
    this.loading$ = this.store.select(selectStudentLoading);
    this.selectedTabIndex = 0;
  }

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
    this.store.dispatch(loadStudents());
    this.store.select(selectAllCourses).subscribe({
      next: response => this.courses = response
    });
    this.students$ = this.store.select(selectAllStudents);
  }

  add() {
    const addDialog = this.dialog.open(StudentFormComponent, {
      width: '40%',
      height: 'auto',
      data: { action: 'add' }
    });
    addDialog.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
      this.store.select(selectAllStudents);
    });
  }

  displayEnrollInfo(id: number) {
    this.store.select(selectStudentById(id)).subscribe({
      next: response => {
        this.selectedStudent = response;
        this.enrolledCourses$ = of(response?.courses);
      }
    })
    this.selectedStudentId = id;
  }

  getCourseName(courseId: number) {
    return this.courses.find(c => c.id == courseId)?.name
  }

  goToNextTab(studentId: number): void {
    this.selectedTabIndex = 1;
    this.displayEnrollInfo(studentId);
  }

  onSelectionChange($event: MatSelectChange) {
    console.log($event.value)
    this.displayEnrollInfo($event.value);
  }

  enroll() {
    console.log('Enroll for:', this.selectedStudentId);

    const addDialog = this.dialog.open(StudentFormComponent, {
      width: '40%',
      height: 'auto',
      data: { action: 'enroll', student: this.selectedStudent }
    });
    addDialog.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }
}
