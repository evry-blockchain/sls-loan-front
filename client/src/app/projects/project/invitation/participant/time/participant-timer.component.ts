/**
 * Created by Oleksandr.Khymenko on 08.10.2016.
 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { Input } from "@angular/core";
import { Observable } from "rxjs";
import * as moment from 'moment/moment'
@Component({
  selector: 'participant-timer',
  templateUrl: 'participant-timer.component.html',
  styleUrls: ['../../shared/shared.component.scss']
})
export class ParticipantInvitationTimerComponent implements OnInit, OnDestroy {
  private numbers;
  private timer = moment();
  time = this.timer.format();
  @Input() project;

  constructor() { }

  ngOnInit() {
    this.numbers = Observable.timer(0, 1000).subscribe((x) => {
      this.time = this.timer.subtract(1, 'seconds').format('h:mm:ss');
    });
    // this.numbers.subscribe(x => console.log(x));
  }


  ngOnDestroy(): void {
    this.numbers.unsubscribe();
  }
}
