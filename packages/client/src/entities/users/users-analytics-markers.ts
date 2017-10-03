import {HtUsersAnalytics} from "./users-analytics-client";
import {Observable} from "rxjs/Observable";
import { IUserAnalyticsPage, IUserAnalytics } from "ht-models"
import {ApiType, AllData} from "../../interfaces";
import * as fromRoot from "../../reducers";
import {Store} from "../../store/store";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import {HtAllItemsClient} from "../../base/all-items.client";

export class HtUsersAnalyticsMarkers extends HtAllItemsClient<IUserAnalyticsPage> {
  name = "analytics all users";

  toUpdate = false;

  get isActive$(): Observable<boolean> {
    return this.store.select(fromRoot.getUsersAnalyticsMarkersIsActive)
  }

  get data$(): Observable<any> {
    return this.store.select(fromRoot.getUsersAnalyticsFilteredMarker)
  }

  get query$() {
    return this.store.select(fromRoot.getQueryUserQuery)
  }

  get loading$() {
    return this.store.select(fromRoot.getLoadingUserAnalyticsAll)
  }

  // api$(query) {
  //   return this.api.all$(query, ApiType.analytics)
  // }

  setData(data) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsAll(data))
  }

  setDataMap(mapFunc) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersMarkersDataMap(mapFunc))
  }
}