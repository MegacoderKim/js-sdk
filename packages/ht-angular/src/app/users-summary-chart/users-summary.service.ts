import { Injectable } from '@angular/core';
import {IAnalyticsItemService} from "../interfaces/analytics-item";
import {IDateRange} from "ht-models";
import {dateRangeFactory, UsersSummaryClient, usersClientFactory, QueryLabel} from "ht-client";
import {DateRangeMap} from "ht-data";
import {UsersSummaryChartComponent} from "./users-summary-chart.component";
import {IUsersSummaryConfig} from "../interfaces/users-analytics";
import {share} from "rxjs/operators";

@Injectable()
export class UsersSummaryService implements IAnalyticsItemService {
  component = UsersSummaryChartComponent;
  className = 'is-6';
  tags = ['users', 'summary', 'live'];
  dateRangeService$;
  title: string;
  client;
  summary$;
  constructor(config: IUsersSummaryConfig) {
    this.setState(config);
    this.initClient()
  }

  setData(instance: UsersSummaryChartComponent) {
    instance.service = this;
  }

  private setState(config: IUsersSummaryConfig) {
    this.dateRangeService$ = dateRangeFactory(DateRangeMap.today);
    this.title = config.title;
    console.log("config", config);
    const client = config.usersClient || usersClientFactory({dateRange$: this.dateRangeService$.data$});
    this.client = client.summary;
    this.summary$ = client.listStatusChart$(config.queryLabels);
  }

  private initClient() {
    this.client.setActive()
  }

  destroy() {
    this.client.destroy()
  }
}


