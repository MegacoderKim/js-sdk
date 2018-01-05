// import {Store} from "../../store/store";
// import * as fromRoot from "../../reducers"
// import {Observable} from "rxjs/Observable";
// import {ApiType} from "../../interfaces";
// import * as fromQueryDispatcher from "../../dispatchers/query-dispatcher"
// import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
// import {UsersAnalytics} from "./users-analytics-interfaces";
// import {UsersIndex} from "./users-index-interfaces";
// import {Subscription} from "rxjs/Subscription";
// import { combineLatest } from 'rxjs/observable/combineLatest';
// export class UsersList {
//   constructor(
//     public store: Store<fromRoot.State>,
//     private usersIndexClient,
//     private usersAnalyticsClient
//   ) {
//
//   }
//
//   get active$(): Observable<boolean> {
//     return this.getClient().switchMap((client) => {
//       return client.active$
//     })
//   }
//
//   get id$() {
//     return this.store.select(fromRoot.getQueryUserId)
//   }
//
//   get data$() {
//     return this.getClient().switchMap((client) => {
//       return client.data$
//     })
//   }
//
//   get loading$() {
//     const listLoading = this.getClient().switchMap((client) => {
//       return client.loading$
//     });
//     const summaryLoadingState$ = this.store.select(fromRoot.getLoadingUserSummary);
//
//     const summaryActive = this.store.select(fromRoot.getUsersSummaryActive);
//
//     const summaryLoading$ = combineLatest(
//       summaryActive,
//       summaryLoadingState$,
//       (summaryActive, summaryLoading) => summaryActive && summaryLoading
//     );
//
//     return combineLatest(
//       listLoading,
//       summaryLoading$,
//       (listLoading, summaryLoading) => listLoading || summaryLoading
//     )
//   }
//
//   get query$() {
//     return this.getClient().switchMap((client) => {
//       return client.query$
//     })
//   }
//
//   get dataArray$() {
//     return this.data$.map((dataPage) => {
//       return dataPage ? dataPage['results'] : null
//     })
//   }
//
//   get apiType() {
//     return this.store.select(fromRoot.getUsersListApiType)
//   }
//
//   getApiQuery$() {
//     return this.getClient().switchMap((client) => {
//       return client.apiQuery$().map(data => {
//         return data ? data[0] : data;
//       })
//     })
//   }
//
//   updateSelectedId(id: string | null) {
//     this.store.dispatch(new fromQueryDispatcher.SetUserId(id))
//   }
//
//   updateQuery(query: object) {
//     this.store.dispatch(new fromQueryDispatcher.SetUserQuery(query))
//   }
//
//   updateQueryResetPage(query: object) {
//     this.store.dispatch(new fromQueryDispatcher.SetUserQueryResetPage(query))
//   }
//
//   clearQueryKey(key: string) {
//     this.store.dispatch(new fromQueryDispatcher.ClearUserQueryKey(key))
//   }
//
//   setId(userId: string | null) {
//     this.store.dispatch(new fromQueryDispatcher.SetUserId(userId))
//   }
//
//   toggleId(userId: string) {
//     this.store.dispatch(new fromQueryDispatcher.ToggleUserId(userId))
//   }
//
//   setApiType(apiType: ApiType) {
//     this.store.dispatch(new fromUsersDispatcher.SetUsersListApiType(apiType))
//   }
//
//   setActive(isActive) {
//     this.store.dispatch(new fromUsersDispatcher.SetListActive(isActive))
//   }
//
//   setLive(isLive: boolean) {
//     return this.getClient().subscribe((client) => {
//       // client.isLive = isLive;
//     })
//   }
//
//   protected getForApiType(apiType: ApiType) {
//     return apiType === ApiType.index ? this.usersIndexClient : this.usersAnalyticsClient
//   }
//
//   protected getClient() {
//     return this.apiType.map((type) => this.getForApiType(type))
//   }
// }
