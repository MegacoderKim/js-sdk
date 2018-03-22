import { Component, OnInit } from '@angular/core';
import {reactNativeSteps, iosSteps, steps as OrderTrackingSteps} from '../content/order-tracking/order-tracking.steps';
import {androidSteps as AndroidSteps} from '../content/order-tracking/order-tracking.steps';
import {dashboardProductSteps as DashboardProductSteps} from '../content/order-tracking/order-tracking.steps';
import {smsProductSteps as SMSProductSteps} from '../content/order-tracking/order-tracking.steps';
import {sdkProductSteps as SDKProductSteps} from '../content/order-tracking/order-tracking.steps';
import {androidConsumerSteps as AndroidConsumerSteps, iosConsumerSteps} from '../content/order-tracking/order-tracking.steps';
import {steps as FCMSteps} from '../content/fcm-gcm/gcm-fcm.steps';
import {existingFCMSteps as ExistingFCMSteps} from '../content/fcm-gcm/gcm-fcm.steps';
import {newProjectsteps as NewFCMSteps} from '../content/fcm-gcm/gcm-fcm.steps';
import {ActivatedRoute, Router} from "@angular/router";
import {getStepById, getSubStepById} from '../shared/helper.util';
@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.less']
})
export class OrderTrackingComponent implements OnInit {
  steps: any = [];
  currentState: any = {};
  stepIterationCount: number = 0;
  images = {
    dashboard: require('../../../assets/image/ot-dashboard.png'),
    sdk: require('../../../assets/image/ot-sdk.png'),
    sms: require('../../../assets/image/ot-sms.png'),
    fcmGif: require('../../../assets/image/fcm.gif')
  };
  selectedProduct: string = "";
  appPlatform: string = "";
  consumerPlatform: string = "";
  fcmSelectedOption: string = "";
  constructor(
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.setOptionsFromParams();
    this.updateSteps();
  }

  setProductOnParams(product) {
    this.router.navigate([
        {...this.route.snapshot.params, product: product}
      ],
      {relativeTo: this.route, queryParamsHandling: 'preserve'}
    );
  }

  setAppPlatformOnParams(platform) {
    this.router.navigate([
        {...this.route.snapshot.params, platform: platform}
      ],
      {relativeTo: this.route, queryParamsHandling: 'preserve'}
    );
  }

  setFCMOptionOnParams(fcmOption) {
    this.router.navigate([
        {...this.route.snapshot.params, fcm: fcmOption}
      ],
      {relativeTo: this.route, queryParamsHandling: 'preserve'}
    );
  }

  setConsumerPlatformOptionOnParams(consumerPlatform) {
    this.router.navigate([
        {...this.route.snapshot.params, cPlatform: consumerPlatform}
      ],
      {relativeTo: this.route, queryParamsHandling: 'preserve'}
    );
  }

  setOptionsFromParams() {
    let params = this.route.snapshot.params;
    if (params) {
      if (this.isValidProduct(params.product)) {
        this.selectedProduct = params.product;
      }
      if (this.isValidFCMOption(params.fcm)) {
        this.fcmSelectedOption = params.fcm;
      }
      if (this.isValidAppPlatform(params.platform)) {
        this.appPlatform = params.platform;
      }
      if (this.isValidConsumerPlatform(params.cPlatform)) {
        this.consumerPlatform = params.cPlatform;
      }
    }
  }

  updateSteps() {
    let steps = [
      this.getGettingStartedStep(),
      this.getPlugInSdkStep()
    ];
    let realTimeStep = this.getRealTimeStep();
    if (realTimeStep) {
      steps.push(realTimeStep);
    }
    steps = [
      ...steps,
      this.getStartTrackingStep(),
      this.getAssignActionStep(),
      this.getTrackActionStep(),
      this.getCompleteActionStep(),
      this.getStopTrackingStep(),
    ];
    this.steps = steps;
  }

  getGettingStartedStep() {
    let gettingStartedStep = getStepById(OrderTrackingSteps, "step-getting-started");
    if (!this.selectedProduct) {
      gettingStartedStep.subSteps = [getSubStepById(gettingStartedStep.subSteps, "substep-pick-product")];
      return gettingStartedStep;
    }
    return gettingStartedStep;
  }

  getStopTrackingStep() {
    let stopTrackingStep = getStepById(OrderTrackingSteps, "step-stop-tracking");
    if (!this.selectedProduct || !this.appPlatform) {
      stopTrackingStep.subSteps = [];
      return stopTrackingStep;
    }

    if (this.appPlatform === "android") {
      if (!this.fcmSelectedOption) {
        stopTrackingStep.subSteps = [];
        return stopTrackingStep;
      }
      stopTrackingStep.subSteps.push(
        ...getStepById(AndroidSteps, "step-stop-tracking").subSteps,
      );
    } else if (this.appPlatform === "ios") {
      stopTrackingStep.subSteps.push(
        ...getStepById(iosSteps, "step-stop-tracking").subSteps,
      );
    } else if (this.appPlatform === "react-native") {
      stopTrackingStep.subSteps.push(
        ...getStepById(reactNativeSteps, "step-stop-tracking").subSteps,
      );
    }
    return stopTrackingStep;
  }

