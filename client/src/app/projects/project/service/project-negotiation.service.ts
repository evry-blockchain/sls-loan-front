/**
 * Created by Oleksandr.Khymenko on 19.10.2016.
 */

import { Injectable, Inject } from '@angular/core';
import { ApiGateway } from "../../../api-gateway.service";
import { Subject } from "rxjs";

@Injectable()
export class ProjectNegotiationService {
  private negotiationSource = new Subject();
  private requestMapping: string;

  public negotiations$ = this.negotiationSource.asObservable();

  constructor(private http: ApiGateway,
              @Inject('ApiEndpoint') private apiEndpoint) {
    this.requestMapping = `${this.apiEndpoint}`
  }

  query() {
    var obs = this.http.get(`${this.requestMapping}/LoanNegotiations`).share();

    obs.subscribe((data) => {
      this.negotiationSource.next(data);
    });

    return obs;
  }

  saveLoanNegotiation(negotiation) {
    return this.http.post(`${this.apiEndpoint}/LoanNegotiations`, negotiation)
  }

  getSpecificNegotiation(filter) {
    console.log('here');
    return this.http.get(`${this.apiEndpoint}/LoanNegotiations`, filter)
  }
}
