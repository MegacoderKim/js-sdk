import {HtUsersAnalytics} from "./users-analytics-client";
import {Observable} from "rxjs/Observable";
import { IUserAnalyticsPage, IUserAnalytics, IUser } from "ht-models"
import {ApiType, AllData} from "../../interfaces";
import * as fromRoot from "../../reducers";
import {Store} from "../../store/store";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import {HtAllItemsClient} from "../../base/all-items.client";
import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
import {EntityListDispatchers, EntityListState, EntityTypeConfig, ListSelectors, ListState} from "../base/interfaces";
import {AddUsersMarkersDispatchers, IUsersMarkers} from "./users-markers-interfaces";
import {HListFactory} from "../base/list-client";
import {usersIndexMarkersFactory} from "./users-index-markers";
import {AllItemsHelpers} from "../helpers/all-items";

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
    data = data || {resultsEntity: {}, isFirst: false};
    this.store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsAll(data))
  }

  setDataMap(mapFunc) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersMarkersDataMap(mapFunc))
  }
}

export const usersAnalyticsMarkersFactory = (state: ListState, config: Partial<EntityTypeConfig> = {}): IUsersMarkers => {
  let {store, api$} = state;

  let innerConfig: Partial<EntityTypeConfig> = {
    ...config,
    name: 'users analytics all',
  };

  innerConfig = AllItemsHelpers.getConfig(innerConfig);
  // return usersIndexMarkersFactory(state, innerConfig);


  let listDispatcher: EntityListDispatchers = {
    setActive(isActive: boolean = true) {
      store.select(fromRoot.getUsersAnalyticsMarkersIsActive)
    },
    setData(data: AllData<IUserAnalytics>) {
      data = data || {resultsEntity: {}, isFirst: false};
      store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsAll(data))
    },
    setLoading(data) {
      store.dispatch(new fromLoadingDispatcher.SetLoadingUserIndexAll(data))
    }
  };

  let indexMarkersDispatchers: AddUsersMarkersDispatchers = {
    setDataMap(mapFunc) {
      store.dispatch(new fromUsersDispatcher.SetUsersMarkersDataMap(mapFunc))
    }
  };

  let listSelectors: ListSelectors = {
    active$: store.select(fromRoot.getUsersAnalyticsMarkersIsActive),
    query$: store.select(fromRoot.getQueryUserQuery),
    data$: store.select(fromRoot.getUsersAnalyticsFilteredMarker),
    loading$: store.select(fromRoot.getLoadingUserAnalyticsAll)
  };

  let markersState: EntityListState = {
    ...state,
    selectors: listSelectors,
    dispatchers: listDispatcher,
    firstDataEffect(data) {
      if(!data.next) {
        listDispatcher.setLoading(false)
      }
    }
  };

  let entityList = HListFactory(markersState, innerConfig);

  return {
    ...entityList,
    dispatchers: {...listDispatcher, ...indexMarkersDispatchers},
    selectors: {...listSelectors, ...entityList.selectors}
  }

};