import {HtUsersAnalytics} from "./users-analytics-client";
import {Observable} from "rxjs/Observable";
import { IUserAnalyticsPage } from "ht-models"
import {ApiType} from "../../interfaces";
import * as fromRoot from "../../reducers";
import {Store} from "../../store/store";

export class HtUsersAnalyticsMarkers extends HtUsersAnalytics {
  name = "analytics users";

  get IsActive$(): Observable<boolean> {
    return this.store.select(fromRoot.getUsersAnalyticsMarkersIsActive)
  }

  get loading$() {
    return this.store.select(fromRoot.getLoadingUserAnalyticsAll)
  }

  getDefaultQuery() {
    return { ...super.getDefaultQuery(), page_size: 100, ordering: "-created_at"}
  }

  api$(query) {
    return this.api.all$(query, ApiType.analytics)
  }
}