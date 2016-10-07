import {NgModule}                   from '@angular/core';
import {RouterModule}               from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';


import {InvitationComponent}        from './invitation.component';
import {InvitationFooterComponent}  from './footer/invitation-footer.component';
import {InvitationHeaderComponent}  from './header/invitation-header.component';
import {SelectInviteesComponent}    from './select-invitees/select-invitees.component';

import {AccordionModule}            from 'ng2-bootstrap/ng2-bootstrap';

import {invitationRouting}           from './invitation.routing';
import { SharedModule } from "../../../shared/shared.module";
import { SendInvitationComponent } from "./send/send-invitation.component";
import { CreateInvitationComponent } from "./create/create-invitation.component";
import { ParticipantInvitationComponent } from "./participant/participant-invitation.component";
import { InvitationProjectInformationComponent } from "./shared/invitation-project-information.component";
import { InvitationAdditionalInformationComponent } from "./shared/invitation-additional-info.component";
import { InvitationTermsConditionsComponent } from "./shared/invitation-terms-conditions.component";
import { CreateInvitationTabComponent } from "./create/tab/create/create-invitation-tab.component";
import { ParticipantInvitationTimerComponent } from "./participant/time/participant-timer.component";


@NgModule({
    imports: [
      RouterModule,
      AccordionModule,
      SharedModule
    ],
    declarations: [
      InvitationComponent,
      InvitationFooterComponent,
      InvitationHeaderComponent,
      SelectInviteesComponent,
      SendInvitationComponent,
      CreateInvitationComponent,
      ParticipantInvitationComponent,

      InvitationProjectInformationComponent,
      InvitationAdditionalInformationComponent,
      InvitationTermsConditionsComponent,
      CreateInvitationTabComponent,
      ParticipantInvitationTimerComponent


    ],
    exports: [
    ]
})

export class InvitationModule {
}
