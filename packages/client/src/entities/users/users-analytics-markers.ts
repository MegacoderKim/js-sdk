import {HtUsersAnalytics} from "./users-analytics-client";
import {Observable} from "rxjs/Observable";
import { IUserAnalyticsPage, IUserAnalytics } from "ht-models"
import {ApiType, AllData} from "../../interfaces";
import * as fromRoot from "../../reducers";
import {Store} from "../../store/store";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";

export class HtUsersAnalyticsMarkers extends HtUsersAnalytics {
  name = "analytics all users";

  toUpdate = false;

  get isActive$(): Observable<boolean> {
    return this.store.select(fromRoot.getUsersAnalyticsMarkersIsActive)
  }

  get data$(): Observable<any> {
    return this.store.select(fromRoot.getUsersAnalyticsAll).share()
  }

  get query$() {
    return this.store.select(fromRoot.getQueryUserQuery)
  }

  get loading$() {
    return this.store.select(fromRoot.getLoadingUserAnalyticsAll)
  }

  getDefaultQuery() {
    return { ...super.getDefaultQuery(), page_size: 100, ordering: "-created_at"}
  }

  // api$(query) {
  //   return this.api.all$(query, ApiType.analytics)
  // }

  setData(data) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsAll(data))
  }
}