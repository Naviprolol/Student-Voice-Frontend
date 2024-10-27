import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }

  login(username: string, password: string): Observable<boolean> {
    if (username === 'test' && password === 'test') {
      this.router.navigate(['/subjects']);
      return of(true); // Успешный вход
    }
    return of(false); // Неудачный вход
  }
}
