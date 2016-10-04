/**
 * Created by Oleksandr.Khymenko on 04.10.2016.
 */


import { Component, OnInit } from '@angular/core';
import { ColumnMode, TableOptions } from "angular2-data-table";

@Component({
  selector: 'my-payments-table',
  templateUrl: './payments-table.html',
  styleUrls: ['./payments-table.scss']

})
export class PaymentsTableComponent implements OnInit {
  // rows = [];
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
