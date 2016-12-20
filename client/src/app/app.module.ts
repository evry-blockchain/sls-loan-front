import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { HttpModule} from '@angular/http';
import { FormsModule} from '@angular/forms';


import { InvitationModule} from './projects/project/invitation/invitation.module';

import { AppComponent} from './app.component';
import { HomeComponent} from './home/home.component';
import { AboutComponent} from './about/about.component';
import { ApiService} from './shared';
import { routing} from './app.routing';

import { removeNgStyles, createNewHosts} from '@angularclass/hmr';
import { PaymentsModule} from './projects/project/payments/payments.module';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthModule} from './auth/auth.module';
import { AuthGuard } from "./auth/guard/auth.guard";
import { SharedModule } from "./shared/shared.module";
import { ProjectsModule } from "./projects/projects.module";
import { ModalModule } from "ng2-bootstrap/ng2-bootstrap";
import { ToastyModule } from "ng2-toasty";
import { ApiGateway } from "./api-gateway.service";
import { WaitingSpinnerComponent } from "./utils/waitingSpinner/waitingSpinner.component";
import { WaitingSpinnerService } from "./utils/waitingSpinner/waitingSpinnerService";
import { ParticipantService } from "./participants/service/participants.service";
import { UserService } from "./user/user.service";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {UtilsService} from "./projects/service/utils.service";


@NgModule({
    imports: [
      BrowserModule,
      HttpModule,
      FormsModule,
      routing,
      PaymentsModule,
      NgbModule.forRoot(),
      AuthModule,
      SharedModule,
      ProjectsModule,
      ModalModule,
      ToastyModule.forRoot(),
      ChartsModule
    ],
    declarations: [
      AppComponent,
      HomeComponent,
      AboutComponent,
      WaitingSpinnerComponent
    ],
    providers: [
      ApiGateway,
      ApiService,
      AuthGuard,
      WaitingSpinnerService,
      ParticipantService,
      UserService,
      UtilsService,
      { provide: 'ApiEndpoint', useValue: '/api'},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

  constructor(public appRef:ApplicationRef) {
    }

    hmrOnInit(store) {
        console.log('HMR store', store);
    }

    hmrOnDestroy(store) {
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
