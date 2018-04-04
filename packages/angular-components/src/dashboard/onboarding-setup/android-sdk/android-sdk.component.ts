import {
  Component, Input, OnInit, Output, EventEmitter, OnChanges, AfterViewInit,
  AfterViewChecked
} from '@angular/core';
import {installStep, permissionsStep, communicationStep, trackingStep} from "../content/android-onboarding.content";

declare let hljs: any;
var HighlightJS = hljs;
// import * as $ from 'jquery';
import {ExternalAnalyticsService} from "../../core/external-analytics.service";
@Component({
  selector: 'app-android-sdk',
  templateUrl: './android-sdk.component.html',
  styleUrls: ['./android-sdk.component.less']
})
export class AndroidSdkComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked {
  onboardingContent = {
    installStep: installStep,
    permissionsStep: permissionsStep,
    communicationStep: communicationStep,
    trackingStep: trackingStep
  };
  images = {
    fileIcon: require('../../../assets/images/onboarding/code-file.svg'),
    iosBackgroundMode: require('../../../assets/images/onboarding/ios-background-mode.png'),
    iosInfoPermissions: require('../../../assets/images/onboarding/ios-info-permissions.png'),
    settingsIcon: require('../../../assets/images/onboarding/settings-icon.png'),
    helpIcon: require('../../../assets/images/onboarding/helpicon.svg'),
    sdkIcon : require('../../../assets/image/onboarding/sdk-block.svg'),
    permissionIcon: require('../../../assets/image/onboarding/permission-block.svg'),
    communicationIcon : require('../../../assets/image/onboarding/bidirection-block.svg'),
    trackingIcon : require('../../../assets/image/onboarding/tracking-block.svg'),
  };
  troubleshootLink = "https://docs.hypertrack.com/sdks/android/troubleshoot.html";
  isCodeUpdated: boolean = false;
  @Input() currentSelectedTab: string;
  @Input() leadResponse;
  @Input() isAccountAccepted: boolean;
  @Output() switchSelectedTab: EventEmitter<string> = new EventEmitter();
  @Output() switchSelectedPlatform: EventEmitter<string> = new EventEmitter();
  constructor(
    private externalAnalyticsService: ExternalAnalyticsService
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

  showTabContent(tab) {
    return (this.currentSelectedTab && this.currentSelectedTab === tab);
  }

  onNextStep(tabType) {
    this.switchSelectedTab.emit(tabType);
  }
  getPublishableKey() {
    if (!this.leadResponse) return null;
    return this.leadResponse.publishable_key;
  }

  createCodeContent(step, blockNumber) {
    let content;
    if (step === 'install') {
      content = this.onboardingContent.installStep[blockNumber];
    } else if (step === 'permissions') {
      content = this.onboardingContent.permissionsStep[blockNumber];
    } else if (step === 'communication') {
      content = this.onboardingContent.communicationStep[blockNumber];
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
