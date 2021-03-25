import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MakeupListComponent } from './makeup-list/makeup-list.component';
import { MakeupItemComponent } from './makeup-item/makeup-item.component';
import { MakeupDetailsComponent } from './makeup-details/makeup-details.component';
import { HomeComponent } from './home/home.component';
import { MakeupFormComponent } from './makeup-form/makeup-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MakeupCreateComponent } from './makeup-create/makeup-create.component';

@NgModule({
  declarations: [
    AppComponent,
    MakeupListComponent,
    MakeupItemComponent,
    MakeupDetailsComponent,
    HomeComponent,
    MakeupFormComponent,
    MakeupCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
