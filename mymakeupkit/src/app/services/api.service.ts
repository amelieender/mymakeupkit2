import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient, private auth: AuthService) {}

  postTypeRequest(url: string, payload: any): any {
    const token = this.auth.getAuthToken();
    return this.http.post(`${this.baseUrl}${url}`, {
      ...payload,
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(map(res => {
      return res;
    }));
  }
}
