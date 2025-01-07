import { Injectable } from '@angular/core';
import { GetReviewsApiResponse, Institute, Professor } from '../interfaces/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  private userInfoCache: any | null = null; // Для хранения данных
  private userInfo$: Observable<any> | null = null; // Для обработки многократных подписок

  private institutesCache: any | null = null;
  private addressesCache: any | null = null;
  private professorsCache: any | null = null;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Кэширование для getInstitutes
  getInstitutes(): Observable<any> {
    if (this.institutesCache) {
      return of(this.institutesCache);
    }

    const headers = this.getAuthHeaders();
    return this.http.get<any>('https://213.189.217.151:8000/api/institutes/list', { headers }).pipe(
      tap((data) => (this.institutesCache = data)),
      shareReplay(1)
    );
  }

  // Кэширование для getAddresses
  getAddresses(): Observable<any> {
    if (this.addressesCache) {
      return of(this.addressesCache);
    }

    const headers = this.getAuthHeaders();
    return this.http.get<any>('https://213.189.217.151:8000/api/institutes/address/list', { headers }).pipe(
      tap((data) => (this.addressesCache = data)),
      shareReplay(1)
    );
  }

  // Кэширование для getProfessors
  getProfessors(): Observable<any> {
    if (this.professorsCache) {
      return of(this.professorsCache);
    }

    const headers = this.getAuthHeaders();
    return this.http.get<any>('https://213.189.217.151:8000/api/professors/list', { headers }).pipe(
      tap((data) => (this.professorsCache = data)),
      shareReplay(1)
    );
  }

  // Кэширование для getUserInfo
  getUserInfo(): Observable<any> {
    if (this.userInfoCache) {
      return of(this.userInfoCache);
    } else if (this.userInfo$) {
      return this.userInfo$;
    }

    const headers = this.getAuthHeaders();
    this.userInfo$ = this.http.get<any>('https://213.189.217.151:8000/api/user/info', { headers }).pipe(
      tap((data) => (this.userInfoCache = data)),
      shareReplay(1)
    );

    return this.userInfo$;
  }

  // Метод для очистки кэша
  clearCache(): void {
    this.userInfoCache = null;
    this.userInfo$ = null;
    this.institutesCache = null;
    this.addressesCache = null;
    this.professorsCache = null;
  }

  updatePairsFromModeus(professor_id: number, fromDate: string, toDate: string): Observable<any> {
    const headers = this.getAuthHeaders();

    return this.http.post<any>(`https://213.189.217.151:8000/api/integrations/import/modeus/${professor_id}?fromDate=${fromDate}&toDate=${toDate}`, { headers })
  }
}
