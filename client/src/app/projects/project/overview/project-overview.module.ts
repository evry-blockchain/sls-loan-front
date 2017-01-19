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
import { OverviewFinancialStatusComponent } from "./accordion/financial-status/financial-status.component";
import { ChartsModule } from "ng2-charts/ng2-charts";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    AccordionModule,
    ModalModule,
    ProjectsSharedModule,
    SharedModule,
    RouterModule,
    ChartsModule,
    FormsModule
  ],
  providers: [
    InvitationService
  ],
  declarations: [
    ProjectOverviewComponent,
    ProjectOverviewHeaderComponent,
    OverviewProjectInformationComponent,
    OverviewInvitationStatusComponent,
    OverviewParticipantProjectInformationComponent,
    OverviewFinancialStatusComponent

  ],
})
export class ProjectOverviewModule {
}
