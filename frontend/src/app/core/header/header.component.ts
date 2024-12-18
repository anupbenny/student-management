import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list'
import { Router, RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge'
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectStudentLoading, selectStudentsCount } from '../../components/student/store/student.selectors';
import { selectCoursesCount } from '../../components/course/store/course.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatListModule, MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  coursesCount$: Observable<number>;
  studentsCount$: Observable<number>;
  loading$: Observable<boolean>;
  loading: boolean = false;

  constructor(private router: Router, private store: Store) {
    this.loading$ = this.store.select(selectStudentLoading);
    this.coursesCount$ = this.store.select(selectCoursesCount);
    this.studentsCount$ = this.store.select(selectStudentsCount);
  }

  ngOnInit(): void {
    this.store.select(selectStudentLoading).subscribe((loading) => {
      this.loading = loading;
    });
  }

  navHome() {
    this.router.navigateByUrl('home');
  }
}
