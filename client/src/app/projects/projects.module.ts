/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */

import { NgModule } from '@angular/core';
import { projectsRouting } from "./projects.routing";
import { SharedModule } from "../shared/shared.module";
import { ProjectsComponent } from "./projects.component";
import { ProjectsTableComponent } from "./table/projects-table.component";
import { ProjectsTableRowComponent } from "./table/row/projects-table-row.component";
import { ProjectsModalComponent } from "./modal/projects-modal.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ng2-bootstrap";

@NgModule({
  imports: [ projectsRouting, SharedModule, ReactiveFormsModule, ModalModule],
  declarations: [ ProjectsComponent, ProjectsTableComponent, ProjectsTableRowComponent, ProjectsModalComponent ]
})
export class ProjectsModule {}


