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

  constructor(private ms: MakeupStoreService, route: ActivatedRoute, private router: Router) {
    route.params.subscribe(() => {
      this.readAll();
    });
  }

  readAll(): void {
    this.ms.getAll().subscribe(
      (response: Makeup[]) => this.makeupItems = response,
      response => {
        if (response.status === 401) {
          this.router.navigateByUrl('/login');
        }
      }
    );
  }

}
