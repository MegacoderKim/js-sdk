import {IUserAnalytics, Page, AllData} from "ht-models"
import { ApiType, IPageClientConfig} from "../../interfaces";
import * as fromRoot from "../../reducers";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import {Observable} from "rxjs/Observable";
import {EntityAllItemsClient} from "../../base/all-items.client";
import {htUser} from "ht-data";
import {getAllPageDataMixin} from "../../mixins/get-data";
import { listQueryMixin} from "../../mixins/entity-query";
import {clientSubMixin} from "../../mixins/client-subscription";
import {empty} from "rxjs/observable/empty";
import {entityApi} from "../../global/entity-api";
import {Subscription} from "rxjs/Subscription";
import {getFirstDataMixin} from "../../mixins/get-first-data";

export class UsersAnalyticsListAll extends EntityAllItemsClient {

  data$: Observable<Page<IUserAnalytics>>;
  loading$: Observable<boolean>;
  id$ = empty();
  allowedQueryKeys = ['status'];
  name = 'users analytics all';
  api$ = (query) => entityApi.users.all$(query, ApiType.analytics);
  defaultQuery = {};
  store;
  dataArray$;
  dataEntities$: Observable<AllData<any>>;

  constructor({dateRangeQuery$, store}: IPageClientConfig) {
    super();
    this.dateRangeQuery$ = dateRangeQuery$;
    this.store = store;
    this.query$ = this.store.select(fromRoot.getUsersListQuery) as Observable<object | null>;
    this.active$ = this.store.select(fromRoot.getUsersAnalyticsMarkersIsActive);
    this.dataEntities$ = this.store.select(fromRoot.getUsersAnalyticsFilteredMarker);
    // this.id$ = this.store.select(fromRoot.getQueryUserId);
    this.loading$ = this.store.select(fromRoot.getUsersAnalyticsAllLoading);
    // this.dataArray$ = this.data$.let(PageResults$);
    // this.init()
  }

  getDefaultQuery() {
    return {...super.getDefaultQuery(), ...this.defaultQuery}
    // return {...this.defaultQuery}
  }

  firstDataEffect(data) {
    if(!data.next) this.setLoading(false);
  }

  setActive(isActive: boolean = true) {
    this.store.dispatch(new fromUsersDispatcher.SetMarkersActive(isActive))
  };

  setData(data: Page<IUserAnalytics>) {
    data = data || {results: [], next: "no_next"};
    this.store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsAll(data))
  };
  setLoading(data) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsAllLoading(data))
  };

  setDataMap(mapFunc) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersMarkersDataMap(mapFunc))
  };

  isValidMarker(marker) {
    return htUser(marker).isValidMarker();
  }
}
export const UsersAnalyticsListAllClient = clientSubMixin(getAllPageDataMixin(getFirstDataMixin(listQueryMixin(UsersAnalyticsListAll))));
