import {IUserAnalytics} from "ht-models"
import {AllData, ApiType, IPageClientConfig} from "../../interfaces";
import * as fromRoot from "../../reducers";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
import {Observable} from "rxjs/Observable";
import * as fromQueryDispatcher from "../../dispatchers/query-dispatcher";
import {ApiStoreService} from "../../global/store-provider";
import {EntityAllItemsClient} from "../../base/all-items.client";
import {htUser} from "ht-data";
import {ListGetData} from "../../mixins/get-data";
import {ListQuery} from "../../mixins/entity-query";
import {ClientSub} from "../../mixins/client-subscription";
import {applyMixins} from "../../helpers/mix";
import {empty} from "rxjs/observable/empty";
import {entityApi} from "../../global/entity-api";
import {PageResults$} from "ht-data";

export class UsersAnalyticsListAllClient extends EntityAllItemsClient {
  // active$ = store.select(fromRoot.getUsersAnalyticsMarkersIsActive);
  // query$ = store.select(fromRoot.getQueryUserQuery) as Observable<object | null>;
  // data$ = store.select(fromRoot.getUsersAnalyticsFilteredMarker);
  // loading$ = store.select(fromRoot.getLoadingUserAnalyticsAll);

  // active$ = store.select(fromRoot.getUsersAnalyticsMarkersIsActive);
  // query$ = store.select(fromRoot.getQueryUserQuery) as Observable<object | null>;
  data$: Observable<AllData<IUserAnalytics>>;
  loading$: Observable<boolean>;
  id$ = empty();
  allowedQueryKeys = ['status'];
  name = 'users analytics all';
  api$ = (query) => entityApi.users.all$(query, ApiType.analytics);
  defaultQuery = {};
  // constructor(public dateRangeQuery$: Observable<object> | null = null) {
  //   super();
  //   this.init()
  // }
  store;
  dataArray$;

  constructor({dateRangeQuery$, store}: IPageClientConfig) {
    super();
    this.dateRangeQuery$ = dateRangeQuery$;
    this.store = store;
    this.query$ = this.store.select(fromRoot.getQueryUserQuery) as Observable<object | null>;
    this.active$ = this.store.select(fromRoot.getUsersAnalyticsMarkersIsActive);
    this.data$ = this.store.select(fromRoot.getUsersAnalyticsFilteredMarker);
    // this.id$ = this.store.select(fromRoot.getQueryUserId);
    this.loading$ = this.store.select(fromRoot.getLoadingUserAnalyticsAll);
    // this.dataArray$ = this.data$.let(PageResults$);
    this.init()
  }

  getDefaultQuery() {
    return {...super.getDefaultQuery(), ...this.defaultQuery}
    // return {...this.defaultQuery}
  }

  setActive(isActive: boolean = true) {
    this.store.dispatch(new fromUsersDispatcher.SetMarkersActive(isActive))
  };
  setData(data: AllData<IUserAnalytics>) {
    data = data || {resultsEntity: {}, isFirst: false, next: "no_next"};
    this.store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsAll(data))
  };
  setLoading(data) {
    this.store.dispatch(new fromLoadingDispatcher.SetLoadingUserAnalyticsAll(data))
  };
  setQuery(query = {}) {
    this.store.dispatch(new fromQueryDispatcher.SetUserQuery(query))
  };
  setDataMap(mapFunc) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersMarkersDataMap(mapFunc))
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