import {Component, Input, OnInit} from '@angular/core';
import {ExternalAnalyticsService} from "../core/external-analytics.service";

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
  tabs = [];
  content = {
    locationHeader: "Placeline",
    locationSubHeader: "Our app will show your location and activity here",
    dashboardInformation: "Waiting for your location..."
  };
  selectedPlatform: string;
  selectedTab = this.platformTab;
  @Input() hasDefaultPlatform: string = '';

  constructor(private externalAnalyticsService: ExternalAnalyticsService) {
  }

  ngOnInit() {
  }

  onPlatformSelect(platform) {
    this.selectedPlatform = platform;
    this.selectedTab = this.platformTab;
  }
}
