import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {ExternalAnalyticsService} from "../../core/external-analytics.service";
import {OnboardingService} from "../../core/onboarding.service";
import {iosOnboardingContent} from "../content/ios-onboarding.content";
@Component({
  selector: 'app-ios-sdk',
  templateUrl: './ios-sdk.component.html',
  styleUrls: ['./ios-sdk.component.less']
})
export class IosSdkComponent implements OnInit {
  onboardingContent: any = [];
  onboardingFileURL = 'https://raw.githubusercontent.com/hypertrack/ios-sdk-onboarding-objc/master/onboardingContent.js';
  isContentLoaded = false;
  codeLanguage: string = 'swift';
  isCodeUpdated: boolean = false;
  currentStepIndex = 0;
  @Input() leadResponse;
  @Input() isAccountAccepted: boolean;
  @Output() switchSelectedTab: EventEmitter<string> = new EventEmitter();
  @Output() switchSelectedPlatform: EventEmitter<string> = new EventEmitter();
  constructor(
    private externalAnalyticsService: ExternalAnalyticsService,
    private onboardingService: OnboardingService
  ) { }

  ngOnInit() {
    this.fetchAndUpdateContent();
  }

  fetchAndUpdateContent() {
    this.onboardingService.getOnboardingContent(this.onboardingFileURL).filter(data => !!data).subscribe((fileData) => {
      fileData = JSON.parse( fileData );
      this.onboardingContent = fileData;
      // this.onboardingContent = iosOnboardingContent;
      console.log( this.onboardingContent );
      this.isContentLoaded = true;
    });
  }

  selectLanguage(language) {
    if (this.codeLanguage !== language) {
      this.isCodeUpdated = true;
    }
    this.externalAnalyticsService.logSegmentEvent( "switch language", "interaction", "ios-integration", {
      language: language
    });
    this.codeLanguage = language;
  }

  showTabContent(tab) {
    if ( !this.isContentLoaded ) {
      return false;
    }
    tab = +tab;
    return (this.currentStepIndex === tab);
  }

  onNextStep(tab) {
    this.externalAnalyticsService.logSegmentEvent( "Next step", "interaction", "ios-integration", {
      step: tab
    });
    this.currentStepIndex = +tab;
    let currentIndex = this.currentStepIndex;
    this.onboardingContent.forEach( function ( step, index ) {
      if ( index < currentIndex ) {
        step.status = 'completed';
      } else {
        step.status = 'incomplete';
      }
    });
    this.onboardingContent[this.currentStepIndex].status = 'active';

  }


  getPublishableKey() {
    if (!this.leadResponse) return null;
    return this.leadResponse.publishable_key;
  }
}
