import {Component, Input, OnInit} from '@angular/core';
import {HtGroupsService} from "../ht/ht-groups.service";
@Component({
  selector: 'ht-groups-container',
  templateUrl: './groups-container.component.html',
  styleUrls: ['./groups-container.component.less']
})
export class GroupsContainerComponent implements OnInit {
  groups$;
  @Input() groupIdParam: string = 'id';
  constructor(
    private groupsClient: HtGroupsService
  ) { }

  ngOnInit() {
    this.groupsClient.list.setActive();
    this.groups$ = this.groupsClient.list.dataArray$;
    // this.clientService.groups.list.setOptions({query: {}});
    // this.clientService.groups.list.initListener();
    // this.groups$ = this.clientService.groups.list.dataArray$.map((groups) => {
    //   return _.filter(groups, (group: IGroup) => !!group[this.groupIdParam])
    // })
  }

}
