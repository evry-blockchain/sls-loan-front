

import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../../service/projects.service";
import { ParticipantService } from "../../../../participants/service/participants.service";

@Component({
  selector: 'overview-participant-project-information',
  templateUrl: '/overview-participant-project.component.html',
  styleUrls: [ './overview-participant-project.component.scss' ]
})
export class OverviewParticipantProjectInformationComponent implements OnInit {

  public project;
  public pieChartLabels:string[] = ["My shares", 'Other Shares'];
  public pieChartData:number[] = [180, 370];
  public pieChartType:string = 'pie';
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor(private projectService: ProjectsService,
              private participantService: ParticipantService) { }

  ngOnInit() {

    this.projectService.project$
      .combineLatest(this.participantService.participants$)
      .map(([project, participants]) => {
        project['borrower'] = this.participantService.getParticipantName(project['borrowerID'], participants);
        return project;
      }).subscribe((project) => {
      this.project = project;
    });
  }

}
