/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { ProjectsService } from "../service/projects.service";

@Component({
  selector: 'projects-table',
  templateUrl: 'projects-table.component.html',
  styleUrls: ['./projects-table.component.scss']
})
export class ProjectsTableComponent implements OnInit, OnDestroy {

  public projects;

  private projectSubs;

  constructor(private router: Router,
              private projectService: ProjectsService) { }

  ngOnInit() {
    this.projectSubs = this.projectService.projects$.subscribe((projects) => {
        this.projects = projects
    })
  }

  ngOnDestroy(): void {
    this.projectSubs.unsubscribe();
  }

  goToProject(project) {
    this.router.navigate(['/projects', 1]);
  }

}
