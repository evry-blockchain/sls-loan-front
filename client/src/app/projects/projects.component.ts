/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */

import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ProjectsService } from "./service/projects.service";
import {UserService} from "../user/user.service";

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']

})
export class ProjectsComponent implements OnInit {

  user = {};
  constructor(private userService: UserService) {}


  ngOnInit() {
    this.userService.user$.subscribe(data => {
      this.user = data;
    })
  }


}
