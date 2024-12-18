import { Routes } from '@angular/router';
import { CoursesComponent } from './components/course/courses.component';
import { HomeComponent } from './components/home/home.component';
import { StudentsComponent } from './components/student/students.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'students', component: StudentsComponent },
    { path: 'courses', component: CoursesComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
  ];