import { Injectable } from '@angular/core';
import {config} from '../config';
import {OnboardingService} from "../core/onboarding.service";

@Injectable()
export class SignupService {

  constructor(
    private onBoardingService: OnboardingService
  ) { }

  getSignupReferral() {
    let referrer = config.htReferrerURL || window.document.referrer || 'Direct URL';
    return `${referrer}`;
  }

  getSignupLocationPage() {
    let pageURL = this.getSignUpPageURL();
    return pageURL;
  }

  getSignupLandingPage() {
    return config.htLandingURL || '--';
  }

  getSignUpPageURL() {
    let snapshotURL = window.location.pathname;
    let pageURL = snapshotURL;
    if (snapshotURL.includes('sdk-android')) {
      pageURL = "OnBoarding:Android SDK";
    } else if (snapshotURL.includes('sdk-ios')) {
      pageURL = "OnBoarding:ios SDK";
    } else if (snapshotURL.includes('sdk-reactnative')) {
      pageURL = "OnBoarding:React Native SDK";
    } else if (snapshotURL.includes('order-tracking')) {
      pageURL = "OnBoarding:Order Tracking";
    } else if (snapshotURL.includes('mileage-tracking')) {
      pageURL = "OnBoarding:Mileage Tracking";
    } else if (snapshotURL.includes('signup')) {
      pageURL = "Signup page";
    }
    return pageURL;
  }

}
