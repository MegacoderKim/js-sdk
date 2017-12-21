import { Injectable } from '@angular/core';
import {dateRangeFactory} from "ht-client";
import {DateRangeMap} from "ht-data";
import { actionsClientFactory} from "ht-client";
import { IActionStatusGraph} from "ht-models";
import {filter, map} from "rxjs/operators";
import * as moment from "moment-mini"
import {IActionsTrendlineConfig} from "../interfaces/trendline";
import {ActionsGraph} from "ht-client";
import {IAnalyticsItem, IAnalyticsItemService} from "../interfaces/analytics-item";
import {ActionsStatusGraphComponent} from "./actions-status-graph.component";

@Injectable()
export class ActionsStatusGraphService implements IAnalyticsItemService {
  component = ActionsStatusGraphComponent;
  client: ActionsGraph;
  dateRangeService$;
  data$;
  title;
  chartFormat;
  tags = ['actions'];
  className = "is-12";
  constructor(config: IActionsTrendlineConfig) {
    this.initState(config);
    this.initClient();
  }

  initState(config: IActionsTrendlineConfig) {
    this.dateRangeService$ = dateRangeFactory(config.initialDateRange || DateRangeMap.last_7_days);
    this.title = config.title || "Actions graph";
    this.chartFormat = config.chartFormat;
    if (config.tags && config.tags.length) this.tags = [...this.tags, ...config.tags];
  }

  private initClient() {
    const graphClient = actionsClientFactory({dateRange$: this.dateRangeService$.data$});
    this.client = graphClient.graph;
    this.data$ = this.client.data$.pipe(
      filter(data => !!data),
      map((data: IActionStatusGraph[]) => {
        return this.getCompletedActionChart(data)
      })
    );


  }

  private getCompletedActionChart(data: IActionStatusGraph[]) {
    const format = data.length < 15 ? 'MMM D' : "MMM D";
    const labels = data.map((item) => {
      return moment(item.created_date).format(format)
    });
    const datasets = this.chartFormat.map((item) => {
      return {
        title: item.title,
        values: data.map(item.selector)
      }
    });
    return {
      labels,
      datasets
    }
  }

  setData(instance: ActionsStatusGraphComponent) {
    instance.service = this
  }
}




