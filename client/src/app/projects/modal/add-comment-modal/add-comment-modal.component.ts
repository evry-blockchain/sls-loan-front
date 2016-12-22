import {Component, OnInit, Input} from '@angular/core';
import {TermsConditionsService} from "../../service/terms-conditions.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../user/user.service";

@Component({
  selector: 'add-comment-modal',
  templateUrl: './add-comment-modal.component.html',
  styleUrls: ['./add-comment-modal.component.scss']
})
export class AddCommentModalComponent implements OnInit {
  @Input() modal;
  @Input() paragraphs;

  private addCommentForm: FormGroup;
  private user: Object;
  public isFormSubmitted: boolean = false;

  constructor(private termsService: TermsConditionsService,
              private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.user$.subscribe(data => {
      this.user = data;
    }) ;
    this.addCommentForm = this.formBuilder.group({
      loanTermID: ['', Validators.required],
      commentText: ['', Validators.required]
    });
  }

  //TODO refactor to dumb component
  save() {
    if (!this.addCommentForm.valid) {
      this.isFormSubmitted = true;
      Object.keys(this.addCommentForm.controls).forEach((data) => {
        this.addCommentForm.controls[data].markAsTouched();
      });
      return;
    }

    let newComment = this.addCommentForm.getRawValue();
    newComment['bankID'] = this.user['participantKey'];
    newComment['loanTermParentID'] = null;
    newComment['userID'] = this.user['participantKey'];
    newComment['commentDate'] = new Date();

    this.termsService.addComment(newComment)
      .subscribe(() => {
        this.modal.hide();
      });
  }

}
