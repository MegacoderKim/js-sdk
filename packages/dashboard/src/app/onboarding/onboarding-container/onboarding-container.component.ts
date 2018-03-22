import { Component, OnInit } from '@angular/core';
import {OnboardingService} from "../onboarding.service";
import {ActivatedRoute, NavigationEnd, Route, Router} from "@angular/router";
import {SignupService} from "../../signup/signup.service";
import {Title} from "@angular/platform-browser";
import {ExternalAnalyticsService} from "../../core/external-analytics.service";

@Component({
  selector: 'app-onboarding-container',
  templateUrl: './onboarding-container.component.html',
  styleUrls: ['./onboarding-container.component.less']
})
export class OnboardingContainerComponent implements OnInit {
  packageName: string = '';
  referrer: string = '';
  constructor(
    public onBoardingService: OnboardingService,
    public router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private externalAnalyticsService: ExternalAnalyticsService
  ) {

  }

  getRouteOnboardingPlatform(route) {
    if (route.includes('android')) {
      return 'android';
    } else if (route.includes('ios')) {
      return 'ios';
    } else if (route.includes('reactnative')) {
      return 'react-native';
    } else if (route.includes('order-tracking')) {
      return 'order-tracking';
    } else if (route.includes('mileage-tracking')) {
      return 'mileage-tracking';
    }
  }

  ngOnInit() {
    this.setupOnBoardingValues();
    this.router.navigate([],
      {relativeTo: this.route, queryParams: {}}
    );
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let route = event.urlAfterRedirects || event.url;
        if (route && route.includes('onboarding')) {
          let platform = this.getRouteOnboardingPlatform(route);
        }
      }
    });
  }

  setupOnBoardingValues() {
    let childSnapshot = this.route.snapshot.children[0];
    if (childSnapshot) {
      let queryParams = childSnapshot.queryParams;
      if (queryParams && queryParams.packageName) {
        this.packageName = queryParams.packageName;
        this.onBoardingService.currentPackageName = queryParams.packageName;
      }
      if (queryParams && queryParams.ref) {
        this.referrer = queryParams.ref;
        this.onBoardingService.currentReferrer = queryParams.ref;
      }

      let url = childSnapshot.url.join('');
      if (url.includes('sdk-android')) {
        this.onBoardingService.currentOnBoardingFlow = "SDKAndroid";
        this.sendOnboardingNotification(this.packageName, 'android', this.referrer);
        this.titleService.setTitle("Setup Android SDK");
      } else if (url.includes('sdk-ios')) {
        this.onBoardingService.currentOnBoardingFlow = "SDKIos";
        this.sendOnboardingNotification(this.packageName, 'ios', this.referrer);
        this.titleService.setTitle("Setup Ios SDK");
      } else if (url.includes('sdk-reactnative')) {
        this.onBoardingService.currentOnBoardingFlow = "SDKReactNative";
        this.sendOnboardingNotification(this.packageName, 'reactnative', this.referrer);
        this.titleService.setTitle("Setup React Native SDK");
      } else if (url.includes('order-tracking')) {
        this.onBoardingService.currentOnBoardingFlow = "OrderTracking";
        this.titleService.setTitle("Setup Order Tracking");
      } else if (url.includes('mileage-tracking')) {
        this.onBoardingService.currentOnBoardingFlow = "MileageTracking";
        this.titleService.setTitle("Setup Mileage Tracking");
      }
    }
  }

  sendOnboardingNotification(packageName, platform, referrer = "Direct URL") {
    if (packageName && window.document.referrer) {
      this.onBoardingService.sendStartOnboardingNotification(packageName, platform, referrer);
    }
  }

}
