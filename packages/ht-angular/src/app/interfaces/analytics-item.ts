import {ComponentRef} from "@angular/core/src/linker/component_factory";
import {IActionsTrendlineConfig} from "./trendline";
import {IUsersAnalyticsListConfig} from "./analytics-list";

export type IInitialConfig = IActionsTrendlineConfig | IUsersAnalyticsListConfig;

export type IAnalyticsItem = IAnalyticsItemService
// export interface IAnalyticsItem {
//   service: any & IAnalyticsItemService,
//   initialConfig: IInitialConfig
// }

export interface IAnalyticsItemService {
  component: any,
  className: string,
  tags: string[]
  setData(instance): void,
}
