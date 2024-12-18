import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Course } from '../../../app.model';
import { addCourse, updateCourse } from '../store/course.actions';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {
  action: string;
  courseForm: FormGroup;
  addMode: boolean;

  constructor(private store: Store, private fb: FormBuilder,
    public dialogRef: MatDialogRef<CourseFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data?.action;
    this.addMode = this.action === 'add';
    this.courseForm = this.fb.group({
      name: [data?.course?.name ?? '', Validators.required],
      startDate: [data?.course?.startDate ?? null, Validators.required],
      endDate: [data?.course?.endDate ?? null, [Validators.required]],
      minGpa: [data?.course?.minGpa ?? 0, [Validators.required, Validators.min(0), Validators.max(4)]],
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      console.log(this.courseForm.value, this.courseForm.valid);
      let payload: Course = {
        name: this.courseForm.value.name as string,
        startDate: this.courseForm.value.startDate as Date,
        endDate: this.courseForm.value.endDate as Date,
        minGpa: this.courseForm.value.minGpa as number,
      }
      if (this.addMode) {
        this.store.dispatch(addCourse({ 'course': payload }));
      } else {
        this.store.dispatch(updateCourse({ courseId: this.data.course.id, 'course': payload }));
      }
      this.dialogRef.close();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
