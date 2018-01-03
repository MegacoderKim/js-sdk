import {IActionsTrendlineConfig} from "./trendline";
import {IAnalyticsListConfig} from "./analytics-list";
import {Observable} from "rxjs/Observable";

export type IInitialConfig = IActionsTrendlineConfig | IAnalyticsListConfig;

export type IAnalyticsItem = IAnalyticsItemService
// export interface IAnalyticsItem {
//   service: any & IAnalyticsItemService,
//   initialConfig: IInitialConfig
// }

export interface IAnalyticsItemService {
  component: any,
  className: string,
  tags: string[],
  title: string,
  // loading$: Observable<boolean>
  setData(instance): void,
  setActive(active?: boolean): void,
}
