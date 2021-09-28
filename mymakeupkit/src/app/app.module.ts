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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatCardModule} from '@angular/material/card';
import {WebcamModule} from 'ngx-webcam';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    MakeupListComponent,
    MakeupItemComponent,
    MakeupDetailsComponent,
    HomeComponent,
    MakeupFormComponent,
    MakeupCreateComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatCardModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('sw-sync.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    WebcamModule
  ],
  providers: [
    {provide : LocationStrategy , useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
