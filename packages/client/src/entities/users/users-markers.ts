import {Store} from "../../store/store";
import * as fromRoot from "../../reducers"
import {Observable} from "rxjs/Observable";
import {HtUsersIndexClient} from "./users-index-client";
import {HtUsersAnalytics} from "./users-analytics-client";
import {AllData, ApiType} from "../../interfaces";
import {IUserAnalyticsPage, IUserPage, IUserAnalytics, IUser} from "ht-models";
import {HtUsersIndexMarkers} from "./users-index-markers";
import {HtUsersAnalyticsMarkers} from "./users-analytics-markers";
import {UsersList} from "./users-list";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";

export class UsersMarkers extends UsersList {

  constructor(
    public store: Store<fromRoot.State>,
    private usersIndexMarkers: HtUsersIndexMarkers,
    private usersAnalyticsMarkers: HtUsersAnalyticsMarkers
  ) {
    super(store, usersIndexMarkers, usersAnalyticsMarkers)
  };

  setActive(isActive: boolean = true) {
    this.store.dispatch(new fromUsersDispatcher.SetMarkersActive(isActive))
  };

  getResults(isFirstCb?) {
    return this.data$.map((allData: AllData<IUser | IUserAnalytics>) => {
      if(allData && allData.isFirst && isFirstCb) isFirstCb();
      return allData ? allData.results : allData
    })
  }

}