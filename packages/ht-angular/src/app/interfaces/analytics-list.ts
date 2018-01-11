import {Observable} from "rxjs/Observable";
import {DateRange} from "ht-client";
import {IDateRange} from "ht-models";
import {IAnalyticsItemService} from "./analytics-item";

export interface IAnalyticsList extends  IAnalyticsItemService{
  dataTable$: Observable<string[][]>,
  client: any,
  title: string,
  columns: string[],
  dateRangeService$: DateRange,
}

export interface ITableFormat {
  label: string,
  selector(data?): string
}

export interface IAnalyticsListConfig {
  initialDateRange?: IDateRange,
  title: string,
  query: object,
  tableFormat: ITableFormat[],
  updateStrategy?: string,
  tags?: string[],
  hideDatePicker?: boolean
};
