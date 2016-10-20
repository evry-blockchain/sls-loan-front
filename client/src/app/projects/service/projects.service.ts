/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */
import { Injectable, Inject } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { ApiGateway } from "../../api-gateway.service";

@Injectable()
export class ProjectsService {


  private projectsSource;
  private addProjectSource = new Subject();
  private requestMapping: string;
  private projectSource = new Subject();

  public project$ = this.projectSource.asObservable();

  constructor(private http: ApiGateway,
              @Inject('ApiEndpoint') private apiEndpoint) {
    this.requestMapping = `${this.apiEndpoint}/LoanRequests`;
  }

  create(project): Observable<any> {
    return this.http.post(this.requestMapping, project)
      .do(() => {
       this.addProjectSource.next(project);
    });
  }

  get(id) {
    var obs = this.http.get(`${this.requestMapping}/${id}`).cache();
    obs.subscribe(data => {
      this.projectSource.next(data);
    });
    return obs;
  }

  query() {
    this.projectsSource = this.http.get(this.requestMapping)
                          .mergeMap((projects) => {
                            return Observable.from(projects);
                          });

    return this.projectsSource.merge(this.addProjectSource)
      .scan(function(accum, x) {
        return accum.concat(x);
      }, []);
  }

}
