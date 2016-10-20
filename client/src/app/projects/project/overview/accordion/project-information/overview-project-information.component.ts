


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProjectsService } from "../../../../service/projects.service";
import { ParticipantService } from "../../../../../participants/service/participants.service";
import { Observable } from "rxjs";

@Component({
  selector: 'overview-project-information',
  templateUrl: './overview-project-information.component.html',
  styleUrls: [ './overview-project-information.component.scss' ],
  host: {
    'class': '"section-content"'
  }
})
export class OverviewProjectInformationComponent implements OnInit {

  project = {};

  constructor(private route: ActivatedRoute,
              private projectService: ProjectsService,
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
