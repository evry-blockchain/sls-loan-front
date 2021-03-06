import {NgModule}                   from '@angular/core';
import {RouterModule}               from '@angular/router';


import {InvitationComponent}        from './invitation.component';
import {InvitationFooterComponent}  from './footer/invitation-footer.component';
import {InvitationHeaderComponent}  from './header/invitation-header.component';
import {SelectInviteesComponent}    from './select-invitees/select-invitees.component';

import { AccordionModule, Ng2BootstrapModule, ModalModule }            from 'ng2-bootstrap/ng2-bootstrap';

import { SharedModule } from "../../../shared/shared.module";
import { SendInvitationComponent } from "./send/send-invitation.component";
import { CreateInvitationComponent } from "./create/create-invitation.component";
import { ParticipantInvitationComponent } from "./participant/participant-invitation.component";
import { InvitationProjectInformationComponent } from "./shared/invitation-project-information.component";
import { InvitationAdditionalInformationComponent } from "./shared/invitation-additional-info.component";
import { InvitationTermsConditionsComponent } from "./shared/invitation-terms-conditions.component";
import { CreateInvitationTabComponent } from "./create/tab/create/create-invitation-tab.component";
import { ParticipantInvitationTimerComponent } from "./participant/time/participant-timer.component";
import { SelectInviteesPartnerComponent } from "./select-invitees/partner/select-invitees-partner.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProjectsService} from "../../service/projects.service";


@NgModule({
    imports: [
      RouterModule,
      AccordionModule,
      SharedModule,
      ModalModule,
      ReactiveFormsModule,
      FormsModule,
      NgbModule
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
      ParticipantInvitationTimerComponent,
      SelectInviteesPartnerComponent


    ],
    exports: [
    ],
  providers: [ProjectsService]
})

export class InvitationModule {
}
