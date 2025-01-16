import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  constructor(private http: HttpClient, private router: Router) { }

  getQrByPairId(id: string): Observable<string> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`http://213.189.217.151:8000/api/lessons/qr-code/${id}`, { headers, responseType: 'text' });
  }

  getFormInfo(lesson_id: number): Observable<any> {
    return this.http.get<any>(`http://213.189.217.151:8000/api/forms/${lesson_id}`);
  }

  createQrTimer(lesson_id: number, hours: number, minutes: number): Observable<void> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<void>(`http://213.189.217.151:8000/api/lessons/start-timer/${lesson_id}?hours=${hours}&minutes=${minutes}`, null, { headers });
  }

  sendReviewOfPair(lessing_id: number, data: any): Observable<void> {

    return this.http.post<void>(`http://213.189.217.151:8000/api/forms/${lessing_id}`, data);
  }

}
