/**
 * Created by Oleksandr.Khymenko on 11.10.2016.
 */
import { Injectable } from "@angular/core";
import {
  Http, Response, RequestMethod, URLSearchParams, Headers,
  RequestOptionsArgs
} from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import * as moment from 'moment';

// Import the rxjs operators we need (in a production app you'll
//  probably want to import only the operators you actually use)
//
import 'rxjs/Rx';
import { WaitingSpinnerService } from "./utils/waitingSpinner/waitingSpinnerService";
import { UserService } from "./user/user.service";
import { AuthService } from "./auth/service/auth.service";

export class ApiGatewayOptions {
  method: RequestMethod;
  url: string;
  headers = {};
  params = {};
  data = {};
}


@Injectable()
export class ApiGateway {

  // Define the internal Subject we'll use to push errors
  private errorsSubject = new Subject<any>();

  // Provide the *public* Observable that clients can subscribe to
  errors$: Observable<any>;

  // Define the internal Subject we'll use to push the command count
  private pendingCommandsSubject = new Subject<number>();
  private pendingCommandCount = 0;

  // Provide the *public* Observable that clients can subscribe to
  pendingCommands$: Observable<number>;

  constructor(
    private http: Http,
    private waitingSpinner: WaitingSpinnerService,
    private authService: AuthService
  ) {
    // Create our observables from the subjects
    this.errors$ = this.errorsSubject.asObservable();
    this.pendingCommands$ = this.pendingCommandsSubject.asObservable();
  }

  get(url, params?) {
    let requestParameters: RequestOptionsArgs = {};

    let headers = new Headers();
    if (!!params) {
      requestParameters.search = this.buildUrlSearchParams(params);
    }
    this.createAuthorizationHeader(headers);

    requestParameters.headers = headers;

    this.waitingSpinner.startLoading$.next('');
    return this.http.get(url, requestParameters)
      .map(this.unwrapHttpValue)
      .catch((error: any) => {
        let unwrapError =  this.unwrapHttpError(error);
        this.errorsSubject.next(unwrapError);
        return Observable.throw(unwrapError);
      })
      .finally(() => {
        this.waitingSpinner.stopLoading$.next('');
      });
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    this.waitingSpinner.startLoading$.next('');

    return this.http.post(url, data, {
        headers: headers
      })
      .map(this.unwrapHttpValue)
      .catch((error: any) => {
        let unwrapError =  this.unwrapHttpError(error);
        this.errorsSubject.next(unwrapError);
        return Observable.throw(unwrapError);
      })
      .finally(() => {
        this.waitingSpinner.stopLoading$.next('');
      });

  }

  put(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    this.waitingSpinner.startLoading$.next('');

    return this.http.put(url, data, {
      headers: headers
    }).map(this.unwrapHttpValue)
      .catch((error: any) => {
        let unwrapError =  this.unwrapHttpError(error);
        this.errorsSubject.next(unwrapError);
        return Observable.throw(unwrapError);
      })
      .finally(() => {
        this.waitingSpinner.stopLoading$.next('');
      });
  }

  delete(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    this.waitingSpinner.startLoading$.next('');

    return this.http.delete(url, {
      headers: headers
    }).map(this.unwrapHttpValue)
      .catch((error: any) => {
        let unwrapError =  this.unwrapHttpError(error);
        this.errorsSubject.next(unwrapError);
        return Observable.throw(unwrapError);
      })
      .finally(() => {
        this.waitingSpinner.stopLoading$.next('');
      });
  }


  private addToken(options: ApiGatewayOptions) {
    var userId = this.getTokenFromLocalStorage();
    if(!!userId) {
      options.headers['access_token'] = userId;
    }
  }

  private getTokenFromLocalStorage(): string {
    var matches = localStorage.getItem('bc.token');
    if(!!matches) {
      let object = JSON.parse(matches);
      let dateString = moment(object.timestamp);
      let  now = moment();
      let diff = now.diff(dateString, 'hours');
      let validHours = 15;
      if (diff > validHours) {
        this.authService.logout();
        return;
      }
      // compareTime(dateString, now); //to implement
      return object['token'];
    }
    return '';
  }

  private createAuthorizationHeader(headers: Headers) {
    var token = this.getTokenFromLocalStorage();
    if(!!token) {
      headers.append('access_token', token);
    }
  }

  private getXsrfCookie(): string {
    var matches = document.cookie.match(/\bXSRF-TOKEN=([^\s;]+)/);
    try {
      return (matches && decodeURIComponent(matches[1]));
    } catch (decodeError) {
      return ("");
    }
  }

  private getEvryClientCookie(): string {
    var matches = document.cookie.match(/\bsid=([^\s;]+)/);
    try {
      return (matches && decodeURIComponent(matches[1]));
    } catch (decodeError) {
      return ("");
    }
  }

  private buildUrlSearchParams(params: any): URLSearchParams {
    var searchParams = new URLSearchParams();
    for (var key in params) {
      if(Array.isArray(params[key])) {
        params[key].forEach((data) => {
          searchParams.append(key, data)
        });
      } else {
        if (this.isJsObject(params[key])) {
          searchParams.append(key, JSON.stringify(params[key]));
        } else {
          searchParams.append(key, params[key]);
        }
      }
    }
    return searchParams;
  }

  private isJsObject(o) {
    return o !== null && (typeof o === 'function' || typeof o === 'object');
  }


  private unwrapHttpError(error: any): any {
    try {
      return (error.json());
    } catch (jsonError) {
      return ({
        code: -1,
        message: "An unexpected error occurred."
      });
    }
  }

  private unwrapHttpValue(value: Response): any {
    return !!value.text() ? value.json() : "";
  }

}
