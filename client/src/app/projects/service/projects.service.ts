/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable()
export class ProjectsService {

    constructor() { }

    create(project): Observable<any> {
      console.log('project', project);
      return Observable.of(project);
    }

}
