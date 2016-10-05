/**
 * Created by Oleksandr.Khymenko on 05.10.2016.
 */

import {Injectable} from "@angular/core";
import {CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from "@angular/router";
import {AuthService} from "../service/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  isLoggedIn;
  constructor(private authService: AuthService, private router: Router) {
    authService.isLoggedIn$.subscribe((data) => {
      this.isLoggedIn = data;
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.isLoggedIn) {
      return true;
    }
    // if (this.authService.isLoggedIn) {
    //   return true;
    // }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
