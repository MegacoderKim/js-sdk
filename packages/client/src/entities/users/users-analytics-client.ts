import * as fromRoot from "../../reducers";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
import {UsersAnalytics} from "./users-analytics-interfaces";
import {ListDispatchers, ListSelectors} from "../base/interfaces";
import {Observable} from "rxjs/Observable";
import * as fromQueryDispatcher from "../../dispatchers/query-dispatcher";
import {clientApi} from "../../client-api";
import {entityClientFactory} from "../base/entity-factory";
import {store} from "../../store-provider";

export const UsersAnalyticsClientFactory = ({dateRangeQuery$}): UsersAnalytics => {
  let innerConfig = {
    name: 'users analytics test',
    updateStrategy: 'update',
    defaultQuery: {ordering: '-last_heartbeat_at'},
  };

  let selectors: ListSelectors = {
    query$: store.select(fromRoot.getQueryUserQuery) as Observable<object | null>,
    data$: store.select(fromRoot.getUsersAnalyticsPage),
    active$: store.select(fromRoot.getUsersAnalyticsIsActive),
    loading$: store.select(fromRoot.getLoadingAnalytics),
    id$: store.select(fromRoot.getQueryUserId)
  };

  let dispatchers: ListDispatchers = {
    setData(data) {
      store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsPage(data))
    },
    setLoading(data) {
      store.dispatch(new fromLoadingDispatcher.SetLoadingUserAnalytics(data))
    },
    setActive(isActive: boolean = true){
      store.dispatch(new fromUsersDispatcher.SetListActive(isActive))
    },
    setQuery(query = {}) {
      store.dispatch(new fromQueryDispatcher.SetUserQuery(query))
    },
    setQueryReset(query) {
      store.dispatch(new fromQueryDispatcher.SetUserQueryResetPage(query))
    },
    clearQueryKey(key: string) {
      store.dispatch(new fromQueryDispatcher.ClearUserQueryKey(key))
    },
    toggleId(userId: string) {
      store.dispatch(new fromQueryDispatcher.ToggleUserId(userId))
    },
    setId(userId: string | null) {
      store.dispatch(new fromQueryDispatcher.SetUserId(userId))
    }
  };

  let api$ = (query) => clientApi.users.analytics(query);

  let state = {
    api$,
    selectors: {
      ...selectors,
      dateRangeQuery$
    },
    dispatchers: {
      ...dispatchers,
    }
  };
  let user = entityClientFactory(state, innerConfig, 'list') as UsersAnalytics;
  user.init();
  return user

  // let entityList = HListFactory(entityListState, innerConfig);
  //
  // // return {
  // //   ...entityList,
  // //   dispatchers,
  // //   selectors: {...selectors, ...entityList.selectors}
  // // }
  // return {
  //   ...entityList,
  //   ...dispatchers,
  //   ...selectors,
  //   apiQuery$() {
  //     return Observable.empty()
  //   }
  // }
};