/**
 * Created by Oleksandr.Khymenko on 05.10.2016.
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AuthService } from "../service/auth.service";
import {Login} from "../model/login.model";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.authService.login(<Login> this.loginForm.getRawValue()).subscribe(() => {
        this.router.navigate([this.authService.redirectUrl]);
    });
  }
}
