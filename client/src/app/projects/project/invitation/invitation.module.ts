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
      CreateInvitationComponent
    ],
    exports: [
    ]
})

export class InvitationModule {
}
