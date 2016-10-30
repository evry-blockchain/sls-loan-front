/**
 * Created by Oleksandr.Khymenko on 07.10.2016.
 */
import { NgModule } from '@angular/core';
import { ProjectComponent } from "./project.component";
import { ProjectOverviewComponent } from "./overview/project-overview.component";
import { projectRouting } from "./project.routing";
import { CommonModule } from "@angular/common";
import { PaymentsModule } from "./payments/payments.module";
import { ChatModule } from "./chat/chat.module";
import { ProjectOverviewModule } from "./overview/project-overview.module";
import { InvitationModule } from "./invitation/invitation.module";
import { ProjectNegotiationService } from "./service/project-negotiation.service";

@NgModule({
  imports: [
    CommonModule,
    projectRouting,
    PaymentsModule,
    ChatModule,
    ProjectOverviewModule,
    InvitationModule,
  ],
  providers: [
    ProjectNegotiationService
  ],
  declarations: [ProjectComponent],
})
export class ProjectModule {
}
