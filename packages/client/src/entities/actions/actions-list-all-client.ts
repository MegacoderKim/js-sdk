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

export class ActionsIndexAll extends EntityAllItemsClient {
  dataBehaviour$: BehaviorSubject<AllData<IAction> | null> = new BehaviorSubject(null);
  loadingBehaviour$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingBehaviour$.asObservable();
  activeBehaviour$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  query$: BehaviorSubject<object>;
  api$: (query) => Observable<Page<IAction>>;
  dataSub: Subscription;
  dataEntities$;
  dateParam: string;
  filterBehviour$: BehaviorSubject<(action: any) => any | null> = new BehaviorSubject(null);
  filter$ = this.filterBehviour$.asObservable();
  constructor({ dateRange, store, dateParam, api }: IPageClientConfig<HtActionsApi>) {
    super();
    this.api$ = (query) => api.allPages(api.index(query));
    this.dateRange = dateRange;
    this.dateParam = dateParam;
    this.query$ = new BehaviorSubject(this.getDefaultQuery());
    this.active$ = this.activeBehaviour$.asObservable();
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
    this.activeBehaviour$.next(isActive)
  }

  setQuery(query) {
    this.query$.next(query)
  }

  get data$() {
    return this.dataBehaviour$.asObservable()
  }
  addData(data) {
    this.dataBehaviour$.next(data)
  };

  setData(data) {
    this.dataBehaviour$.next(data)
  }

  setLoading(loading) {
    this.loadingBehaviour$.next(loading);
  }
  clearQueryKey(key: string) {
    let query = {...this.query$.getValue()};
    delete query[key];
    this.query$.next(query);
  }
  setDataMap(mapFunc) {
    this.filterBehviour$.next(mapFunc)
  }

  clearData() {
    this.setActive(false);
    this.setData(null);
  }
};

export const ActionsIndexAllClient = listAllClientSubMixin(
  getAllPageDataMixin(getFirstDataMixin(listQueryMixin(ActionsIndexAll)))
);