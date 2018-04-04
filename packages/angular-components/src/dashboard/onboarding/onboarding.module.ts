import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {OnboardingRoutingModule} from "./onboarding-routing.module";
import {HeaderLoggedoffModule} from "../core/header-loggedoff/header-loggedoff.module";
import {InnerSharedModule} from "../shared/shared.module";
import {OnboardingComponent} from "./onboarding/onboarding.component";
import {SdkAndroidComponent} from "./sdk-android/sdk-android.component";
import {PickPlatformComponent} from "./pick-platform/pick-platform.component";
import {HeaderAutoModule} from "../core/header-auto/header-auto.module";
import {OnboardingService} from "./onboarding.service";
import {SignupModule} from "../signup/signup.module";
import {OnboardingContainerComponent} from "./onboarding-container/onboarding-container.component";
import {SdkReactnativeComponent} from "./sdk-reactnative/sdk-reactnative.component";
import {SdkIosComponent} from "./sdk-ios/sdk-ios.component";
import {SignupBoxComponent} from "./shared/signup-box/signup-box.component";
import {LoginFormModule} from "../login/login-form/login-form.module";
import {BillingFormModule} from "../settings/billing-form/billing-form.module";
import {OrderTrackingComponent} from "./order-tracking/order-tracking.component";
import { MailDeveloperFormComponent } from './shared/mail-developer-form/mail-developer-form.component';
import {FormsModule} from "@angular/forms";
import { FcmAndroidComponent } from './fcm-android/fcm-android.component';
import { ReactiveBoxComponent } from './shared/reactive-box/reactive-box.component';
import { BillingBoxComponent } from './shared/billing-box/billing-box.component';
import { NotDeveloperBoxComponent } from './shared/not-developer-box/not-developer-box.component';
import { TestNotificationBoxComponent } from './shared/test-notification-box/test-notification-box.component';
import { MileageTrackingComponent } from './mileage-tracking/mileage-tracking.component';
import {SignupService} from "../signup/signup.service";
import { StepsFooterComponent } from './shared/steps-footer/steps-footer.component';
import { IntegrationOverviewComponent } from './shared/integration-overview/integration-overview.component';
import { LiveLocationSharingComponent } from './live-location-sharing/live-location-sharing.component';
import {CoreServiceModule} from "../core/core.module";
import {RouterModule} from "@angular/router";
import {SharedModule} from "ht-angular";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InnerSharedModule,
    RouterModule,
    // OnboardingRoutingModule,
    HeaderLoggedoffModule,
    HeaderAutoModule,
    SignupModule,
    LoginFormModule,
    BillingFormModule,
    FormsModule
  ],
  declarations: [
    OnboardingComponent,
    SdkAndroidComponent,
    PickPlatformComponent,
    OnboardingContainerComponent,
    SdkReactnativeComponent,
    SdkIosComponent,
    SignupBoxComponent,
    OrderTrackingComponent,
    MailDeveloperFormComponent,
    FcmAndroidComponent,
    ReactiveBoxComponent,
    BillingBoxComponent,
    NotDeveloperBoxComponent,
    TestNotificationBoxComponent,
    MileageTrackingComponent,
    StepsFooterComponent,
    IntegrationOverviewComponent,
    LiveLocationSharingComponent
  ],
  exports: [
    MailDeveloperFormComponent,
  ],
  providers: []
})
export class OnboardingModule { }
