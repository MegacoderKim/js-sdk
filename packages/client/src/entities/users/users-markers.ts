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
import {htUser} from "ht-js-data";
import * as _ from "underscore";

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

  setFilter(query) {
    let status = query['status'];
    let search = query['search'];
    let ids = query['id'];
    let userMarkerFilters = [];
    // if(status || search) {
    //   this.updateUserMap(query);
    // }
    if(status) {
      // this.updateUserMap(query);
      userMarkerFilters.push(htUser().getMarkerFilter(status))
    }
    if(search) {
      userMarkerFilters.push(((user: IUserAnalytics) => {
        return htUser().getMarkerSearched(search)(user) // || userMarkerFilter(user)
      }));
      // this.updateUserMap(query);
    }
    if(ids) {
      let userIds = ids.split(',');
      userMarkerFilters.push((user: IUserAnalytics) => {
        return _.contains(userIds, user.id)
      })
    }
    let userMarkerFilter = (user) => {
      return _.reduce(userMarkerFilters, (acc, filter: (user) => boolean) => {
        return acc && filter(user)
      }, true)
    };

    let dataMap = (allResults: AllData<any>) => {
      let results = _.filter(allResults.results, userMarkerFilter);
      return {...allResults, results}
    };
    this.setDataMap(dataMap)
  }

  setDataMap(mapFunc) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersMarkersDataMap(mapFunc))
  }

}