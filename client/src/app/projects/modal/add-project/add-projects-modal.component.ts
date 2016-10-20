/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */
import { Component, OnInit, OnDestroy, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
export class AddProjectModalComponent implements OnInit, OnDestroy, OnChanges {

  projectForm: FormGroup;

  private createService;


  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectsService,
              private participantService: ParticipantService) { }

  @Input() lgModal;

  @Input() project;

  @Input() isUpdateMode;

  public borrowers = [];
  public title;

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['project'] && !!this.projectForm) {
      // this.projectForm.patchValue(changes['project'].currentValue);
      // this.projectForm.controls['borrowerId'].patchValue(4);
    }
  }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      borrowerID: [''],
      projectName: [''],
      contactPersonName: [''],
      loanSharesAmount: [''],
      marketIndustry: ['']
    });

    this.participantService.participants$.flatMap((projects) => {
      return Observable.from(<any[]>projects);
    }).filter(item => {
      return item['participantType'] === 'Borrower';
    }).map((item) => {
      var newItem = {
        value: item['participantKey'],
        label: item['participantName']
      };
      return newItem;
    }).distinctKey('value')
      .scan((acc, v) => {
      return acc.concat(v);
    }, []).subscribe(borrowers => {
      this.borrowers = borrowers
    });


    if(this.isUpdateMode) {
      this.activateUpdateMode();
    } else {
      this.activateCreateMode();
    }
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

  private activateUpdateMode() {
    this.title = 'Edit the Project Information';
  }

  private activateCreateMode() {
    this.title = 'Add new Project <small>(my role: Arranger Bank)</small>'
  }

}
