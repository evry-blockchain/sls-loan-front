/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Input } from "@angular/core";
import { ProjectsService } from "../../service/projects.service";
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
              private projectService: ProjectsService) { }


  @Input() lgModal;
  @Output() saved  = new EventEmitter<any>();


  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      borrower: [''],
      projectName: [''],
      contactPerson: [''],
      amount: [''],
      marketIndustry: ['']
    });
  }

  save() {
    this.createService = this.projectService.create(this.projectForm.getRawValue()).subscribe((value) => {
        this.saved.emit(value);
        this.lgModal.hide();
    });

  }

  ngOnDestroy(): void {
    this.createService.unsubscribe();
  }

}
