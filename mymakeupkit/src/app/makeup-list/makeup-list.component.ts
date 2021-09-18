import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Makeup } from '../shared/makeup';
import { MakeupStoreService } from '../shared/makeup-store.service';
import { HostListener } from '@angular/core';
import { SearchbarService } from '../services/searchbar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ae-makeup-list',
  templateUrl: './makeup-list.component.html',
  styleUrls: ['./makeup-list.component.css']
})
export class MakeupListComponent {

  makeupItems: Makeup[] = [];
  filteredMakeupItems: Makeup[] = [];
  searchInput: string = '';
  searchInput$: Observable<string> = this.searchbar.getSearchInput();
  deferredPrompt: any;

  constructor(private ms: MakeupStoreService, route: ActivatedRoute, private router: Router, private searchbar: SearchbarService) {
    route.params.subscribe(() => {
      this.readAll();
    });
  }

  ngOnInit() {
    this.searchInput$.subscribe((input: string) => {
      this.searchInput = input;
      this.updateFilteredMakeupItems();
    })
  }

  readAll(): void {
    this.ms.getAll().subscribe(
      (response: Makeup[]) => {
        this.makeupItems = response;
        this.updateFilteredMakeupItems();
      },
      response => {
        if (response.status === 401) {
          this.router.navigateByUrl('/login');
        }
      }
    );
  }

  updateFilteredMakeupItems(): void {
    this.filteredMakeupItems = this.makeupItems.filter(item => {
      const lowerCaseSearch = this.searchInput.toLowerCase();
      if (lowerCaseSearch.length === 0) {
        return true;
      }
      if (item.brandname.toLowerCase().includes(lowerCaseSearch)) {
        return true;
      }
      if (item.productname.toLowerCase().includes(lowerCaseSearch)) {
        return true;
      }
      if (item.category.toLowerCase().includes(lowerCaseSearch)) {
        return true;
      }
      return false;
    });
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: { preventDefault: () => void; }) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
  }


  showInstall() {
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult: { outcome: string; }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }
}
