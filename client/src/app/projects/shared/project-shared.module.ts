import { NgModule } from '@angular/core';
import { AddProjectModalComponent } from "../modal/add-project/add-projects-modal.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SelectModule } from "angular2-select";
import { CommonModule } from "@angular/common";
import { Ng2BootstrapModule } from "ng2-bootstrap/ng2-bootstrap";

@NgModule({
  imports: [ReactiveFormsModule, SelectModule, CommonModule, Ng2BootstrapModule],
  declarations: [
    AddProjectModalComponent
  ],
  exports: [AddProjectModalComponent]
})
export class ProjectsSharedModule {
}
