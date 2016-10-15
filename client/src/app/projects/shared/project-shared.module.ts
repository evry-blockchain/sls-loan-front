import { NgModule } from '@angular/core';
import { AddProjectModalComponent } from "../modal/add-project/add-projects-modal.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SelectModule } from "angular2-select";

@NgModule({
  imports: [ReactiveFormsModule, SelectModule],
  declarations: [
    AddProjectModalComponent
  ],
  exports: [AddProjectModalComponent]
})
export class ProjectsSharedModule {
}
