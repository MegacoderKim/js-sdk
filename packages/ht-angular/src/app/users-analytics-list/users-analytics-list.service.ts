import { Injectable } from '@angular/core';
import {dateRangeFactory} from "ht-client";
import {DateRangeMap} from "ht-data";
import {filter, map} from "rxjs/operators";
import {usersClientFactory} from "ht-client";
import {IAnalyticsList, IUsersAnalyticsListConfig} from "../interfaces/analytics-list";

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
  constructor(config: IUsersAnalyticsListConfig) {
    this.initState(config);
    this.initClient()
  }

  initState(config: IUsersAnalyticsListConfig) {
    this.dateRangeService$ = dateRangeFactory(config.initialDateRange$ || DateRangeMap.last_7_days);
    this.title = config.title;
    this.tableFormat = config.tableFormat;
    this.query = config.query;
    this.columns = this.tableFormat.map(data => data.column);
    if (config.tags && config.tags.length) this.tags = [...this.tags, ...config.tags]
  }

  private initClient() {
    const userClient  = usersClientFactory({dateRange$: this.dateRangeService$.data$});
    this.client = userClient.list;
    this.client.updateStrategy = "once";
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





