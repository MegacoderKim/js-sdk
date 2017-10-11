import {Store} from "../../store/store";
import * as fromRoot from "../../reducers"
import {Observable} from "rxjs/Observable";
import {HtUsersIndexClient} from "./users-index-client";
import {HtUsersAnalytics} from "./users-analytics-client";
import {ApiType} from "../../interfaces";
import {IUserAnalyticsPage, IUserPage, IUserAnalytics, IUser} from "ht-models";
import {HtListClient} from "../../base/list-client";
import {HtUsersApi} from "../../api/users";
import * as fromQueryDispatcher from "../../dispatchers/query-dispatcher"
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import {Subscription} from "rxjs/Subscription";
import {UsersAnalytics} from "./users-analytics-interfaces";
import {UsersIndex} from "./users-index-interfaces";

export class UsersList {
  constructor(
    public store: Store<fromRoot.State>,
    private usersIndexClient: UsersIndex,
    private usersAnalyticsClient: UsersAnalytics
  ) {

  }

  get active$(): Observable<boolean> {
    return this.getClient().switchMap((client) => {
      return client.selectors.active$
    })
  }

  get id$() {
    return this.store.select(fromRoot.getQueryUserId)
  }

  get data$() {
    return this.getClient().switchMap((client) => {
      return client.selectors.data$
    })
  }

  get loading$() {
    const listLoading = this.getClient().switchMap((client) => {
      return client.selectors.loading$
    });
    const summaryLoadingState$ = this.store.select(fromRoot.getLoadingUserSummary);

    const summaryActive = this.store.select(fromRoot.getUsersSummaryActive);

    const summaryLoading$ = Observable.combineLatest(
      summaryActive,
      summaryLoadingState$,
      (summaryActive, summaryLoading) => summaryActive && summaryLoading
    );

    return Observable.combineLatest(
      listLoading,
      summaryLoading$,
      (listLoading, summaryLoading) => listLoading || summaryLoading
    )
  }

  get query$() {
    return this.getClient().switchMap((client) => {
      return client.selectors.query$
    })
  }

  get dataArray$() {
    return this.data$.map((dataPage) => {
      return dataPage ? dataPage['results'] : null
    })
  }

  get apiType() {
    return this.store.select(fromRoot.getUsersListApiType)
  }

  getApiQuery$() {
    return this.getClient().switchMap((client) => {
      return client.selectors.apiQuery$.map(data => {
        return data ? data[0] : data;
      })
    })
  }

  updateSelectedId(id: string | null) {
    this.store.dispatch(new fromQueryDispatcher.SetUserId(id))
  }

  updateQuery(query: object) {
    this.store.dispatch(new fromQueryDispatcher.SetUserQuery(query))
  }

  updateQueryResetPage(query: object) {
    this.store.dispatch(new fromQueryDispatcher.SetUserQueryResetPage(query))
  }

  clearQueryKey(key: string) {
    this.store.dispatch(new fromQueryDispatcher.ClearUserQueryKey(key))
  }

  setId(userId: string | null) {
    this.store.dispatch(new fromQueryDispatcher.SetUserId(userId))
  }

  toggleId(userId: string) {
    this.store.dispatch(new fromQueryDispatcher.ToggleUserId(userId))
  }

  setApiType(apiType: ApiType) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersListApiType(apiType))
  }

  setActive(isActive) {
    this.store.dispatch(new fromUsersDispatcher.SetListActive(isActive))
  }

  setLive(isLive: boolean) {
    return this.getClient().subscribe((client) => {
      // client.isLive = isLive;
    })
  }

  protected getForApiType(apiType: ApiType) {
    return apiType === ApiType.index ? this.usersIndexClient : this.usersAnalyticsClient
  }

  protected getClient() {
    return this.apiType.map((type) => this.getForApiType(type))
  }
}