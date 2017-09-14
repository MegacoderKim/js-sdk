import {HtUsersAnalytics} from "./users-analytics-client";
import {Observable} from "rxjs/Observable";
import { IUserAnalyticsPage } from "ht-models"
import {ApiType} from "../../api/base";

export class HtUsersAnalyticsMarkers extends HtUsersAnalytics {
  name = "analytics users";

  getDefaultQuery() {
    return { ...super.getDefaultQuery(), page_size: 100, ordering: "-created_at"}
  }

  api$(query) {
    return this.api.all$(query, ApiType.analytics)
  }
}