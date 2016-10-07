
/**
 * Created by Oleksandr.Khymenko on 03.10.2016.
 */

import { paymentsRouting } from './payments.routing';
import { PaymentsComponent } from "./payments.component";
import { NgModule } from '@angular/core';
import { PaymentsFooterComponent } from "./footer/payments-footer.component";
import { PaymentsLoanProcessComponent } from "./loan-process/loan-process.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentsHeaderComponent } from "./header/payments-header.component";
import { PaymentsTableComponent } from "./table/payments-table.component";
import { SharedModule } from "../../../shared/shared.module";


@NgModule({
  imports: [
    NgbModule,
    SharedModule
  ],
  declarations: [
    PaymentsComponent,
    PaymentsFooterComponent,
    PaymentsLoanProcessComponent,
    PaymentsHeaderComponent,
    PaymentsTableComponent
  ],
  providers: [
  ]
})

export class PaymentsModule {
}
