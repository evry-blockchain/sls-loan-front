/**
 * Created by Oleksandr.Khymenko on 05.10.2016.
 */

import {Injectable, Inject} from "@angular/core";
import {CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivateChild} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {Observable} from "rxjs";
import * as moment from'moment';
import {ApiGateway} from "../../api-gateway.service";
import {UserService} from "../../user/user.service";
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {


  private isLoggedIn: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService) {
    let matches = localStorage.getItem('bc.token');
    if (!!matches) {
      let object = JSON.parse(matches);
      let dateString = moment(object.timestamp);
      let now = moment();
      let diff = now.diff(dateString, 'hours');
      let validHours = 15;
      if (diff > validHours) {
        this.router.navigate(['/login']);
        return;
      }
      this.isLoggedIn = true;
    }

    // authService.isLoggedIn$.subscribe((data) => {
    //   this.isLoggedIn = data;
    //   if (this.isLoggedIn === false) {
    //     this.router.navigate(['/login']);
    //   }
    // });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.canActivate(childRoute, state);
  }

  checkLogin(url: string): Observable<boolean> {
    if (this.isLoggedIn) {
      return Observable.of(true);
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    return this.authService.auth().mergeMap((data) => {
      this.userService.loginUser(data[0]);
      this.authService.isLoggedIn$.next(true);
      return Observable.of(true);
    }).catch(() => {
      this.router.navigate(['/login']);
      return Observable.of(false);
    });
  }
}
