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
      'participant': 'Marino Nice Comp.',
      'status': 'NOT_PAID',
      'invoiceAmount': '200 M USD',
      'date': new Date().toLocaleDateString(),
    },
    {
      'participant': 'Dashmi Incorporated Inc.',
      'status': 'PAID',
      'invoiceAmount': '200 M USD',
      'date': new Date().toLocaleDateString(),
    },
    {
      'participant': 'Arfor Liability Enterprise LC.',
      'status': 'PAID',
      'invoiceAmount': '200 M USD',
      'date': new Date().toLocaleDateString(),
    },
    {
      'participant': 'Incada Financial services.',
      'status': 'PAID',
      'invoiceAmount': '200 M USD',
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
