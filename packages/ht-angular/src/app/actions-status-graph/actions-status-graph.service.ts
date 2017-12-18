import { Injectable } from '@angular/core';
import {dateRangeFactory} from "ht-client";
import {DateRangeMap} from "ht-data";
import { actionsClientFactory} from "ht-client";
import { IActionStatusGraph} from "ht-models";
import {filter, map} from "rxjs/operators";
import * as moment from "moment-mini"
import {IActionsTrendlineConfig} from "../interfaces/trendline";

@Injectable()
export class ActionsStatusGraphService {
  client;
  dateRangeService$;
  data$;
  title;
  chartFormat;
  constructor(config: IActionsTrendlineConfig) {
    this.initState(config);
    this.initClient();
  }

  initState(config: IActionsTrendlineConfig) {
    this.dateRangeService$ = dateRangeFactory(config.initialDateRange || DateRangeMap.last_7_days);
    this.title = config.title || "Actions graph";
    this.chartFormat = config.chartFormat;
  }

  private initClient() {
    this.client = actionsClientFactory({dateRange$: this.dateRangeService$.data$});
    this.data$ = this.client.graph.data$.pipe(
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
}

export interface IActionsConfigPreset {
  [name: string]: IActionsTrendlineConfig
}
export const actionsConfigPreset: IActionsConfigPreset = {
  "status": {
    title: "Actions status chart",
    initialDateRange: DateRangeMap.last_30_days,
    chartFormat: [
      {
        title: "Completed",
        selector(graphData: IActionStatusGraph) {
          return graphData.completed
        }
      },
      {
        title: "Assigned",
        selector(graphData: IActionStatusGraph) {
          return graphData.assigned
        }
      }

    ]
  }
};


