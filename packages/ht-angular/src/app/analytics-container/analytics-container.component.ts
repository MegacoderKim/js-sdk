import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AnalyticsItemsService} from "./analytics-items.service";

@Component({
  selector: 'ht-analytics-container',
  templateUrl: './analytics-container.component.html',
  styleUrls: ['./analytics-container.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsContainerComponent implements OnInit {
  configure: boolean = false;
  constructor(
    public analyticsItemsService: AnalyticsItemsService
  ) { }

  ngOnInit() {

  }

  openConfig() {
    this.configure = true
  }

}
