import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Makeup } from './makeup';

@Injectable({
  providedIn: 'root'
})
export class MakeupStoreService {
  baseUrl = 'http://localhost:3000/makeup';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Makeup[]> {
    return this.http.get<Makeup[]>(this.baseUrl);
  }

  getSingle(id: number): Observable<Makeup> {
    return this.http.get<Makeup>(`${this.baseUrl}/${id}`);
  }

  update(dataId: number, makeup: Makeup): void {
    this.http.put<Makeup>(this.baseUrl + '/' + dataId, makeup)
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
    this.http.delete<Makeup>(this.baseUrl + '/' + dataId)
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
}
