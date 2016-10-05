import {RouterModule, Routes} from '@angular/router';

import {InvitationComponent} from './invitation.component';
import {SelectInviteesComponent} from './select-invitees/select-invitees.component';
import {AuthGuard} from "../auth/guard/auth.guard";

const routes:Routes = [
    {
      path: 'invitation',
      component: InvitationComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'invitation/select',
      component: SelectInviteesComponent,
      canActivate: [AuthGuard]
    }
];

export const invitationRouting = RouterModule.forChild(routes);
