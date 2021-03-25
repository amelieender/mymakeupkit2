import { Component, OnInit } from '@angular/core';
import { Makeup } from '../shared/makeup';
import { MakeupStoreService } from '../shared/makeup-store.service';

@Component({
  selector: 'ae-makeup-create',
  templateUrl: './makeup-create.component.html',
  styleUrls: ['./makeup-create.component.css']
})
export class MakeupCreateComponent implements OnInit {
  makeup!: Makeup;
  createMode: boolean = false;

  constructor(private ms: MakeupStoreService) { }

  ngOnInit(): void {
  }

  create(makeup: Makeup): void {
    console.log(makeup);
    this.makeup = makeup;
    this.ms.create(this.makeup);  
  }
}
