import {Component, Input, OnInit} from '@angular/core';
// import * as moment from 'moment-mini'
import moment from 'moment-mini'
import {IDateRange, dateRangeService} from "ht-client";
import {HtUsersService} from "../../ht/ht-users.service";

@Component({
  selector: 'ht-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.less']
})
export class DateRangeComponent implements OnInit {
  @Input() dateRangeService$ = dateRangeService.getInstance();
  @Input() isRight: boolean = false;
  dateRange$;
  // todo add all date range

  customDates = [
    {
      label: "Today",
      range: {
        start: moment().startOf('day').toISOString(),
        end: moment().endOf('day').toISOString()
      }
    },
    {
      label: "Yesterday",
      range: {
        start: moment().subtract(1, 'days').toISOString(),
        end: moment().subtract(1, 'days').endOf('day').toISOString()
      }
    },
    {
      label: "Last 7 days",
      range: {
        start: moment().subtract(6, 'days').toISOString(),
        end: moment().endOf('day').toISOString()
      }
    },
    {
      label: "This month",
      range: {
        start: moment().startOf('month').toISOString(),
        end: moment().endOf('day').toISOString()
      }
    },
    {
      label: "Last 30 days",
      range: {
        start: moment().subtract(29, 'days').toISOString(),
        end: moment().endOf('day').toISOString()
      }
    }
  ];

  constructor(
    private usersClientService: HtUsersService
  ) { }

  ngOnInit() {
    this.dateRange$ = this.dateRangeService$.display$;
  }

  setDateRange(range: IDateRange) {
    this.dateRangeService$.data$.next(range)
  }

}