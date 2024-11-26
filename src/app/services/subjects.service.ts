import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GetSubjectsApiResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {


  private apiUrl = 'http://213.189.217.151:8000/api/courses/list'; // URL для запроса

  constructor(private http: HttpClient, private router: Router) { }

  getSubjectsByPage(page: number): Observable<GetSubjectsApiResponse> {
    const token = localStorage.getItem('authToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.get<GetSubjectsApiResponse>(`${this.apiUrl}?page=${page}&size=5`, { headers: headers })
  }
}
