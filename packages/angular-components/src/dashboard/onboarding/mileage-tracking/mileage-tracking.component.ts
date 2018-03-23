import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {getStepById} from "../shared/helper.util";
import {iosSteps, reactNativeSteps, androidSteps as AndroidSteps, steps as MileageTrackingSteps} from '../content/mileage-tracking/mileage-tracking.steps';
import {SignupService} from "../../signup/signup.service";

@Component({
  selector: 'app-mileage-tracking',
  templateUrl: './mileage-tracking.component.html',
  styleUrls: ['./mileage-tracking.component.less']
})
export class MileageTrackingComponent implements OnInit {
  steps: any = [];
  currentState: any = {};
  stepIterationCount: number = 0;
  images = {
    dashboard: require('../../../assets/image/ot-dashboard.png'),
    sdk: require('../../../assets/image/ot-sdk.png'),
    sms: require('../../../assets/image/ot-sms.png'),
    fcmGif: require('../../../assets/image/fcm.gif')
  };
  appPlatform: string = "";
  constructor(
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.setOptionsFromParams();
    this.updateSteps();
  }

  setAppPlatformOnParams(platform) {
    this.router.navigate([
        {...this.route.snapshot.params, platform: platform}
      ],
      {relativeTo: this.route, queryParamsHandling: 'preserve'}
    );
  }

  setOptionsFromParams() {
    let params = this.route.snapshot.params;
    if (params) {
      if (this.isValidAppPlatform(params.platform)) {
        this.appPlatform = params.platform;
      }
    }
  }

  updateSteps() {
    let steps = [
      this.getGettingStartedStep(),
      this.getPlugInSdkStep()
    ];
    steps = [
      ...steps,
      this.getStartTrackingStep(),
      this.getAssignActionStep(),
      this.getMileageStep(),
      this.getCompleteActionStep(),
      this.getStopTrackingStep(),
    ];
    this.steps = steps;
  }

  getGettingStartedStep() {
    let gettingStartedStep = getStepById(MileageTrackingSteps, "step-getting-started");
    return gettingStartedStep;
  }

  getStopTrackingStep() {
    let stopTrackingStep = getStepById(MileageTrackingSteps, "step-stop-tracking");
    if (!this.appPlatform) {
      stopTrackingStep.subSteps = [];
      return stopTrackingStep;
    }

    if (this.appPlatform === "android") {
      stopTrackingStep.subSteps.push(
        ...getStepById(AndroidSteps, "step-stop-tracking").subSteps
      );
    } else if (this.appPlatform === "ios") {
      stopTrackingStep.subSteps.push(
        ...getStepById(iosSteps, "step-stop-tracking").subSteps
      );
    } else if (this.appPlatform === "react-native") {
      stopTrackingStep.subSteps.push(
        ...getStepById(reactNativeSteps, "step-stop-tracking").subSteps
      );
    }
    return stopTrackingStep;
  }

  getCompleteActionStep() {
    let completeActionStep = getStepById(MileageTrackingSteps, "step-complete-action");
    if (!this.appPlatform) {
      completeActionStep.subSteps = [];
      return completeActionStep;
    }

    if (this.appPlatform === "android") {
      completeActionStep.subSteps.push(
        ...getStepById(AndroidSteps, "step-complete-action").subSteps
      );
    } else if (this.appPlatform === "ios") {
      completeActionStep.subSteps.push(
        ...getStepById(iosSteps, "step-complete-action").subSteps
      );
    } else if (this.appPlatform === "react-native") {
      // completeActionStep.subSteps.push(
      //   ...getStepById(AndroidSteps, "step-complete-action").subSteps
      // );
    }
    return completeActionStep;
  }

  getMileageStep() {
    let trackActionStep = getStepById(MileageTrackingSteps, "step-get-mileage");
    if (!this.appPlatform) {
      trackActionStep.subSteps = [];
      return trackActionStep;
    }
    return trackActionStep;
  }

