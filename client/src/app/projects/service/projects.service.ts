/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */
import { Injectable, Inject } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { ApiGateway } from "../../api-gateway.service";
import { UserService } from "../../user/user.service";
import { Project } from "../project/model/project.model";

@Injectable()
export class ProjectsService {


  private projectsSource;
  private addProjectSource = new Subject();
  private requestMapping: string;
  private projectSource = new BehaviorSubject([]);
  private invitationSource = new BehaviorSubject({});
  private selectedInviteeSource = new BehaviorSubject([]);
  private deleteInviteeSource = new Subject();

  public project$ = this.projectSource.asObservable();
  public invitation$ = this.invitationSource.asObservable();
  public selectedInvitees$ = this.selectedInviteeSource.asObservable().merge(this.deleteInviteeSource).scan((acc: any[], v) => {
    var elem = <any[]>acc.find((elem) => {
      return elem.participantKey === v.participantKey
    });

    if (!!elem) {
      return <any[]>acc.filter((acc) => {
        return acc['participantKey'] !== elem['participantKey'];
      })
    } else {
      return acc.concat(v);
    }
  }, []).publishReplay(1);


  constructor(private http: ApiGateway,
              @Inject('ApiEndpoint') private apiEndpoint,
              private userService: UserService) {
    this.requestMapping = `${this.apiEndpoint}/LoanRequests`;
  }

  query(id) {

    let filter = {
      filter: {
        participantBankID: id
      }
    };

    let projectsFilter = {
      filter: {
        arrangerBankID: id
      }
    };

    // let projectsSource = this.http.get(this.requestMapping, projectsFilter);

    return this.http.get(`${this.apiEndpoint}/LoanNegotiations`, filter)
      .mergeMap((data) => {
        return Observable.from(data);
      }).mergeMap(negotiation => {
      let filter = {
        filter: {
          loanRequestID: negotiation['loanInvitationID']
        }
      };
      return this.http.get(this.requestMapping, filter).mergeMap((projects) => {
        return Observable.from(projects)
      });
    }).merge(this.http.get(this.requestMapping, projectsFilter)
        .mergeMap((projects) => {
          return Observable.from(projects);
        }))
      .merge(this.addProjectSource)
      .combineLatest(this.userService.user$)
      .map(([project, user]) => {
        project['role'] = this.userService.getRole(project['arrangerBankID'], user);
        return project;
      })
      .scan((accum: any[], x) => {
        return accum.concat(x);
      }, []);
    // delete this code ask Adrian for normal urls
    // this.userService.user$.subscribe(user => {
    //
    //
    //
    // })

    // this.projectsSource = this.http.get(this.requestMapping)
    //                       .mergeMap((projects) => {
    //                         return Observable.from(projects);
    //                       });
    //
    // return this.projectsSource
    //   .merge(this.addProjectSource)
    //   .combineLatest(this.userService.user$)
    //   .map(([project, user]) => {
    //     project['role'] = this.userService.getRole(project['arrangerBankID'], user);
    //     return project;
    //   })
    //   .scan(function(accum, x) {
    //     return accum.concat(x);
    //   }, []);
  }

  create(project: Project): Observable<any> {
    return this.http.post(this.requestMapping, project)
      .mergeMap(() => {
        return this.getProjectCount();
      })
      .do((countLength) => {
        console.log(countLength);
        project.status = "Pending";
        project.loanRequestID = (+countLength['count'] + 1).toString();
        this.addProjectSource.next(project);
      });
  }

  get(id) {
    var obs = this.http.get(`${this.requestMapping}/${id}`).share();
    obs.subscribe(data => {
      this.projectSource.next(data);
    });
    return obs;
  }

  update(data) {
    var obs = this.http.put(`${this.requestMapping}`, data)
      .do(() => {
        this.projectSource.next(data);
      });

    return  obs
  }

  public getProjectCount() {
    return this.http.get(`${this.requestMapping}/count`);
  }

  updateInvitation(data) {
    this.invitationSource.next(data);
  }

  saveLoanInvitation(invitation) {
    return this.http.post(`${this.apiEndpoint}/LoanInvitations`, invitation);
  }

  public addSelectedInvitation(invitation) {
    this.selectedInviteeSource.next(invitation)
  }

  removeInvitee(invitee) {
    invitee.selected = false;
    this.deleteInviteeSource.next(invitee);
  }

  getInvitation(id): Observable<any> {
    return this.http.get(`${this.apiEndpoint}/LoanInvitations/${id}`);
  }

  getLoanInvitationByProjectId(id) {
    var filter = {
      filter: {
        loanRequestID: id
      }
    }
    return this.http.get(`${this.apiEndpoint}/LoanInvitations/${id}`, filter)
  }

}
