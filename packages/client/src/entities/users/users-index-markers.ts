import {HtUsersAnalytics} from "./users-analytics-client";
import {Observable} from "rxjs/Observable";
import { IUserAnalyticsPage } from "ht-models"
import {HtUsersIndexClient} from "./users-index-client";
import {ApiType} from "../../interfaces";

export class HtUsersIndexMarkers extends HtUsersIndexClient {
  entityName = "analytics users";

  getDefaultQuery() {
    return { ...super.getDefaultQuery(), page_size: 100, ordering: "-created_at"}
  }

  api$(query) {
    return this.api.all$(query, ApiType.index)
  }
}