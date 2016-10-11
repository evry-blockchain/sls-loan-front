/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ApiGateway } from "../../api-gateway.service";

@Injectable()
export class ProjectsService {

    constructor(private http: ApiGateway) { }


    query(): Observable<any> {
      return this.http.get('/api/loans')
    }

    create(project): Observable<any> {
      console.log('project', project);
      return Observable.of(project);
    }

}
