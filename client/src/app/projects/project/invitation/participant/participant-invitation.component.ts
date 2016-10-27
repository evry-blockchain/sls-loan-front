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
  project;
  invitation = {};
  constructor(private projectsService: ProjectsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.parent.parent.params.subscribe(data => {


      console.log('data', data);
      let id = +data['id'];
      // this.projectsService.getInvitation(id).subscribe((invitation) => {
      //   this.invitation = invitation
      // });

    });
    // this.project = this.projectsService.get()

    this.project = {
      borrower: 'Statoil',
      projectName: 'USD 100m Statoil',
      contactPerson: 'Per Person',
      loanAmount: '500m USD',
      marketIndustry: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis delectus dolor doloremque doloribus dolorum ducimus fuga incidunt. Accusantium cumque molestiae nesciunt officia quisquam sunt tempore. Assumenda consequuntur excepturi nesciunt rerum.'

    }
  }

}
