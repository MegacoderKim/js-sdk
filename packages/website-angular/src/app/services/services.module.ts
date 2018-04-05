import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LiveOnboardingService} from "../live-onboarding/live-onboarding.service";
import {HomePageService} from "../home-page/home-page.service";
import {ExternalAnalyticsService} from "./external-analytics.service";
import {SignupService} from "./signup.service";
import {LoggerService} from "./logger.service";
import {ModalService} from "./modal.service";
import {OnboardingService} from "./onboarding.service";
import {BroadcastService} from "./broadcast.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    LiveOnboardingService,
    HomePageService,
    ExternalAnalyticsService,
    SignupService,
    LoggerService,
    ModalService,
    OnboardingService,
    BroadcastService
  ]
})
export class ServicesModule { }
