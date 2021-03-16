import { Component } from '@angular/core';
import { Makeup } from './shared/makeup';

type ViewState = 'list' | 'details';

@Component({
  selector: 'ae-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // title = 'mymakeupkit';
  // makeup!: Makeup;
  // viewState: ViewState = 'list';

  // showList() {
  //   this.viewState = 'list';
  // }

  // showDetails(makeup: Makeup) {
  //   this.makeup = makeup;
  //   this.viewState = 'details';
  // }
}
