/**
 * Created by Oleksandr.Khymenko on 04.10.2016.
 */

import { SearchComponent } from './search/search.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Angular2DataTableModule } from 'angular2-data-table';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SearchComponent
  ],
  exports: [
    SearchComponent,
    CommonModule,
    Angular2DataTableModule
  ],
})

export class SharedModule {}
