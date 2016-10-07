/**
 * Created by Oleksandr.Khymenko on 07.10.2016.
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Input } from "@angular/core";

@Component({
  selector: 'add-user-settings-modal',
  templateUrl: './add-user-settings-modal.component.html',
  styleUrls: ['../add-project/add-projects-modal.component.scss', './add-user-settings-modal.component.scss']

})
export class AddUserSettingsModalComponent implements OnInit {

  @Input() modal;
  settingsForm: FormGroup;

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.settingsForm = this.builder.group({
      companyName: '',
      displayName: '',
      contactPerson: '',
      email: '',
      preferredIndustries: ''
    })
  }

  save() {
    this.modal.hide();
    console.log(this.settingsForm.getRawValue());
  }

}
