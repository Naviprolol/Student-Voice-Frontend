import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePairApiResponse, GetPairsApiResponse, GetReviewsApiResponse, Pair, Review } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PairsService {
  private apiUrl = 'http://213.189.217.151:8000/api/lessons'; // URL для запроса

  constructor(private http: HttpClient) { }

  // Получение всех пар
  getPairsByPage(page: number, searchText?: string): Observable<GetPairsApiResponse> {
    const token = localStorage.getItem('authToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    let url = `${this.apiUrl}/list?page=${page}&size=5`;

    if (searchText) {
      url += `&search-text=${encodeURIComponent(searchText)}`;
    }

    return this.http.get<GetPairsApiResponse>(url, { headers: headers })
  }

  // Получение пар по предмету
  getPairsOfSubject(course_id: number, page: number): Observable<GetPairsApiResponse> {
    const token = localStorage.getItem('authToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<GetPairsApiResponse>(`${this.apiUrl}/list/by-course/${course_id}?page=${page}&size=5`, { headers: headers })
  }

  // Получение подробной информации о паре
  getPairById(lesson_id: number): Observable<Pair> {
    const token = localStorage.getItem('authToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<Pair>(`${this.apiUrl}/${lesson_id}`, { headers: headers })
  }

  getReviewsByPair(lesson_id: number, page: number, size: number): Observable<GetReviewsApiResponse> {
    const token = localStorage.getItem('authToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<GetReviewsApiResponse>(`http://213.189.217.151:8000/api/reviews/list/by-lesson/${lesson_id}?page=${page}&size=${size}`, { headers: headers })
  }

  createPair(data: CreatePairApiResponse): Observable<GetPairsApiResponse> {
    const token = localStorage.getItem('authToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.post<GetPairsApiResponse>('http://213.189.217.151:8000/api/lessons', data, { headers: headers })
  }

  editPair(lessonId: number, data: CreatePairApiResponse): Observable<CreatePairApiResponse> {
    const token = localStorage.getItem('authToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.put<CreatePairApiResponse>(`http://213.189.217.151:8000/api/lessons/${lessonId}`, data, { headers: headers })
  }

}
