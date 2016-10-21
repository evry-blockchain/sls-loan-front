/**
 * Created by Oleksandr.Khymenko on 05.10.2016.
 */

import {Injectable} from "@angular/core";
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivateChild } from "@angular/router";
import {AuthService} from "../service/auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {


  private isLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {
    authService.isLoggedIn$.subscribe((data) => {
      this.isLoggedIn = data;
      if (this.isLoggedIn === false) {
        this.router.navigate(['/login']);
      }
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.canActivate(childRoute, state);
  }

  checkLogin(url: string): boolean {
    if (this.isLoggedIn) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
