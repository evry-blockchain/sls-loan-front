import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import * as moment from 'moment/moment';
import {TermsConditionsService} from "../../../../service/terms-conditions.service";

@Component({
  selector: 'vote-row',
  templateUrl: 'vote.component.html',
  styleUrls: ['vote.component.scss']
})
export class VoteRowComponent implements OnInit {
  @Input() paragraphs;

  private selectedTab: string = 'new';
  private proposalForm;
  private proposals;
  private isFormSubmitted = false;

  constructor(private formBuilder: FormBuilder, private termsService: TermsConditionsService) {
  }

  ngOnInit() {
    this.proposalForm = this.formBuilder.group({
      loanTermID: ['', Validators.required],
      loanTermProposalText: ['', Validators.required],
      loanTermProposalExpTime: '',
      loanTermProposalExpDate: ['', Validators.required]
    });

    this.proposals = this.termsService.proposalsForCurrentProject$;
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
    if (momented['isValid']) {
      newProposal['loanTermProposalExpTime'] = momented.toString();
      newProposal['paragraphNumber'] = this.paragraphs.find(item => item['loanTermID'] == newProposal['loanTermID'])['paragraphNumber'];
      //go on
    }

    this.termsService.createProposal(newProposal)
      .subscribe(() => {
        this.selectedTab = 'status';
      });
  }
}
