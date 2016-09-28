import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
// import {invitationRouting} from './invitation/invitation.routing';

const routes:Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},

    // ...invitationRouting
];

export const routing = RouterModule.forRoot(routes);
