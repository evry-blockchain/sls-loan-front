/**
 * Created by Oleksandr.Khymenko on 07.10.2016.
 */

import {Component, OnInit} from '@angular/core';
import {ProjectsService} from "../../service/projects.service";
import {ParticipantService} from "../../../participants/service/participants.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../user/user.service";
import {ProjectNegotiationService} from '../service/project-negotiation.service';
import {Observable} from "rxjs";

@Component({
  selector: 'project-overview',
  templateUrl: 'project-overview.component.html',
  styleUrls: ['project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  constructor(private projectService: ProjectsService,
              private participantService: ParticipantService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private projectNegotiationService: ProjectNegotiationService) {
  }

  private isBankOwner;
  private hasResponded;

  ngOnInit() {
    this.route.parent.params.subscribe(data => {
      let id = +data['id'];
      this.isBankOwner = this.projectService.project$.combineLatest(this.userService.user$)
        .map(([project, user]) => {
          return project['arrangerBankID'] === user['participantKey'];
        });

      this.hasResponded = this.userService.user$.switchMap(user => {
        if(!user['participantKey']) {
          return Observable.of({});
        } else {
          return this.projectNegotiationService.getNegotiationForProjectAndBank(user['participantKey'], id);
        }
      }).combineLatest(this.isBankOwner).subscribe(([data, owner]) => {
        if ((data['negotiationStatus'] == 'Pending' || data['negotiationStatus'] == 'INVITED' && !owner)) {
          //TODO: Dmytro check previous route
          this.router.navigate(['./invitation/participant'], {relativeTo: this.route.parent});
        }
      })
    });

    // this.hasResponded = this.projectService.project$.take(1)
    //   .combineLatest(this.userService.user$)
    //   .switchMap(([project, user]) => {
    //     return this.projectNegotiationService.getNegotiationForProjectAndBank(user['participantKey'], project['loanRequestID']);
    //   })
    //   .combineLatest(this.isBankOwner).subscribe(([data, owner]) => {
    //     this.negotiation = data;
    //     if ((data['negotiationStatus'] == 'Pending' || data['negotiationStatus'] == 'INVITED' && !owner)) {
    //       //TODO: Dmytro check previous route
    //       this.router.navigate(['./invitation/participant'], {relativeTo: this.route.parent});
    //     }
    //   });


    this.participantService.query();
  };
}
