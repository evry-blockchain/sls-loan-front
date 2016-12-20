/**
 * Created by Dmytro Zadorozhnyi.
 */
import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Input } from "@angular/core";
import {TermsConditionsService} from "../../service/terms-conditions.service";

@Component({
  selector: 'edit-terms-paragraph-modal',
  templateUrl: './edit-terms-paragraph-modal.component.html',
  styleUrls: ['./edit-terms-paragraph-modal.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush

})
export class EditTermsParagraphModalComponent implements OnInit {

  @Input() modal;
  @Input() paragraphs;
  public editParagraphForm: FormGroup;
  public selectedParagraph: {};

  constructor(private builder: FormBuilder, private termsService: TermsConditionsService) { }

  ngOnInit() {
    this.selectedParagraph = {};
    this.editParagraphForm = this.builder.group({
      paragraphNumber: '',
      text: ''
    });

    // this.editParagraphForm.valueChanges.switchMap(value => {
    //   console.log(value);
    // });
  }

  save() {
    this.termsService.update(this.selectedParagraph).subscribe(() => {
      this.modal.hide();
    });
  }

}
