/**
 * Created by Oleksandr.Khymenko on 13.10.2016.
 */

import { Injectable, Inject } from '@angular/core';
import { ApiGateway } from "../../../../api-gateway.service";
import { Subject } from "rxjs";

@Injectable()
export class InvitationService {

  private requestMapping: string;
  private invitationSource = new Subject();

  public invitations$ = this.invitationSource.asObservable();

  constructor(private http: ApiGateway,
              @Inject('ApiEndpoint') private apiEndpoint) {
    this.requestMapping = `${this.apiEndpoint}`;
  }

  query() {
    var obs = this.http.get(`${this.requestMapping}/LoanInvitations`).cache();
      obs.subscribe(data => {
        this.invitationSource.next(data);
      });
    return obs;
  }

  get(id) {
    return this.http.get(`${this.requestMapping}/LoanInvitations/${id}`)
  }
}
