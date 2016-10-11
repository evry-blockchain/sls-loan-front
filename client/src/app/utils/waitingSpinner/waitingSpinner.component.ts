/**
 * Created by Oleksandr.Khymenko on 22.08.2016.
 */

import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {WaitingSpinnerService} from "./waitingSpinnerService";

@Component({
  selector: 'evry-waiting-spinner',
  template: `<div #spinner><div class="shade"></div><div class="spinner"></div></div>`,
  styleUrls: ['./styles/spinner.scss']
})


export class WaitingSpinnerComponent implements AfterViewInit {

    showSpinner$;

    @ViewChild('spinner') spinner: ElementRef;

    constructor(private waitingSpinnerService: WaitingSpinnerService) {}

    ngAfterViewInit() {
        this.waitingSpinnerService.showSpinner$.subscribe(data => {
            this.spinner.nativeElement.hidden = !data;
        })
    }
}
