import {Component, Input, OnInit} from '@angular/core';
import {IUserData} from "ht-models";
import { ApiType } from "ht-client"
import {HtClientService} from "../ht/ht-client.service";
import {HtUsersService} from "../ht/ht-users.service";
import {HtRequestService} from "../ht/ht-request.service";

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
    private requestService: HtRequestService,
    private userClientService: HtUsersService
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
      this.requestService.setToken(this.key)
    }
  }

}
