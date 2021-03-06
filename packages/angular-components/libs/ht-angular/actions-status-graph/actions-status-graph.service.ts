import { Injectable } from '@angular/core';
import {dateRangeFactory} from "ht-client";
import {DateRangeMap} from "ht-data";
import { actionsClientFactory} from "ht-client";
import { IActionStatusGraph} from "ht-models";
import {filter, map} from "rxjs/operators";
import {format} from "date-fns";
import {IActionsTrendlineConfig} from "../interfaces/trendline";
import {ActionsGraph} from "ht-client";
import {ActionsStatusGraphComponent} from "./actions-status-graph.component";
import {IAnalyticsService} from "../interfaces/analytics";

@Injectable()
export class ActionsStatusGraphService implements IAnalyticsService {
  component = ActionsStatusGraphComponent;
  client: ActionsGraph;
  dateRangeService$;
  data$;
  title;
  chartFormat;
  tags = ['actions'];
  className = "is-12";
  noData;
  loading$;
  constructor(config: IActionsTrendlineConfig) {
    this.initState(config);
    this.initClient();
  }

  initState(config: IActionsTrendlineConfig) {
    // console.log(config.initialDateRange);
    this.dateRangeService$ = dateRangeFactory(config.initialDateRange || DateRangeMap.last_7_days);
    this.title = config.title || "Actions graph";
    this.chartFormat = config.chartFormat;
    if (config.tags && config.tags.length) this.tags = [...this.tags, ...config.tags];
  }

  private initClient() {
    const graphClient = actionsClientFactory({dateRange: this.dateRangeService$});
    this.client = graphClient.graph;
    this.client.setActive();
    this.loading$ = this.client.loading$;
    this.data$ = this.client.data$.pipe(
      filter(data => !!data),
      map((data: IActionStatusGraph[]) => {
        this.noData = data.length ? false : true;
        return this.getCompletedActionChart(data)
      })
    );


  }

  private getCompletedActionChart(data: IActionStatusGraph[]) {
    // const format = data.length < 15 ? 'MMM D' : "MMM D";
    const labels = data.map((item) => {
      return format(item.created_date, 'ddd, MMM Do')
      // return moment(item.created_date).format('ddd, MMM Do')
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

  setActive(isActive: boolean = true) {
    // this.client.setActive(isActive)
  }
}




