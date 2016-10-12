/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */
import { Injectable, Inject } from '@angular/core';
import { Observable } from "rxjs";
import { ApiGateway } from "../../api-gateway.service";

@Injectable()
export class ProjectsService {

  private requestMapping: string;

  constructor(private http: ApiGateway,
              @Inject('ApiEndpoint') private apiEndpoint) {
    this.requestMapping = `${this.apiEndpoint}/LoanRequests`
  }

  query(): Observable<any> {
    return this.http.get(this.requestMapping)
  }

  create(project): Observable<any> {
    return this.http.post(this.requestMapping, project);
  }

}
