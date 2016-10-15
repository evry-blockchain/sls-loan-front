/**
 * Created by Oleksandr.Khymenko on 13.10.2016.
 */


import { Injectable, Inject } from '@angular/core';
import { ApiGateway } from "../../api-gateway.service";

@Injectable()
export class ParticipantService {

  public participants$;

  public requestMapping;

  constructor(private http: ApiGateway,
              @Inject('ApiEndpoint') private apiEndpoint) {
    this.requestMapping = `${this.apiEndpoint}/participants`;
  }

  query() {
    return this.http.get(this.requestMapping);
  }

  getParticipantName(id, participants) {
    return participants.find((item) => {
        return item['participantKey'] === id;
    })['participantName'];
  }

}
