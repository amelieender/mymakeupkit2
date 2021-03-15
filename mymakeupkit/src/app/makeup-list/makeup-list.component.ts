import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Makeup } from '../shared/makeup';
import { MakeupStoreService } from '../shared/makeup-store.service';

@Component({
  selector: 'ae-makeup-list',
  templateUrl: './makeup-list.component.html',
  styleUrls: ['./makeup-list.component.css']
})
export class MakeupListComponent implements OnInit {

  makeupItems: Makeup[] = []; 

  @Output() showDetailsEvent = new EventEmitter<Makeup>();

  constructor(private ms: MakeupStoreService) { }

  ngOnInit(): void {
    this.makeupItems = this.ms.getAll();
  }

  showDetails(makeup: Makeup) {
    this.showDetailsEvent.emit(makeup);
  }

}
