import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import Chart from "frappe-charts/dist/frappe-charts.min.esm"
// import {untilDestroy} from "../until-destroy";
// import {filter, map} from "rxjs/operators";
import { IUsersSummaryData } from "ht-client";

@Component({
  selector: 'ht-users-summary-chart',
  templateUrl: './users-summary-chart.component.html',
  styleUrls: ['./users-summary-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersSummaryChartComponent implements OnInit {
  @Input() service;
  noData: boolean = false;
  chart;
  summary$;
  @ViewChild('chart') charElem;
  constructor() { }

  ngOnInit() {

  }

  setChart(data) {
    if (data.labels.length <= 1) {
      this.noData = true;
      return false;
    }
    if (this.chart) {
      this.noData = false;

    } else {
      this.chart = new Chart({
        parent: this.charElem.nativeElement, // or a DOM element
        // title: this.service.title,
        data: data,
        type: 'percentage', // or 'line', 'scatter', 'pie', 'percentage'
        height: 150,
        // is_series: 1,
        // colors: ['yellow', 'red', 'blue', 'green', 'grey', 'pink'],
        // region_fill: 1,
        // x_axis_mode: 'tick',
        format_tooltip_x: d => d,
        format_tooltip_y: d => d
      });
    }

  }

  formatSummary(data: IUsersSummaryData) {
    // let labels =
    const labels = data.chart.map(item => item.label);
    const values = data.chart.map(item => item.value);

    return {
      labels,
      datasets: [
        {
          values
        }
      ]
    }
  }

}
