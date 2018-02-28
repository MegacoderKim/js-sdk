import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ht-analytics-title',
  templateUrl: './analytics-title.component.html',
  styleUrls: ['./analytics-title.component.scss']
})
export class AnalyticsTitleComponent implements OnInit {
  @Input() title: string;
  @Input() dateRangeService$;
  @Input() hideDatePicker;
  constructor() { }

  ngOnInit() {
  }

}
