import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'ht-analytics-item-load',
  templateUrl: './analytics-item-load.component.html',
  styleUrls: ['./analytics-item-load.component.scss']
})
export class AnalyticsItemLoadComponent implements OnInit {
  @Input() loading$: Observable<boolean>;
  @Input() minHeight: number = 300;
  @Input() noData: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
