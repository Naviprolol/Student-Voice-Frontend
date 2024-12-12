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

}
