// import { HtActionsGetClient } from "./actions-get-client";
import {Observable} from "rxjs/Observable";
import {IDateRange} from "../../interfaces";
import {dateRangeService} from "../../global/date-range";
import {entityApi} from "../../global/entity-api";
import {ActionsGraphClient} from "./actions-graph";
import { DateRangeToQuery$ } from "ht-data";

export class HtActionsClient {
  // item: HtActionsGetClient;
  api;
  graph;
  constructor(config: IActionsClientConfig) {
    let api = entityApi.actions;
    this.api = api;
    let dateRange$ = config.dateRange$;
    const dateRangeQuery$ = dateRange$
      ? dateRange$.pipe(DateRangeToQuery$("created_at"))
      : null;

    this.graph = new ActionsGraphClient({dateRangeQuery$: dateRangeQuery$})
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
