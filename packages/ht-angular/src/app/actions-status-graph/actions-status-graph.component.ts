import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import Chart from "frappe-charts/dist/frappe-charts.min.esm"
import * as moment from "moment-mini"
// import {filter} from "rxjs/operators";


@Component({
  selector: 'ht-actions-status-graph',
  templateUrl: './actions-status-graph.component.html',
  styleUrls: ['./actions-status-graph.component.scss']
})
export class ActionsStatusGraphComponent implements OnInit, AfterViewInit {
  @Input( ) service;
  data;
  chart;
  constructor() {

  }

  ngOnInit() {
    this.service.data$
      .subscribe((data) => {
      this.setChart(data);
    })

  }


  ngAfterViewInit() {

  }

  setChart(data) {
    if (data.labels.length <= 1) {
      alert("Please select a data range");
      return false;
    }
    if (this.chart) {
      const labels = data.labels;
      const dataset = data.datasets;
      this.chart.update_values(dataset, labels);
      const type = data.labels.length > 1 ? 'line' : 'bar';
    } else {
      this.chart = new Chart({
        parent: "#chart", // or a DOM element
        title: "Action Graph",
        data: data,
        type: 'line', // or 'line', 'scatter', 'pie', 'percentage'
        height: 250,
        is_series: 1,
        colors: ['#7cd6fd', 'red'],
        region_fill: 1,
        format_tooltip_x: d => moment(d).format('ddd, MMM Do'),
        format_tooltip_y: d => d + ' pts'
      })
    }

  }
}
