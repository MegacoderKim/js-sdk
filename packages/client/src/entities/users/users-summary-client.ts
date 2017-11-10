import * as fromRoot from "../../reducers";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import {Partial} from "ht-models"
import {EntityTypeConfig, ListDispatchers, ListSelectors} from "../base/interfaces";
import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
import {Observable} from "rxjs/Observable";
import {store} from "../../store-provider";
import {clientApi} from "../../client-api";
import {entityClientFactory} from "../base/entity-factory";
import {UsersSummary} from "./users-summary-interface";

export const HtUsersSummaryFactory = ({dateRangeQuery$}): UsersSummary => {

  let innerConfig: Partial<EntityTypeConfig> = {
    name: 'users summary',
    defaultQuery: {page_size: null},
    updateStrategy: 'live',
    allowedQueryKeys: []
  };

  let listSelectors: ListSelectors = {
    active$: store.select(fromRoot.getUsersSummaryActive),
    query$: <Observable<object>>(store.select(fromRoot.getQueryUserQuery)),
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
    },
    setQuery(query) {

    }
  };

  let api$ = (query) => clientApi.users.summary(query);

  let state = {
    api$,
    selectors: {
      ...listSelectors,
      dateRangeQuery$
    },
    dispatchers: {
      ...dispatchers
    }
  };

  let userSummary = entityClientFactory(state, innerConfig, 'list');
  userSummary.init()
  return userSummary;

};