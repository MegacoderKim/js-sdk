import { Component, OnInit } from '@angular/core';
import {steps} from '../content/sdk-ios/sdk-ios.steps';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sdk-ios',
  templateUrl: './sdk-ios.component.html',
  styleUrls: ['./sdk-ios.component.less']
})
export class SdkIosComponent implements OnInit {
  steps: any = [];
  currentState: any = {};
  packageName: string = "";
  showIntegrationOverview: boolean = true;
  images = {
    overview: require('../../../assets/image/plug-sdk-overview.png')
  };
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.steps = steps;
    if (this.paramHasSteps()) {
      this.showIntegrationOverview = false;
    }
  }

  paramHasSteps() {
    let params = this.route.snapshot.params;
    if (params && params.step) {
      return true;
    }
    return null;
  }

  onStartIntegration(e?) {
    this.showIntegrationOverview = false;
  }


  handleNextState(state) {
    this.currentState = state;
  }

  showMailYourDeveloperBox(state) {
    return state ? (
      state.subStep.id === "substep-overview"
    ) : false;
  }

  showSignupBox(state) {
    return state ? state.subStep.showSignupBox : false;
  }

  showReactiveBox(state) {
    return state ? (
      state.subStep.id === "substep-identify-device" ||
      state.subStep.id === "substep-start-tracking"
    ) : false;
  }

  getReactiveEventType(state) {
    if (state && state.subStep.id === "substep-identify-device") return 'user.created';
    if (state && state.subStep.id === "substep-start-tracking") return 'tracking.started';
    return '';
  }

}
