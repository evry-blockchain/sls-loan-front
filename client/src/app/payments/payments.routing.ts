/**
 * Created by Oleksandr.Khymenko on 03.10.2016.
 */
import { Routes, RouterModule } from '@angular/router';
import { PaymentsComponent } from './payments.component';
import { AuthGuard } from "../auth/guard/auth.guard";

const routes: Routes = [
  { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard] }
];

export const paymentsRouting = RouterModule.forChild(routes);
