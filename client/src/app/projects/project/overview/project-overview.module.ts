/**
 * Created by Oleksandr.Khymenko on 15.10.2016.
 */

import { NgModule } from '@angular/core';
import { ProjectOverviewComponent } from "./project-overview.component";
import { ProjectOverviewHeaderComponent } from "./header/project-overview-header.component";
import { CommonModule } from "@angular/common";
import { OverviewProjectInformationComponent } from "./accordion/project-information/overview-project-information.component";
import { AccordionModule } from "ng2-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    AccordionModule
  ],
  declarations: [
    ProjectOverviewComponent,
    ProjectOverviewHeaderComponent,
    OverviewProjectInformationComponent
  ],
})
export class ProjectOverviewModule {
}
