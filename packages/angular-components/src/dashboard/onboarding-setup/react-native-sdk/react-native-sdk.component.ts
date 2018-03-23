import {
  AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit,
  Output
} from '@angular/core';
import {installStep, permissionsStep, trackingStep} from "../content/react-native-onboarding.content";

declare let hljs: any;
var HighlightJS = hljs;
// import * as $ from 'jquery';
import {ExternalAnalyticsService} from "../../core/external-analytics.service";

@Component({
  selector: 'app-react-native-sdk',
  templateUrl: './react-native-sdk.component.html',
  styleUrls: ['./react-native-sdk.component.less']
})
export class ReactNativeSdkComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked {
  onboardingContent = {
    installStep: installStep,
    permissionsStep: permissionsStep,
    trackingStep: trackingStep
  };
  images = {
    fileIcon: require('../../../assets/images/onboarding/code-file.svg'),
    iosBackgroundMode: require('../../../assets/images/onboarding/ios-background-mode.png'),
    iosInfoPermissions: require('../../../assets/images/onboarding/ios-info-permissions.png'),
    settingsIcon: require('../../../assets/images/onboarding/settings-icon.png'),
    sdkIcon : require('../../../assets/image/onboarding/sdk-block.svg'),
    permissionIcon: require('../../../assets/image/onboarding/permission-block.svg'),
    communicationIcon : require('../../../assets/image/onboarding/bidirection-block.svg'),
    trackingIcon : require('../../../assets/image/onboarding/tracking-block.svg'),

  };
  codeLanguage: string = 'android';
  isCodeUpdated: boolean = false;
  @Input() currentSelectedTab: string;
  @Input() leadResponse;
  @Input() isAccountAccepted: boolean;
  @Output() switchSelectedTab: EventEmitter<string> = new EventEmitter();
  @Output() switchSelectedPlatform: EventEmitter<string> = new EventEmitter();
  constructor(
    private externalAnalyticsService: ExternalAnalyticsService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (
      changes['currentSelectedTab'] && (changes['currentSelectedTab'].previousValue !== changes['currentSelectedTab'].currentValue)
      || changes['leadResponse'] &&  (changes['leadResponse'].previousValue !== changes['leadResponse'].currentValue)
    ) {
      this.isCodeUpdated = true;
    }
  }

  selectLanguage(language) {
    if (this.codeLanguage !== language) {
      this.isCodeUpdated = true;
    }
    this.codeLanguage = language;
  }

  showTabContent(tab) {
    return (this.currentSelectedTab && this.currentSelectedTab === tab);
  }

  onNextStep(tabType) {
    this.switchSelectedTab.emit(tabType);
  }

  onUseDemoApp() {
    this.switchSelectedPlatform.emit('test-app');
  }

  openDocsLink(docKey) {
    switch (docKey) {
      case 'ios-permissions-1':
        window.open("https://docs.hypertrack.com/sdks/ios/setup.html#add-background-capabilities");
        break;
      case 'ios-permissions-2':
        window.open("https://docs.hypertrack.com/sdks/ios/setup.html#add-permission-strings-to-your-infoplist");
        break;
    }
  }

  getPublishableKey() {
    if (!this.leadResponse) return null;
    return this.leadResponse.publishable_key;
  }

  createCodeContent(step, blockNumber) {
    let content;
    if (step === 'install') {
      if (blockNumber === 1) {
        content = this.onboardingContent.installStep[blockNumber][this.codeLanguage];
      } else {
        content = this.onboardingContent.installStep[blockNumber];
      }
    } else if (step === 'permissions') {
      content = this.onboardingContent.permissionsStep[blockNumber];
    } else if (step === 'tracking') {
      content = this.onboardingContent.trackingStep[blockNumber];
    }
    return {
      code: content.code,
      language: content.language,
      fileName: content.fileName,
      fileURL: content.fileURL,
      copyLines: content.lines
    }
  }

  runCodeHighlighting() {
    var aCodes = document.getElementsByClassName('code-pre-container');
    for (var i=0; i < aCodes.length; i++) {
      HighlightJS.highlightBlock(aCodes[i]);
    }
  }

  ngAfterViewInit() {
    this.runCodeHighlighting();
  }

  ngAfterViewChecked() {
    if (this.isCodeUpdated) {
      this.runCodeHighlighting();
      this.isCodeUpdated = false;
    }
  }

}
