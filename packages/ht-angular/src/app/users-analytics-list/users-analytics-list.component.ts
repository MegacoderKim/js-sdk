import {Component, Input, OnInit} from '@angular/core';
import {IAnalyticsList} from "../interfaces/analytics-list";

@Component({
  selector: 'ht-users-analytics-list',
  templateUrl: './users-analytics-list.component.html',
  styleUrls: ['./users-analytics-list.component.scss'],
})
export class UsersAnalyticsListComponent implements OnInit {
  @Input() listService: IAnalyticsList;

  constructor() {

  }

  ngOnInit() {

  }

}
