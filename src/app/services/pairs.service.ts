import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetPairsApiResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PairsService {
  private apiUrl = 'http://213.189.217.151:8000/api/lessons/list'; // URL для запроса

  constructor(private http: HttpClient) { }

  getPairsByPage(page: number): Observable<GetPairsApiResponse> {
    const token = localStorage.getItem('authToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<GetPairsApiResponse>(`${this.apiUrl}?page=${page}&size=5`, { headers: headers })
  }
}
