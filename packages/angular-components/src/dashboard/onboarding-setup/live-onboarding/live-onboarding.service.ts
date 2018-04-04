import { Injectable } from '@angular/core';
import 'rxjs/add/operator/filter';
import "rxjs/add/operator/map";
import {ExternalAnalyticsService} from "../../core/external-analytics.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class LiveOnboardingService {
  inviteResponse: any;
  leadResponse: IWebsiteLeadsResponse;
  constructor(
    private http: HttpClient,
    private externalAnalyticsService: ExternalAnalyticsService
  ) {
    this.inviteResponse = null;
  }

  sendAccountInvite(phoneNumber, accountId) {
    let amplitudePayload = this.getAmplitudePayload();
    let url = `https://api.hypertrack.com/api/v1/website_leads/${accountId}/send_text_message/`;
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': null
    };
    let options = {
      headers
    };
    let body = {
      ...amplitudePayload,
      phone_number: phoneNumber
    };
    return this.http.post(url, body, options);
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

  onboardingStart(platform) {
    let amplitudePayload = this.getAmplitudePayload();
    let url = `https://api.hypertrack.com/api/v1/website_leads/`;
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': null
    };
    let options = {
      headers
    };
    let body = {
      ...amplitudePayload,
      platform: platform
    };
    return this.http.post(url, body, options).filter(data => !!data);
  }
}

export interface IWebsiteLeadsResponse {
  id: string;
  secret_key: string;
  publishable_key: string;
  branch_link: string;
}
