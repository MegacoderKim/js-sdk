import { Component, OnInit } from '@angular/core';
import {NgDateRangePickerOptions} from "../date-range-picker/date-range-picker.component";
import {DateRange} from "ht-client";
import {DateRangeMap} from "ht-data";

@Component({
  selector: 'ht-users-list-container',
  templateUrl: './users-list-container.component.html',
  styleUrls: ['./users-list-container.component.scss']
})
export class UsersListContainerComponent implements OnInit {
  options: NgDateRangePickerOptions;
  dateRangeService = new DateRange(DateRangeMap.today);
  constructor() { }

  ngOnInit() {
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yMd',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 1
    };
  }

}
