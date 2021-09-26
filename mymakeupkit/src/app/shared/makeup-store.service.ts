import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Makeup } from './makeup';
import { AuthService } from '../services/auth.service';
import { deleteData, getData, getSingleData, updateData } from './dexie-db';
import { writeData } from './dexie-sync-db';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MakeupStoreService {
  baseUrl = 'http://localhost:3000/makeup';
  worker: Worker | undefined;

  constructor(private http: HttpClient, private auth: AuthService) {
    if (typeof Worker !== 'undefined') {
      // Create a new
      this.worker = new Worker('../app.worker', { type: 'module' });
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
      console.warn('worker not supported');
    }
  }

  private getAuthHeader(): string {
    return `Bearer ${this.auth.getAuthToken()}`;
  }

  getAll(): Observable<Makeup[]> {
    const response = this.http.get<Makeup[]>(this.baseUrl, {
      headers: { Authorization: this.getAuthHeader() },
    });
    const observer$: Subject<Makeup[]> = new Subject<Makeup[]>();
    response
      .pipe(
        map((makeupList: Array<any>): Makeup[] => {
          for (const makeup of makeupList) {
            let b64encoded = '';
            if (makeup.image) {
              const u8 = new Uint8Array(makeup.image.data);
              b64encoded = new TextDecoder().decode(u8);
            }
            makeup.image = b64encoded;
          }
          return makeupList;
        })
      )
      .subscribe(
        (response) => {
          this.worker?.postMessage({ name: 'addData', data: response });
          observer$.next(response);
        },
        (error) => {
          // get from indexed db
          getData()
            .then((data) => observer$.next(data))
            .catch(console.error);
        }
      );
    return observer$.asObservable();
  }

  getSingle(id: number): Observable<Makeup> {
    const response = this.http.get<Makeup>(`${this.baseUrl}/${id}`, {
      headers: { Authorization: this.getAuthHeader() },
    });
    const observer$: Subject<Makeup> = new Subject<Makeup>();
    response
      .pipe(
        map((makeup: any): Makeup => {
          let b64encoded = '';
          if (makeup.image) {
            const u8 = new Uint8Array(makeup.image.data);
            b64encoded = new TextDecoder().decode(u8);
          }
          makeup.image = b64encoded;
          return makeup;
        })
      )
      .subscribe(
        (response) => {
          this.worker?.postMessage({ name: 'addData', data: [response] });
          observer$.next(response);
        },
        (error) => {
          getSingleData(Number(id))
            .then((data) => observer$.next(data))
            .catch(console.error);
        }
      );
    return observer$.asObservable();
  }

  update(dataId: number, makeup: Makeup): void {
    this.http
      .put<Makeup>(this.baseUrl + '/' + dataId, makeup, {
        headers: { Authorization: this.getAuthHeader() },
      })
      .subscribe(
        (response) => {
          this.worker?.postMessage({
            name: 'updateDataSingle',
            data: response,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteOne(dataId: number): void {
    this.http
      .delete<Makeup>(this.baseUrl + '/' + dataId, {
        headers: { Authorization: this.getAuthHeader() },
      })
      .subscribe(
        (response) => {
          this.worker?.postMessage({ name: 'deleteDataSingle', id: dataId });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  create(makeup: Makeup): void {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      writeData({ ...makeup, id: new Date().getTime() }).then(() => {
        navigator.serviceWorker.ready.then((sw) => {
          sw.sync.register('sync-new-post');
        });
      });
    } else {
      this.http
        .post<Makeup>(this.baseUrl, makeup, {
          headers: { Authorization: this.getAuthHeader() },
        })
        .subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
