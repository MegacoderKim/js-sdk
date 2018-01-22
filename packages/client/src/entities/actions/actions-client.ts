import {Observable} from "rxjs/Observable";
import {IDateRange} from "../../interfaces";
import {dateRangeService} from "../../global/date-range";
import {entityApi} from "../../global/entity-api";
import {ActionsGraphClient} from "./actions-graph";
import { DateRangeToQuery$ } from "ht-data";
import * as fromActions from "../../reducers/actions-reducer";
import {ApiStoreService} from "../../global/store-provider";
import {ActionsListClient} from "./actions-list-client"
import {ActionsSummaryClient} from "./actions-summary-client"
import {ActionsFilter} from "../../filters/actions-filter";
import {ActionsHeatmapClient} from "./actions-heatmap-client";
import {ActionsIndexAllClient} from "./actions-list-all-client"
export class HtActionsClient {
  // item: HtActionsGetClient;
  api;
  graph;
  store;
  list;
  listAll;
  summary;
  heatmap;
  filters = new ActionsFilter();
  constructor(config: IActionsClientConfig) {
    let api = entityApi.actions;
    this.api = api;
    const store = ApiStoreService.getNewInstance();
    store.addReducer("actions", fromActions.actionsReducer);
    this.store = store;
    let dateRange$ = config.dateRange$;
    const dateRangeQuery$ = dateRange$;
    let dateParam = 'created_at';
    this.graph = new ActionsGraphClient({dateRangeQuery$: dateRangeQuery$, dateParam});
    this.list = new ActionsListClient({dateRangeQuery$: dateRangeQuery$, store, dateParam});
    this.listAll = new ActionsIndexAllClient({dateRangeQuery$: dateRangeQuery$, dateParam})
    this.summary = new ActionsSummaryClient({dateRangeQuery$: dateRangeQuery$, store, dateParam});
    this.heatmap = new ActionsHeatmapClient({dateRangeQuery$: dateRangeQuery$, dateParam: 'completed_at'});
  }
}

export const actionsClientFactory = (
  options: Partial<IActionsClientConfig> = {}
) => {
  let dateRange$ = options.dateRange$ || dateRangeService.getInstance().data$;
  return new HtActionsClient({ dateRange$ });
};

export interface IActionsClientConfig {
  dateRange$: Observable<IDateRange>;
}
