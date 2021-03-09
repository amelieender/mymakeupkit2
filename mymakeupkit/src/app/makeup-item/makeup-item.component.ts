import { Component, Input, OnInit } from '@angular/core';
import { Makeup } from '../shared/makeup';

@Component({
  selector: 'ae-makeup-item',
  templateUrl: './makeup-item.component.html',
  styleUrls: ['./makeup-item.component.css']
})
export class MakeupItemComponent implements OnInit {
  @Input() makeup!: Makeup;

  constructor() { }

  ngOnInit(): void {
  }

}
