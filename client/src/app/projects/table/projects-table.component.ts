/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {ProjectsService} from "../service/projects.service";
import {Project} from "../project/model/project.model";
import {ParticipantService} from "../../participants/service/participants.service";
import {UserService} from "../../user/user.service";
import {Observable} from "rxjs";


@Component({
  selector: 'projects-table',
  templateUrl: 'projects-table.component.html',
  styleUrls: ['./projects-table.component.scss']
})
export class ProjectsTableComponent implements OnInit, OnDestroy {

  public projects = [];

  constructor(private router: Router,
              private projectService: ProjectsService,
              private participantService: ParticipantService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.user$
      .switchMap(user => {
        if (Object.keys(user).length === 0 && user.constructor === Object) {
          return Observable.from([])
        }
        return this.projectService.query(user['participantKey']);
      })
      .distinctUntilChanged()
      .subscribe(data => {
        this.projects = data;
      });

  }

  goToProject(id) {
    this.router.navigate(['/projects', id]);
  }

  ngOnDestroy() {
    this.projects = [];
  }

}
