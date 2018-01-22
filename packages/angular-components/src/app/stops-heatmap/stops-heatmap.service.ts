import { Injectable } from '@angular/core';
import { UsersHeatmap, usersClientFactory, dateRangeFactory } from "ht-client";
import {IAnalyticsListConfig} from "../interfaces/analytics-list";
import {DateRangeMap} from "ht-data";
import {of} from "rxjs/observable/of";
import {MapInstance, StopsHeatmapTrace, mapTypeService} from "ht-maps";
import {tap} from "rxjs/operators";
import {AnalyticsMapContainerComponent} from "../analytics-map-container/analytics-map-container.component";
import {IAnalyticsMapService} from "../interfaces/analytics";
import {Observable} from "rxjs/Observable";
import {Page} from "ht-models";

@Injectable()
export class StopsHeatmapService implements IAnalyticsMapService {
  component = AnalyticsMapContainerComponent;
  className = "is-12";
  tags = ['users'];
  title;
  noData = false;
  loading$: Observable<boolean> = of(false);
  mapLoading$;
  client: UsersHeatmap;
  dateRangeService$;
  data$;
  mapInstance: MapInstance;
  constructor(config: IAnalyticsListConfig) {
    this.mapInstance = new MapInstance();
    this.setMapType(mapTypeService.getInstance().mapType);
    this.initClient(config);
  }

  setMapType(mapType) {
    this.mapInstance.setMapType(mapType);
  }

  setData(instance: AnalyticsMapContainerComponent) {
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
    this.data$ = this.client.data$.pipe(
      tap((data: Page<any>) => {
        this.noData = data && data.count == 0 ? true : false;
      })
    );
    let heatMapTrace = new StopsHeatmapTrace(this.mapInstance);
    heatMapTrace.setPageData$(this.data$)
  }
}
