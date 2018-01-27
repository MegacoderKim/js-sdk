import { Component, OnInit } from '@angular/core';
import {IDateRangePickerOptions} from "../date-range-picker/date-range-picker.component";
import {DateRange} from "ht-client";
import {DateRangeMap} from "ht-data";

@Component({
  selector: 'ht-users-list-container',
  templateUrl: './users-list-container.component.html',
  styleUrls: ['./users-list-container.component.scss']
})
export class UsersListContainerComponent implements OnInit {
  options: IDateRangePickerOptions;
  dateRangeService = new DateRange(DateRangeMap.today);
  date = DateRangeMap.today.start;
  constructor() { }

  ngOnInit() {
    this.options = {
      datePicker: true
    };
  }

  dateChange(date) {
    this.date = date
  }
  rangeChange(range) {
    this.dateRangeService.setDateRange(range)
  }

}
