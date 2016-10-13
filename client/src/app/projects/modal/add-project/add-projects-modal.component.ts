/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Input } from "@angular/core";
import { ProjectsService } from "../../service/projects.service";
import { ParticipantService } from "../../../participants/service/participants.service";

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

  public borrowers;

  public nice = [ {
    value: 'a',
    label: 'Alpha'
  },
    {
      value: 'b',
      label: 'Beta'
    },
    {
      value: 'c',
      label: 'Gamma'
    }];

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      borrowerId: [''],
      projectName: [''],
      contactPersonName: [''],
      loanSharesAmount: [''],
      marketIndustry: ['']
    });

    this.participantService.participants$.subscribe(borrowers => {
      console.log('borrowers', borrowers);
      this.borrowers = borrowers;
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

  selected(item) {
    console.log('here', item);
  }

}
