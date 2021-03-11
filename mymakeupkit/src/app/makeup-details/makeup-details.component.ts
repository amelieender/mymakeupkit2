import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Makeup } from '../shared/makeup';

@Component({
  selector: 'ae-makeup-details',
  templateUrl: './makeup-details.component.html',
  styleUrls: ['./makeup-details.component.css']
})
export class MakeupDetailsComponent implements OnInit {
  @Input() makeup!: Makeup;
  @Output() showListEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  getRating(num: number) {
    return new Array(num);
  }

  showMakeupList() {
    this.showListEvent.emit();
  }

}
