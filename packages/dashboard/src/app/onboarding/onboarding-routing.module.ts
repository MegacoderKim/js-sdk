import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderTrackingComponent} from "./order-tracking/order-tracking.component";
import {OnboardingComponent} from "./onboarding/onboarding.component";
import {SdkAndroidComponent} from "./sdk-android/sdk-android.component";
import {PickPlatformComponent} from "./pick-platform/pick-platform.component";
import {OnboardingContainerComponent} from "./onboarding-container/onboarding-container.component";
import {SdkReactnativeComponent} from "./sdk-reactnative/sdk-reactnative.component";
import {SdkIosComponent} from "./sdk-ios/sdk-ios.component";
import {FcmAndroidComponent} from "./fcm-android/fcm-android.component";
import {MileageTrackingComponent} from "./mileage-tracking/mileage-tracking.component";

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
