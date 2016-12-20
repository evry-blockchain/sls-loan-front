/**
 * Created by Oleksandr.Khymenko on 07.10.2016.
 */


import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectsService} from "../service/projects.service";

@Component({
  selector: 'project',
  templateUrl: 'project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  constructor(private route: ActivatedRoute, private projectService: ProjectsService) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      let id = +data['id'];
      this.projectService.get(id);
    });

    this.projectService.project$.map(i => console.info(i));
  }

}
