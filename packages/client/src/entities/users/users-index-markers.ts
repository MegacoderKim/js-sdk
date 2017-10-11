import {HtUsersAnalytics} from "./users-analytics-client";
import {Observable} from "rxjs/Observable";
import { IUserAnalyticsPage, IUser } from "ht-models"
import {HtUsersIndexClient} from "./users-index-client";
import {ApiType, AllData} from "../../interfaces";
import * as fromRoot from "../../reducers";
import {Store} from "../../store/store";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import {HtAllItemsClient} from "../../base/all-items.client";
import {
  EntityListDispatchers, EntityListSelectors, EntityListState, EntityTypeConfig, ListSelectors,
  ListState
} from "../base/interfaces";
import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
import {UsersIndex} from "./users-index-interfaces";
import {HListFactory} from "../base/list-client";
import {AddUsersMarkersDispatchers, IUsersMarkers} from "./users-markers-interfaces";
import {AllItemsHelpers} from "../helpers/all-items";

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
    data = data || {resultsEntity: {}, isFirst: false};
    this.store.dispatch(new fromUsersDispatcher.SetUsersIndexAll(data))
  }

  setDataMap(mapFunc) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersMarkersDataMap(mapFunc))
  }
}

export const usersIndexMarkersFactory = (state: ListState, config: Partial<EntityTypeConfig> = {}): IUsersMarkers => {
  let {store, api$} = state;

  let innerConfig: Partial<EntityTypeConfig> = {
    ...config,
    name: 'users index all',
  };

  innerConfig = AllItemsHelpers.getConfig(innerConfig);

  let listDispatcher: EntityListDispatchers = {
    setActive(isActive: boolean = true) {
      store.dispatch(new fromUsersDispatcher.SetMarkersActive(isActive))
    },
    setData(data: AllData<IUser>) {
      data = data || {resultsEntity: {}, isFirst: false};
      store.dispatch(new fromUsersDispatcher.SetUsersIndexAll(data))
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
    active$: store.select(fromRoot.getUsersIndexMarkersIsActive),
    query$: store.select(fromRoot.getQueryUserQuery),
    data$: store.select(fromRoot.getUsersIndexFilteredMarker),
    loading$: store.select(fromRoot.getLoadingUserIndexAll)
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