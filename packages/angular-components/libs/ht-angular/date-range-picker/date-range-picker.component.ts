import {
  Component, OnInit, Input,
  ChangeDetectionStrategy, OnChanges, Output, EventEmitter
} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {
  addDays, addMonths, addWeeks, endOfDay, format, isBefore, isFuture, isSameDay, isSameMonth, isToday, isWithinRange,
  startOfMonth,
  startOfWeek, differenceInDays
} from "date-fns";
import {distinctUntilChanged, map, take} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {IDateRange} from "ht-models";
import {combineLatest} from "rxjs/observable/combineLatest";
import {DateRangeLabelMap, isSameDateRange, dateRangeDisplay} from "ht-data";

export interface IDateRangePickerOptions {
  hideSingleDay?: boolean,
  isRight?: boolean,
  datePicker?: boolean
  hideCalender?: boolean,
  maxDays?: number
  customDateRanges?: string[]
}

export interface IDay {
  date: Date;
  timeStamp: string,
  day: string;
  isInMonth: boolean,
  // weekday: number;
  today: boolean;
  isStart?: boolean,
  isEnd?: boolean,
  isHovered?: boolean,
  isInvalid?: boolean,
  // firstMonthDay: boolean;
  // lastMonthDay: boolean;
  // visible: boolean;
  // from: boolean;
  // to: boolean;
  isWithinRange?: boolean;
}

