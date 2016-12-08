import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'comments-row',
  templateUrl: 'comments-row.component.html',
  styleUrls: ['comments-row.component.scss']
})
export class CommentsRowComponent implements OnInit {
  constructor() { }
  private comments: Array<Object>;
  private timeLeft:string;
  ngOnInit() {
    this.timeLeft = '01:04:30';

    this.comments = [
      {
        paragraphNumber: 1,
        userName: 'Eric Andersson',
        bankName: 'INC Bank',
        date: '07.10.16',
        text: 'The changes to the addendum 4.6 in Convenants might be an issue for us.'
      },
      {
        paragraphNumber: 2,
        userName: 'Eric Andersson',
        bankName: 'INC Bank',
        date: '07.10.16',
        text: 'Hi, we are very much interested, but we would like to ask more about the the project’s supporters and financial partners.'
      }
    ];

  }

  addComment() {

  }

}
