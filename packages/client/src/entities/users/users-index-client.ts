import {Observable} from "rxjs/Observable";
import {ApiType} from "../../interfaces";
import * as fromRoot from "../../reducers";
import {Store} from "../../store/store";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import {HListFactory} from "../base/list-client";
import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
import * as fromQueryDispatcher from "../../dispatchers/query-dispatcher";
import {UsersIndex, UsersIndexFactory} from "./users-index-interfaces";
import {EntityListState, EntityTypeConfig, ListDispatchers, ListSelectors} from "../base/interfaces";

export const UsersIndexClientFactory: UsersIndexFactory = (state: EntityListState, config: Partial<EntityTypeConfig> = {}): UsersIndex => {
  let innerConfig = {
    name: 'users analytics',
    defaultQuery: {ordering: '-last_heartbeat_at'},
    ...config
  };

  let {store} = state;

  let selectors: ListSelectors = {
    query$: store.select(fromRoot.getQueryUserQuery) as Observable<object | null>,
    data$: store.select(fromRoot.getUsersIndexPage),
    active$: store.select(fromRoot.getUsersIndexIsActive),
    loading$: store.select(fromRoot.getLoadingUserIndex)
  };

  let dispatchers: ListDispatchers = {
    setData(data) {
      store.dispatch(new fromUsersDispatcher.SetUsersIndexPage(data))
    },
    setLoading(data) {
      store.dispatch(new fromLoadingDispatcher.SetLoadingUserIndex(data))
    },
    setActive(isActive: boolean = true){
      store.dispatch(new fromUsersDispatcher.SetListActive(isActive))
    },
    setQuery(query = {}) {
      store.dispatch(new fromQueryDispatcher.SetUserQuery(query))
    }
  };

  let listState: EntityListState = {
    ...state,
    selectors,
    dispatchers,
    firstDataEffect(data) {
      dispatchers.setLoading(false)
    }
  };

  let entityList = HListFactory(listState, innerConfig);

  return {
    ...entityList,
    ...dispatchers,
    ...selectors,
    ...entityList.selectors
  }
};