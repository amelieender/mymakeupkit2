import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Makeup } from '../shared/makeup';
import { MakeupStoreService } from '../shared/makeup-store.service';

@Component({
  selector: 'ae-makeup-details',
  templateUrl: './makeup-details.component.html',
  styleUrls: ['./makeup-details.component.css']
})
export class MakeupDetailsComponent implements OnInit {
  makeup: Makeup | undefined;
  editMode: boolean = false;

  constructor(private ms: MakeupStoreService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.getMakeupItem(id);
      }
    });
  }

  getMakeupItem(id: number): void {
    this.ms.getSingle(id).subscribe(
      (response: Makeup) => this.makeup = response,
      error => console.log(error)
      );
  }

  toggleEditMode(toggle: boolean) {
    this.editMode = toggle;
  }

  update(makeup: Makeup): void {
    console.log(makeup);
    this.makeup = makeup;
    this.ms.update(this.makeup.id, this.makeup);
    this.router.navigateByUrl('/makeup');
  }

  deleteOne(makeup: Makeup): void {
    console.log(makeup);
    this.makeup = makeup;
    this.ms.deleteOne(this.makeup.id);
    this.router.navigateByUrl('/makeup');
  }

}
