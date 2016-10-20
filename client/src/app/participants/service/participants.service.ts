/**
 * Created by Oleksandr.Khymenko on 13.10.2016.
 */


import { Injectable, Inject } from '@angular/core';
import { ApiGateway } from "../../api-gateway.service";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable()
export class ParticipantService {

  private participantsSource = new BehaviorSubject([]);

  public participants$ = this.participantsSource.asObservable();

  public requestMapping;

  constructor(private http: ApiGateway,
              @Inject('ApiEndpoint') private apiEndpoint) {
    this.requestMapping = `${this.apiEndpoint}/participants`;
  }

  query(): Observable<any> {
    var query = this.http.get(this.requestMapping).cache();

    query.subscribe((projects) => {
      this.participantsSource.next(projects);
    });

    return query;
  }

  getParticipantName(id, participants) {
    var obj =  participants.find((item) => {
      return item['participantKey'] === id;
    })
    return !!obj ? obj['participantName'] : '';
  }
}
