import { Component, OnInit } from '@angular/core';
import {usersAnalyticsListPresets, UsersAnalyticsListService} from "../users-analytics-list/users-analytics-list.service";
import {actionsConfigPreset, ActionsStatusGraphService} from "../actions-status-graph/actions-status-graph.service";

@Component({
  selector: 'ht-analytics-test',
  templateUrl: './analytics-test.component.html',
  styleUrls: ['./analytics-test.component.scss']
})
export class AnalyticsTestComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
