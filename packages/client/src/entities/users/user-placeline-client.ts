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

export const UsersPlacelineClientFactory = (api$, store, overrideEntityState: HEntityState, config: Partial<HEntityType> = {}): HUsersPlaceline => {
  let innerConfig: Partial<HEntityType> = {
    name: 'users analytics',
    defaultQuery: {ordering: '-last_heartbeat_at'},
    updateStrategy: 'live',
    ...config
  };

  let selectors: IItemSelectors = {
    query$: store.select(fromRoot.getQueryUserQuery),
    data$: store.select(fromRoot.getUsersAnalyticsPage),
    active$: store.select(fromRoot.getUsersAnalyticsIsActive),
    loading$: store.select(fromRoot.getLoadingAnalytics),
    id$: store.select(fromRoot.getQueryPlacelineId)
  };

  let dispatchers: IPlacelineDispatcher = {
    setData(data) {
      store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsPage(data))
    },
    setLoading(data) {
      store.dispatch(new fromLoadingDispatcher.SetLoadingUserAnalytics(data))
    },
    setActive(isActive: boolean = true){
      store.dispatch(new fromUsersDispatcher.SetListActive(isActive))
    },
    setId(id) {
      store.dispatch(new fromQueryDispatcher.SetPlacelineId(id))
    },
    setSegmentSelectedId(segmentId) {
      store.dispatch(new fromSegmentsDispatcher.SetSelectedId(segmentId))
    },
    setSegmentResetMapId(segmentId: string) {
      store.dispatch(new fromSegmentsDispatcher.SetResetMapId(segmentId))
    },
    toggleId(userId: string) {
      store.dispatch(new fromQueryDispatcher.TogglePlacelineId(userId))
    }
  };
  let methods = {

  };

  let usersFunctions = {
    selectors,
    dispatchers,
    methods
  };
  return {
    ...<HUsersItem>(HItemFactory(api$, store, usersFunctions, overrideEntityState, innerConfig)),
    dispatchers,
    selectors
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