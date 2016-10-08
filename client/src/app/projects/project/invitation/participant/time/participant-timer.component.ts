/**
 * Created by Oleksandr.Khymenko on 08.10.2016.
 */


import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
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
  private timer = moment();
  time = this.timer.format();
  @Input() project;
  @ViewChild('textarea') textarea: ElementRef;

  constructor() { }

  ngOnInit() {
    console.log('tih', this.textarea);
    this.textarea.nativeElement.focus();
    this.numbers = Observable.timer(0, 1000).subscribe((x) => {
      this.time = this.timer.subtract(1, 'seconds').format('h:mm:ss');
    });
    // this.numbers.subscribe(x => console.log(x));
  }

  ngOnDestroy(): void {
    this.numbers.unsubscribe();
  }

  interested(modal) {
      modal.hide()
  }

  notInterested(modal) {
    modal.hide();
  }
}
