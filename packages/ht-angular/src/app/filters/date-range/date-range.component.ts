import {Component, Input, OnInit} from '@angular/core';
// import * as moment from 'moment-mini'
import moment from 'moment-mini'
import {IDateRange, dateRangeService} from "ht-client";
import {DateRangeMap, isSameDateRange, DateRangeLabelMap} from "ht-data";
import {of} from "rxjs/observable/of";
import {map} from "rxjs/operators";

@Component({
  selector: 'ht-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.less']
})
export class DateRangeComponent implements OnInit {
  @Input() dateRangeService$ = dateRangeService.getInstance();
  @Input() isRight: boolean = false;
  @Input() showSingleDay: boolean = true;
  dateRange$;
  // todo add all date range
  dateRangeOptions$;
  customDates$;
  customDates = DateRangeLabelMap;

  constructor(

  ) { }

  ngOnInit() {
    this.dateRange$ = this.dateRangeService$.display$;
    // this.customDates$ = of(this.customDates);
    this.dateRangeOptions$ = this.dateRangeService$.data$.pipe(
      map((dateRange: IDateRange) => {
        return this.customDates.filter(customRange => {
          return this.showSingleDay ? true : !customRange.isSingleDay;
        }).map((customRange) => {
          return isSameDateRange(customRange.range, dateRange) ? {...customRange, isActive: true} : {...customRange}
        })
      })
    )

    this.dateRangeOptions$.subscribe()
  }

  setDateRange(range: IDateRange) {
    this.dateRangeService$.data$.next(range)
  }

}
