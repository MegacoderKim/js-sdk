import { Injectable } from '@angular/core';
import {of} from "rxjs/observable/of";
import {DateRangeMap} from "ht-data";
import {dateRangeFactory, actionsClientFactory, ActionsHeatmap} from "ht-client";
import {tap} from "rxjs/operators";
import {IAnalyticsListConfig} from "../interfaces/analytics-list";
import {GlobalMap, MapInstance, ActionsHeatmapTrace} from "ht-maps";
import {AnalyticsMapContainerComponent} from "../analytics-map-container/analytics-map-container.component";
import {IAnalyticsMapService} from "../interfaces/analytics";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ActionsHeatmapService implements IAnalyticsMapService {
  component = AnalyticsMapContainerComponent;
  className = "is-12";
  tags = ['actions'];
  title;
  noData = false;
  loading$: Observable<boolean> = of(false);
  mapLoading$;
  client: ActionsHeatmap;
  dateRangeService$;
  dataArray$;
  mapInstance: MapInstance;
  constructor(config: IAnalyticsListConfig) {
    this.mapInstance = new MapInstance();
    this.setMapType('leaflet');
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
    let actionsClient = actionsClientFactory({dateRange$: this.dateRangeService$.data$});
    this.client = actionsClient.heatmap;
    this.mapLoading$ = this.client.loading$;
    this.dataArray$ = this.client.dataArray$.pipe(
      tap((data: any[] | null) => {
        this.noData = data && data.length == 0 ? true : false;
      })
    );
    let heatMapTrace = new ActionsHeatmapTrace(this.mapInstance);
    heatMapTrace.setData$(this.dataArray$)
  }

}
