import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveOnboardingRoutingModule } from './live-onboarding-routing.module';
import { LiveOnboardingComponent } from './live-onboarding.component';
import {FormsModule} from "@angular/forms";
import {InnerSharedModule} from "../../shared/shared.module";
import {SharedModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    LiveOnboardingRoutingModule,
    SharedModule,
    InnerSharedModule,
    FormsModule
  ],
  declarations: [],
  exports: []
})
export class LiveOnboardingModule { }
