import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Makeup } from '../shared/makeup';
import { MakeupStoreService } from '../shared/makeup-store.service';

@Component({
  selector: 'ae-makeup-details',
  templateUrl: './makeup-details.component.html',
  styleUrls: ['./makeup-details.component.css']
})
export class MakeupDetailsComponent implements OnInit {
  makeup: Makeup | undefined;

  constructor(private ms: MakeupStoreService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.makeup = this.ms.getSingle(id);
        console.log(this.makeup)
      }
    });
  }

  // showMakeupList() {
  //   this.showListEvent.emit();
  // }

}
