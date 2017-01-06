/**
 * Created by Oleksandr.Khymenko on 19.10.2016.
 */

import {Injectable, Inject} from '@angular/core';
import {ApiGateway} from "../../../api-gateway.service";
import {Subject, Observable, BehaviorSubject} from "rxjs";

@Injectable()
export class ProjectNegotiationService {
  private negotiationSource = new Subject();
  private requestMapping: string;
  private negotiationsForProjectSource = new BehaviorSubject([]);

  public negotiations$ = this.negotiationSource.asObservable();
  public negotiationsForProject$ = this.negotiationsForProjectSource
    .mergeMap(data => Observable.from(data))
    .scan((acc: any[], el) => {
      return [...acc, el];
    }, []).share();

  constructor(private http: ApiGateway,
              @Inject('ApiEndpoint') private apiEndpoint) {
    this.requestMapping = `${this.apiEndpoint}`

  }

  query(filter) {
    var obs = this.http.get(`${this.requestMapping}/LoanNegotiations`, filter).share();

    obs.subscribe((data) => {
      this.negotiationSource.next(data);
    });

    return obs;
  }

  update(negotiation) {
    return this.http.put(`${this.apiEndpoint}/LoanNegotiations`, negotiation);
  }

  saveLoanNegotiation(negotiation) {
    return this.http.post(`${this.apiEndpoint}/LoanNegotiations`, negotiation)
  }

  getSpecificNegotiation(filter) {
    return this.http.get(`${this.apiEndpoint}/LoanNegotiations`, filter)
  }

  getNegotiationForProjectAndBank(bankId, projectId) {
    return this.http.get(`${this.apiEndpoint}/Utils/negotiationByBankAndProject/${bankId}/${projectId}`);
  }

  getNegotiationsForProject(projectId) {
    let obs = this.http.get(`${this.apiEndpoint}/Utils/negotiationsByProject/${projectId}`);
    obs.subscribe(data => {
      this.negotiationsForProjectSource.next(data);
    });
    return obs;
  }
}
