import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import * as moment from 'moment/moment';

@Component({
  selector: 'vote-row',
  templateUrl: 'vote.component.html',
  styleUrls: ['vote.component.scss']
})
export class VoteRowComponent implements OnInit {
  @Input() paragraphs;

  private selectedTab: string = 'new';
  private voteForm;
  private isFormSubmitted = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.voteForm = this.formBuilder.group({
      loanTermID: ['', Validators.required],
      loanTermProposalText: ['', Validators.required],
      loanTermProposalExpTime: '',
      loanTermProposalExpDate: ['', Validators.required]
    });
  }

  save() {
    if (!this.voteForm.valid) {
      this.isFormSubmitted = true;
      Object.keys(this.voteForm.controls).forEach((data) => {
        this.voteForm.controls[data].markAsTouched();
      });
      return;
    }

    let newVote = this.voteForm.getRawValue();
    let dateString = newVote['loanTermProposalExpDate'] + newVote['loanTermProposalExpTime'];
    let momented = moment(dateString, "DD/MM/YYYYHH:mm");
    if(momented['isValid']) {
      newVote['loanTermProposalExpTime'] = momented.toString();
      //go on
    }

    // this.projectService.create(newVote)
    // .mergeMap(() => {
    //   return this.projectService.getProjectCount()
    // })
    // .mergeMap((id) => {
    //   var loanInvitation = {
    //     loanRequestID: +id['count'] + 1,
    //     arrangerBankID: this.user['participantKey']
    //   };
    //   return this.projectService.saveLoanInvitation(loanInvitation);
    // })
    //   .subscribe(() => {
    // this.projectService.queryInvitations().subscribe((data) => {
    //   console.log(data);
    // })
    // this.lgModal.hide();
    // });
  }

}
