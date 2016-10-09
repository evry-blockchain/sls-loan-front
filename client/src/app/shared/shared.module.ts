/**
 * Created by Oleksandr.Khymenko on 04.10.2016.
 */

import { SearchComponent } from './search/search.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Angular2DataTableModule } from 'angular2-data-table';
import {AuthGuard} from "../auth/guard/auth.guard";
import { ToastyModule } from "ng2-toasty";


@NgModule({
  imports: [
    CommonModule,
    // ToastyModule.forRoot()
  ],
  declarations: [
    SearchComponent
  ],
  providers: [
  ],
  exports: [
    SearchComponent,
    CommonModule,
    Angular2DataTableModule,
    // ToastyModule
  ],
})

export class SharedModule {}
