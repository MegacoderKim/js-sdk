import { Component, OnInit } from '@angular/core';
import {existingExpandedFCMSteps as ExistingFCMSteps} from '../content/fcm-gcm/gcm-fcm.steps';
import {newProjectExpandedsteps as NewFCMSteps} from '../content/fcm-gcm/gcm-fcm.steps';
import {steps} from '../content/fcm-android/fcm-android.steps';

@Component({
  selector: 'app-fcm-android',
  templateUrl: './fcm-android.component.html',
  styleUrls: ['./fcm-android.component.less']
})
export class FcmAndroidComponent implements OnInit {
  steps: any = [];
  currentState: any = {};
  stepIterationCount: number = 0;
  images = {
    dashboard: require('../../../assets/image/ot-dashboard.png'),
    sdk: require('../../../assets/image/ot-sdk.png'),
    sms: require('../../../assets/image/ot-sms.png'),
    fcmGif: require('../../../assets/image/fcm.gif')
  };
  fcmSelectedOption: string = 'none';
  constructor() { }

  ngOnInit() {
    this.steps = steps;
  }

  handleNextState(state) {
    this.currentState = state;
  }

  showFCMOverview(state) {
    return state ? (state.stepIndex === 0 && state.subStepIndex === 0) : false;
  }

  showTestNotificationBox(state) {
    return state ? (
      state.subStep.id === "substep-test-notification"
    ) : false;
  }

  handleFCMOptionSelected(option) {
    this.fcmSelectedOption = option;
    if (option === "fcm") {
      this.steps = [...ExistingFCMSteps];
    } else {
      this.steps = [...NewFCMSteps];
    }
    this.stepIterationCount = this.stepIterationCount + 1;
  }

}
