import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { SearchbarService } from './services/searchbar.service';

type ViewState = 'list' | 'details';

@Component({
  selector: 'ae-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private isLoggedIn: boolean = false;

  constructor(private auth: AuthService, private searchbar: SearchbarService) {}

  get isLoggedInStatus() {
    return this.auth.getAuthToken() ? true : false;
  }

  ngOnInit() {
    this.isLoggedIn = this.auth.getAuthToken() ? true : false;
  }

  handleSearchInputChangeEvent(event: any) {
    this.searchbar.setSearchInput(event.target.value);
  }
}
