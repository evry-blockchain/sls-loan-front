import {RouterModule, Routes} from '@angular/router';

import {InvitationComponent} from './invitation.component';
import {SelectInviteesComponent} from './select-invitees/select-invitees.component';

const routes:Routes = [
    {
        path: 'invitation',
        component: InvitationComponent,
    },
    {
        path: 'invitation/select',
        component: SelectInviteesComponent
    }
];

export const invitationRouting = RouterModule.forRoot(routes);
