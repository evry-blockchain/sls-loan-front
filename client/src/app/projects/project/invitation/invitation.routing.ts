import {RouterModule, Routes} from '@angular/router';

import {InvitationComponent} from './invitation.component';
import {SelectInviteesComponent} from './select-invitees/select-invitees.component';
import { AuthGuard } from "../../../auth/guard/auth.guard";

const routes:Routes = [
  {
    path: 'invitation',
    children: [{
      path: '', component: InvitationComponent,
    }, {
      path: 'select', component: SelectInviteesComponent
    }]
  }
];

export const invitationRouting = routes;
