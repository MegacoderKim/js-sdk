import * as fromRoot from "../../reducers";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import {Partial} from "ht-models"
import {UsersSummary, UsersSummaryFactory} from "./users-summary-interface";
import {EntityListState, EntityTypeConfig, ListDispatchers, ListSelectors} from "../base/interfaces";
import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
import {HListFactory} from "../base/list-client";

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
    ...entityList,
    dispatchers,
    selectors: {...listSelectors, ...entityList.selectors}
  }
};