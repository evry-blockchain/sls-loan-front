
import { Routes } from '@angular/router';
import { InvitationFeedbackComponent } from "./invitationFeedback/invitation-feedback.component";
import { TermsConditionsComponent } from "./termsConditions/terms-conditions.component";
import { ContractComponent } from "./contract/contract.component";

const router: Routes = [
  {
    path: 'chat',
    children: [
      {
        path: '',
        component: InvitationFeedbackComponent
      },
      {
        path: 'terms-conditions',
        component: TermsConditionsComponent
      },
      {
        path: 'contract',
        component: ContractComponent
      }
    ]
  }
];

export const chatRouting = router;
