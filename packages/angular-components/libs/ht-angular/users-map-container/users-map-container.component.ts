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
  @Input() sidebarWidth: number;
  @Input() view: string | null = null;
  @Input() query: object = {};
  @Input() userId: string | null = null;
  constructor(

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
    // this.userClientService.listAll.setActive();
  }

}
