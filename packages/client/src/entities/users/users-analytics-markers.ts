import {IUserAnalytics} from "ht-models"
import {AllData, ApiType} from "../../interfaces";
import * as fromRoot from "../../reducers";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
import {Observable} from "rxjs/Observable";
import * as fromQueryDispatcher from "../../dispatchers/query-dispatcher";
import {store} from "../../global/store-provider";
import {EntityAllItemsClient} from "../../base/all-items.client";
import {htUser} from "ht-data";
import {ListGetData} from "../helpers/get-data-factory";
import {ListQuery} from "../helpers/api-query-factory";
import {ClientSub} from "../base/client-factory";
import {applyMixins} from "../helpers/mix";
import {empty} from "rxjs/observable/empty";
import {entityApi} from "../../global/entity-api";

export class UsersAnalyticsListAllClient extends EntityAllItemsClient {
  active$ = store.select(fromRoot.getUsersAnalyticsMarkersIsActive);
  query$ = store.select(fromRoot.getQueryUserQuery) as Observable<object | null>;
  data$ = store.select(fromRoot.getUsersAnalyticsFilteredMarker);
  loading$ = store.select(fromRoot.getLoadingUserAnalyticsAll);
  id$ = empty();
  allowedQueryKeys = ['status'];
  name = 'users analytics all';
  api$ = (query) => entityApi.users.all$(query, ApiType.analytics);
  defaultQuery = {};
  constructor(public dateRangeQuery$: Observable<object> | null = null) {
    super();
    this.init()
  }

  getDefaultQuery() {
    return {...super.getDefaultQuery(), ...this.defaultQuery}
    // return {...this.defaultQuery}
  }

  setActive(isActive: boolean = true) {
    store.dispatch(new fromUsersDispatcher.SetMarkersActive(isActive))
  };
  setData(data: AllData<IUserAnalytics>) {
    data = data || {resultsEntity: {}, isFirst: false, next: "no_next"};
    store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsAll(data))
  };
  setLoading(data) {
    store.dispatch(new fromLoadingDispatcher.SetLoadingUserAnalyticsAll(data))
  };
  setQuery(query = {}) {
    store.dispatch(new fromQueryDispatcher.SetUserQuery(query))
  };
  setDataMap(mapFunc) {
    store.dispatch(new fromUsersDispatcher.SetUsersMarkersDataMap(mapFunc))
  };

  isValidMarker(marker) {
    return htUser(marker).isValidMarker();
  }
}

applyMixins(UsersAnalyticsListAllClient, [ListGetData, ListQuery, ClientSub]);

// export const usersAnalyticsMarkersFactory = ({dateRangeQuery$}): IUsersMarkers => {
//
//   let innerConfig: Partial<EntityTypeConfig> = {
//     name: 'users analytics all',
//     // defaultQuery: {page_size: 200},
//     // updateStrategy: 'once',
//     allowedQueryKeys: ['status']
//   };
//
//   innerConfig = AllItemsHelpers.getConfig(innerConfig);
//
//   let listDispatcher = {
//     setActive(isActive: boolean = true) {
//       store.dispatch(new fromUsersDispatcher.SetMarkersActive(isActive))
//     },
//     setData(data: AllData<IUserAnalytics>) {
//       data = data || {resultsEntity: {}, isFirst: false, next: "no_next"};
//       store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsAll(data))
//     },
//     setLoading(data) {
//       store.dispatch(new fromLoadingDispatcher.SetLoadingUserAnalyticsAll(data))
//     },
//     setQuery(query = {}) {
//       store.dispatch(new fromQueryDispatcher.SetUserQuery(query))
//     },
//     setDataMap(mapFunc) {
//       store.dispatch(new fromUsersDispatcher.SetUsersMarkersDataMap(mapFunc))
//     },
//     firstDataEffect(data) {
//       if(!data.next) {
//         this.setLoading(false)
//       }
//     },
//   };
//
//   let indexMarkersDispatchers: AddUsersMarkersDispatchers = {
//     setDataMap(mapFunc) {
//       store.dispatch(new fromUsersDispatcher.SetUsersMarkersDataMap(mapFunc))
//     }
//   };
//
//   let listSelectors: ListSelectors = {
//     active$: store.select(fromRoot.getUsersAnalyticsMarkersIsActive),
//     query$: store.select(fromRoot.getQueryUserQuery) as Observable<object | null>,
//     data$: store.select(fromRoot.getUsersAnalyticsFilteredMarker),
//     loading$: store.select(fromRoot.getLoadingUserAnalyticsAll),
//     id$: Observable.empty()
//   };
//
//   let allSelectors = AllItemsHelpers.getSelectors(listSelectors);
//
//   let api$ = (query) => clientApi.users.all$(query, ApiType.analytics);
//
//   let state = {
//     api$,
//     selectors: {
//       ...listSelectors,
//       ...allSelectors,
//       dateRangeQuery$
//     },
//     dispatchers: {
//       ...listDispatcher,
//       ...indexMarkersDispatchers
//     }
//   };
//
//   const usersAnalytics = entityClientFactory(state, innerConfig, 'list') as IUsersMarkers;
//
//   usersAnalytics.init();
//
//   return usersAnalytics;
//
// };