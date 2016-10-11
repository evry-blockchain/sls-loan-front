/**
 * Created by Oleksandr.Khymenko on 05.10.2016.
 */

import { Injectable } from '@angular/core';
import { Login } from "../model/login.model";
import {BehaviorSubject, Subject, Observable} from "rxjs";

@Injectable()
export class AuthService {

  public isLoggedIn$: Subject<any> = new BehaviorSubject(false);
  public redirectUrl: string = '';

  constructor() {}

  login(data: Login): Observable<any> {
    if (data.userName === '1' && data.password === '1') {
        this.isLoggedIn$.next(true);
      return this.isLoggedIn$.asObservable();
    } else {
      return Observable.throw(new Error('error!'))
    }
  }
}
