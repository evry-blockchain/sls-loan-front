import {Component, OnInit, Input} from '@angular/core';
import {TermsConditionsService} from "../../../../service/terms-conditions.service";
import {Observable} from "rxjs";

@Component({
  selector: 'comments-row',
  templateUrl: 'comments-row.component.html',
  styleUrls: ['comments-row.component.scss']
})
export class CommentsRowComponent implements OnInit {
  @Input() paragraphs;

  constructor(private termsService: TermsConditionsService) { }
  private comments: Observable<any>;
  private timeLeft:string;

  ngOnInit() {

    this.comments = this.termsService.commentsForCurrentProject$;
    this.timeLeft = '01:04:30';
  }

  addComment() {

  }

}
