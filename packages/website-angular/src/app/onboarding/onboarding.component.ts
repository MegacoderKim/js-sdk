import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ExternalAnalyticsService} from "../services/external-analytics.service";
import {OnboardingService} from "../services/onboarding.service";
import * as firebase from "firebase";
import {ModalService} from "../services/modal.service";
import {SignupService} from "../services/signup.service";
import {LoggerService} from "../services/logger.service";
import {BroadcastService} from "../services/broadcast.service";
require("../../assets/css/external/dracula.css");

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
  nextUrl: string = '';
  tabs = [];
  demoUserPlacelineURL: string = "https://dashboard.hypertrack.com/widget/users/78f4a8b1-2c22-4b5d-9111-49df73a374da?ordering=-last_heartbeat_at&key=sk_86f5199d165f911e9f91057f0243accc32329641";
  placeLineUrl: string = this.demoUserPlacelineURL;
  content = {
    locationHeader: "Placeline",
    locationSubHeader: "Our app will show your location and activity here",
    dashboardInformation: "Waiting for your location..."
  };
  firebaseDatabase = null;
  selectedPlatform: string;
  selectedTab = this.platformTab;
  leadResponse;
  isAccountAccepted: boolean = false;
  modalIframeSrc: string = '';
  codeModalContent;
  @Input() hasDefaultPlatform: string = '';
  constructor(
    private externalAnalyticsService: ExternalAnalyticsService,
    private onboardingService: OnboardingService,
    private modalService: ModalService,
    private signupService: SignupService,
    private logger: LoggerService,
    private broadcastService: BroadcastService
  ) { }

  ngOnInit() {
    this.setupFirebaseDatabase();
    this.handleBroadcasts();
    if (this.hasDefaultPlatform) {
      this.onPlatformSelect(this.hasDefaultPlatform);
    }
  }

  handleBroadcasts() {
    this.broadcastService.on('open-code-modal').subscribe((data) => {
      this.openCodeModal(data);
    });
    this.broadcastService.on('open-iframe-modal').subscribe((pageSrc) => {
      this.openIframeModalPopup(pageSrc);
    });
  }

  sendAmplitudeEvents(eventType: string, eventProperties: any) {
    this.externalAnalyticsService.logAmplitudeEvent(eventType, eventProperties)
  }

  onPlatformSelect(platform) {
    this.sendAmplitudeEvents('Onboarding.HomePage.PickedPlatform', {
      platform: platform
    });
    this.selectedPlatform = platform;
    this.onboardingService
      .getWebsiteLead(platform)
      .subscribe((leadResponse) => {
      this.onboardingService.leadResponse = leadResponse;
      this.leadResponse = leadResponse;
      this.setupFirebaseReceiverOnAccount(leadResponse.id, leadResponse.secret_key);
    }, (err) => {});
    switch (platform) {
      case 'test-app':
        this.tabs = [
          this.platformTab,
          {
            tabNumber: 2,
            label: 'Install',
            type: 'install'
          },
          {
            tabNumber: 3,
            label: 'Location',
            type: 'location'
          }
        ];
        this.content.locationSubHeader = "Our app will show your location and activity here";
        this.sendGAEvents('test-app');
        this.selectedTab = this.tabs[1];
        break;
      case 'ios':
        this.tabs = [
          this.platformTab,
          {
            tabNumber: 2,
            label: 'Install',
            type: 'install'
          },
          {
            tabNumber: 3,
            label: 'Permissions',
            type: 'permissions'
          },
          {
            tabNumber: 4,
            label: 'Communication',
            type: 'communication'
          },
          {
            tabNumber: 5,
            label: 'Tracking',
            type: 'tracking'
          },
          {
            tabNumber: 6,
            label: 'Location',
            type: 'location'
          }
        ];
        this.content.locationSubHeader = "App will show your location and activity here";
        this.selectedTab = this.tabs[1];
        break;
      case 'android':
        this.tabs = [
          this.platformTab,
          {
            tabNumber: 2,
            label: 'Install',
            type: 'install'
          },
          {
            tabNumber: 3,
            label: 'Permissions',
            type: 'permissions'
          },
          {
            tabNumber: 4,
            label: 'Communication',
            type: 'communication'
          },
          {
            tabNumber: 5,
            label: 'Tracking',
            type: 'tracking'
          },
          {
            tabNumber: 6,
            label: 'Location',
            type: 'location'
          }
        ];
        this.selectedTab = this.tabs[1];
        this.content.locationSubHeader = "App will show your location and activity here";
        break;
      case 'react-native':
        this.tabs = [
          this.platformTab,
          {
            tabNumber: 2,
            label: 'Install',
            type: 'install'
          },
          {
            tabNumber: 3,
            label: 'Permissions',
            type: 'permissions'
          },
          {
            tabNumber: 4,
            label: 'Tracking',
            type: 'tracking'
          },
          {
            tabNumber: 5,
            label: 'Location',
            type: 'location'
          }
        ];
        this.content.locationSubHeader = "App will show your location and activity here";
        this.selectedTab = this.tabs[1];
        break;
      default:
        this.openExternalOnboardingURL(platform);
    }
  }

  getPublishableKey() {
    return (this.leadResponse && this.leadResponse.publishable_key)
  }

  onTabSelect(tab) {
    this.sendAmplitudeEvents('Onboarding.HomePage.TabSelect', {
      selectedTab: tab,
      platform: this.selectedPlatform
    });
    this.selectedTab = tab;
    if (tab.type === 'platform') {
      this.selectedPlatform = null;
      this.tabs = [];
    }
  }

  setupFirebaseDatabase() {
    let config = {
      apiKey: "AIzaSyAFTrOIHjZsl4p75P9Da2tO5DeNsQd5YUM",
      authDomain: "live-demo-mvp.firebaseapp.com",
      databaseURL: "https://live-demo-mvp.firebaseio.com/",
      storageBucket: "live-demo-mvp.appspot.com"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    this.firebaseDatabase = firebase.database();
  }

  setupFirebaseReceiverOnAccount(accountId: string, secretKey: string) {
    let receiver = this.firebaseDatabase.ref('accounts/' + accountId);
    receiver.on('value', (snapshot) => {
      let value = snapshot.val();
      if (value != null && value.user_id) {
        let userId = value.user_id;
        let timestamp = value.accepted_at;
        if (!timestamp || this.isValidFirebaseEventTimestamp(timestamp)) {
          this.isAccountAccepted = true;
          this.setupDashboardIframe(userId, secretKey);
          this.onSwitchTab('location');
        }
      }
    });
  }

  openIframeModalPopup(pageSrc) {
    this.modalIframeSrc = pageSrc;
    this.modalService.open('iframeModal');
  }

  openCodeModal(codeContent) {
    this.codeModalContent = codeContent;
    this.modalService.open('codeModal');
  }

  setupDashboardIframe(userId: string, secretKey: string) {
    this.content.dashboardInformation = "That's you!";
    this.placeLineUrl = `https://dashboard.hypertrack.com/widget/users/${userId}?ordering=-last_heartbeat_at&key=${secretKey}`;
    this.nextUrl = `https://dashboard.hypertrack.com/users/${userId}?ordering=-last_heartbeat_at`;
    this.sendAmplitudeEvents('Onboarding.HomePage.ShowPlaceline', {
      platform: this.selectedPlatform,
      userId: userId,
      placeLineUrl: this.placeLineUrl
    });
  }

  isValidFirebaseEventTimestamp(timestamp) {
    let currentTime = new Date();
    let timestampDate = new Date(timestamp);
    let diff = currentTime.getTime() - timestampDate.getTime();
    let secsDiff = diff / 1000;
    return (secsDiff < 10);

  }

  openExternalOnboardingURL(platform) {
    let redirectURL = '';
    switch (platform) {
      case 'ios':
        this.sendGAEvents(platform);
        redirectURL = "https://dashboard.hypertrack.com/onboarding/sdk-ios";
        break;
      case 'android':
        this.sendGAEvents(platform);
        redirectURL = "https://dashboard.hypertrack.com/onboarding/sdk-android";
        break;
      case 'react-native':
        this.sendGAEvents(platform);
        redirectURL = "https://dashboard.hypertrack.com/onboarding/sdk-reactnative";
        break;
      case 'cordova':
        this.sendGAEvents(platform);
        redirectURL = "https://docs.hypertrack.com/sdks/cordova/setup.html";
        break;
      case 'xamarin':
        this.sendGAEvents(platform);
        redirectURL = "https://docs.hypertrack.com/sdks/xamarin/setup.html";
        break;
    }
    window.location.href = redirectURL
  }

  sendGAEvents(platform: string) {
    this.externalAnalyticsService.logGAEvent('send', {
      eventCategory: 'HomePage: OnBoarding',
      eventAction: 'Platform Selected',
      eventLabel: platform
    });
    this.externalAnalyticsService.logGAEvent('oldTracker.send', {
      eventCategory: 'HomePage: OnBoarding',
      eventAction: 'Platform Selected',
      eventLabel: platform
    });
  }

  openDashboardSignupPage() {
    let testAccountId = this.leadResponse
      ? this.leadResponse.id
      : null;
    this.sendAmplitudeEvents('Onboarding.HomePage.ClickedSignup', {
      platform: this.selectedPlatform,
      placeLineUrl: this.placeLineUrl
    });
    if (this.isAccountAccepted) {
      this.signupService.testAccountId = testAccountId;
      this.signupService.nextURL = this.nextUrl;
    }
    this.modalService.open('signupModal');
  }

  onSwitchTab(tabType: string) {
    this.sendAmplitudeEvents('Onboarding.HomePage.SwitchTab', {
      tab: tabType,
      platform: this.selectedPlatform
    });
    this.selectedTab = this.tabs.find((tab) => {
      return (tab.type === tabType);
    });
  }

  onSwitchPlatform(platform) {
    this.sendAmplitudeEvents('Onboarding.HomePage.SwitchPlatform', {
      switchedPlatform: platform,
      platform: this.selectedPlatform
    });
    this.onPlatformSelect(platform);
  }
}
