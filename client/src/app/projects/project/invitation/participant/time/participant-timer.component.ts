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
import { ProjectNegotiationService } from "../../../service/project-negotiation.service";
import { ToastOptions, ToastData, ToastyService } from "ng2-toasty";
import { FormControl } from "@angular/forms";
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

  commentsControl = new FormControl();

  isShowAnimation: boolean = false;

  constructor(private negotiationService: ProjectNegotiationService,
              private toastyService: ToastyService) { }

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
    this.negotiation.negotiationStatus = 'INTERESTED';
    this.negotiation.participantBankComment = this.commentsControl.value
    this.negotiationService.update(this.negotiation).subscribe(() => {
      modal.hide();

      var toastOptions:ToastOptions = {
        title: "Success",
        msg: "Your reply has been saved.",
        showClose: true,
        timeout: 10000,
        theme: 'default',
        onAdd: (toast:ToastData) => {
        },
        onRemove: function(toast:ToastData) {
        }
      };

      this.toastyService.success(toastOptions);

    })
  }

  notInterested(modal) {
    this.negotiation.negotiationStatus = 'DECLINED';
    this.negotiation.participantBankComment = this.commentsControl.value;
    this.negotiationService.update(this.negotiation).subscribe(() => {
      modal.hide();

    })
  }
}
