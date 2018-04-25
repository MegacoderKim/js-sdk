import {getFirstDataMixin} from "../../mixins/get-first-data";
import {listQueryMixin} from "../../mixins/entity-query";
import {listAllClientSubMixin} from "../../mixins/list-all-client-sub";
import {getAllPageDataMixin, getQueryDataMixin} from "../../mixins/get-data";
import {clientSubMixin} from "../../mixins/client-subscription";
import {Observable} from "rxjs/Observable";
import {IActionStatusGraph} from "ht-models";
import {IAllowedQueryMap} from "ht-data";
import {Subscription} from "rxjs/Subscription";
import {IPageClientConfig} from "../../interfaces";
import {HtActionsApi} from "ht-api";
import {DateRange} from "../../global/date-range";
import * as fromAction from "../../dispatchers/actions-dispatcher"
import * as fromRoot from "../../reducers";

export class ActionsGraph {
  query$: Observable<object>;
  data$: Observable<IActionStatusGraph[] | null>;
  active$: Observable<boolean>;
  loading$: Observable<boolean>;
  api$: (query) => Observable<IActionStatusGraph[]>;
  updateStrategy = "once";
  pollDuration = 10000;
    dateRange: DateRange;
  dataSub: Subscription;
  dateParam: string;
  store;
  constructor({ dateRange, store, dateParam, api }: IPageClientConfig<HtActionsApi>) {
    this.store = store;
    this.query$ = store.select(fromRoot.getActionsGraphQuery) as Observable<
      object | null
      >;
    this.active$ = this.store.select(fromRoot.getActionsGraphActive);
    this.loading$ = store.select(fromRoot.getActionsGraphLoading);
    this.data$ = store.select(fromRoot.getActionsGraph);
    this.api$ = (query) => api.graph(query);
    this.dateRange = dateRange;
    this.dateParam = dateParam;
  }

  setActive(active: boolean = true) {
    this.store.dispatch(new fromAction.SetGraphActive(active));
  }

  setQuery() {

  }

  getDefaultQuery() {
    return {}
  };

  setData(data) {
    this.store.dispatch(new fromAction.SetGraph(data));
  }

  firstDataEffect() {
    this.setLoading(false);
  }

  setLoading(loading: boolean | string = true) {
    this.store.dispatch(new fromAction.SetGraphLoading(!!loading));
  }

  clearData() {
    this.setData(null);
  }

  destroy() {
    this.clearData();
    this.dataSub.unsubscribe();
  }

}

export const ActionsGraphClient = clientSubMixin(
  getQueryDataMixin(getFirstDataMixin(listQueryMixin(ActionsGraph)))
);