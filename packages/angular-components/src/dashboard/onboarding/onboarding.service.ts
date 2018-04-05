import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import * as jstz from "jstz";
import {HttpClient} from "@angular/common/http";
import {_throw} from "rxjs/observable/throw";

@Injectable()
export class OnboardingService {
  currentOnBoardingFlow: string = '';
  currentReferrer: string = '';
  currentAppPlatform: string = '';
  currentPackageName: string = '';
  isUserCreated: boolean = false;
  userIdIdentified: string = "";
  actionIdAssigned: string = "";
  isTrackingStarted: boolean = false;
  isActionAssigned: boolean = false;
  constructor(
    private http: HttpClient
  ) { }

  getGithubFile(fileUrl: string = '') {
    let newTime = (new Date).getTime();
    fileUrl = fileUrl + `#${newTime}`;
    let url = `app/github?fileURL=${fileUrl}&time=${newTime}`;
    return this.http.get(url).catch((error: any) => {
      console.log("Error", error);
      return _throw(error);
    });
  }

  mailDeveloper(values) {
    let url = `app/signup/email_developer/`;
    let data = {
      'package_name': values.packageName || '',
      'source_email': values.sourceEmail,
      'developer_email': values.developerEmail
    };
    return this.http.post(url, data).filter(data => !!data)
  }

  sendStartOnboardingNotification(packageName, selectedPlatform, referrer = '') {
    let url = "app/signup/package_name/";
    let timezone =  jstz.determine();
    let data = {
      package_name: packageName,
      app_platform: selectedPlatform,
      signup_referral: referrer,
      timezone: timezone.name()
    };
    return this.http.post(url, data).subscribe(() => {});
  }

  sendFCMTestNotification(userId) {
    let url = `app/users/${userId}/test_notification/`;
    let data = {};
    return this.http.post(url, data).filter(data => !!data)
  }
}
