import {getFirstDataMixin} from "../../mixins/get-first-data";
import {listQueryMixin} from "../../mixins/entity-query";
import {listAllClientSubMixin} from "../../mixins/list-all-client-sub";
import {getAllPageDataMixin, getQueryDataMixin} from "../../mixins/get-data";
import {clientSubMixin} from "../../mixins/client-subscription";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import {entityApi} from "../../global/entity-api";
import {IActionStatusGraph} from "ht-models";
import {IAllowedQueryMap} from "ht-data";
import {Subscription} from "rxjs/Subscription";
import {IPageClientConfig} from "../../interfaces";

export class ActionsGraph {
  query$: Observable<object> = of({});
  dataBehaviour$: BehaviorSubject<IActionStatusGraph[] | null> = new BehaviorSubject(null);
  data$ = this.dataBehaviour$.asObservable();
  loadingBehaviour$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingBehaviour$.asObservable();
  api$: (query) => Observable<IActionStatusGraph[]> = (query) => entityApi.actions.graph(query);
  updateStrategy = "once";
  pollDuration = 10000;
  dateRangeQuery$;
  dataSub: Subscription;
  dateParam: string;
  constructor({ dateRangeQuery$, store, dateParam }: IPageClientConfig) {
    this.dateRangeQuery$ = dateRangeQuery$;
    this.dateParam = dateParam;
  }

  getDefaultQuery() {
    return {}
  };

  setData(data) {
    this.dataBehaviour$.next(data)
  }

  firstDataEffect() {
    this.setLoading(false);
  }

  setLoading(loading: boolean | string = true) {
    this.loadingBehaviour$.next(!!loading)
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