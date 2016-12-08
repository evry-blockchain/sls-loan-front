import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'add-comment-modal',
  templateUrl: './add-comment-modal.component.html',
  styleUrls: ['./add-comment-modal.component.scss']
})
export class AddCommentModalComponent implements OnInit {
  @Input() modal;

  private commentText: string;
  constructor() { }

  ngOnInit() {
  }

}
