import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../auth/guard/auth.guard";
import { ProjectsComponent } from "./projects.component";

const routes: Routes = [
  { path: '', component: ProjectsComponent, canActivate: [  ] }
];

export const projectsRouting = RouterModule.forChild(routes);
