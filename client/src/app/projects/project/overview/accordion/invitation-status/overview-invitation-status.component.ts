import { Component, OnInit } from '@angular/core';
import { ColumnMode, TableOptions } from "angular2-data-table";
import { InvitationService } from "../../../invitation/service/invitation.service";
import { ProjectNegotiationService } from "../../../service/project-negotiation.service";
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { ProjectsService } from "../../../../service/projects.service";
import { ParticipantService } from "../../../../../participants/service/participants.service";

@Component({
  selector: 'overview-invitation-status',
  templateUrl: 'overview-invitation-status.component.html',
  styleUrls: ['./overview-invitation-status.component.scss']
})
export class OverviewInvitationStatusComponent implements OnInit {

  rows = [];

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 0,
    rowHeight: 'auto'
  });
  constructor(private invitationService: InvitationService,
              private negotiationService: ProjectNegotiationService,
              private participantsService: ParticipantService,
              private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectsService) { }

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
        return <any[]>acc.concat(value);
    }, [])
      .subscribe((negotiations) => {
        this.rows = negotiations;
      });

    this.negotiationService.query();

  }
}
