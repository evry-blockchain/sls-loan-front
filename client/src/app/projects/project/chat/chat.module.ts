/**
 * Created by Oleksandr.Khymenko on 09.10.2016.
 */

import { NgModule } from '@angular/core';
import { TermsConditionsComponent } from "./termsConditions/terms-conditions.component";
import { InvitationFeedbackComponent } from "./invitationFeedback/invitation-feedback.component";
import { ContractComponent } from "./contract/contract.component";

@NgModule({
  imports: [],
  declarations: [
    TermsConditionsComponent,
    InvitationFeedbackComponent,
    ContractComponent
  ],
})
export class ChatModule {
}
