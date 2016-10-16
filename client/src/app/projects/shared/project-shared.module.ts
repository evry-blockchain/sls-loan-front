import { NgModule } from '@angular/core';
import { AddProjectModalComponent } from "../modal/add-project/add-projects-modal.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SelectModule } from "angular2-select";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [ReactiveFormsModule, SelectModule, CommonModule],
  declarations: [
    AddProjectModalComponent
  ],
  exports: [AddProjectModalComponent]
})
export class ProjectsSharedModule {
}