  getAssignActionStep() {
    let assignActionStep = getStepById(MileageTrackingSteps, "step-assign-action");
    if (!this.appPlatform) {
      assignActionStep.subSteps = [];
      return assignActionStep;
    }

    if (this.appPlatform === "android") {
      assignActionStep.subSteps.push(
        ...getStepById(AndroidSteps, "step-assign-action").subSteps
      );
    } else if (this.appPlatform === "ios") {
      assignActionStep.subSteps.push(
        ...getStepById(iosSteps, "step-assign-action").subSteps
      );
    } else if (this.appPlatform === "react-native") {
      assignActionStep.subSteps.push(
        ...getStepById(reactNativeSteps, "step-assign-action").subSteps
      );
    }
    return assignActionStep;
  }

  getPlugInSdkStep() {
    let plugInSDKStep = getStepById(MileageTrackingSteps, "step-plug-sdk");

    if (this.appPlatform) {
      if (this.appPlatform === "android") {
        plugInSDKStep.subSteps.push(
          ...getStepById(AndroidSteps, "step-install-sdk").subSteps
        );
      } else if (this.appPlatform === "ios") {
        plugInSDKStep.subSteps.push(
          ...getStepById(iosSteps, "step-install-sdk").subSteps
        );
      } else if (this.appPlatform === "react-native") {
        plugInSDKStep.subSteps.push(
          ...getStepById(reactNativeSteps, "step-install-sdk").subSteps
        );
      }
    }
    return plugInSDKStep;
  }

  getStartTrackingStep() {
    let startTrackingStep = getStepById(MileageTrackingSteps, "step-start-tracking");
    if (!this.appPlatform) {
      startTrackingStep.subSteps = [];
      return startTrackingStep;
    }

    if (this.appPlatform === "android") {
      startTrackingStep.subSteps.push(
        ...getStepById(AndroidSteps, "step-start-tracking").subSteps
      );
    } else if (this.appPlatform === "ios") {
      startTrackingStep.subSteps.push(
        ...getStepById(iosSteps, "step-start-tracking").subSteps
      );
    } else if (this.appPlatform === "react-native") {
      startTrackingStep.subSteps.push(
        ...getStepById(reactNativeSteps, "step-start-tracking").subSteps
      );
    }
    return startTrackingStep;
  }

  isValidConsumerPlatform(platform) {
    return (platform === "android" || platform === "ios" );
  }

  isValidAppPlatform(platform) {
    return (platform === "android" || platform === "ios" || platform === "react-native");
  }

  isValidFCMOption(option) {
    return (option === "fcm" || option === "none");
  }

  isValidProduct(product) {
    return (product === 'dashboard' || product === 'sms' || product === 'sdk');
  }

  showSignupBox(state) {
    return state ? state.subStep.showSignupBox : false;
  }

  showFCMOverview(state) {
    return state ? (state.subStep.id === 'substep-fcm-overview') : false;
  }

  showPickProduct(state) {
    return state ? (state.subStep.id === "substep-pick-product") : false;
  }

  showPlatformPicker(state) {
    return state ? (state.subStep.id === "substep-pick-platform") : false;
  }

  showConsumerPlatformPicker(state) {
    return state ? (state.subStep.id === "substep-consumer-platform") : false;
  }

  showReactiveBox(state) {
    return state ? (
      state.subStep.id === "substep-identify-device" ||
      state.subStep.id === "substep-start-tracking"
    ) : false;
  }

  showBillingBox(state) {
    return state ? (
      state.subStep.id === "substep-action-overview"
    ) : false;
  }

  showMailYourDeveloperBox(state) {
    return state ? (
      state.subStep.id === "substep-pick-product"
    ) : false;
  }

  showTestNotificationBox(state) {
    return state ? (
      state.subStep.id === "substep-test-notification"
    ) : false;
  }

  getReactiveEventType(state) {
    if (state && state.subStep.id === "substep-identify-device") return 'user.created';
    if (state && state.subStep.id === "substep-start-tracking") return 'tracking.started';
    return '';
  }

  handleNextState(state) {
    this.currentState = state;
  }

  handlePlatformPicked(platform) {
    this.appPlatform = platform;
    this.setAppPlatformOnParams(platform);
    this.updateSteps();
  }
}
