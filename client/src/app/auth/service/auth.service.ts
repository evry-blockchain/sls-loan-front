/**
 * Created by Oleksandr.Khymenko on 05.10.2016.
 */

import { Injectable } from '@angular/core';
import { Login } from "../model/login.model";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable()
export class AuthService {

  isLoggedIn$: Subject = new BehaviorSubject(false);
  isLoggedIn: boolean;
  redirectUrl: string = '';
  constructor() {}

  login(data: Login) {
    if (data.userName == 1 && data.password == 1) {
        this.isLoggedIn$.next(true);
    } else {
       this.isLoggedIn$.next(false);
    }

    // if (data.userName == 1 && data.password == 1) {
    //     this.isLoggedIn = true;
    // } else {
    //    this.isLoggedIn = false;
    // }

    return this.isLoggedIn$.asObservable();
  }

}
