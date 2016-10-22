/**
 * Created by Oleksandr.Khymenko on 15.10.2016.
 */

import { NgModule } from '@angular/core';
import { ProjectOverviewComponent } from "./project-overview.component";
import { ProjectOverviewHeaderComponent } from "./header/project-overview-header.component";
import { OverviewProjectInformationComponent } from "./accordion/project-information/overview-project-information.component";
import { AccordionModule, ModalModule } from "ng2-bootstrap";
import { ProjectsSharedModule } from "../../shared/project-shared.module";
import { SharedModule } from "../../../shared/shared.module";
import { OverviewInvitationStatusComponent } from "./accordion/invitation-status/overview-invitation-status.component";
import { RouterModule } from "@angular/router";
import { InvitationService } from "../invitation/service/invitation.service";
import { OverviewParticipantProjectInformationComponent } from "./participant/overview-participant-project.component";

@NgModule({
  imports: [
    AccordionModule,
    ModalModule,
    ProjectsSharedModule,
    SharedModule,
    RouterModule
  ],
  providers: [
    InvitationService
  ],
  declarations: [
    ProjectOverviewComponent,
    ProjectOverviewHeaderComponent,
    OverviewProjectInformationComponent,
    OverviewInvitationStatusComponent,
    OverviewParticipantProjectInformationComponent

  ],
})
export class ProjectOverviewModule {
}
