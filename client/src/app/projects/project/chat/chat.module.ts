/**
 * Created by Oleksandr.Khymenko on 09.10.2016.
 */

import { NgModule } from '@angular/core';
import { TermsConditionsComponent } from "./termsConditions/terms-conditions.component";
import { InvitationFeedbackComponent } from "./invitationFeedback/invitation-feedback.component";
import { ContractComponent } from "./contract/contract.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    TermsConditionsComponent,
    InvitationFeedbackComponent,
    ContractComponent
  ],
})
export class ChatModule {
}
