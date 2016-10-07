import {RouterModule, Routes} from '@angular/router';

import {InvitationComponent} from './invitation.component';
import {SelectInviteesComponent} from './select-invitees/select-invitees.component';
import { AuthGuard } from "../../../auth/guard/auth.guard";
import { SendInvitationComponent } from "./send/send-invitation.component";
import { CreateInvitationComponent } from "./create/create-invitation.component";

const routes:Routes = [
  {
    path: 'invitation',
    component: InvitationComponent,
    children: [
      {
        path: '', redirectTo: 'create',
      },
      {
        path: 'create', component: CreateInvitationComponent,
      },
      {
        path: 'select', component: SelectInviteesComponent
      },
      {
        path: 'send', component: SendInvitationComponent
      }
    ]
  }
];

export const invitationRouting = routes;
