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
}
