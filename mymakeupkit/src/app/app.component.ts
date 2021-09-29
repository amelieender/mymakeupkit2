import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { SearchbarService } from './services/searchbar.service';

@Component({
  selector: 'ae-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private isLoggedIn: boolean = false;

  constructor(private auth: AuthService, private searchbar: SearchbarService, private router: Router) {}

  get isLoggedInStatus() {
    return this.isLoggedIn;
  }

  ngOnInit() {
    this.isLoggedIn = this.auth.getAuthToken() ? true : false;
    if (!this.isLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    this.auth.getAuthStatus().subscribe((status) => (this.isLoggedIn = status));
  }

  handleSearchInputChangeEvent(event: any) {
    this.searchbar.setSearchInput(event.target.value);
  }

  async configurePushSubscription() {
    if (!('serviceWorker' in navigator)) {
      return;
    }
    console.log('configurePushSubscription');

    const sw = await navigator.serviceWorker.ready;
    const sub = await sw.pushManager.getSubscription();
    if (sub === null) {
      // create a new subscription
      const vapidPublicKey =
        'BDqeqE4H3JzWrPsikU83IHBZpiOcULOGPd5JBS7XjbZWM_JhpDUCQU7sE2qysADixipz4u1y2iHfcDkNpKInrT8';
      const newSub = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidPublicKey,
      });
      await fetch('http://localhost:3000/subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(newSub),
        }).then((response) => {
          if (response.ok) {
            new Notification('Successfully subscribed!');
          }
        });
    } else {
      // already subscribed
      console.log('already subscribed');
    }
  }

  async handleNotificationToggleChange(event: MatSlideToggleChange) {
    if (event.checked) {
      const hasPermission = await this.askForNotificationPermission();
      if (hasPermission) {
        // notification on
        await this.configurePushSubscription();
      }
    } else {
      // notification off
      console.log('deactivating');
    }
  }

  async askForNotificationPermission(): Promise<boolean> {
    const result = await Notification.requestPermission();
    console.log('User choice', result);
    if (result !== 'granted') {
      console.log('No notification permission granted');
      return false;
    } else {
      // notifications granted
      return true;
    }
  }
}
