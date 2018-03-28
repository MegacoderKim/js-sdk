import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoginRoutingModule} from "./login-routing.module";
import {LoginComponent} from "./login.component";
import {InnerSharedModule} from "../shared/shared.module";
import {LoginFormModule} from "./login-form/login-form.module";
import {SharedModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    InnerSharedModule,
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
