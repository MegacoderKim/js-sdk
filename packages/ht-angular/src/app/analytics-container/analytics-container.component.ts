import { Component, OnInit } from '@angular/core';
import {usersAnalyticsListPresets, UsersAnalyticsListService} from "../users-analytics-list/users-analytics-list.service";
import {actionsConfigPreset, ActionsStatusGraphService} from "../actions-status-graph/actions-status-graph.service";

@Component({
  selector: 'ht-analytics-container',
  templateUrl: './analytics-container.component.html',
  styleUrls: ['./analytics-container.component.scss']
})
export class AnalyticsContainerComponent implements OnInit {

  locationDisabledService;
  stopDurationService;
  networkOfflineService;
  distance;
  actionsStatusService;
  constructor() { }

  ngOnInit() {
    this.locationDisabledService = new UsersAnalyticsListService(
      usersAnalyticsListPresets.max_location_disabled_duration
    );

    this.stopDurationService = new UsersAnalyticsListService(
      usersAnalyticsListPresets.max_stop_duration
    );

    this.networkOfflineService = new UsersAnalyticsListService(
      usersAnalyticsListPresets.max_network_offline
    );

    this.distance = new UsersAnalyticsListService(
      usersAnalyticsListPresets.max_distance
    );

    this.actionsStatusService = new ActionsStatusGraphService(actionsConfigPreset.status);
  }

}
