/**
 * Created by Dmytro Zadorozhnyi on 23.11.2016.
 */

import {NgModule} from '@angular/core';
import {TermsConditionsComponent} from './terms-conditions.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TermsConditionsHeaderComponent} from './header/terms-conditions-header.component';
import {VoteRowComponent} from './rows/vote/vote.component';
import {CommentsRowComponent} from './rows/comments/comments.component';
import {TermsConditionsRowComponent} from './rows/terms/terms-conditions-row.component';
import {AccordionModule, ModalModule} from 'ng2-bootstrap';
import {SharedModule} from '../../../shared/shared.module';
import {EditTermsParagraphModalComponent} from '../../modal/edit-terms-paragraph/edit-terms-paragraph-modal.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AddCommentModalComponent} from '../../modal/add-comment-modal/add-comment-modal.component';
import {TermsConditionsService} from '../../service/terms-conditions.service';
import {AddTermsParagraphModalComponent} from '../../modal/add-terms-paragraph/add-terms-paragraph-modal.component';
import {CommentBoxComponent} from './rows/comments/comment-box/comment-box.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AccordionModule,
    SharedModule,
    ModalModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    TermsConditionsComponent,
    TermsConditionsHeaderComponent,
    VoteRowComponent,
    CommentsRowComponent,
    TermsConditionsRowComponent,
    EditTermsParagraphModalComponent,
    AddCommentModalComponent,
    AddTermsParagraphModalComponent,
    CommentBoxComponent
  ],
  providers: [TermsConditionsService]
})
export class TermsConditionsModule {
}
