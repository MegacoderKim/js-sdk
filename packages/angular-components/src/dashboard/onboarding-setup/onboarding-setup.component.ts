import {Component, Input, Output, OnInit, SimpleChanges, EventEmitter} from '@angular/core';
import * as firebase from "firebase";
import {ExternalAnalyticsService} from "../core/external-analytics.service";
import {QuickstartService} from "../core/quickstart.service";
import {ModalService} from "../core/modal.service";
import {LoggerService} from "../core/logger.service";
import {BroadcastService} from "../core/broadcast.service";
require("!style-loader!css-loader!../../style/external/dracula.css");

@Component({
  selector: 'app-onboarding-setup',
  templateUrl: './onboarding-setup.component.html',
  styleUrls: ['./onboarding-setup.component.less']
})
export class OnboardingSetupComponent implements OnInit {
  images = {
    hypertrackLogo: require('../../assets/image/hyperstart/hypertrack.svg'),
    reactLogo: require('../../assets/image/hyperstart/react.svg'),
    androidLogo: require('../../assets/image/hyperstart/android.svg'),
    iosLogo: require('../../assets/image/hyperstart/ios.svg'),
    xamarinLogo: require('../../assets/image/hyperstart/xamarin.svg'),
    cordovaLogo: require('../../assets/image/hyperstart/cordova.svg'),
    quickstartIcon: require('../../assets/image/hyperstart/quickstart.svg'),
    phoneIcon: require('../../assets/image/hyperstart/phone.svg'),
    obDiagram: require('../../assets/image/hyperstart/obDiagram.svg'),
    obCopy: require('../../assets/image/hyperstart/obCopy.svg'),
    obPhone: require('../../assets/image/hyperstart/obPhone.svg'),
    obWaiting: require('../../assets/image/hyperstart/obWaiting_animated.svg'),
    miniLoader: require('../../assets/image/hyperstart/miniLoader_animated.svg'),
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
  @Input() selectedPlatform: string;
  selectedTab = this.platformTab;
  leadResponse;
  isAccountAccepted: boolean = false;
  modalIframeSrc: string = '';
  codeModalContent;
  isPlatformPickActive: boolean = true;
  @Input() hasDefaultPlatform: string = '';
  constructor(
    private externalAnalyticsService: ExternalAnalyticsService,
    private onboardingService: QuickstartService,
    private modalService: ModalService,
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

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['selectedPlatform'] && (changes['selectedPlatform'].previousValue !== changes['selectedPlatform'].currentValue)
    ) {
      this.onSwitchPlatform(changes['selectedPlatform'].currentValue);
    }
    // changes.prop contains the old and the new value...
  }

  onPlatformPickerStepClick() {
    this.isPlatformPickActive = true;
  }

  onPlatformSelect(platform) {
    this.isPlatformPickActive = false;
    this.selectedPlatform = platform;
    this.onboardingService
      .getWebsiteLead(platform)
      .subscribe((leadResponse) => {
        this.onboardingService.leadResponse = leadResponse;
        this.leadResponse = leadResponse;
        this.setupFirebaseReceiverOnAccount(leadResponse.id, leadResponse.secret_key);
      }, (err) => {});

    this.externalAnalyticsService.logSegmentIdentify( {
      platform: platform,
      onboardingStep : '2'
    });
    this.externalAnalyticsService.logSegmentEvent( 'platform picked', 'interaction', 'onboarding' ,{
      platform: platform
    });
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
        this.platformIcon = this.images.iosLogo;
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
        this.platformIcon = this.images.androidLogo;
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
        this.platformIcon = this.images.reactLogo;
        break;
      default:
        this.openExternalOnboardingURL(platform);
    }
  }

  getPublishableKey() {
    return (this.leadResponse && this.leadResponse.publishable_key)
  }

  /**
   * Activates the selected tab
   * @param tab
   */
  onTabSelect(tab) {
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

  /**
   * Opens a modal with iFrame in it
   * @param pageSrc contains the URL to open
   */
  openIframeModalPopup(pageSrc) {
    this.modalIframeSrc = pageSrc;
    this.modalService.open('iframeModal');
  }

  /**
   * Opens a modal with the code in it
   * @param codeContent code content
   */
  openCodeModal(codeContent) {
    this.codeModalContent = codeContent;
    this.modalService.open('codeModal');
  }

  /**
   * Opens up the modal to invite a developer to the project
   */
  openDeveloperMailModal() {
    this.modalService.open('mailDeveloperModal');
  }

  setupDashboardIframe(userId: string, secretKey: string) {
    this.content.dashboardInformation = "That's you!";
    this.placeLineUrl = `https://dashboard.hypertrack.com/widget/users/${userId}?ordering=-last_heartbeat_at&key=${secretKey}`;
    this.nextUrl = `https://dashboard.hypertrack.com/users/${userId}?ordering=-last_heartbeat_at`;
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
        redirectURL = "https://dashboard.hypertrack.com/onboarding/sdk-ios";
        break;
      case 'android':
        redirectURL = "https://dashboard.hypertrack.com/onboarding/sdk-android";
        break;
      case 'react-native':
        redirectURL = "https://dashboard.hypertrack.com/onboarding/sdk-reactnative";
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

  /**
   * Switch between steps of an individual code
   * @param {string} tabType Identifier fot the tab type
   */
  onSwitchTab(tabType: string) {
    this.externalAnalyticsService.logSegmentEvent( 'code step', 'interaction', 'onboarding', {
      tab : tabType,
      platform: this.selectedPlatform
    });
    console.log(tabType);
    this.selectedTab = this.tabs.find((tab) => {
      return (tab.type === tabType);
    });
    console.log(this.selectedTab);
  }

  /**
   * Switch platform using the platform selector
   * @param platform
   */
  onSwitchPlatform(platform) {
    this.onPlatformSelect(platform);
  }
}
