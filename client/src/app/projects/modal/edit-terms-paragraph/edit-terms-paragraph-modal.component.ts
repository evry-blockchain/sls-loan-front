/**
 * Created by Dmytro Zadorozhnyi.
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Input } from "@angular/core";

@Component({
  selector: 'edit-terms-paragraph-modal',
  templateUrl: './edit-terms-paragraph-modal.component.html',
  styleUrls: ['./edit-terms-paragraph-modal.component.scss']

})
export class EditTermsParagraphModalComponent implements OnInit {

  @Input() modal;
  public editParagraphForm: FormGroup;
  public paragraphs: Array<Object> = [];
  public selectedParagraph: {};

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.selectedParagraph = {};
    this.editParagraphForm = this.builder.group({
      paragraphNumber: '',
      text: ''
    });

    this.paragraphs.push({
      paragraphNumber: 1,
      text: '1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    });

    this.paragraphs.push({
      paragraphNumber: 1.1,
      text: ' 1  1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    });

    this.paragraphs.push({
      paragraphNumber: 2,
      text: '2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    });

    // this.editParagraphForm.valueChanges.switchMap(value => {
    //   console.log(value);
    // });
  }

  save() {
    this.modal.hide();
  }

}
