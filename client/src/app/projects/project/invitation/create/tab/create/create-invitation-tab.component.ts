/**
 * Created by Oleksandr.Khymenko on 07.10.2016.
 */



import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ProjectsService } from "../../../../../service/projects.service";
import { ParticipantService } from "../../../../../../participants/service/participants.service";
import { Observable } from "rxjs";

@Component({
  selector: 'create-invitation-tab',
  templateUrl: './create-invitation-tab.component.html',
  styleUrls: ['./create-invitation-tab.component.scss']
})
export class CreateInvitationTabComponent implements OnInit {

  project = {};


  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectsService: ProjectsService,
              private participantService: ParticipantService) { }

  ngOnInit() {
    this.route.parent.parent.parent.params.forEach((params) => {
      let id = +params['id']; // (+) converts string 'id' to a number
      Observable.forkJoin(this.projectsService.get(id))
        .subscribe(([project, participants]) => {
          this.project = project;
          project['marketIndustry'] = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis delectus dolor doloremque doloribus dolorum ducimus fuga incidunt. Accusantium cumque molestiae nesciunt officia quisquam sunt tempore. Assumenda consequuntur excepturi nesciunt rerum.';
          this.project['borrower'] = this.participantService.getParticipantName(project['borrowerID'], participants);
        });
    });

  }


  nextTab() {
    this.router.navigate(['./select'], {relativeTo: this.route});
  }

}
