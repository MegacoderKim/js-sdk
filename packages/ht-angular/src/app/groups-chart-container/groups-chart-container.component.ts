import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IGroup} from "ht-models";
import {GroupsChartService} from "./groups-chart.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'ht-groups-chart-container',
  templateUrl: './groups-chart-container.component.html',
  styleUrls: ['./groups-chart-container.component.less']
})
export class GroupsChartContainerComponent implements OnInit {
  loading: boolean = false;

  @Input() groupId: string;
  @Output() onGroup: EventEmitter<IGroup> = new EventEmitter();
  constructor(
    public groupsChartService: GroupsChartService
  ) {

  }

  ngOnInit() {
    const groupId = this.groupId ? this.groupId : null;
    this.groupsChartService.setRootGroupId(groupId)


  }

  get selectedGroups$(): BehaviorSubject<Array<IGroup | null>> {
    return this.groupsChartService.selectedGroups$;
  }

  get groupsLevels$(): Observable<any[]> {
    return this.groupsChartService.groupsLevels$;
  }

  // get selectedGroups() {
  //   return this.groupsChartService.selectedGroups;
  // }
  //
  // get groupsLevels() {
  //   return this.groupsChartService.groupsLevels;
  // }
  //
  // get selectedGroup$() {
  //   return this.groupsChartService.selectedGroup$;
  // }

  setGroup(group) {
    this.onGroup.next(group)
  }

  selectGroup(group, level, event) {
    const id = group.id;
    event.stopPropagation();
    event.preventDefault();
    this.groupsChartService.setSelectedGroup(group, level + 1)

  }

}
