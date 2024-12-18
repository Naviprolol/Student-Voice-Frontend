import { Injectable } from '@angular/core';
import { GetReviewsApiResponse, Institute, Professor } from '../interfaces/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  constructor(private http: HttpClient) { }

  getInstitutes(): Observable<Institute[]> {
    const token = localStorage.getItem('authToken'); // Получение токена из localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Установка заголовка

    return this.http.get<Institute[]>('https://213.189.217.151:8000/api/institutes/list', { headers }); // Выполнение GET-запроса с заголовком
  }

  getAddresses(): Observable<string[]> {
    const token = localStorage.getItem('authToken'); // Получение токена из localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Установка заголовка

    return this.http.get<string[]>('https://213.189.217.151:8000/api/institutes/address/list', { headers }); // Выполнение GET-запроса с заголовком
  }

  getProfessors(): Observable<Professor[]> {
    const token = localStorage.getItem('authToken'); // Получение токена из localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Установка заголовка

    return this.http.get<Professor[]>('https://213.189.217.151:8000/api/professors/list', { headers }); // Выполнение GET-запроса с заголовком
  }
}
