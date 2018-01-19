import { UsersHeatmap } from "ht-client";
import { IAnalyticsListConfig } from "../interfaces/analytics-list";
import { MapInstance } from "ht-maps";
import { AnalyticsMapContainerComponent } from "../analytics-map-container/analytics-map-container.component";
import { IAnalyticsMapService } from "../interfaces/analytics";
import { Observable } from "rxjs/Observable";
export declare class StopsHeatmapService implements IAnalyticsMapService {
    component: typeof AnalyticsMapContainerComponent;
    className: string;
    tags: string[];
    title: any;
    noData: boolean;
    loading$: Observable<boolean>;
    mapLoading$: any;
    client: UsersHeatmap;
    dateRangeService$: any;
    dataArray$: any;
    mapInstance: MapInstance;
    constructor(config: IAnalyticsListConfig);
    setMapType(mapType: any): void;
    setData(instance: AnalyticsMapContainerComponent): void;
    setActive(active?: boolean): void;
    private initClient(config);
}
