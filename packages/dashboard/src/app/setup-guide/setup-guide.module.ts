import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupGuideRoutingModule } from './setup-guide-routing.module';
import { SetupGuideComponent } from './setup-guide.component';
import {OnboardingSetupModule} from "../onboarding-setup/onboarding-setup.module";

@NgModule({
  imports: [
    CommonModule,
    SetupGuideRoutingModule,
    OnboardingSetupModule
  ],
  declarations: [SetupGuideComponent]
})
export class SetupGuideModule { }
