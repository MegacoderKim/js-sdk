import { Injectable } from '@angular/core';
import {ExternalAnalyticsService} from "./external-analytics.service";
import {HttpClient} from "@angular/common/http";
import {LoggerService} from "./logger.service";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OnboardingService {
  inviteResponse: any;
  constructor(
    private http: HttpClient,
    private externalAnalyticsService: ExternalAnalyticsService,
    private logger: LoggerService
  ) {
    this.inviteResponse = null;
  }

  getGithubFile(fileUrl: string = '') {
    const newTime = (new Date).getTime();
    fileUrl = fileUrl + `#${newTime}`;
    return this.http.get(fileUrl, {headers: {'X-Noheader': 'true'}, responseType : "text"});
  }
  getOnboardingContent(fileUrl: string = '') {
    const newTime = (new Date).getTime();
    fileUrl = fileUrl + `#${newTime}`;
    return this.http.get(fileUrl, {headers: {'X-NoHeader': 'true'}, responseType : "text"});
  }
}

export interface IWebsiteLeadResponse {
  id: string;
  secret_key: string;
  publishable_key: string;
  branch_link: string;
}
