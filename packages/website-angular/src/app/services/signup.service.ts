import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from "@angular/http";
import {config} from '../config';
import {ExternalAnalyticsService} from "./external-analytics.service";
@Injectable()
export class SignupService {
  testAccountId: string;
  nextURL: string;
  constructor(
    private http: Http,
    private externalAnalyticsService: ExternalAnalyticsService
  ) { }
}
