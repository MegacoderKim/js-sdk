import {Observable} from "rxjs/Observable";
import {IDateRange} from "../../interfaces";
import {DateRange, dateRangeService} from "../../global/date-range";
import {ActionsGraphClient, ActionsGraph} from "./actions-graph";
import { DateRangeToQuery$ } from "ht-data";
import * as fromActions from "../../reducers/actions-reducer";
import {ApiStoreService} from "../../global/store-provider";
import {ActionsList, ActionsListClient} from "./actions-list-client"
import {ActionsSummaryClient, ActionsSummary} from "./actions-summary-client"
import {ActionsFilter} from "../../filters/actions-filter";
import {ActionsHeatmapClient, ActionsHeatmap} from "./actions-heatmap-client";
import {ActionsIndexAll, ActionsIndexAllClient} from "./actions-list-all-client"
import {HtApi, HtActionsApi} from "ht-api";
import {htClientService} from "../../global/client";
import {pluck} from "rxjs/operators";
import {filter} from "rxjs/operators/filter";
import {scan} from "rxjs/operators/scan";
import {AllData, IAction} from "ht-models";
import {htAction} from "ht-data";
import * as _ from "underscore";

export class HtActionsClient {
  // item: HtActionsGetClient;
  api: HtActionsApi;
  graph: ActionsGraph;
  store;
  list: ActionsList;
  listAll: ActionsIndexAll;
  summary: ActionsSummary;
  heatmap: ActionsHeatmap;
  filters = new ActionsFilter();
  constructor(config: IActionsClientConfig) {
    let api = htClientService.getInstance().api.actions;
    this.api = api;
    const store = ApiStoreService.getNewInstance();
    store.addReducer("actions", fromActions.actionsReducer);
    this.store = store;
    let dateRange = config.dateRange;
    let dateParam = 'created_at';
    this.graph = new ActionsGraphClient({dateRange, dateParam, api});
    this.list = new ActionsListClient({dateRange, store, dateParam, api});
    this.listAll = new ActionsIndexAllClient({dateRange, dateParam, api});
    this.summary = new ActionsSummaryClient({dateRange, store, dateParam, api});
    this.heatmap = new ActionsHeatmapClient({dateRange, dateParam: 'completed_at', api});
    this.initEffects();
  };

  private initEffects() {
    this.list.query$.pipe(filter(data => !!data)).subscribe(query => {
      this.setListAllFilter(query);
    });

    // this.listAll.active$.pipe(filter(data => !!data)).flatMap(() => {
    //   return this.listStatusChart$()
    // })
    //   .takeUntil(this.listAll.active$.filter(data => !data).skip(1))
    //   .withLatestFrom(this.list.query$)
    //   .switchMap(([statusOverview, query]) => {
    //     // return Observable.of({})
    //     console.log(statusOverview, query);
    //     return this.getListAllUpdateQuery$(statusOverview, query)
    //   })//todo finish this

  };

  setListAllFilter(query) {
    let statusString = query["status"];
    let search = query["search"];
    let ids = query["id"];
    let userMarkerFilters: ((users) => any)[] = [];

    if (statusString) {
      let statusArray = statusString.split(",");
      // this.updateUserMap(query);
      let statusFilter: any[] = [];
      statusArray.forEach(status => {
        statusFilter.push(htAction().getMarkerFilter(status));
      });
      let allStatusFilter = user => {
        return _.reduce(
          statusFilter,
          (acc, filter: (user) => boolean) => {
            return acc || filter(user);
          },
          false
        );
      };

      userMarkerFilters.push(allStatusFilter);
    }
    if (search) {
      userMarkerFilters.push((user: IAction) => {
        return htAction().getMarkerSearched(search)(user); // || userMarkerFilter(user)
      });
      // this.updateUserMap(query);
    }
    if (ids) {
      let userIds = ids.split(",");
      userMarkerFilters.push((user: IAction) => {
        return _.contains(userIds, user.id);
      });
    }
    let userMarkerFilter = user => {
      return _.reduce(
        userMarkerFilters,
        (acc, filter: (user) => boolean) => {
          return acc && filter(user);
        },
        true
      );
    };

    let dataMap = (allResults: AllData<any>) => {
      let results = _.filter(allResults.resultsEntity, userMarkerFilter);
      let resultsEntity = _.indexBy(results, "id");
      return { ...allResults, resultsEntity };
    };
    this.listAll.setDataMap(dataMap);
  }
}

export const actionsClientFactory = (
  options: Partial<IActionsClientConfig> = {}
) => {
  let dateRange = options.dateRange || dateRangeService.getInstance();
  return new HtActionsClient({ dateRange });
};

export interface IActionsClientConfig {
    dateRange: DateRange;
}
