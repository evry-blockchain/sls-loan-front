/**
 * Created by Oleksandr.Khymenko on 07.10.2016.
 */
import { NgModule } from '@angular/core';
import { ProjectComponent } from "./project.component";
import { ProjectOverviewComponent } from "./overview/project-overview.component";
import { projectRouting } from "./project.routing";
import { CommonModule } from "@angular/common";
import { PaymentsModule } from "./payments/payments.module";

@NgModule({
  imports: [CommonModule, projectRouting, PaymentsModule],
  declarations: [ProjectComponent, ProjectOverviewComponent],
})
export class ProjectModule {
}
