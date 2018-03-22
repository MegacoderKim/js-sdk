import { Component, OnInit } from '@angular/core';
import {OnboardingService} from "../../onboarding.service";
import * as _ from 'underscore';
@Component({
  selector: 'app-test-notification-box',
  templateUrl: './test-notification-box.component.html',
  styleUrls: ['./test-notification-box.component.less']
})
export class TestNotificationBoxComponent implements OnInit {
  form: any = {
    userId: ""
  };
  loading: boolean = false;
  errorMessage: string = "";
  showSuccessMessage: boolean = false;
  constructor(
    private onBoardingService: OnboardingService
  ) { }

  ngOnInit() {
    if (this.onBoardingService.userIdIdentified) this.form.userId = this.onBoardingService.userIdIdentified;
  }

  showErrorMessage() {
    return !!this.errorMessage;
  }

  onInputChange($event) {
    this.form.userId = $event;
    if (!this.form.userId.value) this.errorMessage = "";
  }

  onSubmit() {
    if (this.loading) return false;
    this.loading = true;
    this.showSuccessMessage = false;
    if (this.validateUserId(this.form.userId)) {
      this.errorMessage = "";
      let userId = this.form.userId;
      this.onBoardingService.sendFCMTestNotification(userId).subscribe((data) => {
        this.loading = false;
        this.showSuccessMessage = true;
        setTimeout(() => {}, 2000);
        console.log("SUCCESS", data);
      }, (err) => {
        this.loading = false;
        if (err && err.json()) {
          let errJson = err.json();
          if (_.isArray(errJson) && errJson[0]) {
            this.errorMessage = errJson[0];
          } else if (_.isObject(errJson) && errJson.error) {
            this.errorMessage = errJson.error || errJson.detail;
          }
        } else {
          this.errorMessage = "Unable to send notification";
        }
        console.log("Error",err);
      });
    } else {
      this.errorMessage = "Please provide valid user id";
      this.loading = false;
    }
  }

  validateUserId(userId) {
    return !!userId;
  }

}
