import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Student } from '../../../app.model';
import * as StudentActions from '../store/student.actions';
import { selectAllStudents, selectStudentError, selectStudentLoading } from '../store/student.selectors';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StudentFormComponent } from '../student-form/student-form.component';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit {
  @Output() navigateToNextTab = new EventEmitter<number>();

  loading: boolean = false;
  error: string | null = null;

  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  students$: Observable<Student[]>;

  displayedColumns: string[] = ['id', 'name', 'gpa', 'actions'];
  dataSource: MatTableDataSource<Student>;

  constructor(private store: Store, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
    this.loading$ = this.store.select(selectStudentLoading);
    this.error$ = this.store.select(selectStudentError);
    this.students$ = this.store.select(selectAllStudents);
  }

  ngOnInit(): void {
    this.students$.subscribe((list) => {
      this.dataSource.data = list;
    });
  }

  gotoNextTab(id: number): void {
    this.navigateToNextTab.emit(id);
  }

  removeStudent(studentId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      height: 'auto',
      data: {
        title: "Are you sure?",
        text: `Are you sure you want to delete student:  ${studentId}`
      }
    });

    dialogRef.afterClosed().subscribe(results => {
      if (results) {
        this.store.dispatch(StudentActions.removeStudent({ studentId }));
      }
    });
  }

  update(student: Student) {
    console.log('Edit Dialog data:', student);
    const addDialog = this.dialog.open(StudentFormComponent, {
      width: '40%',
      height: 'auto',
      data: { action: 'edit', student: student }
    });
    addDialog.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }

}
