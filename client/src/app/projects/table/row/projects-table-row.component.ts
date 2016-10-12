import { Component, OnInit, Host } from '@angular/core';
import { Input } from "@angular/core";

@Component({
  selector: '[projects-table-row]',
  templateUrl: 'projects-table-row.component.html',
  styleUrls: ['./projects-table-row.component.scss'],

  host: {
    'style': 'background-color: white;',
    'class': 'myClass'
  }
})
export class ProjectsTableRowComponent implements OnInit {

  @Input('projects-table-row') project;

  constructor() { }

  ngOnInit() {}

}
