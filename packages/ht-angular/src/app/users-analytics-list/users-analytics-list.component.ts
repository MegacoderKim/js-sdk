import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IAnalyticsList} from "../interfaces/analytics-list";
import {IUserAnalytics} from "ht-models/dist/typings/user";

@Component({
  selector: 'ht-users-analytics-list',
  templateUrl: './users-analytics-list.component.html',
  styleUrls: ['./users-analytics-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersAnalyticsListComponent implements OnInit, OnDestroy {
  @Input() listService: IAnalyticsList;
  selectedUser: IUserAnalytics | null = null;
  constructor() {

  }

  ngOnInit() {

  }

  showUserDetail(row) {
    this.selectedUser = row.data;
  }

  closeModal() {
    this.selectedUser = null;
  }

  ngOnDestroy() {
    this.listService.client.destroy();
    // this.listService.client.list.dataSub.unsubscribe()
  }

}
