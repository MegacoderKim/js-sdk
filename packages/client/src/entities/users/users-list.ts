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


export class UsersList {

  constructor(
    public store: Store<fromRoot.State>,
    private usersIndexClient: HtListClient<IUserPage | any, HtUsersApi>,
    private usersAnalyticsClient: HtListClient<IUserAnalyticsPage | any, HtUsersApi>
  ) {}

  get IsActive$(): Observable<boolean> {
    return this.getClient().switchMap((client) => {
      return client.isActive$
    })
  }

  get id$() {
    return this.store.select(fromRoot.getQueryUserId)
  }

  get data$() {
    return this.getClient().switchMap((client) => {
      return client.data$
    })
  }

  get loading$() {
    return this.getClient().switchMap((client) => {
      return client.loading$
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

  getDataQuery$() {
    return this.getClient().switchMap((client) => {
      return client.getDataQuery$()
    })
  }

  updateSelectedId(id: string | null) {
    this.store.dispatch(new fromQueryDispatcher.SetUserId(id))
  }

  updateQuery(query: object) {
    this.store.dispatch(new fromQueryDispatcher.SetUserQuery(query))
  }

  clearQueryKey(key: string) {
    this.store.dispatch(new fromQueryDispatcher.ClearUserQueryKey(key))
  }

  setId(userId: string | null) {
    this.store.dispatch(new fromQueryDispatcher.SetUserId(userId))
  }

  protected getForApiType(apiType: ApiType) {
    return apiType === ApiType.index ? this.usersIndexClient : this.usersAnalyticsClient
  }

  protected getClient() {
    return this.apiType.map((type) => this.getForApiType(type))
  }
}