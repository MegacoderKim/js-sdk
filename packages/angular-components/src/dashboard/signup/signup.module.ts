import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SignupRoutingModule} from "./signup-routing.module";
import {SignupComponent} from "./signup.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import { SignupFormComponent } from './signup-form/signup-form.component';
import {SignupService} from "./signup.service";
import {OnboardingService} from "../onboarding/onboarding.service";

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    SharedModule
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
