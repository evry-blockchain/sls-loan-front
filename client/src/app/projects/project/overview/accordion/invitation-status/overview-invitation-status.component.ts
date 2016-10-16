import { Component, OnInit } from '@angular/core';
import { ColumnMode, TableOptions } from "angular2-data-table";

@Component({
  selector: 'overview-invitation-status',
  templateUrl: 'overview-invitation-status.component.html',
  styleUrls: ['./overview-invitation-status.component.scss']
})
export class OverviewInvitationStatusComponent implements OnInit {

  rows = [
    {
      'participantBank': 'Marino Nice Comp.',
      'status': 'COMMITED',
      'sharesCommitted': '200 M USD',
      'date': new Date().toLocaleDateString(),
    },
    {
      'participantBank': 'Dashmi Incorporated Inc.',
      'status': 'INTERESTED',
      'sharesCommitted': '200 M USD',
      'date': new Date().toLocaleDateString(),
    },
    {
      'participantBank': 'Arfor Liability ',
      'status': 'INVITED',
      'sharesCommitted': '200 M USD',
      'date': new Date().toLocaleDateString(),
    },
    {
      'participantBank': 'Incada Financial services.',
      'status': 'DECLINED',
      'sharesCommitted': '200 M USD',
      'date': new Date().toLocaleDateString(),
    }
  ];

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 0,
    rowHeight: 'auto'
  });
  constructor() { }

  ngOnInit() { }

}
