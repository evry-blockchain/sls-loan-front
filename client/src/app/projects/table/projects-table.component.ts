/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProjectsService } from "../service/projects.service";
import { Project } from "../project/model/project.model";

@Component({
  selector: 'projects-table',
  templateUrl: 'projects-table.component.html',
  styleUrls: ['./projects-table.component.scss']
})
export class ProjectsTableComponent implements OnInit {

  public projects;

  constructor(private router: Router,
              private projectService: ProjectsService) { }

  ngOnInit() {
    this.projects = this.projectService.query();
  }

  goToProject(project: Project) {
    this.router.navigate(['/projects', project.loanRequestID]);
  }

}
