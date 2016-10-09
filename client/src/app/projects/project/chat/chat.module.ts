/**
 * Created by Oleksandr.Khymenko on 09.10.2016.
 */

import { NgModule } from '@angular/core';
import { TermsConditionsComponent } from "./termsConditions/terms-conditions.component";
import { InvitationFeedbackComponent } from "./invitationFeedback/invitation-feedback.component";
import { ContractComponent } from "./contract/contract.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ChatHeaderComponent } from "./partial/header/chat-header.component";
import { ChatFooterComponent } from "./partial/footer/chat-footer.component";
import { ChatComponent } from "./chat.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ChatComponent,
    TermsConditionsComponent,
    InvitationFeedbackComponent,
    ContractComponent,
    ChatHeaderComponent,
    ChatFooterComponent
  ],
})
export class ChatModule {
}
