import { Component, OnInit, OnDestroy } from '@angular/core';
import {HtActionsService} from "../../ht/ht-actions.service";

@Component({
  selector: 'ht-actions-summary-container',
  templateUrl: './actions-summary-container.component.html',
  styleUrls: ['./actions-summary-container.component.scss']
})
export class ActionsSummaryContainerComponent implements OnInit, OnDestroy {
  data$;
  constructor(
    private actionsService: HtActionsService
  ) { }

  ngOnInit() {
    this.actionsService.summary.setActive();
    this.data$ = this.actionsService.summary.getSummaryChart();
  }

  ngOnDestroy() {
    this.actionsService.summary.setActive(false)
  }

}
