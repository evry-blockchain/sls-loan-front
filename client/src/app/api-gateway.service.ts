/**
 * Created by Oleksandr.Khymenko on 11.10.2016.
 */
import { Injectable, Inject } from "@angular/core";
import { Http, Response, RequestOptions, RequestMethod, URLSearchParams, Headers } from "@angular/http";
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

  // I perform a GET request to the API, appending the given params
  // as URL search parameters. Returns a stream.
  get(url: string, params?: any): Observable<any> {
    let options = new ApiGatewayOptions();
    options.method = RequestMethod.Get;
    options.url = url;
    options.params = params;

    return this.request(options);
  }


  // I perform a POST request to the API. If both the params and data
  // are present, the params will be appended as URL search parameters
  // and the data will be serialized as a JSON payload. If only the
  // data is present, it will be serialized as a JSON payload. Returns
  // a stream.
  post(url: string, params?: any, data?: any): Observable<Response> {
    if (!data) {
      data = params;
      params = {};
    }
    let options = new ApiGatewayOptions();
    options.method = RequestMethod.Post;
    options.url = url;
    options.params = params;
    options.data = data;

    return this.request(options);
  }

  put(url: string, params: any, data?: any): Observable<Response> {
    if (!data) {
      data = params;
      params = {};
    }
    let options = new ApiGatewayOptions();
    options.method = RequestMethod.Put;
    options.url = url;
    options.params = params;
    options.data = data;

    return this.request(options);
  }

  delete(url: string, params?: any, data?: any): Observable<Response> {
    if (!data) {
      data = params;
      params = {};
    }
    let options = new ApiGatewayOptions();
    options.method = RequestMethod.Delete;
    options.url = url;
    options.params = params;
    options.data = data;

    return this.request(options);
  }


  private request(options: ApiGatewayOptions): Observable<any> {

    options.method = (options.method || RequestMethod.Get);
    options.url = (options.url || "");
    options.headers = (options.headers || {});
    options.params = (options.params || {});
    options.data = (options.data || {});
    this.interpolateUrl(options);
    // this.addXsrfToken(options);
    // this.addEvryToken(options);
    // this.addClientName(options);
    this.addToken(options);
    this.addContentType(options);
    let requestOptions = new RequestOptions();
    requestOptions.method = options.method;
    requestOptions.url = options.url;

    requestOptions['headers'] = <Headers>options['headers'];
    requestOptions.search = this.buildUrlSearchParams(options.params);
    requestOptions.body = JSON.stringify(options.data);

    let isCommand = (options.method !== RequestMethod.Get);

    if (isCommand) {
      this.pendingCommandsSubject.next(++this.pendingCommandCount);
    }

    this.waitingSpinner.startLoading$.next('');

    let stream = this.http.request(options.url, requestOptions)
      .map(this.unwrapHttpValue)
      .catch((error: any) => {
        let unwrapError =  this.unwrapHttpError(error);
        this.errorsSubject.next(unwrapError);
        return Observable.throw(unwrapError);
      })
      .finally(() => {
        this.waitingSpinner.stopLoading$.next('');
        if (isCommand) {
          this.pendingCommandsSubject.next(--this.pendingCommandCount);
        }
      });

    return stream;
  }


  private addContentType(options: ApiGatewayOptions): ApiGatewayOptions {
    if (options.method !== RequestMethod.Get) {
      options.headers["Content-Type"] = "application/json; charset=UTF-8";
    }
    return options;
  }

  private extractValue(collection: any, key: string): any {
    var value = collection[key];
    delete (collection[key]);
    return value;
  }

  private addXsrfToken(options: ApiGatewayOptions): ApiGatewayOptions {
    var xsrfToken = this.getXsrfCookie();
    if (xsrfToken) {
      options.headers["X-XSRF-TOKEN"] = xsrfToken;
    }
    return options;
  }

  private addEvryToken(options: ApiGatewayOptions): ApiGatewayOptions {
    var evryClientAccessToken = this.getEvryClientCookie();
    if (!!evryClientAccessToken) {
      options.headers['X-EVRY-CLIENT-ACCESSTOKEN'] = evryClientAccessToken;
    }
    return options;
  }

  private addClientName(options: ApiGatewayOptions) {
    options.headers['X-EVRY-CLIENT-CLIENTNAME'] = 'FUND_SPA';
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
        searchParams.append(key, params[key])
      }
    }
    return searchParams;
  }

  private interpolateUrl(options: ApiGatewayOptions): ApiGatewayOptions {
    options.url = options.url.replace(
      /:([a-zA-Z]+[\w-]*)/g,
      ($0, token) => {
        // Try to move matching token from the params collection.
        if (options.params.hasOwnProperty(token)) {
          return (this.extractValue(options.params, token));
        }
        // Try to move matching token from the data collection.
        if (options.data.hasOwnProperty(token)) {
          return (this.extractValue(options.data, token));
        }
        // If a matching value couldn't be found, just replace
        // the token with the empty string.
        return ("");
      }
    );
    // Clean up any repeating slashes.
    options.url = options.url.replace(/\/{2,}/g, "/");
    // Clean up any trailing slashes.
    options.url = options.url.replace(/\/+$/g, "");

    return options;
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
