import {listQueryMixin} from "../../mixins/entity-query";
import {getFirstDataMixin} from "../../mixins/get-first-data";
import {listAllClientSubMixin} from "../../mixins/list-all-client-sub";
import {getAllPageDataMixin} from "../../mixins/get-data";
import {EntityAllItemsClient} from "../../base/all-items.client";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {AllowedQueryMap, IAllowedQueryMap} from "ht-data";
import {IAction, AllData, Page} from "ht-models";
import {IPageClientConfig} from "../../interfaces";
import {DateRange} from "../../global/date-range";
import {HtActionsApi} from "ht-api";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import {getAnalyticsAll, getMarkerDataMap} from "../../reducers/user-reducer";
import {combineLatest} from "rxjs/observable/combineLatest";
import {map} from "rxjs/operators";
import * as fromRoot from "../../reducers";
import * as fromAction from "../../dispatchers/actions-dispatcher";

export class ActionsIndexAll extends EntityAllItemsClient {
  loading$: Observable<boolean>;
  query$: Observable<object>;
  api$: (query) => Observable<Page<IAction>>;
  dataSub: Subscription;
  dataEntities$;
  dateParam: string;
  store;
  constructor({ dateRange, store, dateParam, api }: IPageClientConfig<HtActionsApi>) {
    super();
    this.store = store;
    this.api$ = (query) => api.allPages(api.index(query));
    this.dateRange = dateRange;
    this.dateParam = dateParam;
    this.query$ = this.store.select(fromRoot.getActionsListQuery) as Observable<
      object | null
      >;
    this.dataEntities$ = this.store.select(fromRoot.getActionsListAllFiltered);
    this.active$ = this.store.select(fromRoot.getActionsListAllActive);
    this.loading$ = this.store.select(fromRoot.getActionsListAllLoading);
    // this.data$ = combineLatest(
    //   this.dataBehaviour$.asObservable(),
    //   this.filter$
    // ).pipe(
    //   map(([allData, filterFun]) => {
    //     console.log("alldata", allData);
    //     return filterFun && allData ? filterFun(allData) : allData
    //   })
    // )
  }

  setActive(isActive: boolean = true) {
    this.store.dispatch(new fromAction.SetListAllActive(isActive))
  }

  setQuery(query) {
    this.store.dispatch(new fromAction.SetListQuery(query))
  }

  addData(data) {
    this.store.dispatch(new fromAction.SetListAll(data))
  };

  setData(data) {
    this.store.dispatch(new fromAction.SetListAll(data))
  }

  setLoading(loading) {
    this.store.dispatch(new fromAction.SetListAllLoading(loading))
  }
  clearQueryKey(key: string) {
    this.store.dispatch(new fromAction.ClearQueryKey(key))
  }
  setDataMap(mapFunc) {
    this.store.dispatch(new fromAction.SetListAllDataMap(mapFunc))
  }

  clearData() {
    this.setActive(false);
    this.setData(null);
  }
};

export const ActionsIndexAllClient = listAllClientSubMixin(
  getAllPageDataMixin(getFirstDataMixin(listQueryMixin(ActionsIndexAll)))
);