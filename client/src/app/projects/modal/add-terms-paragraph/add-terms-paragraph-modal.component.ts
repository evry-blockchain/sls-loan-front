/**
 * Created by Dmytro Zadorozhnyi.
 */
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { Input } from "@angular/core";
import {ProjectsService} from "../../service/projects.service";
import {TermsConditionsService} from "../../service/terms-conditions.service";

@Component({
  selector: 'add-terms-paragraph-modal',
  templateUrl: './add-terms-paragraph-modal.component.html',
  styleUrls: ['./add-terms-paragraph-modal.component.scss']

})
export class AddTermsParagraphModalComponent implements OnInit {

  @Input() modal;
  public addParagraphForm: FormGroup;
  private project;
  public isFormSubmitted: boolean = false;

  constructor(private builder: FormBuilder,
              private projectService: ProjectsService,
              private termsService: TermsConditionsService) { }

  ngOnInit() {
    this.addParagraphForm = this.builder.group({
      paragraphNumber: ['', Validators.required],
      loanTermText: ['', Validators.required]
    });

    this.projectService.project$.subscribe(data => {
      this.project = data;
    });

    // this.addParagraphForm.valueChanges.switchMap(value => {
    //   console.log(value);
    // });
  }

  save() {
    // this.modal.hide();
    if(!this.addParagraphForm.valid) {
      this.isFormSubmitted = true;
      Object.keys(this.addParagraphForm.controls).forEach((data) => {
        this.addParagraphForm.controls[data].markAsTouched();
      });
      return;
    }

    let newParagraph = this.addParagraphForm.getRawValue();
    newParagraph['loanRequestID'] = this.project['loanRequestID'];
    this.termsService.create(newParagraph)
    // .mergeMap(() => {
    //   return this.projectService.getProjectCount()
    // })
    // .mergeMap((id) => {
    //   var loanInvitation = {
    //     loanRequestID: +id['count'] + 1,
    //     arrangerBankID: this.user['participantKey']
    //   };
    //   return this.projectService.saveLoanInvitation(loanInvitation);
    // })
      .subscribe(() => {
        // this.projectService.queryInvitations().subscribe((data) => {
        //   console.log(data);
        // })
        this.modal.hide();
    });

  }

}
