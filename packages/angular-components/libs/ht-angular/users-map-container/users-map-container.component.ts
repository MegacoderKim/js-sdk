import {Component, Input, OnInit} from '@angular/core';
import {IUserPlaceline} from "ht-models";
import {ApiType, htClientService} from "ht-client"
import {HtUsersService} from "../ht/ht-users.service";

@Component({
  selector: 'ht-users-map-container',
  templateUrl: './users-map-container.component.html',
  styleUrls: ['./users-map-container.component.less']
})
export class UsersMapContainerComponent implements OnInit {
  @Input() hasPlaceline: boolean = true;
  @Input() sidebarWidth: number;
  @Input() apiType: ApiType = ApiType.analytics;
  @Input() showFilter: boolean = true;
  @Input() showSidebar: boolean = true;
  @Input() showAll: boolean = false;
  constructor(
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
    this.userClientService.listAll.setActive();
  }

}
