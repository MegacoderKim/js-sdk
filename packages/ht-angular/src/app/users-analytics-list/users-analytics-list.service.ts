import { Injectable } from '@angular/core';
import {IDateRange} from "ht-models";
import {dateRangeFactory} from "ht-client";
import {DateRangeMap} from "ht-data";
import {filter, map} from "rxjs/operators";
import {HtUsersClient} from "ht-client";
import {usersClientFactory} from "ht-client";
import {IAnalyticsList, IUsersAnalyticsListConfig} from "../interfaces/analytics-list";
import {DistanceLocale, HMString} from "ht-utility";
import {IUserAnalytics} from "ht-models";

@Injectable()
export class UsersAnalyticsListService implements IAnalyticsList {
  dateRangeService$;
  title;
  tableFormat;
  query;
  columns;
  client: HtUsersClient;
  dataArray$;
  dataTable$;
  constructor(config: IUsersAnalyticsListConfig) {
    this.initState(config);
    this.initClient()
  }

  initState(config: IUsersAnalyticsListConfig) {
    this.dateRangeService$ = dateRangeFactory(config.initialDateRange$ || DateRangeMap.last_7_days);
    this.title = config.title;
    this.tableFormat = config.tableFormat;
    this.query = config.query;
    this.columns = this.tableFormat.map(data => data.column)
  }

  private initClient() {
    this.client  = usersClientFactory({dateRange$: this.dateRangeService$.data$});
    this.client.list.updateStrategy = "once";
    this.client.list.setQuery(this.query);
    this.client.list.setActive();
    const data$ = this.client.list.dataArray$;
    this.dataTable$ = data$.pipe(
      filter(data => !!data),
      map((users: any[]) => {
        return users.map(user => {
          return this.tableFormat.map(data => data.selector(user))
        })

      })
    );
  }
}

export interface IUsersListPreset {
  [name: string]: IUsersAnalyticsListConfig
}
export const usersAnalyticsListPresets: IUsersListPreset = {
  max_location_disabled_duration: {
    title: "Users with max location disabled duration",
    query: {ordering: "-location_disabled_duration"},
    tableFormat: [
      {
        column: "Name",
        selector(user: IUserAnalytics) {
          return user.name
        }
      },
      {
        column: "Location disabled duration",
        selector(user: IUserAnalytics) {
          return user.location_disabled_duration ? HMString(user.location_disabled_duration / 60) : "--"
        }
      },
      {
        column: "% of total duration",
        selector(user: IUserAnalytics) {
          return user.total_duration && user.location_disabled_duration ?
            (100 * (user.location_disabled_duration / user.total_duration)).toFixed(1) :
            "NA"
        }
      }
    ]
  },
  max_stop_duration: {
    title: "Users with max stop duration",
    query: {ordering: "-stop_duration"},
    tableFormat: [
      {
        column: "Name",
        selector(user: IUserAnalytics) {
          return user.name
        }
      },
      {
        column: "Stop duration",
        selector(user: IUserAnalytics) {
          return user.stop_duration ? HMString(user.stop_duration / 60) : "--"
        }
      },
      {
        column: "% of total duration",
        selector(user: IUserAnalytics) {
          return user.total_duration && user.stop_duration ?
            (100 * (user.stop_duration / user.total_duration)).toFixed(1) :
            "NA"
        }
      }
    ]
  },
  max_network_offline: {
    title: "Users with max network offline duration",
    query: {ordering: "-network_offline_duration"},
    tableFormat: [
      {
        column: "Name",
        selector(user: IUserAnalytics) {
          return user.name
        }
      },
      {
        column: "network offline duration",
        selector(user: IUserAnalytics) {
          return user.network_offline_duration ? HMString(user.network_offline_duration / 60) : "--"
        }
      },
      {
        column: "% of total duration",
        selector(user: IUserAnalytics) {
          return user.total_duration && user.network_offline_duration ?
            (100 * (user.network_offline_duration / user.total_duration)).toFixed(1) :
            "NA"
        }
      }
    ]
  },
  max_distance: {
    title: "Users with max distance",
    query: {ordering: "-total_distance"},
    tableFormat: [
      {
        column: "Name",
        selector(user: IUserAnalytics) {
          return user.name
        }
      },
      {
        column: "total distance",
        selector(user: IUserAnalytics) {
          return user.total_distance ? DistanceLocale(user.total_distance) : "--"
        }
      }
    ]
  }
};



