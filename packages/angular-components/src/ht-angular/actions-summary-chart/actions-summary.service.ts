import { Injectable } from '@angular/core';
import {ActionsSummaryChartComponent} from "./actions-summary-chart.component";
import {ISummaryConfig} from "../interfaces/users-analytics";
import {dateRangeFactory, actionsClientFactory} from "ht-client";
import {DateRangeMap} from "ht-data";
import {HtActionsClient} from "ht-client";
import {IAnalyticsService} from "../interfaces/analytics";

@Injectable()
export class ActionsSummaryService implements IAnalyticsService {
  component = ActionsSummaryChartComponent;
  className = "is-6";
  tags = ['actions', 'live'];
  dateRangeService$;
  client;
  summary$;
  title;
  hideDatePicker = false;
  noData = false;
  loading$;
  minHeight = 50;
  constructor(config: ISummaryConfig<HtActionsClient>) {
    this.initState(config);
  }

  setData(instance: ActionsSummaryChartComponent) {
    instance.service = this
  }

  private initState(config: ISummaryConfig<HtActionsClient>) {
    this.dateRangeService$ = dateRangeFactory(DateRangeMap.today);
    this.title = config.title;
    const client = config.client || actionsClientFactory({dateRange: this.dateRangeService$});
    if (config.dateRangeService) this.dateRangeService$ = config.dateRangeService;
    this.client = client.summary;
    this.loading$ = this.client.loading$;
    this.summary$ = this.client.summaryChart$;
    // this.client.setActive()
  }

  setActive(isActive: boolean = true) {
    this.client.setActive(isActive)
  }
}
