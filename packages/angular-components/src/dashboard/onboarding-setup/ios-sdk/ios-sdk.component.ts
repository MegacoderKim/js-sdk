import {
  Component, OnInit, Input, EventEmitter, Output, OnChanges, AfterViewInit,
  AfterViewChecked
} from '@angular/core';
import {installStep, permissionsStep, trackingStep, communicationStep} from "../content/ios-onboarding.content";
import {ExternalAnalyticsService} from "../../core/external-analytics.service";

declare let hljs: any;
var HighlightJS = hljs;
import {BroadcastService} from "../../core/broadcast.service";

@Component({
  selector: 'app-ios-sdk',
  templateUrl: './ios-sdk.component.html',
  styleUrls: ['./ios-sdk.component.less']
})
export class IosSdkComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked {
  onboardingContent = {
    installStep: installStep,
    permissionsStep: permissionsStep,
    trackingStep: trackingStep,
    communicationStep: communicationStep
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
  codeLanguage: string = 'swift';
  isCodeUpdated: boolean = false;
  troubleshootLink = "https://docs.hypertrack.com/sdks/ios/troubleshoot.html";
  @Input() currentSelectedTab: string;
  @Input() leadResponse;
  @Input() isAccountAccepted: boolean;
  @Output() switchSelectedTab: EventEmitter<string> = new EventEmitter();
  @Output() switchSelectedPlatform: EventEmitter<string> = new EventEmitter();
  constructor(
    private externalAnalyticsService: ExternalAnalyticsService,
    private broadcastService: BroadcastService
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

  openDocsLink(docKey) {
    switch (docKey) {
      case 'ios-permissions-1':
        this.broadcastService.emit('open-iframe-modal', "https://s3-us-west-2.amazonaws.com/hypertrack-ios-sdk/HyperTrack/turn-on-bg-capabilities.mp4");
        break;
      case 'ios-permissions-2':
        this.broadcastService.emit('open-iframe-modal', "https://s3-us-west-2.amazonaws.com/hypertrack-ios-sdk/HyperTrack/add-permission-strings.mp4");
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
      content = this.onboardingContent.installStep[blockNumber][this.codeLanguage];
    } else if (step === 'permissions') {
      content = this.onboardingContent.permissionsStep[blockNumber][this.codeLanguage];
    } else if (step === 'communication') {
      content = this.onboardingContent.communicationStep[blockNumber][this.codeLanguage];
    } else if (step === 'tracking') {
      content = this.onboardingContent.trackingStep[blockNumber][this.codeLanguage];
    }
    return {
      code: content.code,
      language: this.codeLanguage,
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
