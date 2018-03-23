import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OnboardingSetupComponent} from "./onboarding-setup.component";
import {OnboardingContainerComponent} from "../onboarding/onboarding-container/onboarding-container.component";
import {SdkAndroidComponent} from "../onboarding/sdk-android/sdk-android.component";
import {MileageTrackingComponent} from "../onboarding/mileage-tracking/mileage-tracking.component";
import {SdkReactnativeComponent} from "../onboarding/sdk-reactnative/sdk-reactnative.component";
import {SdkIosComponent} from "../onboarding/sdk-ios/sdk-ios.component";
import {PickPlatformComponent} from "../onboarding/pick-platform/pick-platform.component";
import {FcmAndroidComponent} from "../onboarding/fcm-android/fcm-android.component";
import {OrderTrackingComponent} from "../onboarding/order-tracking/order-tracking.component";

const routes: Routes = [
  { path: '', component: OnboardingContainerComponent, children: [
      {path: "sdk-android", component: SdkAndroidComponent},
      {path: "sdk-reactnative", component: SdkReactnativeComponent},
      {path: "sdk-ios", component: SdkIosComponent},
      {path: "platform", component: PickPlatformComponent},
      {path: "order-tracking", component: OrderTrackingComponent},
      {path: "mileage-tracking", component: MileageTrackingComponent},
      {path: "fcm-android", component: FcmAndroidComponent},
      {path: "", loadChildren: "../setup-guide/setup-guide.module#SetupGuideModule"},
      {path: "**", redirectTo: "/onboarding/platform"},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingSetupRoutingModule { }
