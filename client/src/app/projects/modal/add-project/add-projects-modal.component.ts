/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */
import { Component, OnInit, OnDestroy, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Input } from "@angular/core";
import { ProjectsService } from "../../service/projects.service";
import { ParticipantService } from "../../../participants/service/participants.service";
import { Observable } from "rxjs";
import { UserService } from "../../../user/user.service";

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
      console.log("user", data);
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
      borrower: [''],
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
      this.participantService.participants$.subscribe((participant) => {
        if (participant['participantName'] === this.projectForm.controls['borrower'].value) {
          let newProject = this.projectForm.getRawValue();
          newProject['borrowerID'] = participant['participantKey'];
          this.projectService.create(newProject).subscribe(() => {
            this.lgModal.hide();
          });
        } else {
          let newProject = this.projectForm.getRawValue();
          newProject['borrowerID'] = '5';
          delete newProject['borrower'];
          delete newProject['role'];
          newProject['arrangerBankID'] = this.user['participantKey'];

          this.projectService.create(newProject).subscribe(() => {
            this.lgModal.hide();
          });
        }
      }) ;
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
      .combineLatest(this.participantService.participants$)
      .map(([project, participants]) => {
        project['borrower'] = this.participantService.getParticipantName(project['borrowerID'], participants);
        return project;
      }).subscribe((project) => {
      this.projectForm.patchValue(this.project);

      this.project = project;
    });
  }

  private activateCreateMode() {
    this.title = 'Add new Project <small>(my role: Arranger Bank)</small>';

  }

}
