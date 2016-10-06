/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'projects-table',
  templateUrl: 'projects-table.component.html',
  styleUrls: ['./projects-table.component.scss']
})
export class ProjectsTableComponent implements OnInit {

  projects = [
    { name: 'USD 100M TO STATOIL', role: 'Arranger Bank', status: 'Invitation Sent' },
    { name: 'USD 65M TO BOHAUG SHIPPING', role: 'Participant', status: 'Invitation Received' },
    { name: 'USD 80M TO TELENOR', role: 'Arranger Bank', status: 'Contract Negotiation' },
    { name: 'USD 90M TO BEERENBERG', role: 'Participant', status: 'Time Left: 01:04:32' },
  ];

  constructor() { }

  ngOnInit() { }

}
