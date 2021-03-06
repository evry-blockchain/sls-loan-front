import { Component, ViewContainerRef, ViewEncapsulation } from '@angular/core';

import {ApiService} from './shared';

import '../style/app.scss';
import { AuthService } from "./auth/service/auth.service";
import * as moment from 'moment';
import { UserService } from "./user/user.service";
@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    url = 'https://github.com/preboot/angular2-webpack';
  private viewContainerRef: ViewContainerRef;

  public constructor(viewContainerRef:ViewContainerRef,
                     private  authService: AuthService,
                     private userService: UserService) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;

  }
}
