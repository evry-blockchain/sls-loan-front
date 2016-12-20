import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ProjectsService} from "./projects.service";
import {UserService} from "../../user/user.service";

@Injectable()
export class UtilsService {
  private isProjectOwnerSubject = new BehaviorSubject(false);

  public isProjectOwner$ = this.isProjectOwnerSubject.asObservable();

  constructor(private projectsService: ProjectsService, private userService: UserService) {
    this.projectsService.project$
      .combineLatest(this.userService.user$)
      .map(([project, user]) => {
        return project['arrangerBankID'] === user['participantKey'];
      })
      .subscribe(response => {
        this.isProjectOwnerSubject.next(response);
      })
  }


}
