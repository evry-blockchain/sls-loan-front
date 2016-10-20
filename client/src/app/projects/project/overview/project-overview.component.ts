/**
 * Created by Oleksandr.Khymenko on 07.10.2016.
 */

import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../service/projects.service";
import { ParticipantService } from "../../../participants/service/participants.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'project-overview',
  templateUrl: 'project-overview.component.html',
  styleUrls: [ 'project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
    constructor(private projectService: ProjectsService,
                private participantService: ParticipantService,
                private route: ActivatedRoute) { }

    ngOnInit() {

      this.route.parent.params.subscribe(data => {
        let id = +data['id'];
        console.log(data);
        this.projectService.get(id);
      });

      this.participantService.query();
      // this.projectService.query();
      // this.participantService.query()
    }

}
