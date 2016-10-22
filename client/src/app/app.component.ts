import { Component, ViewContainerRef, ViewEncapsulation } from '@angular/core';

import {ApiService} from './shared';

import '../style/app.scss';
import { AuthService } from "./auth/service/auth.service";
import * as moment from 'moment';
@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    url = 'https://github.com/preboot/angular2-webpack';
  private viewContainerRef: ViewContainerRef;

  public constructor(viewContainerRef:ViewContainerRef, private  authService: AuthService) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;

    this.isUserLogedIn();

  }

  isUserLogedIn() {
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
      this.authService.isLoggedIn$.next(true);
      // compareTime(dateString, now); //to implement
    }
  }



}
