import { Component, OnInit } from '@angular/core';
import {actionTableFormat} from "ht-data";
import {HtActionsService} from "ht-angular";
import {config} from "../../config";
import {ContainerService} from "../../container/container.service";
import {bottomAppear} from "ht-angular";
import {fadeAppear, HtUsersService} from "../../../../libs/ht-angular";

@Component({
  selector: 'app-actions-table',
  templateUrl: './actions-table.component.html',
  styleUrls: ['./actions-table.component.scss'],
  animations: [
    bottomAppear,
    fadeAppear
  ]
})
export class ActionsTableComponent implements OnInit {
  tableFormat = [
    actionTableFormat.unique_id,
    actionTableFormat.type,
    actionTableFormat.user,
    actionTableFormat.status_dot,
    actionTableFormat.status,
    actionTableFormat.created_at,
    actionTableFormat.completed_at__eta,
    actionTableFormat.duration,
    actionTableFormat.distance
  ];
  loading$;
  query$;
  data$;
  isMobile = config.isMobile;
  baseUrl = config.isWidget ? '/widget' : '/';
  client;
  selectedActionId$;
  constructor(
    private containerService: ContainerService,
    private actionsService: HtActionsService,
    private usersService: HtUsersService
  ) { }

  ngOnInit() {
    this.containerService.setEntity('actions');
    this.containerService.setView('list');

    this.client = this.actionsService.list;
    this.loading$ = this.actionsService.list.loading$;
    this.query$ = this.actionsService.list.getApiQuery$();
    this.data$ = this.actionsService.list.data$;
    this.actionsService.list.setActive();
    this.selectedActionId$ = this.usersService.placeline.actionId$;
  }

  setQuery(query) {
    this.actionsService.list.setQuery(query)
  }

  setPage(page) {
    this.setQuery({page});
  }

  selectAction(action) {
    this.usersService.placeline.setQuery({action_id: action.id})
  }

}
