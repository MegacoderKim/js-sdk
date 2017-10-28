import {Component, Input, OnInit} from '@angular/core';
import * as _ from "underscore";
import {IGroup} from "ht-models";
import {HtClientService} from "../ht/ht-client.service";
@Component({
  selector: 'ht-groups-container',
  templateUrl: './groups-container.component.html',
  styleUrls: ['./groups-container.component.less']
})
export class GroupsContainerComponent implements OnInit {
  groups$;
  @Input() groupIdParam: string = 'id';
  constructor(
    private clientService: HtClientService
  ) { }

  ngOnInit() {
    this.clientService.groups.list.setActive();
    this.groups$ = this.clientService.groups.list.dataArray$;
    // this.clientService.groups.list.setOptions({query: {}});
    // this.clientService.groups.list.initListener();
    // this.groups$ = this.clientService.groups.list.dataArray$.map((groups) => {
    //   return _.filter(groups, (group: IGroup) => !!group[this.groupIdParam])
    // })
  }

}
