/**
 * Created by Oleksandr.Khymenko on 07.10.2016.
 */


import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../../service/projects.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { ProjectNegotiationService } from "../../service/project-negotiation.service";

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
  negotiation = {}
  constructor(private projectsService: ProjectsService,
              private route: ActivatedRoute,
              private negotiationService: ProjectNegotiationService,
              private router: Router) { }

  ngOnInit() {
    this.route.parent.parent.params.subscribe(data => {
      let id = +data['id'];
      this.projectsService.get(id).subscribe((project) => {
        this.project = project
      });

      this.projectsService.getInvitation(id).subscribe(invitation => {
        console.log(invitation);
        this.invitation = invitation;
      });

      var filter = {
        filter: {
          participantBankID: id,
          loanInvitationID: this.invitation['loanInvitationID']
        }
      };

      this.negotiationService.getSpecificNegotiation(filter).subscribe((data: any[]) => {
        this.negotiation = data.shift();
      });
    });
  }

}
