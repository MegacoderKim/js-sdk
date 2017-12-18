import {Observable} from "rxjs/Observable";
import {DateRange} from "ht-client";
import {IDateRange} from "ht-models";

export interface IAnalyticsList {
  dataTable$: Observable<string[][]>,
  client: any,
  title: string,
  columns: string[],
  dateRangeService$: DateRange
}

export interface ITableFormat {
  column: string,
  selector(data?): string
}

export interface IUsersAnalyticsListConfig {
  initialDateRange$?: IDateRange,
  title: string,
  query: object,
  tableFormat: ITableFormat[],
};
