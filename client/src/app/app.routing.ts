import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {AuthGuard} from "./auth/guard/auth.guard";
// import {invitationRouting} from './invitation/invitation.routing';

const routes:Routes = [
    {path: 'about', component: AboutComponent, canActivate: [AuthGuard]},

    // ...invitationRouting
];
// {path: '', component: HomeComponent, canActivate: [AuthGuard]},


export const routing = RouterModule.forRoot(routes);
