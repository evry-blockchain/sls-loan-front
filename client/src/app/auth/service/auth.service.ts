/**
 * Created by Oleksandr.Khymenko on 05.10.2016.
 */

import { Injectable, Inject } from '@angular/core';
import { Login } from "../model/login.model";
import { BehaviorSubject, Subject, Observable} from "rxjs";
import { ApiGateway } from "../../api-gateway.service";
import { Http } from "@angular/http";
import { WaitingSpinnerService } from "../../utils/waitingSpinner/waitingSpinnerService";

@Injectable()
export class AuthService {

  public isLoggedIn$ = new BehaviorSubject(false);

  public redirectUrl: string = '';

  private userSource = new BehaviorSubject({});

  public user$ = this.userSource.asObservable();

  constructor(private http: Http,
              private apiGateway: ApiGateway,
              @Inject('ApiEndpoint') private apiEndpoint,
              private spinnerService: WaitingSpinnerService) {}

  login(data: Login): Observable<any> {
    this.spinnerService.startLoading$.next(true);
    return this.http.post('api/login', data)
      .map((res) => {
      return res['json']();
    }).do((data) => {
      localStorage.setItem('bc.token', JSON.stringify({token: data['token'], timestamp: new Date().getTime()}));
      this.isLoggedIn$.next(true);
    }).finally(() => {
        this.spinnerService.stopLoading$.next('');
      });
  }

  public auth() {
    return this.apiGateway.get(`${this.apiEndpoint}/Utils/bankId`)
      .flatMap(id => {
        var filter = {
          filter: {
            participantKey: id
          }
        };
        return this.apiGateway.get(`${this.apiEndpoint}/Participants`, filter);
      });
  }

  logout() {
    this.isLoggedIn$.next(false);
  }

}
