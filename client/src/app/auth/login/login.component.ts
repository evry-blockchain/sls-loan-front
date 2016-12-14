/**
 * Created by Oleksandr.Khymenko on 05.10.2016.
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AuthService } from "../service/auth.service";
import {Login} from "../model/login.model";
import {Router} from "@angular/router";

import 'rxjs/add/operator/catch';
import { UserService } from "../../user/user.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  formSubmitted: boolean = false;
  wrongCredentials: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private userService: UserService) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(<Login> this.loginForm.getRawValue()).subscribe(() => {
      this.authService.auth().subscribe((data) => {
        this.userService.loginUser(data[0]);
        this.authService.isLoggedIn$.next(true);
        this.router.navigate(['/projects']);
      }, (error) => {
        console.log(error);
        this.authService.logout();
      });


    }, (data) => {
      this.wrongCredentials = true;
    });
  }
}
