import {Component, Input, OnInit} from '@angular/core';
import {ExternalAnalyticsService} from "../core/external-analytics.service";
import {ModalService} from "../core/modal.service";

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.less']
})
export class OnboardingComponent implements OnInit {
  images = {
    hypertrackLogo: require('../../assets/images/hyperstart/hypertrack.svg'),
    reactLogo: require('../../assets/images/hyperstart/react.svg'),
    androidLogo: require('../../assets/images/hyperstart/android.svg'),
    iosLogo: require('../../assets/images/hyperstart/ios.svg'),
    xamarinLogo: require('../../assets/images/hyperstart/xamarin.svg'),
    cordovaLogo: require('../../assets/images/hyperstart/cordova.svg'),
    quickstartIcon: require('../../assets/images/hyperstart/quickstart.svg'),
    phoneIcon: require('../../assets/images/hyperstart/phone.svg'),
    obDiagram: require('../../assets/images/hyperstart/obDiagram.svg'),
    obCopy: require('../../assets/images/hyperstart/obCopy.svg'),
    obPhone: require('../../assets/images/hyperstart/obPhone.svg'),
    obWaiting: require('../../assets/images/hyperstart/obWaiting_animated.svg'),
    miniLoader: require('../../assets/images/hyperstart/miniLoader_animated.svg'),
  };
  platformTab = {
    tabNumber: 1,
    label: "Platform",
    type: 'platform'
  };
  platformIcon = '';
  platforms = [
    {
      "name" : "Android",
      "identifier" : "android",
      "lines" : "5 lines of code",
      "icon" : require( '../../assets/image/platforms/android-white.svg')
    },{
      "name" : "iOS",
      "identifier" : "ios",
      "lines" : "10 lines of code",
      "icon" : require( '../../assets/image/platforms/ios-white.svg')
    },{
      "name" : "React native",
      "identifier" : "react-native",
      "lines" : "5 lines of code",
      "icon" : require( '../../assets/image/platforms/react-white.svg')
    },{
      "name" : "Cordova",
      "identifier" : "cordova",
      "lines" : "5 lines of code",
      "icon" : require( '../../assets/image/platforms/cordova-white.svg')
    },{
      "name" : "Xamarin",
      "identifier" : "xamarin",
      "lines" : "5 lines of code",
      "icon" : require( '../../assets/image/platforms/xamarin-white.svg')
    }
  ];
  selectedPlatform: string;
  isPlatformPickActive: boolean = true;
  @Input() hasDefaultPlatform: string = '';

  constructor(
    private externalAnalyticsService: ExternalAnalyticsService,
    private modalService: ModalService,
  ) {
  }

  onPlatformPickerStepClick() {
    this.isPlatformPickActive = true;
    this.selectedPlatform = '';
  }
  /**
   * Opens up the modal to invite a developer to the project
   */
  openDeveloperMailModal() {
    this.modalService.open('mailDeveloperModal');
  }


  ngOnInit() {
  }

  onPlatformSelect(platform) {
    this.isPlatformPickActive = false;
    this.selectedPlatform = platform;
    this.externalAnalyticsService.logSegmentIdentify( {
      platform: platform,
      onboardingStep : '2'
    });
    this.externalAnalyticsService.logSegmentEvent( 'platform picked', 'interaction', 'onboarding' ,{
      platform: platform
    });
    switch (platform) {
      case 'ios':
        this.platformIcon = this.images.iosLogo;
        break;
      case 'android':
        this.platformIcon = this.images.androidLogo;
        break;
      default:
        this.openExternalOnboardingURL(platform);
    }
  }

  openExternalOnboardingURL(platform) {
    let redirectURL = '';
    switch (platform) {
      case 'ios':
        redirectURL = "https://dashboard.hypertrack.com/onboarding/sdk-ios";
        break;
      case 'android':
        redirectURL = "https://dashboard.hypertrack.com/onboarding/sdk-android";
        break;
      case 'react-native':
        redirectURL = "https://docs.hypertrack.com/sdks/reactnative/setup.html";
        break;
      case 'cordova':
        redirectURL = "https://docs.hypertrack.com/sdks/cordova/setup.html";
        break;
      case 'xamarin':
        redirectURL = "https://docs.hypertrack.com/sdks/xamarin/setup.html";
        break;
    }
    if (redirectURL) {
      window.location.href = redirectURL;
    }
  }
}
