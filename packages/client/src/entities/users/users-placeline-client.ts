import {ItemClient} from "../../base/item-client";
import {IUserData} from "ht-models";
import {Observable} from "rxjs/Observable";
import {htPlaceline} from "ht-js-data";
import {HtUsersApi} from "../../api/users";
import {HtClientConfig} from "../../config";
import {IItemClientOptions} from "../../interfaces";
import * as fromRoot from "../../reducers";
import { Store} from "../../store/store";
import { State } from "../../reducers/segments-reducer";
import * as fromSegmentsDispatcher from "../../dispatchers/segments-dispatcher";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import * as fromQueryDispatcher from "../../dispatchers/query-dispatcher";
import {HEntityState, HEntityType, IDispatchers, IItemSelectors, ISelectors} from "../base/interfaces";
import {HUsersItem} from "./users-interface";
import {HItemFactory} from "../base/item-client";
import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
import {
  AddUsersPlacelineDispatchers, AddUsersPlacelineSelector, UsersPlaceline,
  UsersPlacelineFactory
} from "./users-placeline-interfaces";
import {
  Dispatchers, EntityItemState, EntityTypeConfig, EntityTypeState, ItemDispatchers, ItemSelectors, ItemState,
  ListDispatchers
} from "../base/arc";

export class HtUserPlacelineClient extends ItemClient<IUserData> {
  name = "placeline";

  get id$() {
    return this.store.select(fromRoot.getQueryPlacelineId)
  }

  get data$() {
    return this.store.select(fromRoot.getUsersUsersData)
  }

  get loading$() {
    return this.store.select(fromRoot.getLoadingUserData)
  }

  get query$() {
    return Observable.of({})
  }

  get segmentState$() {
    return this.store.select(fromRoot.getSegmentsState)
  }

  getUpdate$(data, {id, query}) {
    // console.log("up", id, query);
    return this.api$(id, query)
  }

  setSegmentSelectedId(segmentId: string) {
    this.store.dispatch(new fromSegmentsDispatcher.SetSelectedId(segmentId))
  }

  setSegmentResetMapId(segmentId: string) {
    this.store.dispatch(new fromSegmentsDispatcher.SetResetMapId(segmentId))
  }

  toggleId(userId: string) {
    this.store.dispatch(new fromQueryDispatcher.TogglePlacelineId(userId))
  }

  setId(userId: string) {
    this.store.dispatch(new fromQueryDispatcher.SetPlacelineId(userId))
  }

  setData(data) {
    return this.store.dispatch(new fromUsersDispatcher.SetUserData(data))
  }

}

export const UsersPlacelineClientFactory: UsersPlacelineFactory = (state: ItemState, config: Partial<EntityTypeConfig> = {}): UsersPlaceline => {
  let innerConfig: Partial<HEntityType> = {
    name: 'users analytics',
    defaultQuery: {ordering: '-last_heartbeat_at'},
    updateStrategy: 'live',
    ...config
  };

  let {
    store,
    api$
  } = state;

  let itemSelectors: ItemSelectors = {
    query$: store.select(fromRoot.getQueryUserQuery),
    data$: store.select(fromRoot.getUsersAnalyticsPage),
    loading$: store.select(fromRoot.getLoadingAnalytics),
    id$: store.select(fromRoot.getQueryPlacelineId)
  };

  let placelineSelectors: AddUsersPlacelineSelector = {

  };

  let dispatchers: ItemDispatchers = {
    setData(data) {
      store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsPage(data))
    },
    setLoading(data) {
      store.dispatch(new fromLoadingDispatcher.SetLoadingUserAnalytics(data))
    },
    setId(id) {
      store.dispatch(new fromQueryDispatcher.SetPlacelineId(id))
    },
    // setSegmentSelectedId(segmentId) {
    //   store.dispatch(new fromSegmentsDispatcher.SetSelectedId(segmentId))
    // },
    // setSegmentResetMapId(segmentId: string) {
    //   store.dispatch(new fromSegmentsDispatcher.SetResetMapId(segmentId))
    // },
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
  }

  let entityState: EntityItemState = {
    store,
    selectors: itemSelectors,
    dispatchers,
    api$
  };

  let entityItem = HItemFactory(entityState, innerConfig);

  return {
    ...entityItem,
    dispatchers: {...entityItem.dispatchers, ...placelineDispatchers}
  }
};

export interface IPlacelineDispatcher extends IDispatchers{
  toggleId: (id) => any,
  setSegmentResetMapId: (id) => any,
  setSegmentSelectedId: (id) => any
}

export interface HUsersPlaceline extends HUsersItem {
  dispatchers: IPlacelineDispatcher,
  selectors: IItemSelectors
}