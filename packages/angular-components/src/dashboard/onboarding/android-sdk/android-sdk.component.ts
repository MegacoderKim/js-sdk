import {
  Component, Input, OnInit, Output, EventEmitter
} from '@angular/core';
import {andObservables, forEach} from "@angular/router/src/utils/collection";
import {androidOnboardingContent} from "../content/android-onboarding.content";
import {ExternalAnalyticsService} from "../../core/external-analytics.service";
import {OnboardingService} from "../../core/onboarding.service";

@Component({
  selector: 'app-android-sdk',
  templateUrl: './android-sdk.component.html',
  styleUrls: ['./android-sdk.component.less']
})
export class AndroidSdkComponent implements OnInit {
  onboardingContent: any = [];
  onboardingFileURL = 'https://raw.githubusercontent.com/hypertrack/android-sdk-onboarding/master/onboarding-content.js';
  currentStepIndex = 0;
  isContentLoaded = false;
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

  chatWithDeveloper() {
    window["Intercom"]('showNewMessage', 'Hey Aman, I am facing some issues with integrating Android SDK. Can you help ?');
  }

  /**
   * Get the onboarding content from GitHub file.
   */
  fetchAndUpdateContent() {
    this.onboardingService.getOnboardingContent(this.onboardingFileURL).filter(data => !!data).subscribe((fileData: any[]) => {
      fileData = JSON.parse( fileData );
      this.onboardingContent = fileData;
      // this.onboardingContent = androidOnboardingContent; //Use this when developing locally
      this.isContentLoaded = true;
    });
  }

  /**
   * Returns status of the current active tab
   * @param index of the tab
   * @returns {boolean}
   */
  showTabContent(  tab ) {
    if ( !this.isContentLoaded ) {
      return false;
    }
    tab = +tab; //Make sure it's an integer
    return (this.currentStepIndex === tab );
  }

  /**
   * Perform UI changes on changing the tab
   * @param tab
   */
  onNextStep(tab) {
    this.externalAnalyticsService.logSegmentEvent( "Next Step", "interaction", "android-integration", {
      step : tab
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

  /**
   * Returns Publishable Key
   * @returns {any}
   */
  getPublishableKey() {
    if (!this.leadResponse) return null;
    return this.leadResponse.publishable_key;
  }
}
