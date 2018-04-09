import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupGuideRoutingModule } from './setup-guide-routing.module';
import { SetupGuideComponent } from './setup-guide.component';
import {OnboardingModule} from "../onboarding/onboarding.module";

@NgModule({
  imports: [
    CommonModule,
    SetupGuideRoutingModule,
    OnboardingModule
  ],
  declarations: [SetupGuideComponent]
})
export class SetupGuideModule { }
