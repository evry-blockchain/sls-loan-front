/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */
import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { ApiGateway } from "../../api-gateway.service";

@Injectable()
export class ProjectsService {

  public projects$;

  private projectsSource;
  private addProjectSource = new Subject();
  private requestMapping: string;

  constructor(private http: ApiGateway,
              @Inject('ApiEndpoint') private apiEndpoint) {
    this.requestMapping = `${this.apiEndpoint}/LoanRequests`;

    this.projectsSource = this.http.get(this.requestMapping)
                          .mergeMap((projects) => {
                            return Observable.from(projects);
                          });

    this.projects$ = this.projectsSource.merge(this.addProjectSource)
      .scan(function(accum, x) {
        return accum.concat(x);
      }, []);
  }

  create(project): Observable<any> {
    return this.http.post(this.requestMapping, project)
      .do(() => {
       this.addProjectSource.next(project);
    });
  }

  get(id) {
    return this.http.get(`${this.requestMapping}/${id}`);
  }

}
