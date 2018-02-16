import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input,
  OnInit
} from '@angular/core';
// import * as moment from 'moment-mini'
import {IDateRange, dateRangeService, DateRange} from "ht-client";
import {DateRangeMap, isSameDateRange, DateRangeLabelMap} from "ht-data";
import {of} from "rxjs/observable/of";
import {map} from "rxjs/operators";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'ht-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('calender-appear', [
      transition(":leave", [
        style({pointerEvents: 'none'}),
        animate('150ms ease-in', style({opacity: 0, top: "-10px"}))
      ]),
      transition(":enter", [
        style({opacity: 0, height: 0, top: "-10px"}),
        animate('150ms ease-out')
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
  @Input() dateRangeService$: DateRange = dateRangeService.getInstance();
  @Input() isRight: boolean = false;
  @Input() showSingleDay: boolean = true;
  dateRange$;
  // todo add all date range
  dateRangeOptions$;
  customDates$;
  customDates = DateRangeLabelMap;
  isActive: boolean = false;
  @HostListener('mouseenter')
  open() {
    this.isActive = true;
  }
  @HostListener('mouseleave')
  close() {
    this.isActive = false;
  }
  constructor(
    private elRef:ElementRef,
    private cd: ChangeDetectorRef
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
    this.dateRangeService$.setDateRange(range);
    setTimeout(() => {
      this.isActive = false;
      this.cd.detectChanges()
    }, 200)

  }

}
