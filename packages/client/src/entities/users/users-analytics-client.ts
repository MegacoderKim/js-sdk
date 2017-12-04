import * as fromRoot from "../../reducers";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
import {Observable} from "rxjs/Observable";
import * as fromQueryDispatcher from "../../dispatchers/query-dispatcher";
import {ApiStoreService} from "../../global/store-provider";
import {ListGetData} from "../../mixins/get-data";
import {IUserAnalyticsPage} from "ht-models";
import {ListQuery} from "../../mixins/entity-query";
import {ClientSub} from "../../mixins/client-subscription";
import {applyMixins} from "../../helpers/mix";
import {EntityListClient} from "../../base/list-client";
import {PageResults$} from "ht-data";
import {entityApi} from "../../global/entity-api";
import {IPageClientConfig} from "../../interfaces";
import {Page} from "ht-models";

export class UsersAnalyticsClient extends EntityListClient{
  // updateStrategy = 'update';
  api$ = (query): Observable<IUserAnalyticsPage> => entityApi.users.analytics(query);
  name = 'users analytics list';
  defaultQuery = {ordering: '-last_heartbeat_at'};
  allowedQueryKeys = null;
  // active$ = store.select(fromRoot.getUsersAnalyticsIsActive);
  data$: Observable<Page<IUserAnalyticsPage>>;
  dataArray$: Observable<IUserAnalyticsPage[] | null>;
  id$: Observable<string | null>;
  loading$: Observable<boolean | string>;
  store;

  constructor({dateRangeQuery$, store}: IPageClientConfig) {
    super();
    this.dateRangeQuery$ = dateRangeQuery$;
    this.store = store;
    this.query$ = this.store.select(fromRoot.getUsersListQuery) as Observable<object | null>;
    this.active$ = this.store.select(fromRoot.getUsersAnalyticsIsActive);
    this.data$ = this.store.select(fromRoot.getUsersAnalyticsPage);
    this.id$ = this.store.select(fromRoot.getUsersListId);
    this.loading$ = this.store.select(fromRoot.getUsersAnalyticsLoading);
    this.dataArray$ = this.data$.let(PageResults$);
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
    this.store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsLoading(data))
  };

  setData(data) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsPage(data))
  };


  setActive(isActive: boolean = true){
    this.store.dispatch(new fromUsersDispatcher.SetListActive(isActive))
  }

  get apiQuery$() {
    return this.getApiQuery$();
  }

  setQuery(query = {}) {
    this.store.dispatch(new fromUsersDispatcher.AddListQuery(query))
  };
  setQueryReset(query) {
    this.store.dispatch(new fromUsersDispatcher.AddListQuery({...query, page: null}))
  };
  clearQueryKey(key: string) {
    this.store.dispatch(new fromUsersDispatcher.AddListQuery({[key]: null}))
  };
  toggleId(userId: string) {
    this.store.dispatch(new fromUsersDispatcher.ToggleUsersListId(userId))
  };
  setId(userId: string | null) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersListId(userId))
  }
};

applyMixins(UsersAnalyticsClient, [ListGetData, ListQuery, ClientSub]);
