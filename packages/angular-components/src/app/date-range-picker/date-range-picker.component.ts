import {
  Component, OnInit, Input,
  ChangeDetectionStrategy
} from '@angular/core';
import {DateRange} from "ht-client";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {
  addDays, addMonths, addWeeks, format, isBefore, isSameDay, isSameMonth, isToday, isWithinRange, startOfMonth,
  startOfWeek
} from "date-fns";
import {of} from "rxjs/observable/of";
import {distinctUntilChanged, map, take, tap} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {IDateRange} from "ht-models";
import {combineLatest} from "rxjs/observable/combineLatest";

export interface NgDateRangePickerOptions {
  theme: 'default' | 'green' | 'teal' | 'cyan' | 'grape' | 'red' | 'gray';
  range: 'tm' | 'lm' | 'lw' | 'tw' | 'ty' | 'ly';
  dayNames: string[];
  presetNames: string[];
  dateFormat: string;
  outputFormat: string;
  startOfWeek: number;
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

// export let DATERANGEPICKER_VALUE_ACCESSOR: any = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => NgDateRangePickerComponent),
//   multi: true
// };

@Component({
  selector: 'ht-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangePickerComponent implements OnInit {
  @Input() dateRangeService: DateRange;
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
  month$;
  hint$;
  constructor() {
    let monthStart = startOfMonth(new Date());
    this.currentMonthStart$ = new BehaviorSubject<Date>(monthStart);


  };

  ngOnInit() {
    this.dates$ = combineLatest(
      this.currentMonthStart$,
      this.dateRangeService.data$,
      this.selectedDate$.pipe(
        distinctUntilChanged()
      ),
      this.hoveredDate.pipe(
        distinctUntilChanged()
      ),
      (monthStart, selectedRange, selectedDate: string, hoveredDate) => {
        let selectedDates = selectedDate ? [selectedDate] : [selectedRange.start, selectedRange.end];
        let dateStyle: IDateStyle = {selectedDates, hoveredDate};
        return this.generateDates(monthStart, dateStyle)
      }
    );

    this.month$ = this.currentMonthStart$.pipe(
      map(date => {
        return {
          display: format(date, 'MMM YY')
        }
      })
    )

    this.hint$ = this.selectedDate$.pipe(
      map((date) => {
        return date ? 'Select end date' : ""
      })
    )
  }

  changeMonth(inc: number) {
    this.currentMonthStart$.pipe(
      take(1)
    ).subscribe((month) => {
      month = addMonths(new Date(month), inc);
      this.currentMonthStart$.next(month)
    })
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
    let isHovered = false;
    if (selectedRange.end) {
      isEnd = isSameDay(selectedRange.end, date)
    }
    if (selectedRange.start) {
      isStart = isSameDay(selectedRange.start, date)
    }
    if(dateStyle.hoveredDate && dateStyle.selectedDates.length == 1) {
      isHovered = this.isHovered(date, dateStyle.selectedDates[0], dateStyle.hoveredDate)
    }
    if(dateStyle.selectedDates.length == 2) {
      isHovered = this.isHovered(date, dateStyle.selectedDates[0], dateStyle.selectedDates[1])
    }

    return {
      date: date,
      timeStamp: date.toISOString(),
      day: format(date, 'D'),
      isInMonth: isSameMonth(date, monthStart),
      today: isToday(date),
      isEnd,
      isStart,
      isHovered
    }
  };

  isHovered(date, hovered, selected): boolean {
    if (isBefore(hovered, selected)) {
      return isWithinRange(date, hovered, selected)
    } else {
      return isWithinRange(date, selected, hovered)
    }

  }

  setDateRange(range: IDateRange) {
    this.dateRangeService.data$.next(range)
  }

  getRangeFromStyle({selectedDates, hoveredDate}: IDateStyle): Partial<IDateRange> {
    if (hoveredDate) {
      return isBefore(hoveredDate, selectedDates[0]) ?
        {end: new Date(selectedDates[0]).toISOString()} : {start: new Date(selectedDates[0]).toISOString()}
    } else if(selectedDates.length == 2) {
      return isBefore(selectedDates[1], selectedDates[0]) ?
        {end: new Date(selectedDates[0]).toISOString(), start: new Date(selectedDates[1]).toISOString()} : {start: new Date(selectedDates[0]).toISOString(), end: new Date(selectedDates[1]).toISOString()}
    } else {
      return {start: selectedDates[0], end: selectedDates[1]}
    }
  }

  pickDate(date: IDay) {
    this.selectedDate$.pipe(take(1)).subscribe(selected => {
      if(selected) {
        this.setDateFromDayRange(date, selected)
      } else {
        this.selectedDate$.next(new Date(date.date).toISOString())
      }
    });
  };

  setDateFromDayRange(date: IDay, selectedDate) {
    let range =  this.getRangeFromStyle({selectedDates: [new Date(date.date).toISOString(), selectedDate], hoveredDate: null});
    // console.log(range, "range");
    this.selectedDate$.next(null);
    this.hoveredDate.next(null);
    this.setDateRange(range as IDateRange);
  }

  hoverDate(date: IDay | null) {
    let timeStamp = date ? new Date(date.date).toISOString() : null;
    if (timeStamp) {
      this.selectedDate$.pipe(take(1)).subscribe(selected => {
        if (selected) this.hoveredDate.next(timeStamp)
      })
    } else {
      this.hoveredDate.next(timeStamp)
    }

  };

  indexBy(a, v: IDay) {
    return v.timeStamp;
  }

  indexByWeek(a, v: IDay[]) {
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
  selectedDates: string[],
  hoveredDate: string | null
}
