import { IDateRange } from "../interfaces";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import * as moment from "moment-mini";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { IsRangeADay, IsRangeToday, DateString } from "ht-utility";

export const defaultDateRange = {
  start: moment()
    .startOf("day")
    .toISOString(),
  end: moment()
    .endOf("day")
    .toISOString()
};

export class DateRange {
  data$: BehaviorSubject<IDateRange>;
  constructor(initialDate: Partial<IDateRange> = {}) {
    this.data$ = new BehaviorSubject({ ...defaultDateRange, ...initialDate });
  }
  get display$(): Observable<string> {
    return this.data$.asObservable().pipe(
      map((range: IDateRange) => {
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
