import {Observable} from "rxjs/Observable";
import {IUser} from "ht-models"
import {AllData} from "../../interfaces";
import * as fromRoot from "../../reducers";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import {EntityListDispatchers, EntityListState, EntityTypeConfig, ListSelectors, ListState} from "../base/interfaces";
import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
import {HListFactory} from "../base/list-client";
import {AddUsersMarkersDispatchers, IUsersMarkers} from "./users-markers-interfaces";
import {AllItemsHelpers} from "../helpers/all-items";
import * as fromQueryDispatcher from "../../dispatchers/query-dispatcher";

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
    },
    setQuery(query) {
      store.dispatch(new fromQueryDispatcher.SetPlacelineQuery(query))
    }
  };

  let indexMarkersDispatchers: AddUsersMarkersDispatchers = {
    setDataMap(mapFunc) {
      store.dispatch(new fromUsersDispatcher.SetUsersMarkersDataMap(mapFunc))
    }
  };

  let listSelectors: ListSelectors = {
    active$: store.select(fromRoot.getUsersIndexMarkersIsActive),
    query$: store.select(fromRoot.getQueryUserQuery) as Observable<object>,
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
    ...listDispatcher,
    ...indexMarkersDispatchers,
    ...listSelectors,
    ...entityList.selectors
  }
};