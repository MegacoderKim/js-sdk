import {Component, Input, OnInit} from '@angular/core';
import {IUserData} from "ht-models";
import {HtClientService, HtMapService, HtUsersClientService} from "ht-angular-client";
import { ApiType } from "ht-js-client"

@Component({
  selector: 'ht-users-map-container',
  templateUrl: './users-map-container.component.html',
  styleUrls: ['./users-map-container.component.less']
})
export class UsersMapContainerComponent implements OnInit {
  @Input() hasPlaceline: boolean = true;
  @Input() key: string;
  @Input() sidebarWidth: number;
  @Input() apiType: ApiType = ApiType.analytics;
  @Input() showFilter: boolean = true;
  @Input() showSidebar: boolean = true;
  constructor(
    private clientService: HtClientService,
    private userClientService: HtUsersClientService
  ) {

  }

  // showSidebar() {
  //   return this.viewType !== ViewType.map
  // }
  //
  // showMap() {
  //   return this.viewType !== ViewType.sidebar
  // }

  ngOnInit() {
    this.userClientService.setActive();
    if (this.key) {
      this.clientService.setToken(this.key)
    }
  }

}
