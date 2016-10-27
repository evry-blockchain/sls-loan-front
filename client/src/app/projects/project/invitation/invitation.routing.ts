import {RouterModule, Routes} from '@angular/router';

import {InvitationComponent} from './invitation.component';
import {SelectInviteesComponent} from './select-invitees/select-invitees.component';
import { AuthGuard } from "../../../auth/guard/auth.guard";
import { SendInvitationComponent } from "./send/send-invitation.component";
import { CreateInvitationComponent } from "./create/create-invitation.component";
import { ParticipantInvitationComponent } from "./participant/participant-invitation.component";
import { CreateInvitationTabComponent } from "./create/tab/create/create-invitation-tab.component";

const routes:Routes = [
  {
    path: 'invitation',
    children: [
      {
        path: '',
        component: InvitationComponent

      },
      {
        path: 'create', component: CreateInvitationComponent, children: [
        {
          path: '', component: CreateInvitationTabComponent,
        },
        {
          path: 'select', component: SelectInviteesComponent
        },
        {
          path: 'send', component: SendInvitationComponent
        },
      ]
      },
      {
        path: 'participant', component: ParticipantInvitationComponent
      }
    ]
  }
];

export const invitationRouting = routes;
