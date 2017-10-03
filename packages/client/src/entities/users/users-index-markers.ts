import {HtUsersAnalytics} from "./users-analytics-client";
import {Observable} from "rxjs/Observable";
import { IUserAnalyticsPage, IUser } from "ht-models"
import {HtUsersIndexClient} from "./users-index-client";
import {ApiType, AllData} from "../../interfaces";
import * as fromRoot from "../../reducers";
import {Store} from "../../store/store";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import {HtAllItemsClient} from "../../base/all-items.client";

export class HtUsersIndexMarkers extends HtAllItemsClient<IUser> {
  name = "index all users";
  toUpdate = false;

  get isActive$(): Observable<boolean> {
    return this.store.select(fromRoot.getUsersIndexMarkersIsActive)
  }

  get loading$() {
    return this.store.select(fromRoot.getLoadingUserIndexAll)
  }

  get query$() {
    return this.store.select(fromRoot.getQueryUserQuery)
  }

  get data$(): Observable<AllData<IUser>> {
    return this.store.select(fromRoot.getUsersIndexFilteredMarker)
  }

  // api$(query) {
  //   return this.api.all$(query, ApiType.index)
  // }

  setData(data: AllData<IUser>) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersIndexAll(data))
  }

  setDataMap(mapFunc) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersMarkersDataMap(mapFunc))
  }
}