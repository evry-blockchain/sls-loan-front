/**
 * Created by Oleksandr.Khymenko on 15.10.2016.
 */

import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ProjectsService } from "../../../service/projects.service";
import { Input } from "@angular/core";

@Component({
  selector: 'project-overview-header',
  templateUrl: 'project-overview-header.component.html',
  styleUrls: ['./project-overview-header.component.scss']
})
export class ProjectOverviewHeaderComponent implements OnInit, OnChanges {
  @Input() isBankOwner;

  project = {};

  constructor(private projectService: ProjectsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['isBankOwner']) {
      return;
    }
  }

  ngOnInit() {
    this.projectService.project$.subscribe(project => {
      this.project = project;
    })
  }

}