@Component({
  selector: 'ht-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangePickerComponent implements OnInit, OnChanges {
  @Input() dateRange: IDateRange;
  @Input() date: string;
  // @Input() customDateRanges: string[] | null = null;
  @Input() options: IDateRangePickerOptions = {};
  @Output() onRangeChange: EventEmitter<IDateRange> = new EventEmitter<IDateRange>();
  @Output() onDateChange: EventEmitter<string> = new EventEmitter<string>();
  currentMonthStart$: BehaviorSubject<Date>;
  dates$: Observable<IDay[][]>;
  // selectedDates$: BehaviorSubject<Partial<IDateRange>> = new BehaviorSubject<Partial<IDateRange>>({end: new Date().toISOString()});
  selectedDate$: BehaviorSubject<string | null> = new BehaviorSubject<string|null>(null)
  hoveredDate: BehaviorSubject<string | null> = new BehaviorSubject<string|null>(null);
  days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ];
  month$: Observable<{display: string}>;
  currentDateStyle$: Observable<IDateStyle>;
  display: string;
  customDates$: any[];
  constructor() {
    let monthStart = startOfMonth(new Date());
    this.currentMonthStart$ = new BehaviorSubject<Date>(monthStart);
  };

  ngOnInit() {

  };

  get customDates() {
    return DateRangeLabelMap.filter(customRange => {
      let singleDataPass = !this.options.hideSingleDay ? true : !customRange.isSingleDay;
      let allowedDateRange = this.options.customDateRanges ? this.options.customDateRanges.includes(customRange['key']) : true;
      return singleDataPass && allowedDateRange
    });
  }

  ngOnChanges() {
    if(this.options.datePicker) {
      this.dateRange = {end: this.date, start: this.date};
    }
    this.initDateRange(this.dateRange);
    this.display = dateRangeDisplay(this.dateRange)
  }

  initDateRange(range: IDateRange) {
    this.customDates$ = this.customDates.map((customRange) => {
      return isSameDateRange(customRange.range, range) ? {...customRange, isActive: true} : {...customRange}
    });

    this.currentDateStyle$ = combineLatest(
      this.selectedDate$.pipe(
        distinctUntilChanged()
      ),
      this.hoveredDate.pipe(
        distinctUntilChanged()
      ),
      (selectedDate: string | null, hoveredDate: string | null) => {
        let dateRange = range;
        let selectedRange;
        let display;
        if (selectedDate && hoveredDate) {
          if(isBefore(hoveredDate, selectedDate)) {
            selectedRange = {end: selectedDate};
            display = [null, format(selectedDate, 'DD MMM')]
          } else {
            selectedRange = {start: selectedDate};
            display = [format(selectedDate, 'DD MMM'), null]
          }
        } else if(selectedDate) {
          selectedRange = {end: selectedDate};
          display = [format(selectedDate, 'DD MMM'), null]
        } else {
          selectedRange = dateRange;
          display = [format(dateRange.start, 'DD MMM'), format(dateRange.end, 'DD MMM')]
        }

        if (this.options.datePicker) {
          display = [format(dateRange.start, 'DD MMM')]
        }

        return {
          selectedRange,
          hoveredDate,
          display
        }
      }
    );

    this.dates$ = combineLatest(
      this.currentMonthStart$,
      this.currentDateStyle$,
      (monthStart, dateStyle: IDateStyle) => {
        // let selectedDates = selectedDate ? [selectedDate] : [selectedRange.start, selectedRange.end];
        // let dateStyle: IDateStyle = {selectedDates, hoveredDate};
        return this.generateDates(monthStart, dateStyle)
      }
    );

    this.month$ = this.currentMonthStart$.pipe(
      map(date => {
        return {
          display: format(date, 'MMM YY')
        }
      })
    );

  }

  changeMonth(inc: number) {
    let month = addMonths(new Date(this.currentMonthStart$.getValue()), inc);
    this.currentMonthStart$.next(month)
  }

  generateDates(monthStart: Date, dateStyle: IDateStyle) {
    let start = startOfWeek(monthStart);
    let weekStarts = [0,1,2,3,4,5].map((v, i) => {
      return addWeeks(start, i)
    });
    let days = weekStarts.map((weekStart) => {
      return [0,1,2,3,4,5,6].map((i) => {
        let date = addDays(weekStart, i);
        return this.getDay(date, monthStart, dateStyle)
      })
    });
    // console.log(days);
    return days

  }

  getDay(date: Date, monthStart: Date, dateStyle: IDateStyle): IDay {
    // console.log(dateStyle);
    const selectedRange = this.getRangeFromStyle(dateStyle);
    let isEnd = false;
    let isStart = false;
    let isHovered = this.isHovered(date, dateStyle);
    if (selectedRange.end) {
      isEnd = isSameDay(selectedRange.end, date)
    }
    if (selectedRange.start) {
      isStart = isSameDay(selectedRange.start, date)
    }
    let isInvalid = isFuture(date);
    if (this.options.maxDays) {
      let selected = this.selectedDate$.getValue();
      if (selected) {
        const withinMaxDay = this.isWithinMaxDays(date.toISOString(), selected);
        isInvalid = isInvalid || !withinMaxDay;
      }
    }

    // if(dateStyle.hoveredDate) {
    //   isHovered = this.isHovered(date, dateStyle.selectedDates[0], dateStyle.hoveredDate)
    // }
    // if(dateStyle.selectedDates.length == 2) {
    //   isHovered = this.isHovered(date, dateStyle.selectedDates[0], dateStyle.selectedDates[1])
    // }

    return {
      date: date,
      timeStamp: date.toISOString(),
      day: format(date, 'D'),
      isInMonth: isSameMonth(date, monthStart),
      today: isToday(date),
      isEnd,
      isStart,
      isHovered,
      isInvalid
    }
  };

  isHovered(date: Date, dateStyle: IDateStyle): boolean {
    let hovered = dateStyle.hoveredDate;
    let start = dateStyle.selectedRange.start || hovered;
    let end = dateStyle.selectedRange.end || hovered || start;
    return isWithinRange(date, start, end);
    // if (isBefore(hovered, selected)) {
    //   return isWithinRange(date, hovered, selected)
    // } else {
    //   return isWithinRange(date, selected, hovered)
    // }

  }

  setDateRange(range: IDateRange) {
    range = {start: range.start, end: endOfDay(range.end).toISOString()};
    this.onRangeChange.next(range);
  }

  setDate(date: IDay) {
    this.onDateChange.next(date.timeStamp);
  }

  getRangeFromStyle({selectedRange, hoveredDate}: IDateStyle): Partial<IDateRange> {
    return selectedRange
    // if (hoveredDate) {
    //   return isBefore(hoveredDate, selectedDates[0]) ?
    //     {end: new Date(selectedDates[0]).toISOString()} : {start: new Date(selectedDates[0]).toISOString()}
    // } else if(selectedDates.length == 2) {
    //   return isBefore(selectedDates[1], selectedDates[0]) ?
    //     {end: new Date(selectedDates[0]).toISOString(), start: new Date(selectedDates[1]).toISOString()} : {start: new Date(selectedDates[0]).toISOString(), end: new Date(selectedDates[1]).toISOString()}
    // } else {
    //   return {start: selectedDates[0], end: selectedDates[1]}
    // }
  }

  pickDate(date: IDay) {
    if (date.isInvalid) return false;
    if(this.options.datePicker) {
      this.setDate(date)
    } else {
      this.currentDateStyle$.pipe(take(1)).subscribe(dateStyle => {
        if(dateStyle.hoveredDate || (!dateStyle.selectedRange.start || !dateStyle.selectedRange.end)) {
          this.setDateFromDayRange(date, dateStyle)
        } else {
          this.selectedDate$.next(new Date(date.date).toISOString())
        }
      });
    }

  };

  setDateFromDayRange(date: IDay, dateStyle: IDateStyle) {
    let range = {end: dateStyle.selectedRange.end || date.timeStamp, start: dateStyle.selectedRange.start || date.timeStamp};
    const isWithinMaxDay = this.isWithinMaxDays(range.start, range.end);
    // console.log(range, "range");
    this.selectedDate$.next(null);
    this.hoveredDate.next(null);
    if (isWithinMaxDay) this.setDateRange(range);
  }

  hoverDate(date: IDay | null) {
    let timeStamp = date ? new Date(date.date).toISOString() : null;
    if (timeStamp) {
      let selected = this.selectedDate$.getValue();
      const isWithinMaxDays = this.isWithinMaxDays(selected, timeStamp);
      if (selected && isWithinMaxDays) {
        this.hoveredDate.next(timeStamp)
      }
    } else {
      this.hoveredDate.next(timeStamp)
    }

  };

  private isWithinMaxDays(selected, hovered) {
    return this.options.maxDays ? Math.abs(differenceInDays(selected, hovered)) <= this.options.maxDays : true;
  }

  indexBy(a: any, v: IDay) {
    return v.timeStamp;
  }

  indexByWeek(a: any, v: IDay[]) {
    return v[0].timeStamp;
  }

  reset() {
    this.selectedDate$.next(null);
    this.hoveredDate.next(null);
    let monthStart = startOfMonth(new Date());
    this.currentMonthStart$.next(monthStart)
  }


}

export interface IDateStyle {
  // selectedDates?: string[],
  selectedRange?: Partial<IDateRange>
  hoveredDate: string | null,
  display?: Array<string | null>,
}
