import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MakeupListComponent } from './makeup-list/makeup-list.component';
import { MakeupItemComponent } from './makeup-item/makeup-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MakeupListComponent,
    MakeupItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
