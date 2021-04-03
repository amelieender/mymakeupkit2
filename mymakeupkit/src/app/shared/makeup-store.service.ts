import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Makeup } from './makeup';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MakeupStoreService {
  baseUrl = 'http://localhost:3000/makeup';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getAuthHeader(): string {
    return `Bearer ${this.auth.getAuthToken()}`;
  }

  getAll(): Observable<Makeup[]> {
    return this.http.get<Makeup[]>(this.baseUrl, {headers: { Authorization: this.getAuthHeader() }});
  }

  getSingle(id: number): Observable<Makeup> {
    return this.http.get<Makeup>(`${this.baseUrl}/${id}`, { headers: { Authorization: this.getAuthHeader() }});
  }

  update(dataId: number, makeup: Makeup): void {
    this.http.put<Makeup>(this.baseUrl + '/' + dataId, makeup, { headers: { Authorization: this.getAuthHeader()}})
      .subscribe(
        response => {
          console.log(response);
          console.log(response.id);
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteOne(dataId: number): void {
    this.http.delete<Makeup>(this.baseUrl + '/' + dataId, { headers: { Authorization: this.getAuthHeader() }})
      .subscribe(
        response => {
          console.log(response);
          console.log(response.id);
        },
        error => {
          console.log(error);
        }
      );
  }

  create(makeup: Makeup): void {
    this.http.post<Makeup>(this.baseUrl, makeup, { headers: { Authorization: this.getAuthHeader() }})
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }
}
