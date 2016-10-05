
/**
 * Created by Oleksandr.Khymenko on 05.10.2016.
 */

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }
];

export const loginRouting = RouterModule.forChild(routes);
