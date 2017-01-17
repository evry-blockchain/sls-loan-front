/**
 * Created by Oleksandr.Khymenko on 07.10.2016.
 */

import {Component, OnInit} from '@angular/core';
import {ToastyService, ToastOptions, ToastData} from "ng2-toasty";
import {Router, ActivatedRoute} from "@angular/router";
import {ProjectsService} from "../../../service/projects.service";
import {ParticipantService} from "../../../../participants/service/participants.service";
import {ProjectNegotiationService} from "../../service/project-negotiation.service";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'send-invitation',
  templateUrl: 'send-invitation.component.html',
  styleUrls: ['./send-invitation.component.scss']
})
export class SendInvitationComponent implements OnInit {
  public project;

  companies;

  constructor(private toastyService: ToastyService,
              private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectsService,
              private participantService: ParticipantService,
              private negotiationService: ProjectNegotiationService,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.projectService.project$
      .combineLatest(this.participantService.participants$)
      .map(([project, participants]) => {
        project['borrower'] = this.participantService.getParticipantName(project['borrowerID'], participants);
        return project
      }).subscribe((project) => {
      this.project = project;
    });

    this.projectService.selectedInvitees$.subscribe(data => {
      this.companies = data;
    });

  }

  removeCompany(company) {
    this.projectService.removeInvitee(company);
  }

  sendInvitation() {
    let invitations = [];
    let date = this.datePipe.transform(new Date(), 'dd-MM-yyyy'); //date of negotiation created

    this.projectService.update(this.project).subscribe(data => {
      this.companies.forEach(company => {
        if (!company.negotiation) {
          let negotiation = {
            "loanRequestID": this.project['loanRequestID'],
            "participantBankID": company['participantKey'],
            "amount": "",
            "negotiationStatus": 'INVITED',
            'participantBankComment': '',
            'date': date
          };

          invitations.push(this.negotiationService.saveLoanNegotiation(negotiation));
        }
      });

      Observable.forkJoin(invitations).subscribe(() => {
        this.companies.forEach((company) => {
          this.projectService.removeInvitee(company);
        });
        this.router.navigate(['../../../overview'], {relativeTo: this.route});
      });

      let toastOptions: ToastOptions = {

        title: "Success",
        msg: "Invitations has been sent",
        showClose: true,
        timeout: 10000,
        theme: 'default',
        onAdd: (toast: ToastData) => {
        },
        onRemove: function (toast: ToastData) {
        }
      };

      this.toastyService.success(toastOptions);
    });
  };

}

