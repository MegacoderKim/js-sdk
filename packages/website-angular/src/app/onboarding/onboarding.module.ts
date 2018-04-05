import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding.component';
import {SharedModule} from "../shared/shared.module";
import { IosSdkComponent } from './ios-sdk/ios-sdk.component';
import {LiveOnboardingModule} from "../live-onboarding/live-onboarding.module";
import { AndroidSdkComponent } from './android-sdk/android-sdk.component';
import { ReactNativeSdkComponent } from './react-native-sdk/react-native-sdk.component';
import {HtOnboardingModule} from "ht-docs";

@NgModule({
  imports: [
    CommonModule,
    HtOnboardingModule,
    OnboardingRoutingModule,
    SharedModule,
    LiveOnboardingModule
  ],
  declarations: [
    OnboardingComponent,
    IosSdkComponent,
    AndroidSdkComponent,
    ReactNativeSdkComponent
  ],
  exports: [
    OnboardingComponent
  ]
})
export class OnboardingModule { }
