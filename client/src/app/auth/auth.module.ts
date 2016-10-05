/**
 * Created by Oleksandr.Khymenko on 05.10.2016.
 */



import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { loginRouting } from "./auth.routing";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "./service/auth.service";

@NgModule({
  imports: [
    CommonModule,
    loginRouting,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService
  ]
})

export class AuthModule {}
