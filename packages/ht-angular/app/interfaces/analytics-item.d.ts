import { IActionsTrendlineConfig } from "./trendline";
import { IAnalyticsListConfig } from "./analytics-list";
import { Observable } from "rxjs/Observable";
export declare type IInitialConfig = IActionsTrendlineConfig | IAnalyticsListConfig;
export declare type IAnalyticsItem = IAnalyticsItemService;
export interface IAnalyticsItemService {
    component: any;
    className: string;
    tags: string[];
    title: string;
    noData: boolean;
    loading$: Observable<boolean>;
    minHeight?: number;
    setData(instance: any): void;
    setActive(active?: boolean): void;
}
