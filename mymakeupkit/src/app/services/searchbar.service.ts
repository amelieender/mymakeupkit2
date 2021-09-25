import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {

  public searchInput$: Subject<string> = new ReplaySubject<string>(1);
  constructor() { }

  setSearchInput(input: string) {
    this.searchInput$.next(input);
  }

  getSearchInput(): Observable<string> {
    return this.searchInput$.asObservable();
  }
}
