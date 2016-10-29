/**
 * Created by Oleksandr.Khymenko on 08.10.2016.
 */


import {
  Component, OnInit, OnDestroy, ElementRef
} from '@angular/core';
import { Input } from "@angular/core";
import { Observable } from "rxjs";
import * as moment from 'moment/moment'
import { ViewChild } from "@angular/core";
@Component({
  selector: 'participant-timer',
  templateUrl: 'participant-timer.component.html',
  styleUrls: ['../../shared/shared.component.scss', './participant-timer.component.scss']
})
export class ParticipantInvitationTimerComponent implements OnInit, OnDestroy {

  private numbers;
  private timer = moment().hour(2).minute(0).second(10);
  time = this.timer.format();

  @ViewChild('timeLeft') timeLeft: ElementRef;
  @ViewChild('timeLeftLabel') timeLeftLabel: ElementRef;
  @Input() negotiation;
  @ViewChild('textarea') textarea: ElementRef;

  isShowAnimation: boolean = false;

  constructor() { }

  ngOnInit() {
    this.textarea.nativeElement.focus();
    // this.numbers = Observable.timer(0, 1000).subscribe((x) => {
    //   this.time = this.timer.subtract(1, 'seconds').format('h:mm:ss');
    //   if (!this.isShowAnimation && (this.timer.diff(moment({hour: 2, minute: 0, second: 0})) < 0) ) {
    //     this.timeLeft.nativeElement.style.color = 'red';
    //     this.timeLeftLabel.nativeElement.style.color = 'red';
    //     this.isShowAnimation = true;
    //   }

    // });
  }

  ngOnDestroy(): void {
    // this.numbers.unsubscribe();
  }

  interested(modal) {
      modal.hide()
  }

  notInterested(modal) {
    modal.hide();
  }
}
