import {Routes, RouterModule} from "@angular/router";
import {ProjectOverviewComponent} from "./overview/project-overview.component";
import {ProjectComponent} from "./project.component";
import {paymentsRouting} from "./payments/payments.routing";
import {invitationRouting} from "./invitation/invitation.routing";
import {chatRouting} from "./chat/chat.routing";
import {termsConditions} from "./termsConditions/terms-conditions.routing";
import {AuthGuard} from "../../auth/guard/auth.guard";
/**
 * Created by Oleksandr.Khymenko on 07.10.2016.
 */

const routes: Routes = [{
  path: 'projects/:id',
  component: ProjectComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '', redirectTo: 'overview',
    },
    {
      path: 'overview', component: ProjectOverviewComponent
    },
    ...paymentsRouting,
    ...invitationRouting,
    ...chatRouting,
    ...termsConditions
  ]
}];

// export const projectRouting = RouterModule.forChild(routes);
export const projectRouting = RouterModule.forChild(routes);
