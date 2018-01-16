import {listQueryMixin} from "../../mixins/entity-query";
import {listAllClientSubMixin} from "../../mixins/list-all-client-sub";
import {getAllPageDataMixin} from "../../mixins/get-data";
import {getFirstDataMixin} from "../../mixins/get-first-data";
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import {entityApi} from "../../global/entity-api";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {IActionHeat, Page} from "ht-models"
import {IAllowedQueryMap, PageResults$} from "ht-data";
import {Subscription} from "rxjs/Subscription";
import {IPageClientConfig} from "../../interfaces";

export class ActionsHeatmap {
  query$: Observable<object> = of({});
  api$ = query => entityApi.actions.allPages(entityApi.actions.heatmap(query));
  loadingState$ = new BehaviorSubject(false);
  loading$ = this.loadingState$.asObservable();
  dataState$: BehaviorSubject<Page<IActionHeat> | null> = new BehaviorSubject(null);
  data$ = this.dataState$.asObservable();
  dataSub: Subscription;
  dateRangeQuery$;
  active$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  dataArray$ = this.data$.pipe(PageResults$);
  dateParam: string
  constructor({ dateRangeQuery$, dateParam }: IPageClientConfig) {
    this.dateRangeQuery$ = dateRangeQuery$;
    this.dateParam = dateParam;
  }

  setActive(active = true) {
    this.active$.next(active)
  }

  getDefaultQuery() {
    return {}
  };

  firstDataEffect() {

  }

  setLoading(isLoading: boolean) {
    this.loadingState$.next(isLoading)
  }

  setData(data: Page<IActionHeat>) {
    this.dataState$.next(data)
  }

  addData(data) {
    console.log(data);
    this.dataState$.next(data)
  }

}

export const ActionsHeatmapClient = listAllClientSubMixin(
  getAllPageDataMixin(getFirstDataMixin(listQueryMixin(ActionsHeatmap)))
);