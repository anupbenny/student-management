import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Course, Student } from '../../../app.model';
import { selectAllCourses } from '../../course/store/course.selectors';
import { addStudent, enrollStudent, updateStudent } from '../store/student.actions';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})
export class StudentFormComponent {
  action: string;
  studentForm: FormGroup;
  addMode: boolean;
  allCourses!: Course[];
  enrollments!: number[];

  constructor(private store: Store, private fb: FormBuilder,
    public dialogRef: MatDialogRef<StudentFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data?.action;
    this.addMode = this.action === 'add';
    console.log(this.addMode, this.action)
    this.studentForm = this.fb.group({
      name: [data?.student?.name ?? '', [Validators.required],],
      gpa: [data?.student?.gpa ?? 0, [Validators.required, Validators.min(0), Validators.max(4)]],
      courses: []
    });
    this.store.select(selectAllCourses).subscribe({
      next: response => this.allCourses = response
    });
  }

  isSelected(id: any): boolean {
    return this.studentForm.get('courses')?.value.has(id);
  }

  onSubmit() {
    console.log(this.studentForm)
    if (this.studentForm.valid) {
      console.log(this.studentForm.value, this.studentForm.valid);
      let payload: Student = {
        name: this.studentForm.value.name as string,
        gpa: this.studentForm.value.gpa as number,
        courses: this.studentForm.value.courses?.map(Number) as number[],
      }
      if (this.addMode) {
        this.store.dispatch(addStudent({ 'student': payload }));
      } else {
        if (this.enrollments?.length) {
          payload.courses = this.enrollments;
        }
        this.store.dispatch(updateStudent({ studentId: this.data.student.id, 'student': payload }));
      }

      this.dialogRef.close();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSelectionChange(event: MatSelectChange) {
    console.log(event.value, event.source);
    this.enrollments = event.value.map((e: string) => parseInt(e, 10));
  }

  isEnrolled(course: Course) {
    return this.studentForm.get('courses')?.value.has(course.id);
  }

}
