import {Observable} from "rxjs/Observable";
import * as fromRoot from "../../reducers";
import { Store} from "../../store/store";
import { State } from "../../reducers/segments-reducer";
import * as fromSegmentsDispatcher from "../../dispatchers/segments-dispatcher";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import * as fromQueryDispatcher from "../../dispatchers/query-dispatcher";
import {HItemFactory} from "../base/item-client";
import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
import {
  AddUsersPlacelineDispatchers, AddUsersPlacelineSelector, UsersPlaceline,
  UsersPlacelineFactory
} from "./users-placeline-interfaces";
import {
  Dispatchers, EntityItemDispatchers, EntityItemSelectors, EntityItemState, EntityTypeConfig, EntityTypeState,
  ItemDispatchers, GenItemSelectors,
  ItemState,
  ListDispatchers
} from "../base/interfaces";

export const UsersPlacelineClientFactory: UsersPlacelineFactory = (state: ItemState, config: Partial<EntityTypeConfig> = {}): UsersPlaceline => {
  let innerConfig: Partial<EntityTypeConfig> = {
    name: 'users placeline',
    defaultQuery: {ordering: '-last_heartbeat_at'},
    updateStrategy: 'live',
    ...config
  };

  let {
    store,
    api$
  } = state;

  let itemSelectors: EntityItemSelectors = {
    query$: Observable.of({}),
    data$: store.select(fromRoot.getUsersUsersData),
    loading$: store.select(fromRoot.getLoadingUserData),
    id$: store.select(fromRoot.getQueryPlacelineId)
  };

  let placelineSelectors: AddUsersPlacelineSelector = {

  };

  let dispatchers: EntityItemDispatchers = {
    setData(data) {
      store.dispatch(new fromUsersDispatcher.SetUserData(data))
    },
    setLoading(data) {
      store.dispatch(new fromLoadingDispatcher.SetLoadingUserData(data))
    },
    setId(id) {
      store.dispatch(new fromQueryDispatcher.SetPlacelineId(id))
    },
    toggleId(userId: string) {
      store.dispatch(new fromQueryDispatcher.TogglePlacelineId(userId))
    }
  };

  let placelineDispatchers: AddUsersPlacelineDispatchers = {
    setSegmentSelectedId(segmentId) {
      store.dispatch(new fromSegmentsDispatcher.SetSelectedId(segmentId))
    },
    setSegmentResetMapId(segmentId: string) {
      store.dispatch(new fromSegmentsDispatcher.SetResetMapId(segmentId))
    },
  };

  let entityState: EntityItemState = {
      ...state,
    selectors: itemSelectors,
    dispatchers,
    firstDataEffect(data) {
        dispatchers.setLoading(false)
    }
  };

  let entityItem = HItemFactory(entityState, innerConfig);

  return {
    ...entityItem,
    ...dispatchers,
    ...placelineDispatchers,
    ...entityItem.selectors,
    ...itemSelectors
  }
};