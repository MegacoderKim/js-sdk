import { IDateRange } from "../interfaces";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import * as moment from "moment-mini";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { IsRangeADay, IsRangeToday, DateString } from "ht-utility";
import {DateRangeMap, isSameDateRange} from "ht-data";
import {DateRangeLabelMap} from "ht-data";

export const defaultDateRange = {...DateRangeMap.today};


export class DateRange {
  data$: BehaviorSubject<IDateRange>;
  constructor(initialDate: Partial<IDateRange> = {}) {
    this.data$ = new BehaviorSubject({ ...defaultDateRange, ...initialDate });
  }
  get display$(): Observable<string> {
    return this.data$.asObservable().pipe(
      map((range: IDateRange) => {
        // console.log("range", range, DateRangeMap);
        let rangeItem = DateRangeLabelMap.find(item => {
          return isSameDateRange(item.range, range)
        });
        if(rangeItem) return  rangeItem.label;
        // const matchKey = Object.keys(DateRangeMap).find((key) => {
        //   return isSameDateRange(DateRangeMap[key], range)
        // });
        // return "";
        let isSingleDay = IsRangeADay(range);
        if (isSingleDay) {
          let isToday = IsRangeToday(range);
          let suffix = isToday ? "Today " : "";
          let string = suffix + DateString(range.start);
          return string;
        } else {
          // console.log(DateString(range.start), range.start);
          return DateString(range.start) + " - " + DateString(range.end);
        }
      })
    );
  }
}
export const dateRangeFactory = (initialDate: Partial<IDateRange> = {}) => {
  return new DateRange(initialDate);
};

export const dateRangeService = (() => {
  var instance;

  return {
    getInstance(initialDate?: IDateRange) {
      if (!instance) {
        instance = dateRangeFactory(initialDate);
      }
      return instance;
    }
  };
})();
