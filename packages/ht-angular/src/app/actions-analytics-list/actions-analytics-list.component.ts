import {Component, Input, OnInit} from '@angular/core';
import {IAnalyticsList} from "../interfaces/analytics-list";
import {IAction} from "ht-models/dist/typings/action";

@Component({
  selector: 'ht-actions-analytics-list',
  templateUrl: './actions-analytics-list.component.html',
  styleUrls: ['./actions-analytics-list.component.scss']
})
export class ActionsAnalyticsListComponent implements OnInit {
  @Input() listService: IAnalyticsList;
  selectedAction: IAction | null = null;
  constructor() { }

  ngOnInit() {
  }

  showActionDetail(row) {
    this.selectedAction = row.data;
  }

  closeModal() {
    this.selectedAction = null;
  }

}
