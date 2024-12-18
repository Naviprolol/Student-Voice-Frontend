import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CreateSubjectApiResponse, GetSubjectApiResponse, GetSubjectsApiResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {


  private apiUrl = 'https://213.189.217.151:8000/api/courses/list'; // URL для запроса

  constructor(private http: HttpClient, private router: Router) { }

  getSubjectsByPage(page: number, searchText?: string): Observable<GetSubjectsApiResponse> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let url = `${this.apiUrl}?page=${page}&size=5`;

    if (searchText) {
      url += `&search-text=${encodeURIComponent(searchText)}`;
    }

    return this.http.get<GetSubjectsApiResponse>(url, { headers });
  }

  getSubjectById(courseId: number): Observable<GetSubjectApiResponse> {
    const token = localStorage.getItem('authToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.get<GetSubjectApiResponse>(`https://213.189.217.151:8000/api/courses/${courseId}`, { headers: headers })
  }

  createSubject(data: CreateSubjectApiResponse): Observable<CreateSubjectApiResponse> {
    const token = localStorage.getItem('authToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.post<CreateSubjectApiResponse>('https://213.189.217.151:8000/api/courses/create', data, { headers: headers })
  }

  editSubject(courseId: number, data: CreateSubjectApiResponse): Observable<CreateSubjectApiResponse> {
    const token = localStorage.getItem('authToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.put<CreateSubjectApiResponse>(`https://213.189.217.151:8000/api/courses/${courseId}`, data, { headers: headers })
  }

  deleteSubject(courseId: number): Observable<any> {
    const token = localStorage.getItem('authToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.delete<any>(`https://213.189.217.151:8000/api/courses/${courseId}`, { headers })
  }
}
