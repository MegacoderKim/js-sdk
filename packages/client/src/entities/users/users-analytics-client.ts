import * as fromRoot from "../../reducers";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
import {Observable} from "rxjs/Observable";
import * as fromQueryDispatcher from "../../dispatchers/query-dispatcher";
import {store} from "../../global/store-provider";
import {ListGetData} from "../../mixins/get-data";
import {IUserAnalyticsPage} from "ht-models";
import {ListQuery} from "../../mixins/entity-query";
import {ClientSub} from "../../mixins/client-subscription";
import {applyMixins} from "../../helpers/mix";
import {EntityListClient} from "../../base/list-client";
import {PageResults} from "../../helpers/operators";
import {entityApi} from "../../global/entity-api";

export class UsersAnalyticsClient extends EntityListClient{
  // updateStrategy = 'update';
  api$ = (query): Observable<IUserAnalyticsPage> => entityApi.users.analytics(query);
  name = 'users analytics list';
  query$ = store.select(fromRoot.getQueryUserQuery) as Observable<object | null>;
  defaultQuery = {ordering: '-last_heartbeat_at'};
  allowedQueryKeys = null;
  active$ = store.select(fromRoot.getUsersAnalyticsIsActive);
  data$ = store.select(fromRoot.getUsersAnalyticsPage);
  id$ = store.select(fromRoot.getQueryUserId);
  dataArray$ = this.data$.let(PageResults);
  loading$ = store.select(fromRoot.getLoadingAnalytics);

  constructor(public dateRangeQuery$: Observable<object> | null = null) {
    super();
    this.init()
  }

  getDefaultQuery() {
    return {...super.getDefaultQuery(), ...this.defaultQuery}
    // return {...this.defaultQuery}
  }

  firstDataEffect() {
    this.setLoading(false)
  }

  setLoading(data) {
    store.dispatch(new fromLoadingDispatcher.SetLoadingUserAnalytics(data))
  };

  setData(data) {
    store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsPage(data))
  };


  setActive(isActive: boolean = true){
    store.dispatch(new fromUsersDispatcher.SetListActive(isActive))
  }

  get apiQuery$() {
    return this.getApiQuery$();
  }

  setQuery(query = {}) {
    store.dispatch(new fromQueryDispatcher.SetUserQuery(query))
  };
  setQueryReset(query) {
    store.dispatch(new fromQueryDispatcher.SetUserQueryResetPage(query))
  };
  clearQueryKey(key: string) {
    store.dispatch(new fromQueryDispatcher.ClearUserQueryKey(key))
  };
  toggleId(userId: string) {
    store.dispatch(new fromQueryDispatcher.ToggleUserId(userId))
  };
  setId(userId: string | null) {
    store.dispatch(new fromQueryDispatcher.SetUserId(userId))
  }
};

applyMixins(UsersAnalyticsClient, [ListGetData, ListQuery, ClientSub]);
