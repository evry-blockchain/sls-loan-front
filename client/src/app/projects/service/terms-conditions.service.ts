import {Injectable, Inject} from "@angular/core";
import {BehaviorSubject, Subject, Observable} from "rxjs";
import {ApiGateway} from "../../api-gateway.service";
import {ProjectsService} from "./projects.service";
import {UtilsService} from "./utils.service";

@Injectable()
export class TermsConditionsService {
  private termsConditionsSource = new BehaviorSubject([]);

  private addTermsSource = new Subject();

  private addCommentsSource = new Subject();

  private requestMapping: string;

  private termsConditionsForProjectSource = new BehaviorSubject([]);

  private commentsSource = new BehaviorSubject([]);

  // public commentsForCurrentProject$ = this.commentsSource.asObservable();


  public commentsForCurrentProject$ = this.commentsSource.mergeMap(data => Observable.from(data))
    .merge(this.addCommentsSource)
    .scan((acc: any[], el) => {
      return [...acc, el]
    }, []);

  public termsConditionsForCurrentProject$ = this.termsConditionsForProjectSource.mergeMap(data => Observable.from(data))
    .merge(this.addTermsSource)
    .scan((acc: any[], el) => {
      return [...acc, el];
    }, []);

  constructor(private http: ApiGateway,
              @Inject('ApiEndpoint') private apiEndpoint,
              private projectsService: ProjectsService) {

    this.requestMapping = `${this.apiEndpoint}/LoanTerms`;

    this.projectsService.project$
      .switchMap(data => {
        if (data['loanRequestID']) {
          return this.query({
            filter: {
              loanRequestID: data['loanRequestID']
            }
          })
        } else {
          return Observable.from([]);
        }
      })
      .subscribe(data => {
        this.termsConditionsForProjectSource.next(data);
      });

    this.projectsService.project$
      .switchMap(data => {
        if (data['loanRequestID']) {
          return this.getTermCommentsForProject(data['loanRequestID']);
        } else {
          return Observable.from([]);
        }
      })
      .map(data => {
        return data.map(item => item.comments = data.filter(comment => comment['parentLoanTermCommentID'] == item.loanTermCommentID));
      })
      .subscribe(data => {
        this.commentsSource.next(data);
      });
  }

  query(filter) {
    return this.http.get(this.requestMapping, filter);
  }

  get(id) {

  }

  delete(id) {

  }

  update(terms) {
    return this.http.put(this.requestMapping, terms);
  }

  create(terms) {
    return this.http.post(this.requestMapping, terms)
      .mergeMap(() => {
        return this.countForProject(terms['loanRequestID']);
      })
      .do((countLength) => {
        terms.loanTermID = (+countLength + 1).toString();
        this.addTermsSource.next(terms);
      });
  }

  count() {
    return this.http.get(`${this.requestMapping}/count`);
  }

  countForProject(projectID) {
    return this.query({
      filter: {
        loanRequestID: projectID
      }
    }).mergeMap(data => {
      return Observable.of(data.length);
    });
  }

  getTermCommentsForProject(projectID) {
    return this.http.get(`${this.apiEndpoint}/LoanTermComments/commentsByProject/${projectID}`);
  }

  addComment(comment) {
    return this.http.post(`${this.apiEndpoint}/LoanTermComments/`, comment)
      .do((countLength) => {
        // comment.loanTermCommentID = (+countLength + 1).toString();
        this.addCommentsSource.next(comment);
      });
  }


}
