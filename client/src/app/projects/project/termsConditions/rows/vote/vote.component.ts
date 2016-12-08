import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'vote-row',
  templateUrl: 'vote.component.html',
  styleUrls: ['vote.component.scss']
})
export class VoteRowComponent implements OnInit {
  private selectedTab: string = 'new';

  constructor() {
  }

  ngOnInit() {

  }

}
