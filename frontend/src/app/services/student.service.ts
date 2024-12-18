import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Student } from '../app.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl).pipe(delay(500));
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  addStudent(student: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, student);
  }

  updateStudent(id: number, student: any): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }
  /*
    getStudentById(id: number): Observable<Student> {
      return this.http.get<Student>(`${this.apiUrl}/${id}`);
    }
  */
}
