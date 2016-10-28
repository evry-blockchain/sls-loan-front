/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */
import { Component, OnInit, OnDestroy, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Input } from "@angular/core";
import { ProjectsService } from "../../service/projects.service";
import { ParticipantService } from "../../../participants/service/participants.service";
import { UserService } from "../../../user/user.service";
import { Project } from "../../project/model/project.model";

@Component({
  selector: 'add-project-modal',
  templateUrl: 'add-projects-modal.component.html',
  styleUrls: ['add-projects-modal.component.scss']

})
export class AddProjectModalComponent implements OnInit, OnDestroy {

  projectForm: FormGroup;

  private createService;
  private user;


  //noinspection TypeScriptUnresolvedVariable
  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectsService,
              private participantService: ParticipantService,
              private userService: UserService) {
    userService.user$.subscribe(data => {
      this.user = data
    })
  }

  @Input() lgModal;


  @Input() isUpdateMode;

  public borrowers = [];
  public title;
  public project = {};
  private projectObs;


  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      borrowerID: [''],
      projectName: [''],
      contactPersonName: [''],
      loanSharesAmount: [''],
      marketAndIndustry: ['']
    });


    if(this.isUpdateMode) {
      this.activateUpdateMode();
    } else {
      this.activateCreateMode();
    }
  }

  save() {
    if (this.isUpdateMode) {
      var newProject = Object.assign({}, this.project, this.projectForm.getRawValue());
      this.projectService.update(this.project['loanRequestID'], newProject).subscribe(() => {
        this.lgModal.hide();
      });
    } else {
      let newProject = this.projectForm.getRawValue();
      newProject['arrangerBankID'] = this.user['participantKey'];
      this.projectService.create(<Project>newProject).subscribe(() => {
        this.lgModal.hide();
      });
    }

  }

  ngOnDestroy(): void {
    if(!!this.createService) {
      this.createService.unsubscribe();
    }
    if (!!this.projectObs) {
      this.projectObs.unsubscribe();
    }
  }

  private activateUpdateMode() {
    this.title = 'Edit the Project Information';
    this.projectObs = this.projectService.project$
      .subscribe((project) => {
      this.projectForm.patchValue(this.project);

      this.project = project;
    });
  }

  private activateCreateMode() {
    this.title = 'Add new Project <small>(my role: Arranger Bank)</small>';

  }

}
