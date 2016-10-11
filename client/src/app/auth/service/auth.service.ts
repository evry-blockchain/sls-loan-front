/**
 * Created by Oleksandr.Khymenko on 05.10.2016.
 */

import { Injectable } from '@angular/core';
import { Login } from "../model/login.model";
import { BehaviorSubject, Subject, Observable} from "rxjs";
import { ApiGateway } from "../../api-gateway.service";
import { Http } from "@angular/http";

@Injectable()
export class AuthService {

  public isLoggedIn$: Subject<any> = new BehaviorSubject(false);

  public redirectUrl: string = '';


  constructor(private http: Http) {}

  login(data: Login): Observable<any> {
    return this.http.post('api/login', data)
      .map((res) => {
      return res['json']();
    }).do((data) => {
      localStorage.setItem('bc.token', JSON.stringify(data['token']));
      this.isLoggedIn$.next(true);
    });

  }
}
