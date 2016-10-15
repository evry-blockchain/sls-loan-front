/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Input } from "@angular/core";
import { ProjectsService } from "../../service/projects.service";
import { ParticipantService } from "../../../participants/service/participants.service";
import { Observable } from "rxjs";

@Component({
  selector: 'add-project-modal',
  templateUrl: 'add-projects-modal.component.html',
  styleUrls: ['add-projects-modal.component.scss']

})
export class AddProjectModalComponent implements OnInit, OnDestroy {

  projectForm: FormGroup;
  private createService;


  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectsService,
              private participantService: ParticipantService) { }

  @Input() lgModal;

  public borrowers = [];

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      borrowerId: [''],
      projectName: [''],
      contactPersonName: [''],
      loanSharesAmount: [''],
      marketIndustry: ['']
    });

    this.participantService.query().flatMap((projects) => {
      return Observable.from(projects);
    }).filter(item => {
      return item['participantType'] === 'Borrower';
    }).map((item) => {
      var newItem = {
        value: item['participantKey'],
        label: item['participantName']
      };
      return newItem;
    }).toArray().subscribe(borrowers => {
      this.borrowers = borrowers
    })
  }

  save() {
    this.createService = this.projectService.create(this.projectForm.getRawValue()).subscribe(() => {
        this.lgModal.hide();
    });
  }

  ngOnDestroy(): void {
    if(!!this.createService) {
      this.createService.unsubscribe();
    }
  }

}
