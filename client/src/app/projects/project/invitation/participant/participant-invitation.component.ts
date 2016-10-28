/**
 * Created by Oleksandr.Khymenko on 07.10.2016.
 */


import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../../service/projects.service";
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: 'participant-invitation',
  templateUrl: './participant-invitation.component.html',
  styleUrls: [ './participant-invitation.component.scss' ],
  host: {
    'style': 'background-color: red'
  }

})
export class ParticipantInvitationComponent implements OnInit {
  project = {};
  invitation = {};
  constructor(private projectsService: ProjectsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.parent.parent.params.subscribe(data => {
      let id = +data['id'];
      this.projectsService.get(id).subscribe((project) => {
        this.project = project
      });

      this.projectsService.getInvitation(id).subscribe(invitation => {
        this.invitation = invitation;
      })
    });
  }

}
