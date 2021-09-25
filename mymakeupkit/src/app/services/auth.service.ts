import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedInStatus$: Subject<boolean> = new ReplaySubject<boolean>(1);

  constructor() {
    this.clearStorage();
    this.isLoggedInStatus$.next(false);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserDetails(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  setDataInLocalStorage(variableName: string, data: string): any {
    if (variableName === 'token') {
      this.isLoggedInStatus$.next(true);
    }
    localStorage.setItem(variableName, data);
  }

  clearStorage(): any {
    this.isLoggedInStatus$.next(false);
    localStorage.clear();
  }

  getAuthStatus(): Observable<boolean> {
    return this.isLoggedInStatus$.asObservable();
  }
}
