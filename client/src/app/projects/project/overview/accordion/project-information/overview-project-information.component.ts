


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProjectsService } from "../../../../service/projects.service";
import { ParticipantService } from "../../../../../participants/service/participants.service";
import { Observable } from "rxjs";

@Component({
  selector: 'overview-project-information',
  templateUrl: './overview-project-information.component.html',
  styleUrls: [ './overview-project-information.component.scss' ]
})
export class OverviewProjectInformationComponent implements OnInit {

  project = {};

  constructor(private route: ActivatedRoute,
              private projectService: ProjectsService,
              private participantService: ParticipantService) { }

  ngOnInit() {

    this.route.parent.params.subscribe(data => {
      let id = +data['id'];

      Observable.forkJoin(this.projectService.get(id), this.participantService.query())
        .subscribe(([project, participants]) => {
          this.project = project;
          this.project['borrower'] = this.participantService.getParticipantName(project['borrowerID'], participants);
        });
    });
  }

}
