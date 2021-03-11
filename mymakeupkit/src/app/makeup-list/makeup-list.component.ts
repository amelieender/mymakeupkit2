import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Makeup } from '../shared/makeup';

@Component({
  selector: 'ae-makeup-list',
  templateUrl: './makeup-list.component.html',
  styleUrls: ['./makeup-list.component.css']
})
export class MakeupListComponent implements OnInit {

  makeupItems: Makeup[] = []; 

  @Output() showDetailsEvent = new EventEmitter<Makeup>();

  constructor() { }

  ngOnInit(): void {
    this.makeupItems = [
        {
          productname: 'Hoola Matte',
          brandname: 'Benefit',
          category: 'Bronzer',
          opened: new Date(2021, 2, 21),
          durability: 12
        },
        {
          productname: 'Satin Taupe',
          brandname: 'MAC',
          category: 'Eyeshadow',
          opened: new Date(2020, 6, 13),
          durability: 24
        },
        {
          productname: 'Mademoiselle',
          brandname: 'Chanel',
          category: 'Lipstick',
          opened: new Date(2020, 9, 7),
          durability: 6
        },
    ]
  }

  showDetails(makeup: Makeup) {
    this.showDetailsEvent.emit(makeup);
  }

}
