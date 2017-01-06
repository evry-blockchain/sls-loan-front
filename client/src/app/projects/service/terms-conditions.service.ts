import {Injectable, Inject} from "@angular/core";
import {BehaviorSubject, Subject, Observable, ReplaySubject} from "rxjs";
import {ApiGateway} from "../../api-gateway.service";
import {ProjectsService} from "./projects.service";
import {ParticipantService} from "../../participants/service/participants.service";

@Injectable()
export class TermsConditionsService {

  private addTermsSource = new Subject();

  private addProposalSource = new Subject();

  private addCommentsSource = new Subject();

  private requestMapping: string;

  private termsConditionsForProjectSource = new BehaviorSubject([]);

  // public commentsForCurrentProject$ = this.commentsSource.asObservable();

  public proposalsForCurrentProject$;

  public termsConditionsForCurrentProject$ = this.termsConditionsForProjectSource.mergeMap(data => Observable.from(data))
    .merge(this.addTermsSource)
    .scan((acc: any[], el) => {
      return [...acc, el];
    }, []);

  public commentsForCurrentProject$;

  constructor(private http: ApiGateway,
              @Inject('ApiEndpoint') private apiEndpoint,
              private projectsService: ProjectsService,
              private participantService: ParticipantService) {

    this.requestMapping = `${this.apiEndpoint}/LoanTerms`;

    this.participantService.query();

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

    this.commentsForCurrentProject$ = this.projectsService.project$
      .switchMap(data => {
        if (data['loanRequestID']) {
          return this.getTermCommentsForProject(data['loanRequestID']);
        } else {
          return Observable.from([]);
        }
      })
      .map(data => {
        data = data.map(item => {
          item.comments = data.filter(comment => comment['parentLoanTermCommentID'] == item['loanTermCommentID']);
          return item;
        });
        return data;
      })
      .mergeMap(data => Observable.from(data))
      .merge(this.addCommentsSource)
      .withLatestFrom(this.termsConditionsForCurrentProject$)
      .map(([item, terms]) => {
        let correspondingTerm = terms.filter(term => term['loanTermID'] == item['loanTermID'])[0];
        item['paragraph'] = correspondingTerm || {};
        return item;
      })
      .withLatestFrom(this.participantService.participants$)
      .map(([item, participants]) => {
        let participant = participants.filter(part => part['participantKey'] == item['bankID'])[0];
        item['participant'] = participant || {};
        return item;
      })
      .map(item => {
        if (typeof item['loanTermCommentDate'] == 'string') {
          item['loanTermCommentDate'] = new Date(item['loanTermCommentDate']);
        }

        if (item['loanTermCommentDate'] == 'Invalid Date') {
          item['loanTermCommentDate'] = new Date();
        }
        return item;
      })
      .filter(item => item['parentLoanTermCommentID'] == '' || item['parentLoanTermCommentID'] == null)
      .scan((acc: any[], el) => {
        return [...acc, el].sort((a: any, b: any) => {

          let left = Number(new Date(a['loanTermCommentDate']));
          let right = Number(new Date(b['loanTermCommentDate']));

          return right - left;
        })
      }, []).share();

    this.proposalsForCurrentProject$ = this.projectsService.project$
      .switchMap(data => {
        if (data['loanRequestID']) {
          return this.getProposalsForProject(data['loanRequestID']);
        } else {
          return Observable.from([]);
        }
      })
      .mergeMap(data => Observable.from(data))
      .map(item => {
        item['votes'] = new BehaviorSubject([]);
        this.getVotesForProposal(item['loanTermProposalID']).subscribe(data => {
          item['votes'].next(data);
        });
        return item;
      })
      .merge(this.addProposalSource)
      .scan((acc: any[], el) => {
        return [...acc, el]
      }, []).share();
  }

  query(filter) {
    return this.http.get(this.requestMapping, filter);
  }

  get() {

  }

  deleteTerm() {

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

  getProposalsForProject(projectID) {
    return this.http.get(`${this.apiEndpoint}/LoanTermProposals/proposalsByProject/${projectID}`);
  }

  addComment(comment) {
    return this.http.post(`${this.apiEndpoint}/LoanTermComments/`, comment)
      .do(() => {
        this.addCommentsSource.next(comment);
      });
  }

  createProposal(proposal) {
    return this.http.post(`${this.apiEndpoint}/LoanTermProposals/`, proposal)
      .do(() => {
        this.addProposalSource.next(proposal);
      });
  }

  getVotesForProposal(proposalID) {
    return this.http.get(`${this.apiEndpoint}/LoanTermVotes/votesForProposal/${proposalID}`);
  }

  addVote(vote) {
    return this.http.post(`${this.apiEndpoint}/LoanTermVotes`, vote);
  }
}
