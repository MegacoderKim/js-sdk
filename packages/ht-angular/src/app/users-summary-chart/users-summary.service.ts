import { Injectable } from '@angular/core';
import {IAnalyticsItemService} from "../interfaces/analytics-item";
import {IDateRange} from "ht-models";
import {dateRangeFactory, UsersSummaryClient, usersClientFactory, QueryLabel} from "ht-client";
import {DateRangeMap} from "ht-data";
import {UsersSummaryChartComponent} from "./users-summary-chart.component";
import {ISummaryConfig} from "../interfaces/users-analytics";
import {share} from "rxjs/operators";
import {HtUsersClient} from "ht-client/dist/typings/entities/users/users-client";

@Injectable()
export class UsersSummaryService implements IAnalyticsItemService {
  component = UsersSummaryChartComponent;
  className = 'is-6';
  tags = ['users', 'live'];
  dateRangeService$;
  title: string;
  client;
  summary$;
  hideDatePicker = true;
  constructor(config: ISummaryConfig<HtUsersClient>) {
    this.setState(config);
    this.initClient()
  }

  setData(instance: UsersSummaryChartComponent) {
    instance.service = this;
  }

  private setState(config: ISummaryConfig<HtUsersClient>) {
    this.dateRangeService$ = dateRangeFactory(DateRangeMap.last_30_days);
    this.title = config.title;
    const client: HtUsersClient = config.client || usersClientFactory({dateRange$: this.dateRangeService$.data$});
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


