import { Injectable } from '@angular/core';
import {ExternalAnalyticsService} from "./external-analytics.service";
import {Http, RequestOptions, Headers, ResponseContentType} from "@angular/http";
import {LoggerService} from "./logger.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class OnboardingService {
  inviteResponse: any;
  leadResponse: IWebsiteLeadResponse;
  constructor(
    private http: Http,
    private externalAnalyticsService: ExternalAnalyticsService,
    private logger: LoggerService
  ) {
    this.inviteResponse = null;
  }

  sendAccountInvite(phoneNumber, accountId) {
    let amplitudePayload = this.getAmplitudePayload();
    let url = `https://api.hypertrack.com/api/v1/website_leads/${accountId}/send_text_message/`;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': null
    });
    let options = new RequestOptions({
      headers
    });
    let body = {
      ...amplitudePayload,
      phone_number: phoneNumber
    };
    return this.http.post(url, body, options).map(res => res.json());
  }

  getAmplitudePayload() {
    let amplitudeDeviceId = this.externalAnalyticsService.getAmplitudeDeviceId();
    let amplitudeUserId = this.externalAnalyticsService.getAmplitudeUserId();
    let payload = {};
    if (amplitudeDeviceId) {
      payload = {
        ...payload,
        amplitude_device_id: amplitudeDeviceId
      };
    }
    if (amplitudeUserId) {
      payload = {
        ...payload,
        amplitude_user_id: amplitudeUserId
      };
    }
    return payload;
  }

  getWebsiteLead(platform) {
    let amplitudePayload = this.getAmplitudePayload();
    let url = `https://api.hypertrack.com/api/v1/website_leads/`;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': null
    });
    let options = new RequestOptions({
      headers
    });
    let body = {
      ...amplitudePayload,
      platform: platform
    };
    return this.http.post(url, body, options).filter(data => !!data).map(res => res.json());
  }

  getGithubFile(fileUrl: string = '') {
    let newTime = (new Date).getTime();
    fileUrl = fileUrl + `#${newTime}`;
    let options = new RequestOptions({responseType: ResponseContentType.Text});
    // let url = `https://dashboard.hypertrack.com/app/github?fileURL=${fileUrl}&time=${newTime}`;
    return this.http.get(fileUrl, options).map((res) => {
      return res.text();
    }).catch((error: any) => {
      this.logger.log("Error", error);
      return Observable.throw(error.statusText);
    });
  }
}

export interface IWebsiteLeadResponse {
  id: string;
  secret_key: string;
  publishable_key: string;
  branch_link: string;
}
