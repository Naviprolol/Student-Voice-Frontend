import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private access_token: string | any = null

  constructor(private http: HttpClient, private router: Router) {

  }

  login(username: string, password: string): Observable<boolean> {
    const data = { username, password }

    return this.http.post<{ token: string }>('http://213.189.217.151:8000/api/login', data).pipe(
      map((response) => {
        // Сохраняем токен (например, в localStorage) и перенаправляем пользователя
        localStorage.setItem('authToken', response.token);
        this.setToken(response.token)
        this.router.navigate(['/main']);
        return true; // Успешный вход
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          console.error('Invalid login or password');
        } else {
          console.error('Произошла ошибка при входе', error);
        }
        return of(false); // Неудачный вход
      })
    )
  }

  setToken(token: string | null) {
    this.access_token = token
  }

  logout() {
    this.setToken(null)
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  getSubjectsByPage(page: number): Observable<any[]> {
    const token = localStorage.getItem('authToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    console.log('Token:', token); // Проверяем, что возвращается из localStorage
    console.log('123')

    return this.http.get<any[]>(`http://213.189.217.151:8000/api/courses/list?page=${page}&size=5`, { headers: headers })
  }

}
