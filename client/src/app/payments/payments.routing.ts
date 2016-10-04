/**
 * Created by Oleksandr.Khymenko on 03.10.2016.
 */
import { Routes, RouterModule } from '@angular/router';
import { PaymentsComponent } from './payments.component';

const routes: Routes = [
  { path: 'payments', component: PaymentsComponent }
];

export const paymentsRouting = RouterModule.forChild(routes);
