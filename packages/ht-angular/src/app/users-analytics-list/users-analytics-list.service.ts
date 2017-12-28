import { Injectable } from '@angular/core';
import {dateRangeFactory} from "ht-client";
import {DateRangeMap} from "ht-data";
import {filter, map} from "rxjs/operators";
import {usersClientFactory} from "ht-client";
import {IAnalyticsList, IAnalyticsListConfig} from "../interfaces/analytics-list";

import {UsersAnalytics} from "ht-client";
import {IAnalyticsItemService} from "../interfaces/analytics-item";
import {UsersAnalyticsListComponent} from "./users-analytics-list.component";

@Injectable()
export class UsersAnalyticsListService implements IAnalyticsItemService {
  component = UsersAnalyticsListComponent;
  dateRangeService$;
  title;
  tableFormat;
  query;
  columns;
  client: UsersAnalytics;
  dataArray$;
  dataTable$;
  className = "is-6";
  tags = ['users'];
  hideDatePicker: boolean;
  constructor(config: IAnalyticsListConfig) {
    this.initState(config);
    this.initClient(config)
  }

  initState(config: IAnalyticsListConfig) {
    this.dateRangeService$ = dateRangeFactory(config.initialDateRange || DateRangeMap.last_7_days);
    this.title = config.title;
    this.tableFormat = config.tableFormat;
    this.query = config.query;
    this.columns = this.tableFormat.map(data => data.label);
    this.hideDatePicker = config.hideDatePicker;
    if (config.tags && config.tags.length) this.tags = [...this.tags, ...config.tags]
  }

  private initClient(config) {
    const userClient  = usersClientFactory({dateRange$: this.dateRangeService$.data$});
    this.client = userClient.list;
    this.client.updateStrategy = config.updateStrategy || "once";
    this.client.setQuery(this.query);
    this.client.setActive();
    const data$ = this.client.dataArray$;
    this.dataTable$ = data$.pipe(
      filter(data => !!data),
      map((users: any[]) => {
        return users.map(user => {
          const values = this.tableFormat.map(data => data.selector(user));
          return {data: user, values}
        })

      })
    );
  };

  setData(instance: UsersAnalyticsListComponent) {
    instance.listService = this;
  }
}





