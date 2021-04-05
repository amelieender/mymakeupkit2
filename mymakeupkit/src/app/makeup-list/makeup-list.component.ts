import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Makeup } from '../shared/makeup';
import { MakeupStoreService } from '../shared/makeup-store.service';

@Component({
  selector: 'ae-makeup-list',
  templateUrl: './makeup-list.component.html',
  styleUrls: ['./makeup-list.component.css']
})
export class MakeupListComponent {

  makeupItems: Makeup[] = [];
  filteredMakeupItems: Makeup[] = [];
  searchInput: string = '';

  constructor(private ms: MakeupStoreService, route: ActivatedRoute, private router: Router) {
    route.params.subscribe(() => {
      this.readAll();
    });
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

  handleSearchInputChangeEvent(event: any) {
    this.searchInput = event.target.value;
    this.updateFilteredMakeupItems();
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
}
