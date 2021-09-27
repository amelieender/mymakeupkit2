import { Component, Input, OnInit } from '@angular/core';
import { Makeup } from '../shared/makeup';

@Component({
  selector: 'ae-makeup-item',
  templateUrl: './makeup-item.component.html',
  styleUrls: ['./makeup-item.component.css']
})
export class MakeupItemComponent implements OnInit {
  @Input() makeup!: Makeup;
  imageSourceString: string = '/assets/makeup2.jpg';

  constructor() { }

  ngOnInit(): void {
    if (this.makeup?.image) {
      this.imageSourceString = `data:image/jpeg;base64,${this.makeup.image}`;
    }
  }

  get imageSource(): string {
    return this.imageSourceString;
  }

}
