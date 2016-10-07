import { Routes, RouterModule } from "@angular/router";
import { ProjectOverviewComponent } from "./overview/project-overview.component";
import { ProjectComponent } from "./project.component";
import { paymentsRouting } from "./payments/payments.routing";
import { invitationRouting } from "./invitation/invitation.routing";
/**
 * Created by Oleksandr.Khymenko on 07.10.2016.
 */

const routes: Routes = [
  { path: 'projects/:id', component: ProjectComponent, children: [
    {
      path: '', redirectTo: 'overview',
    },
    {
      path: 'overview',  component: ProjectOverviewComponent
    },
    ...paymentsRouting,
    ...invitationRouting
  ]}
  // { path: 'projects/id', component: ProjectOverviewComponent }
];

// export const projectRouting = RouterModule.forChild(routes);
export const projectRouting = RouterModule.forChild(routes);
