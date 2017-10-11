import {UsersList} from "./users-list";
import {HtUsersIndexClient} from "./users-index-client";
import {Observable} from "rxjs/Observable";
import {ApiType} from "../../interfaces";
import * as fromRoot from "../../reducers";
import {Store} from "../../store/store";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import {IUserListSummary} from "ht-models"
import {UsersSummary, UsersSummaryFactory} from "./users-summary-interface";
import {
  EntityListSelectors, EntityListState, EntityTypeConfig, ListDispatchers,
  ListSelectors
} from "../base/interfaces";
import {Partial} from "ht-models";
import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
import {HListFactory} from "../base/list-client";

export class HtUsersSummaryClient extends HtUsersIndexClient {

  toUpdate = true;
  allowedQueryKeys = [
    'search',
    'show_all'
  ];
  isLive = true;
  get isActive$(): Observable<boolean> {
    return this.store.select(fromRoot.getUsersSummaryActive)
  }

  get data$(): Observable<any> {
    return this.store.select(fromRoot.getUsersSummary)
  }

  get loading$() {
    return this.store.select(fromRoot.getLoadingUserSummary)
  }

  getDefaultQuery() {
    return {}
  }

  setActive(isActive: boolean = true) {
    this.store.dispatch(new fromUsersDispatcher.SetSummaryActive(isActive))
  }

  setData(usersSummary) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersSummary(usersSummary))
  }
}

export const HtUsersSummaryFactory: UsersSummaryFactory = (state: EntityListState, config: Partial<EntityTypeConfig>): UsersSummary => {

  let innerConfig: Partial<EntityTypeConfig> = {
    name: 'users summary',
    defaultQuery: {},
    updateStrategy: 'live',
    ...config
  };

  let {api$, store, dateRangeQuery$, dateRangeParam} = state;

  let listSelectors: ListSelectors = {
    active$: store.select(fromRoot.getUsersSummaryActive),
    query$: store.select(fromRoot.getQueryUserQuery),
    data$: store.select(fromRoot.getUsersSummary),
    loading$: store.select(fromRoot.getLoadingUserSummary)
  };

  let dispatchers: ListDispatchers = {
    setActive(isActive: boolean = true) {
      store.dispatch(new fromUsersDispatcher.SetSummaryActive(isActive))
    },
    setData(usersSummary) {
      store.dispatch(new fromUsersDispatcher.SetUsersSummary(usersSummary))
    },
    setLoading(data) {
      store.dispatch(new fromLoadingDispatcher.SetLoadingUserSummary(data))
    }
  };

  let entityListState: EntityListState = {
    selectors: listSelectors,
    dispatchers,
    store,
    api$,
    dateRangeQuery$,
    dateRangeParam,
    firstDataEffect: (data) => dispatchers.setLoading(false),
    allowedQueryKeys: [
      'search',
      'show_all'
    ]
  };

  let entityList = HListFactory(entityListState, innerConfig);

  return {
    ...entityList
  }
};