/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */

import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ProjectsService } from "./service/projects.service";

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']

})
export class ProjectsComponent implements OnInit {

  public projects = [];

  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private projectService: ProjectsService) { }


  ngOnInit() {
    this.projectService.query().subscribe((data) => {
      this.projects = data;
    })
  }

  saved(project) {
    this.projects.push(project);
  }

}
