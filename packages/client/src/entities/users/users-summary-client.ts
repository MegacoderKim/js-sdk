import * as fromRoot from "../../reducers";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
import {Observable} from "rxjs/Observable";
import {store} from "../../store-provider";
import {EntityListClient} from "../../base/list-client";
import {ClientSub} from "../base/client-factory";
import {ListQuery} from "../helpers/api-query-factory";
import {ListGetData} from "../helpers/get-data-factory";
import {applyMixins} from "../helpers/mix";
import {entityApi} from "../../global/entity-api";

export class UsersSummaryClient extends EntityListClient {
  name = 'users summary';
  defaultQuery = {page_size: null};
  updateStrategy = 'live';
  allowedQueryKeys = [];
  active$ = store.select(fromRoot.getUsersSummaryActive);
  query$ = <Observable<object>>(store.select(fromRoot.getQueryUserQuery));
  data$ = store.select(fromRoot.getUsersSummary);
  loading$ = store.select(fromRoot.getLoadingUserSummary);

  api$ = (query) => entityApi.users.summary(query);

  setActive(isActive: boolean = true) {
    store.dispatch(new fromUsersDispatcher.SetSummaryActive(isActive))
  };
  setData(usersSummary) {
    store.dispatch(new fromUsersDispatcher.SetUsersSummary(usersSummary))
  };
  setLoading(data) {
    store.dispatch(new fromLoadingDispatcher.SetLoadingUserSummary(data))
  };
  setQuery(query) {

  }

  constructor(public dateRangeQuery$: Observable<object> | null = null) {
    super();
    this.init()
  }
};

applyMixins(UsersSummaryClient, [ListGetData, ListQuery, ClientSub]);

// export const HtUsersSummaryFactory = ({dateRangeQuery$}): UsersSummary => {
//
//   let innerConfig: Partial<EntityTypeConfig> = {
//     name: 'users summary',
//     defaultQuery: {page_size: null},
//     updateStrategy: 'live',
//     allowedQueryKeys: []
//   };
//
//   let listSelectors: ListSelectors = {
//     active$: store.select(fromRoot.getUsersSummaryActive),
//     query$: <Observable<object>>(store.select(fromRoot.getQueryUserQuery)),
//     data$: store.select(fromRoot.getUsersSummary),
//     loading$: store.select(fromRoot.getLoadingUserSummary)
//   };
//
//   let dispatchers: ListDispatchers = {
//     setActive(isActive: boolean = true) {
//       store.dispatch(new fromUsersDispatcher.SetSummaryActive(isActive))
//     },
//     setData(usersSummary) {
//       store.dispatch(new fromUsersDispatcher.SetUsersSummary(usersSummary))
//     },
//     setLoading(data) {
//       store.dispatch(new fromLoadingDispatcher.SetLoadingUserSummary(data))
//     },
//     setQuery(query) {
//
//     }
//   };
//
//   let api$ = (query) => clientApi.users.summary(query);
//
//   let state = {
//     api$,
//     selectors: {
//       ...listSelectors,
//       dateRangeQuery$
//     },
//     dispatchers: {
//       ...dispatchers
//     }
//   };
//
//   let userSummary = entityClientFactory(state, innerConfig, 'list');
//   userSummary.init();
//   return userSummary;
//
// };