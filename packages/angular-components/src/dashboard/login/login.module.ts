import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoginRoutingModule} from "./login-routing.module";
import {LoginComponent} from "./login.component";
import {SharedModule} from "../shared/shared.module";
import {LoginFormModule} from "./login-form/login-form.module";

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    LoginFormModule
  ],
  declarations: [
      LoginComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }