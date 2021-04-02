import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  getUserDetails(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  setDataInLocalStorage(variableName: string, data: string): any {
    localStorage.setItem(variableName, data);
  }

  clearStorage(): any {
    localStorage.clear();
  }
}
