import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from './../services/api.service';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin = false;
  errorMessage: string = '';
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.isUserLogin();
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.api.postTypeRequest('login', this.loginForm.value).subscribe((res: any) => {
      if (res.status === 200) {
        this.auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this.auth.setDataInLocalStorage('token', res.token);
        this.router.navigate(['']);
      } else {
        // this.errorMessage = err.error.message;
      }
    }, (err: { error: { message: any; }; }) => {
      this.errorMessage = err.error.message;
    });
  }

  isUserLogin(): void{
    if (this.auth.getUserDetails() !== null || this.auth.getAuthToken() !== null){
      this.isLogin = true;
    }
  }

  logout(): void{
    this.auth.clearStorage();
    this.router.navigate(['']);
  }
}
