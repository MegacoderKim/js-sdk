import {Observable} from "rxjs/Observable";
import {IAnalyticsService, IAnalyticsServiceConfig} from "./analytics";
// import {IAnalyticsItemService} from "./analytics-item";

export interface IAnalyticsList extends  IAnalyticsService{
  dataTable$: Observable<string[][]>,
  client: any,
  columns: string[],
  hideDatePicker?: boolean
}

export interface ITableFormat {
  label: string,
  selector(data?): string
}

export interface IAnalyticsListConfig extends IAnalyticsServiceConfig{
  query: object,
  tableFormat: ITableFormat[],
  hideDatePicker?: boolean
};
