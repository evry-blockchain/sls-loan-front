import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})

export class CommentBoxComponent implements OnInit {
  @Output() commentSaved = new EventEmitter();
  private comment;

  constructor() { }

  ngOnInit() {
  }

  save() {
    this.commentSaved.emit(this.comment);
    this.comment = '';
  }

}
