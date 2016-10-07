/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */

import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']

})
export class ProjectsComponent implements OnInit {
  projectForm: FormGroup;
  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder) { }
  projects = [
    { projectName: 'USD 100M TO STATOIL', role: 'Arranger Bank', status: 'Invitation Sent' },
    { projectName: 'USD 65M TO BOHAUG SHIPPING', role: 'Participant', status: 'Invitation Received' },
    { projectName: 'USD 80M TO TELENOR', role: 'Arranger Bank', status: 'Contract Negotiation' },
    { projectName: 'USD 90M TO BEERENBERG', role: 'Participant', status: 'Time Left: 01:04:32' },
  ];

  ngOnInit() {}

  saved(nice) {
    this.projects.push(nice);
    console.log('trololo', nice);
  }

}
