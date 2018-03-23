import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {scaleOrdinal} from "d3-scale";
import {schemeSet2} from "d3-scale-chromatic";

@Component({
  selector: 'app-pie-chart-label',
  templateUrl: './pie-chart-label.component.html',
  styleUrls: ['./pie-chart-label.component.less']
})
export class PieChartLabelComponent implements OnInit {
  @Input() totalCount: number = 0;
  @Input() countLabel: string = '';
  @Input() overview;
  @Input() pieColor;
  @Output() selectDatum: EventEmitter<object> = new EventEmitter();
  color = scaleOrdinal(schemeSet2);
  constructor() { }

  ngOnInit() {
  }

}
