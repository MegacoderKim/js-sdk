import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveOnboardingRoutingModule } from './live-onboarding-routing.module';
import { LiveOnboardingComponent } from './live-onboarding.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    LiveOnboardingRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [LiveOnboardingComponent],
  exports: [
    LiveOnboardingComponent
  ]
})
export class LiveOnboardingModule { }
