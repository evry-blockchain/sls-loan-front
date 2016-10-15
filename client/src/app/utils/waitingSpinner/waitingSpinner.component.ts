/**
 * Created by Oleksandr.Khymenko on 22.08.2016.
 */

import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {WaitingSpinnerService} from "./waitingSpinnerService";

@Component({
  selector: 'evry-waiting-spinner',
  template: `<div [hidden]="!(showSpinner$ | async)"><div class="shade"></div><div class="spinner"></div></div>`,
  styleUrls: ['./styles/spinner.scss']
})


export class WaitingSpinnerComponent {

    showSpinner$;

    constructor(private waitingSpinnerService: WaitingSpinnerService) {
      this.showSpinner$ = this.waitingSpinnerService.showSpinner$;
    }
}
