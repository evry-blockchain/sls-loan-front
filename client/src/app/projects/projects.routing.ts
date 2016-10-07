import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../auth/guard/auth.guard";
import { ProjectsComponent } from "./projects.component";
import { ProjectOverviewComponent } from "./project/overview/project-overview.component";
import { ProjectComponent } from "./project/project.component";
import { projectRouting } from "./project/project.routing";

const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full'},
  { path: 'projects', component: ProjectsComponent, canActivate: [ ],
    // children: [
    //   {
    //     path: '', component: ProjectsComponent
    //   },
    //   {
    //     path: ':id',
    //     component: ProjectComponent,
    //     children: [
    //       {
    //         path: '', component: ProjectOverviewComponent
    //       }
    //     ]
    //   },
    // ]
  }
];

export const projectsRouting = RouterModule.forChild(routes);
// export const projectsRouting = routes;
