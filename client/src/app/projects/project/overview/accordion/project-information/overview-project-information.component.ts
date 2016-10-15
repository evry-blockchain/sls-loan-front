


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProjectsService } from "../../../../service/projects.service";

@Component({
  selector: 'overview-project-information',
  templateUrl: './overview-project-information.component.html',
  styleUrls: [ './overview-project-information.component.scss' ]
})
export class OverviewProjectInformationComponent implements OnInit {

  project = {};

  constructor(private route: ActivatedRoute,
              private projectService: ProjectsService) { }

  ngOnInit() {

    this.route.parent.params.subscribe(data => {
      let id = +data['id'];
      this.projectService.get(id).subscribe((project) => {
        this.project = project;
      });
    });
  }

}
