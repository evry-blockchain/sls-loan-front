/**
 * Created by Oleksandr.Khymenko on 15.10.2016.
 */

import { NgModule } from '@angular/core';
import { ProjectOverviewComponent } from "./project-overview.component";
import { ProjectOverviewHeaderComponent } from "./header/project-overview-header.component";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProjectOverviewComponent,
    ProjectOverviewHeaderComponent
  ],
})
export class ProjectOverviewModule {
}
