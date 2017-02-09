import {Component, OnInit} from '@angular/core';
import {ProjectsService} from "../../../service/projects.service";
import {ParticipantService} from "../../../../participants/service/participants.service";
import {ProjectNegotiationService} from "../../service/project-negotiation.service";
import {Observable} from "rxjs";
import {UserService} from "../../../../user/user.service";
import * as _ from "lodash";

@Component({
  selector: 'overview-participant-project-information',
  templateUrl: '/overview-participant-project.component.html',
  styleUrls: ['./overview-participant-project.component.scss']
})
export class OverviewParticipantProjectInformationComponent implements OnInit {

  public project = {};
  public projectForNegotiation = {};
  public pieChartLabels: string[] = ["My shares", 'Other Shares'];
  public pieChartData: number[] = [];
  public chartType: string = 'pie';
  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
  };

  private negotiation = {};
  private negotiation$;

  constructor(private projectService: ProjectsService,
              private participantService: ParticipantService,
              private negotiationsService: ProjectNegotiationService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.projectService.project$
      .combineLatest(this.participantService.participants$)
      .map(([project, participants]) => {
        project['borrower'] = this.participantService.getParticipantName(project['borrowerID'], participants);
        project['arranger'] = this.participantService.getParticipantName(project['arrangerBankID'], participants);
        return project;
      }).subscribe((project) => {

      this.project = project;
    });

    this.projectService.project$.mergeMap(data => {
      this.projectForNegotiation = data;
      return this.userService.user$;
    }).mergeMap(user => {
      if (!user['participantKey']) {
        this.negotiation$ = Observable.of({});
      } else {
        this.negotiation$ = this.negotiationsService.getNegotiationForProjectAndBank(user['participantKey'], this.projectForNegotiation['loanRequestID']);
      }

      return this.negotiation$;
    }).subscribe(negotiation => {
      //this here is needed for chart-refresh, we need to reference to a new array each time we update the data
      let chartData = [];
      if(typeof negotiation['amount'] !== 'undefined') {
        chartData.push(+negotiation['amount']);
        chartData.push(parseFloat(this.projectForNegotiation['loanSharesAmount'].replace(/[a-z A-Z]/g, '')));
      }
      if(!_.isEqual(chartData, this.pieChartData)) {
        this.pieChartData = chartData;
      }

      negotiation['amount'] = +negotiation['amount'];
      this.negotiation = negotiation;
    })

  }

}
