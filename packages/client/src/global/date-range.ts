import { IDateRange } from "../interfaces";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import {DateRangeMap} from "ht-data";
import { dateRangeDisplay } from "ht-utility"

export const defaultDateRange = {...DateRangeMap.today};


export class DateRange {
  dataBehaviour$: BehaviorSubject<IDateRange>;
  data$: Observable<IDateRange>;
  constructor(initialDate: Partial<IDateRange> = {}) {
    this.dataBehaviour$ = new BehaviorSubject({ ...defaultDateRange, ...initialDate });
    this.data$
  };

  setDateRange(dateRange: IDateRange) {
    this.dataBehaviour$.next(dateRange);
  }

  getDateRange(): IDateRange {
    return this.dataBehaviour$.getValue()
  }

  get display$(): Observable<string> {
    return this.data$.pipe(
      map((range: IDateRange) => {
        return dateRangeDisplay(range)
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
