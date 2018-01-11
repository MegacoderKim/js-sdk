import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'ht-analytics-item-load',
  templateUrl: './analytics-item-load.component.html',
  styleUrls: ['./analytics-item-load.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsItemLoadComponent implements OnInit {
  @Input() loading$: Observable<boolean>;
  @Input() minHeight: number;
  @Input() noData: boolean = false;
  constructor() { }

  get _minHeight() {
    return this.minHeight || 300
  }

  ngOnInit() {
  }

}
