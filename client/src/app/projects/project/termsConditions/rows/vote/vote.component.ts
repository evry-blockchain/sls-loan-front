import {Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment/moment';
import {TermsConditionsService} from "../../../../service/terms-conditions.service";
import {Observable} from "rxjs";
import {UserService} from "../../../../../user/user.service";
import {ProjectsService} from "../../../../service/projects.service";
import {Route, ActivatedRoute} from "@angular/router";
import {ProjectNegotiationService} from "../../../service/project-negotiation.service";

@Component({
  selector: 'vote-row',
  templateUrl: 'vote.component.html',
  styleUrls: ['vote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteRowComponent implements OnInit, OnDestroy {
  @Input() paragraphs;

  private selectedTab: string = 'new';
  private proposalForm: FormGroup;
  private proposals$;
  private negotiations$: Observable<any>;
  private user: Object;
  private project: Object;
  private paragraphsData: any[];
  private isFormSubmitted = false;

  constructor(private formBuilder: FormBuilder,
              private termsService: TermsConditionsService,
              private userService: UserService,
              private projectsService: ProjectsService,
              private route: ActivatedRoute,
              private projectNegotiationService: ProjectNegotiationService) {
  }

  ngOnInit() {
    this.userService.user$.subscribe(data => {
      this.user = data;
    });

    this.projectsService.project$.flatMap(project => {
      this.project = project;
      return this.projectNegotiationService.getNegotiationsForProject(project['loanRequestID']);
    }).subscribe();

    this.negotiations$ = this.projectNegotiationService.negotiationsForProject$;

    this.proposalForm = this.formBuilder.group({
      loanTermID: ['', Validators.required],
      loanTermProposalText: ['', Validators.required],
      loanTermProposalExpTime: '',
      loanTermProposalExpDate: ['', Validators.required]
    });

    this.proposals$ = this.termsService.proposalsForCurrentProject$
      .mergeMap(data => {
        return Observable.from(data)
      })
      .withLatestFrom(this.paragraphs)
      .map(([proposal, paragraphs])=> {
        proposal['paragraph'] = paragraphs.find(item => item['loanTermID'] == proposal['loanTermID']);

        proposal['acceptedPercentage'] = 0;
        proposal['rejectedPercentage'] = 0;
        //TODO Dmytro: Maybe refactor, dunno
        proposal['votes'].subscribe(votes => {
          this.negotiations$.take(1).subscribe(negotiations => {
            let totalProjectParticipantsCount = negotiations.length + 1;
            let accepted = votes.filter(item => item['loanTermVoteStatus'] == 'Accepted' && item['bankID'] !== '').length;
            let rejected = votes.filter(item => item['loanTermVoteStatus'] == 'Rejected' && item['bankID'] !== '').length;
            proposal['acceptedPercentage'] = accepted / totalProjectParticipantsCount * 100;
            proposal['rejectedPercentage'] = rejected / totalProjectParticipantsCount * 100;
            proposal['notRespondedPercentage'] = (totalProjectParticipantsCount - accepted - rejected) / totalProjectParticipantsCount * 100;
          });
        });

        return proposal;
      })
      .scan((acc: any[], el) => {
        let elem = acc.find(item => item['loanTermProposalID'] == el['loanTermProposalID']);

        if (!!elem) {
          return acc;
        }
        return [...acc, el];
      }, []);

    this.paragraphs.subscribe(data => {
      this.paragraphsData = data;
    });
  }

  save() {
    if (!this.proposalForm.valid) {
      this.isFormSubmitted = true;
      Object.keys(this.proposalForm.controls).forEach((data) => {
        this.proposalForm.controls[data].markAsTouched();
      });
      return;
    }

    let newProposal = this.proposalForm.getRawValue();
    let dateString = newProposal['loanTermProposalExpDate'] + newProposal['loanTermProposalExpTime'];
    let momented = moment(dateString, "DD/MM/YYYYHH:mm");

    if (momented['isValid']()) {
      newProposal['loanTermProposalExpTime'] = momented.toString();
      newProposal['paragraphNumber'] = this.paragraphsData.find(item => item['loanTermID'] == newProposal['loanTermID'])['paragraphNumber'];
      newProposal['votes'] = Observable.from([]);


      this.termsService.createProposal(newProposal)
        .subscribe(() => {
          this.selectedTab = 'status';
          this.proposalForm.reset();
        });
    }
  }

  proposalOpen(proposal) {
    return moment(proposal['loanTermProposalExpTime']) > moment(new Date());
  }

  acceptProposal(proposal) {
    let vote = {};
    vote['loanTermProposalID'] = proposal['loanTermProposalID'];
    vote['loanTermVoteStatus'] = 'Accepted';
    vote['bankID'] = this.user['participantKey'];
    this.termsService.addVote(vote).subscribe(() => {
      proposal['votes'].take(1).subscribe(data => {
        let local = data;
        local.push(vote);
        proposal['votes'].next(local);
      });
    });
  }

  declineProposal(proposal) {
    let vote = {};
    vote['loanTermProposalID'] = proposal['loanTermProposalID'];
    vote['loanTermVoteStatus'] = 'Rejected';
    vote['bankID'] = this.user['participantKey'];
    this.termsService.addVote(vote).subscribe(() => {
      proposal['votes'].take(1).subscribe(data => {
        let local = data;
        local.push(vote);
        proposal['votes'].next(local);
      });
    });
  }

  private _votesScanner(condition) {
    return votes => {
      return votes.scan((acc, data) => {
        return data.some(condition) ? true : acc
      }, false);
    }
  }

  haveAlreadyVoted(proposal) {
    return this._votesScanner(item => item['bankID'] == this.user['participantKey'])(proposal['votes']);
  }

  proposalAccepted(proposal) {
    return this._votesScanner(item => item['bankID'] == this.user['participantKey']
    && item['loanTermVoteStatus'] == 'Accepted')(proposal['votes']);
  }

  proposalRejected(proposal) {
    return this._votesScanner(item => item['bankID'] == this.user['participantKey']
    && item['loanTermVoteStatus'] == 'Rejected')(proposal['votes']);
  }

  ngOnDestroy() {
    console.log('Vote component destroyed!');
    console.log(this.proposals$);
  }

}
