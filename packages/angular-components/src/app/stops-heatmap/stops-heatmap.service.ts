import { Injectable } from '@angular/core';
import {IAnalyticsItemService} from "../interfaces/analytics-item";
import {StopsHeatmapComponent} from "./stops-heatmap.component";
import { UsersHeatmap, usersClientFactory, dateRangeFactory } from "ht-client";
import {IAnalyticsListConfig} from "../interfaces/analytics-list";
import {DateRangeMap} from "ht-data";
import {of} from "rxjs/observable/of";
import {MapInstance, StopsHeatmapTrace, GlobalMap} from "ht-maps";

@Injectable()
export class StopsHeatmapService implements IAnalyticsItemService {
  component = StopsHeatmapComponent;
  className = "is-12";
  tags = ['users'];
  title;
  noData = false;
  loading$ = of(false);
  mapLoading$;
  client: UsersHeatmap;
  dateRangeService$;
  dataArray$;
  mapInstance: MapInstance;
  constructor(config: IAnalyticsListConfig) {
    this.mapInstance = new MapInstance();
    this.mapInstance.setMapType(GlobalMap.mapType);
    this.initClient(config);
  }

  setData(instance: StopsHeatmapComponent) {
    instance.service = this
  };

  setActive(active: boolean = true) {
    this.client.setActive(active)
  }

  private initClient(config) {
    this.dateRangeService$ = dateRangeFactory(config.initialDateRange || DateRangeMap.last_7_days);
    this.title = config.title;
    let userClient = usersClientFactory({dateRange$: this.dateRangeService$.data$});
    this.client = userClient.heatmap;
    this.mapLoading$ = this.client.loading$;
    this.dataArray$ = this.client.dataArray$;
    let heatMapTrace = new StopsHeatmapTrace(this.mapInstance);
    heatMapTrace.setData$(this.dataArray$)
  }
}
