import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MakeupDetailsComponent } from './makeup-details/makeup-details.component';
import { MakeupListComponent } from './makeup-list/makeup-list.component';
import {MakeupCreateComponent} from './makeup-create/makeup-create.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'makeup',
    component: MakeupListComponent
  },
  {
    path: 'makeup/:id',
    component: MakeupDetailsComponent
  },
  {
    path: 'create',
    component: MakeupCreateComponent
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'register', 
    component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
