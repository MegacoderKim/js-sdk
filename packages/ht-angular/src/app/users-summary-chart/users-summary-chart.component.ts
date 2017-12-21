import {Component, Input, OnInit, ViewChild} from '@angular/core';
import Chart from "frappe-charts/dist/frappe-charts.min.esm"
import {untilDestroy} from "../until-destroy";
import {filter, map} from "rxjs/operators";
import { IUsersSummaryData } from "ht-client";

@Component({
  selector: 'ht-users-summary-chart',
  templateUrl: './users-summary-chart.component.html',
  styleUrls: ['./users-summary-chart.component.scss']
})
export class UsersSummaryChartComponent implements OnInit {
  @Input() service;
  noData: boolean = false;
  chart;
  summary$;
  @ViewChild('chart') charElem;
  constructor() { }

  ngOnInit() {

    // this.service.summary$.pipe(
    //   // untilDestroy(this),
    //   filter(data => !!data),
    //   map(this.formatSummary)
    // ).subscribe((data) => {
    //   this.setChart(data)
    // })
  }

  setChart(data) {
    if (data.labels.length <= 1) {
      this.noData = true;
      return false;
    }
    if (this.chart) {
      this.noData = false;
      const labels = data.labels;
      const dataset = data.datasets;
      // this.chart.update_current_data_point(dataset[0].values[0]);
      // this.chart = new Chart({
      //   parent: "#summary-chart", // or a DOM element
      //   // title: "Action Graph",
      //   data: data,
      //   type: 'percentage', // or 'line', 'scatter', 'pie', 'percentage'
      //   // height: 250,
      //   height: 150,
      //   // is_series: 1,
      //   colors: ['yellow', 'red', 'blue', 'green', 'grey', 'pink'],
      //   // region_fill: 1,
      //   // x_axis_mode: 'tick',
      //   format_tooltip_x: d => d,
      //   format_tooltip_y: d => d
      // });
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
      // this.chart.show_averages();
    }
    // this.chart.show_sum()

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
