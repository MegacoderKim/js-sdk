import {
  Component, OnInit, Input, EventEmitter, Output, OnChanges, AfterViewInit,
  AfterViewChecked
} from '@angular/core';
import {installStep, permissionsStep, trackingStep, communicationStep} from "../content/ios-onboarding.content";
import {ExternalAnalyticsService} from "../../services/external-analytics.service";

let HighlightJS = require('highlight.js');
import * as $ from 'jquery';
import {BroadcastService} from "../../services/broadcast.service";

@Component({
  selector: 'app-ios-sdk',
  templateUrl: './ios-sdk.component.html',
  styleUrls: ['./ios-sdk.component.less']
})
export class IosSdkComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked {
  onboardingContent = {
    installStep,
    permissionsStep,
    trackingStep,
    communicationStep
  };
  images = {
    fileIcon: require('../../../assets/images/onboarding/code-file.svg'),
    iosBackgroundMode: require('../../../assets/images/onboarding/ios-background-mode.png'),
    iosInfoPermissions: require('../../../assets/images/onboarding/ios-info-permissions.png'),
    settingsIcon: require('../../../assets/images/onboarding/settings-icon.png')
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
    this.externalAnalyticsService.logSegmentEvent( "switch language", "interaction", "ios-integration", {
      language: language
    })
    this.codeLanguage = language;
  }

  showTabContent(tab) {
    return (this.currentSelectedTab && this.currentSelectedTab === tab);
  }

  onNextStep(tabType) {
    this.externalAnalyticsService.logSegmentEvent( "Next step", "interaction", "ios-integration", {
      step: tabType
    })
    this.switchSelectedTab.emit(tabType);
  }

  onUseDemoApp() {
    this.externalAnalyticsService.logSegmentEvent( "use demo app", "interaction", "ios-integration" );
    this.switchSelectedPlatform.emit('test-app');
  }

  openDocsLink(docKey) {
    this.externalAnalyticsService.logSegmentEvent( "Open Docs reference", "interaction", "ios-integration", {
      reference: docKey
    });
      switch (docKey) {
      case 'ios-permissions-1':
        this.broadcastService.emit('open-iframe-modal', "https://docs.hypertrack.com/sdks/ios/setup.html#add-background-capabilities");
        break;
      case 'ios-permissions-2':
        this.broadcastService.emit('open-iframe-modal', "https://docs.hypertrack.com/sdks/ios/setup.html#add-permission-strings-to-your-infoplist");
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
    $('.code-pre-container code').each(function(i, block) {
      HighlightJS.highlightBlock(block);
    });
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
