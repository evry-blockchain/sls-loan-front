/**
 * Created by Oleksandr.Khymenko on 07.10.2016.
 */

import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastOptions, ToastData } from "ng2-toasty";
import { Router, ActivatedRoute } from "@angular/router";
import { ProjectsService } from "../../../service/projects.service";
import { ParticipantService } from "../../../../participants/service/participants.service";
import { ProjectNegotiationService } from "../../service/project-negotiation.service";
import { Observable } from "rxjs";

@Component({
    selector: 'send-invitation',
    templateUrl: 'send-invitation.component.html',
    styleUrls: ['./send-invitation.component.scss']
})
export class SendInvitationComponent implements OnInit {
  public project;

  public invitation;

  companies;

  constructor(private toastyService: ToastyService,
              private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectsService,
              private participantService: ParticipantService,
              private negotiationService: ProjectNegotiationService) { }

  ngOnInit() {
    this.projectService.project$
      .combineLatest(this.participantService.participants$)
      .map(([project, participants]) => {
        project['borrower'] = this.participantService.getParticipantName(project['borrowerID'], participants);
        return project
      }).subscribe((project) => {
      this.project = project;
    });

    this.projectService.invitation$.subscribe(data => {
      this.invitation = data;
    });

    this.projectService.selectedInvitees$.subscribe(data => {
      this.companies = data;
    });

  }

  removeCompany(company) {
    this.projectService.removeInvitee(company);
  }

  sendInvitation() {
    this.invitation['arrangerBankID'] = this.project['arrangerBankID'];
    this.invitation['loanRequestID'] = this.project['loanRequestID'];

    this.projectService.getLoanInvitationByProjectId(this.project['loanRequestID']).subscribe(data => {
      let invitations = [];
      this.companies.forEach(company => {
        let negotiation = {
          "loanInvitationID":  data[0]['loanInvitationID'],
          "participantBankID": company['participantKey'],
          "amount": "2000",
          "negotiationStatus": 'Pending',
          'participantBankComment': '123',
          'date': '14-16-2018'
        };
        invitations.push(this.negotiationService.saveLoanNegotiation(negotiation));
      });

      Observable.forkJoin(invitations).subscribe(() => {
        this.projectService.updateInvitation({});
        this.companies.forEach((company) => {
          this.projectService.removeInvitee(company);
        });
        this.router.navigate(['../../../overview'], {relativeTo: this.route});
      })
    });

    var toastOptions:ToastOptions = {

      title: "Success",
      msg: "Invitations has been sent",
      showClose: true,
      timeout: 10000,
      theme: 'default',
      onAdd: (toast:ToastData) => {
      },
      onRemove: function(toast:ToastData) {
      }
    };

    this.toastyService.success(toastOptions);
  }
}