  getCompleteActionStep() {
    let completeActionStep = getStepById(OrderTrackingSteps, "step-complete-action");
    if (!this.selectedProduct || !this.appPlatform) {
      completeActionStep.subSteps = [];
      return completeActionStep;
    }

    if (this.appPlatform === "android") {
      if (!this.fcmSelectedOption) {
        completeActionStep.subSteps = [];
        return completeActionStep;
      }
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

  getTrackActionStep() {
    let trackActionStep = getStepById(OrderTrackingSteps, "step-track-action");
    if (!this.selectedProduct || !this.appPlatform) {
      trackActionStep.subSteps = [];
      return trackActionStep;
    }

    if (this.appPlatform === "android" && !this.fcmSelectedOption) {
      trackActionStep.subSteps = [];
      return trackActionStep;
    }

    if (this.selectedProduct === "dashboard") {
      trackActionStep.subSteps.push(
        ...getStepById(DashboardProductSteps, "step-product-dashboard").subSteps
      );
    } else if (this.selectedProduct === "sms") {
      trackActionStep.subSteps.push(
        ...getStepById(SMSProductSteps, "step-product-sms").subSteps
      );
    } else if (this.selectedProduct === "sdk") {
      trackActionStep.subSteps.push(
        ...getStepById(SDKProductSteps, "step-product-sdk").subSteps
      );
      if (this.consumerPlatform === "android") {
        trackActionStep.subSteps.push(
          ...getStepById(AndroidConsumerSteps, "step-android-consumer").subSteps
        );
      } else if (this.consumerPlatform === "ios") {
        trackActionStep.subSteps.push(
          ...getStepById(iosConsumerSteps, "step-ios-consumer").subSteps
        );
      }
    }
    return trackActionStep;
  }

  getAssignActionStep() {
    let assignActionStep = getStepById(OrderTrackingSteps, "step-assign-action");
    if (!this.selectedProduct || !this.appPlatform) {
      assignActionStep.subSteps = [];
      return assignActionStep;
    }

    if (this.appPlatform === "android") {
      if (!this.fcmSelectedOption) {
        assignActionStep.subSteps = [];
        return assignActionStep;
      }
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
    let plugInSDKStep = getStepById(OrderTrackingSteps, "step-plug-sdk");
    if (!this.selectedProduct) {
      plugInSDKStep.subSteps = [];
      return plugInSDKStep;
    }

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

  getRealTimeStep() {
    let realTimeStep = getStepById(OrderTrackingSteps, "step-real-timeness");
    if (!this.selectedProduct || !this.appPlatform) {
      realTimeStep.subSteps = [];
      return realTimeStep;
    }
    if (this.selectedProduct && this.appPlatform === "android") {
      if (!this.fcmSelectedOption) {
        realTimeStep.subSteps.push(
          ...getStepById(FCMSteps, "step-fcm-overview").subSteps
        );
      } else if (this.fcmSelectedOption === "none") {
        realTimeStep.subSteps.push(
          ...getStepById(NewFCMSteps, "step-new-fcm").subSteps
        );

      } else if (this.fcmSelectedOption === "fcm") {
        realTimeStep.subSteps.push(
          ...getStepById(ExistingFCMSteps, "step-existing-fcm").subSteps
        );
      }
      return realTimeStep;
    }
    return null;
  }

  getStartTrackingStep() {
    let startTrackingStep = getStepById(OrderTrackingSteps, "step-start-tracking");
    if (!this.selectedProduct || !this.appPlatform) {
      startTrackingStep.subSteps = [];
      return startTrackingStep;
    }

    if (this.appPlatform === "android") {
      if (!this.fcmSelectedOption) {
        startTrackingStep.subSteps = [];
        return startTrackingStep;
      }
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
    return (state && state.subStep) ? state.subStep.showSignupBox : false;
  }

  showFCMOverview(state) {
    return (state && state.subStep) ? (state.subStep.id === 'substep-fcm-overview') : false;
  }

  showPickProduct(state) {
    return (state && state.subStep) ? (state.subStep.id === "substep-pick-product") : false;
  }

  showPlatformPicker(state) {
    return (state && state.subStep) ? (state.subStep.id === "substep-pick-platform") : false;
  }

  showConsumerPlatformPicker(state) {
    return (state && state.subStep) ? (state.subStep.id === "substep-consumer-platform") : false;
  }

  showReactiveBox(state) {
    return (state && state.subStep) ? (
      state.subStep.id === "substep-identify-device" ||
      state.subStep.id === "substep-start-tracking" ||
      state.subStep.id === "substep-assign-action"
    ) : false;
  }

  showBillingBox(state) {
    return (state && state.subStep) ? (
      state.subStep.id === "substep-action-overview"
    ) : false;
  }

  showMailYourDeveloperBox(state) {
    return (state && state.subStep) ? (
      state.subStep.id === "substep-pick-product"
    ) : false;
  }

  showTestNotificationBox(state) {
    return (state && state.subStep) ? (
      state.subStep.id === "substep-test-notification"
    ) : false;
  }

  getReactiveEventType(state) {
    if (state && state.subStep && state.subStep.id === "substep-identify-device") return 'user.created';
    if (state && state.subStep && state.subStep.id === "substep-start-tracking") return 'tracking.started';
    if (state && state.subStep && state.subStep.id === "substep-assign-action") return 'action.assigned';
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

  handleConsumerPlatformPicked(platform) {
    this.consumerPlatform = platform;
    this.updateSteps();
    this.setConsumerPlatformOptionOnParams(platform);
  }

  handleProductSelected(product) {
    this.selectedProduct = product;
    this.setProductOnParams(product);
    this.updateSteps();
  }

  handleFCMOptionSelected(option): void {
    this.fcmSelectedOption = option;
    this.updateSteps();
    this.setFCMOptionOnParams(option);
    this.stepIterationCount = this.stepIterationCount + 1;
  }
}
