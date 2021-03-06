/**
 * Created by Oleksandr.Khymenko on 06.10.2016.
 */

import {NgModule} from '@angular/core';
import {projectsRouting} from "./projects.routing";
import {SharedModule} from "../shared/shared.module";
import {ProjectsComponent} from "./projects.component";
import {ProjectsTableComponent} from "./table/projects-table.component";
import {ProjectsTableRowComponent} from "./table/row/projects-table-row.component";
import {AddProjectModalComponent} from "./modal/add-project/add-projects-modal.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ModalModule} from "ng2-bootstrap/ng2-bootstrap";
import {ProjectsService} from "./service/projects.service";
import {AddUserSettingsModalComponent} from "./modal/add-user-settings/add-user-settings-modal.component";
import {ProjectModule} from "./project/project.module";
import {SelectModule} from "angular2-select";
import {ProjectsSharedModule} from "./shared/project-shared.module";
import {DatePipe} from "@angular/common";

@NgModule({
  imports: [projectsRouting, SharedModule, ReactiveFormsModule, ModalModule, ProjectModule, SelectModule, ProjectsSharedModule],
  declarations: [ProjectsComponent,
    ProjectsTableComponent,
    ProjectsTableRowComponent,
    AddUserSettingsModalComponent
  ],
  providers: [ProjectsService, DatePipe]
})
export class ProjectsModule {
}


