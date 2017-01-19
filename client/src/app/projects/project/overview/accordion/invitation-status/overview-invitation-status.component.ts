import {Component, OnInit, Input} from '@angular/core';
import {ColumnMode, TableOptions} from "angular2-data-table";
import {InvitationService} from "../../../invitation/service/invitation.service";
import {ProjectNegotiationService} from "../../../service/project-negotiation.service";
import {Observable} from "rxjs";
import {Router, ActivatedRoute} from "@angular/router";
import {ProjectsService} from "../../../../service/projects.service";
import {ParticipantService} from "../../../../../participants/service/participants.service";
import {ToastOptions, ToastData, ToastyService} from "ng2-toasty";

@Component({
  selector: 'overview-invitation-status',
  templateUrl: 'overview-invitation-status.component.html',
  styleUrls: ['./overview-invitation-status.component.scss']
})
export class OverviewInvitationStatusComponent implements OnInit {
  @Input() isBankOwner;
  private editingAmounts = false;

  rows = [];

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 0,
    rowHeight: 'auto'
  });

  constructor(private toastyService: ToastyService,
              private invitationService: InvitationService,
              private negotiationService: ProjectNegotiationService,
              private participantsService: ParticipantService,
              private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectsService) {
  }

  ngOnInit() {

    this.negotiationService.negotiations$
      .mergeMap((data) => {
        return Observable.from(<any[]> data)
      })
      .combineLatest(this.participantsService.participants$)
      .map(([negotiation, participants]) => {
        negotiation['bankName'] = this.participantsService.getParticipantName(negotiation['participantBankID'], participants);
        return negotiation;
      }).scan((acc, value) => {
      let elem = acc.find(elem => {
        return elem['loanNegotiationID'] === value['loanNegotiationID']
      });

      if (!!elem) {
        return acc;
      }

      return <any[]>acc.concat(value);
    }, [])
      .subscribe((negotiations) => {
        this.rows = negotiations;
      });

    this.route.parent.params.subscribe(data => {
      let id = +data['id'];

      let filter = {
        filter: {
          loanRequestID: id
        }
      };
      return this.negotiationService.query(filter);
    });
  }
  editAmounts() {
    this.editingAmounts = true;
  }

  saveAmounts() {
    let negotiationsSaving = [];
    this.rows.forEach(item => {
      negotiationsSaving.push(this.negotiationService.saveLoanNegotiation(item));
    });

    Observable.forkJoin(negotiationsSaving).subscribe(() => {

      let toastOptions: ToastOptions = {
        title: "Success",
        msg: "Amounts updated!",
        showClose: true,
        timeout: 10000,
        theme: 'default',
        onAdd: (toast: ToastData) => {
        },
        onRemove: function (toast: ToastData) {
        }
      };

      this.toastyService.success(toastOptions);
      //Add event emitter to push values to the top
    });


    this.editingAmounts = false;
  }

  updateValue(event, cell, cellValue, row) {
    this.rows[row.$$index][cell] = event.target.value;
  }
}

