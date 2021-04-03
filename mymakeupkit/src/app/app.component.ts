import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

type ViewState = 'list' | 'details';

@Component({
  selector: 'ae-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private isLoggedIn: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.auth.getAuthToken() ? true : false;
  }
}
