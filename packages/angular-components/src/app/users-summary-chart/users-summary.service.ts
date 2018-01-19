import { Injectable } from '@angular/core';
import {IDateRange} from "ht-models";
import {dateRangeFactory, UsersSummaryClient, usersClientFactory, QueryLabel} from "ht-client";
import {DateRangeMap} from "ht-data";
import {UsersSummaryChartComponent} from "./users-summary-chart.component";
import {ISummaryConfig} from "../interfaces/users-analytics";
import {HtUsersClient} from "ht-client";
import {IAnalyticsService} from "../interfaces/analytics";

@Injectable()
export class UsersSummaryService implements IAnalyticsService {
  component = UsersSummaryChartComponent;
  className = 'is-6';
  tags = ['users', 'live'];
  dateRangeService$;
  title: string;
  client;
  summary$;
  hideDatePicker = true;
  noData = false;
  loading$;
  minHeight = 50;
  constructor(config: ISummaryConfig<HtUsersClient>) {
    this.setState(config);
    // this.initClient()
  }

  setData(instance: UsersSummaryChartComponent) {
    instance.service = this;
  }

  private setState(config: ISummaryConfig<HtUsersClient>) {
    this.dateRangeService$ = dateRangeFactory(DateRangeMap.last_30_days);
    this.title = config.title;
    const client: HtUsersClient = config.client || usersClientFactory({dateRange$: this.dateRangeService$.data$});
    client.setShowAll();
    this.client = client.summary;
    this.loading$ = this.client.loading$;
    this.summary$ = client.listStatusChart$(config.queryLabels);
  }

  // private initClient() {
  //   this.client.setActive()
  // }

  destroy() {
    this.client.destroy()
  }

  setActive(isActive: boolean = true) {
    this.client.setActive(isActive)
  }
}


