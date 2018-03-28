import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SignupRoutingModule} from "./signup-routing.module";
import {SignupComponent} from "./signup.component";
import {ReactiveFormsModule} from "@angular/forms";
import {InnerSharedModule} from "../shared/shared.module";
import { SignupFormComponent } from './signup-form/signup-form.component';
import {SignupService} from "./signup.service";
import {OnboardingService} from "../onboarding/onboarding.service";
import {SharedModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    InnerSharedModule
  ],
  declarations: [
    SignupComponent,
    SignupFormComponent
  ],
  exports: [
    SignupFormComponent
  ],
  providers: []
})
export class SignupModule { }
