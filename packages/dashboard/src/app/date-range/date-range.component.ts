import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit,
  Output
} from '@angular/core';
import {IRange} from "../model/common";
import {animate, style, transition, trigger} from "@angular/animations";
import {DateRangeLabelMap, DateRangeMap, isSameDateRange} from "ht-data";
import {DateString, IsRangeADay, isSameRange, IsRangeToday} from "ht-utility";
import {IDateRange} from "ht-models";
// declare const moment: any;
@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
  trigger('calender-appear', [
    transition(":leave", [
      style({opacity: 1, height: '*'}),
      animate('200ms ease-in', style({opacity: 0, height: 0}))
    ]),
    transition(":enter", [
      style({opacity: 0, height: 0}),
      animate('200ms ease-out', style({opacity: 1, height: '*'}))
    ]),
    // transition(":enter", [
    //   style({transform: "translateX(-400px)"}),
    //   animate('200ms ease-in-out', style({transform: "translateX(0px)", opacity: 1}))
    //   ]),
    // transition(":leave", [
    //   style({transform: "translateX(0px)", opacity: 0}),
    //   animate('200ms ease-in-out', style({transform: "translateX(-400px)", opacity: 0}))
    //   ]),
    // transition("* <=> *", [
    //   // style({height: 0, opacity: 0}),
    //   query("ht-analytics-item:enter")
    //   ])
  ])
]
})
export class DateRangeComponent implements OnInit {
  @Output() rangeChange: EventEmitter<any> = new EventEmitter();
  today = new Date().toISOString();
  @Input() isToday: boolean;
  @Input() small: boolean = false;
  @Input() default: IRange = DateRangeMap.today;
  range: IRange;
  isActive: boolean = false;
  @HostListener('mouseenter')
  open() {
    this.isActive = true;
  }
  @HostListener('mouseleave')
  close() {
    this.isActive = false;
  }
  options = {
    isRight: true
  };
  constructor(
    private ref: ChangeDetectorRef,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }


  get display() {
    return this.dateRangeDisplay(this.default)
  }

  dateRangeDisplay (range: IDateRange): string {
    let rangeItem = DateRangeLabelMap.find(item => {
      return isSameDateRange(item.range, range)
    });
    if(rangeItem) return  rangeItem.label;
    // const matchKey = Object.keys(DateRangeMap).find((key) => {
    //   return isSameDateRange(DateRangeMap[key], range)
    // });
    // return "";
    let customDate = DateRangeLabelMap.find((data) => {
      let customRange = data.range;
      return isSameRange(range, customRange)
    });

    if (customDate) return customDate.label;
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
  }


  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.range = this.dateRange;
    //   this.buildDatepicker();
    // })

  }

  /* Will Update on every @Input change */
  ngOnChanges(): void {
    // this.buildDatepicker();
  }

  private setDateRange(start: string, end: string) {
    this.range = {start, end};
    this.rangeChange.next(this.range);
    // console.log(this.range, "range");
  }

  changeRange(range: IRange) {
    setTimeout(() => {
      this.isActive = false;
      this.cd.detectChanges()
    }, 200);
    this.rangeChange.next(range)
  }
}
