


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProjectsService } from "../../../../service/projects.service";
import { ParticipantService } from "../../../../../participants/service/participants.service";
import { Observable } from "rxjs";
import { Input } from "@angular/core";

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

  @Input() isBankOwner;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectsService,
              private participantService: ParticipantService) { }

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
  }
  showTerminateModal(modal) {
    modal.show();
  }

  finishProject(modal) {
    this.project['status'] = 'Finished';
    this.projectService.update(this.project).subscribe(data => {

    });
    modal.hide();
  }

  deleteProject(modal) {

    modal.hide();
  }
}
