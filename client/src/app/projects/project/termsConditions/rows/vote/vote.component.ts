import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment/moment';
import {TermsConditionsService} from "../../../../service/terms-conditions.service";
import {Observable} from "rxjs";
import {UserService} from "../../../../../user/user.service";

@Component({
  selector: 'vote-row',
  templateUrl: 'vote.component.html',
  styleUrls: ['vote.component.scss']
})
export class VoteRowComponent implements OnInit {
  @Input() paragraphs;

  private selectedTab: string = 'new';
  private proposalForm: FormGroup;
  private proposals: Observable<any>;
  private user: Object;
  private paragraphsData: any[];
  private isFormSubmitted = false;

  constructor(private formBuilder: FormBuilder,
              private termsService: TermsConditionsService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.user$.subscribe(data => {
      this.user = data;
    });

    this.proposalForm = this.formBuilder.group({
      loanTermID: ['', Validators.required],
      loanTermProposalText: ['', Validators.required],
      loanTermProposalExpTime: '',
      loanTermProposalExpDate: ['', Validators.required]
    });

    this.proposals = this.termsService.proposalsForCurrentProject$
      .mergeMap(data => Observable.from(data))
      .combineLatest(this.paragraphs)
      .map(([proposal, paragraphs]) => {
        proposal['paragraph'] = paragraphs.find(item => item['loanTermID'] == proposal['loanTermID']);
        return proposal;
      }).scan((acc: any[], el) => {
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
      this.termsService.createProposal(newProposal)
        .subscribe(() => {
          this.selectedTab = 'status';
        });
    }
  }

  proposalOpen(proposal) {
    return moment(proposal['loanTermProposalExpTime']) > moment(new Date);
  }

  acceptProposal(proposal) {
    let vote = {};
    vote['loanTermProposalID'] = proposal['loanTermProposalID'];
    vote['loanTermVoteStatus'] = 'Accepted';
    vote['bankID'] = this.user['participantKey'];
    this.termsService.addVote(vote).subscribe(() => {
      proposal['votes'].push(vote);
    });
  }

  declineProposal(proposal) {
    let vote = {};
    vote['loanTermProposalID'] = proposal['loanTermProposalID'];
    vote['loanTermVoteStatus'] = 'Rejected';
    vote['bankID'] = this.user['participantKey'];
    this.termsService.addVote(vote).subscribe(() => {
      proposal['votes'].push(vote);
    });
  }

  haveAlreadyVoted(proposal) {
    return proposal['votes'] && proposal['votes'].some(item => item['bankID'] == this.user['participantKey']);
  }

  proposalAccepted(proposal) {
    return proposal['votes'] && proposal['votes'].some(item =>
      item['bankID'] == this.user['participantKey'] && item['loanTermVoteStatus'] == 'Accepted');
  }

  proposalRejected(proposal) {
    return proposal['votes'] && proposal['votes'].some(item =>
      item['bankID'] == this.user['participantKey'] && item['loanTermVoteStatus'] == 'Rejected');
  }

}
