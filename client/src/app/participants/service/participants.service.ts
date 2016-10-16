/**
 * Created by Oleksandr.Khymenko on 13.10.2016.
 */


import { Injectable, Inject } from '@angular/core';
import { ApiGateway } from "../../api-gateway.service";
import { BehaviorSubject, Observable } from "rxjs";

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
    console.log('restasdfasdfasfdasart colksadfjmputer');
    var query = this.http.get(this.requestMapping);

    query.subscribe((projects) => {
      console.log('here', projects);
      this.participantsSource.next(projects);
    });
    return query;
  }

  getParticipantName(id, participants) {
    return participants.find((item) => {
        return item['participantKey'] === id;
    })['participantName'];
  }



}
