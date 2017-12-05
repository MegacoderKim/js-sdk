import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AllData} from "ht-client";
import {IGroup} from "ht-models";
import * as _ from "underscore";
import {HtGroupsService} from "../ht/ht-groups.service";

@Component({
  selector: 'ht-groups-chart-container',
  templateUrl: './groups-chart-container.component.html',
  styleUrls: ['./groups-chart-container.component.less']
})
export class GroupsChartContainerComponent implements OnInit {
  // groupService;
  progress: number = 0;
  groupsLevels = [];
  selectedGroups = [];
  loading: boolean = false;
  noChild: boolean = false;
  @Output() onGroup: EventEmitter<IGroup> = new EventEmitter();
  constructor(
    private groupService: HtGroupsService
  ) {
    // this.groupService = clientService.groups;
  }

  ngOnInit() {
    // this.fillChildren("ecaec5e3-accb-4f77-a8bc-9dd54e38dc47")
    this.fillChildren()
    // this.groupService.getChildren("ecaec5e3-accb-4f77-a8bc-9dd54e38dc47").do((data: AllData<IGroup>) => {
    //   const totalCount = data.count;
    //   const currentCount = data ? Object.keys(data.resultsEntity).length : 0;
    //   this.progress = 100 * currentCount / totalCount;
    //   const isDone = data && !data.next;
    //   if (isDone) {
    //     this.progress = 100;
    //     let groups = _.values(data.resultsEntity);
    //     this.setGroups(groups, 1)
    //   }
    //   console.log("all groups", data);
    // })
  }

  fillChildren(id?, level: number = 0) {
    this.clearTree(level);
    this.loading = true;
    const groups$ = id ? this.groupService.getChildren(id) : this.groupService.getRoot();
    groups$.subscribe((data: AllData<IGroup>) => {
      const totalCount = data.count;
      const currentCount = data ? Object.keys(data.resultsEntity).length : 0;
      this.progress = 100 * currentCount / totalCount;
      const isDone = data && !data.next;
      if (isDone) {
        this.loading = false;
        this.progress = 100;
        const groups = _.values(data.resultsEntity);
        this.setGroups(groups, level)
      }
    })
  }

  setGroups(groups, level) {
    // this.groupsLevels.splice(level, this.groupsLevels.length, groups)

    if (groups.length === 0) {
      this.noChild = true;
    } else {
      this.groupsLevels[level] = groups;
    }
  };

  setGroup(group) {
    this.onGroup.next(group)
  }

  selectGroup(group, level, event) {
    const id = group.id;
    event.stopPropagation();
    event.preventDefault();
    // this.selectedGroups.splice(level, this.selectedGroups.length, id);
    this.selectedGroups[level] = id;
    level = +level + 1;
    this.fillChildren(id, level)
  }

  clearTree(level) {
    this.selectedGroups.splice(level);
    this.groupsLevels.splice(level);
    this.noChild = false;
  }

}
