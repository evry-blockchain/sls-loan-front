/**
 * Created by Oleksandr.Khymenko on 13.10.2016.
 */

import { Injectable, Inject } from '@angular/core';
import { ApiGateway } from "../../../../api-gateway.service";

@Injectable()
export class InvitationService {

  private requestMapping: string;

  constructor(private http: ApiGateway,
              @Inject('ApiEndpoint') private apiEndpoint) {
    this.requestMapping = `${this.apiEndpoint}`;
  }

}
