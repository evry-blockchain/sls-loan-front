/**
 * Created by Oleksandr.Khymenko on 07.10.2016.
 */


import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectsService} from "../../../service/projects.service";

@Component({
  selector: 'create-invitation',
  templateUrl: './create-invitation.component.html',
  styleUrls: ['./create-invitation.component.scss']
})
export class CreateInvitationComponent implements OnInit {

  project;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectsService) {
  }

  ngOnInit() {

    this.route.parent.parent.params.subscribe(data => {
      let id = +data['id'];
      this.projectService.get(id).take(1);
    });
  }
}
