import {Component, OnInit, Input} from '@angular/core';
import {TermsConditionsService} from "../../../../service/terms-conditions.service";
import {Observable} from "rxjs";
import {UserService} from "../../../../../user/user.service";
import {OrderByDate} from "../../../../../utils/orderByDatePipe/orderByDatePipe";

@Component({
  selector: 'comments-row',
  templateUrl: 'comments-row.component.html',
  styleUrls: ['comments-row.component.scss']
})
export class CommentsRowComponent implements OnInit {
  @Input() paragraphs;

  constructor(private termsService: TermsConditionsService, private userService: UserService) {
  }

  private comments: Observable<any>;
  private timeLeft: string;
  private user;

  ngOnInit() {

    this.comments = this.termsService.commentsForCurrentProject$;

    this.timeLeft = '01:04:30';
    this.userService.user$.subscribe(data => {
      this.user = data;
    });
  }

  addComment() {

  }

  addReply(commentText, parent) {
    let comment = {};
    comment['bankID'] = this.user['participantKey'];
    comment['userID'] = this.user['participantKey'];
    comment['loanTermCommentDate'] = new Date();
    comment['commentText'] = commentText;
    comment['loanTermParentID'] = parent['loanTermCommentID'];
    comment['loanTermID'] = parent['loanTermID'];

    this.termsService.addComment(comment).subscribe(() => {
      comment['participant'] = this.user;
      parent['comments'].push(comment);
      parent['showCommentBox'] = false;
    });
  }

}
