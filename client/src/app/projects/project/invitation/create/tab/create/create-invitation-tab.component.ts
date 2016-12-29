/**
 * Created by Oleksandr.Khymenko on 07.10.2016.
 */


import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {ProjectsService} from "../../../../../service/projects.service";
import {ParticipantService} from "../../../../../../participants/service/participants.service";
import {Observable} from "rxjs";
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'create-invitation-tab',
  templateUrl: './create-invitation-tab.component.html',
  styleUrls: ['./create-invitation-tab.component.scss']
})
export class CreateInvitationTabComponent implements OnInit {

  project = {};

  invitationForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private projectsService: ProjectsService,
              private participantService: ParticipantService,
              private builder: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();

    this.projectsService.project$
      .combineLatest(this.participantService.participants$)
      .map(([project, participants]) => {
        project['borrower'] = this.participantService.getParticipantName(project['borrowerID'], participants);
        project['arranger'] = this.participantService.getParticipantName(project['arrangerBankID'], participants);
        return project;
      }).subscribe((project) => {

      this.project = project;
    });


    this.projectsService.project$.take(1).subscribe((data) => {
      if (Object.keys(data).length === 0) {
        this.route.parent.parent.parent.params.subscribe(data => {
          let id = +data['id'];
          this.projectsService.get(id).subscribe(data => {
            let x = data;
            this.invitationForm.patchValue(x);
          });
        });
      } else {
        this.invitationForm.patchValue(data);
      }
    })
  }


  nextTab() {

    // this.router.navigate(['./select']);
  }

  private createForm() {
    this.invitationForm = this.builder.group({
      loanRequestID: [''],
      arrangerBankID: [''],
      borrowerID: [''],
      loanTerm: [''],
      amount: [''],
      interestRate: [''],
      projectInformation: [''],
      status: [''],
      assets: [''],
      convenants: ['']
    });

    this.invitationForm.valueChanges.subscribe((data) => {
      this.projectsService.project$.take(1).subscribe((project) => {
        // let c = {...project, data}; TODO: when available
        let c = Object.assign({}, project, data);
        this.projectsService.updateProject(c);
      });
    });
  }

}
