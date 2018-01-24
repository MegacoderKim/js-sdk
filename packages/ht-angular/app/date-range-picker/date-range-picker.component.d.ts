import { OnInit, OnChanges, EventEmitter } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { IDateRange } from "ht-models";
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
    timeStamp: string;
    day: string;
    isInMonth: boolean;
    today: boolean;
    isStart?: boolean;
    isEnd?: boolean;
    isHovered?: boolean;
    isInvalid?: boolean;
    isWithinRange?: boolean;
}
export declare class DateRangePickerComponent implements OnInit, OnChanges {
    dateRange: IDateRange;
    options: {
        hideSingleDay: boolean;
        isRight: boolean;
    };
    onRangeChange: EventEmitter<IDateRange>;
    currentMonthStart$: BehaviorSubject<Date>;
    dates$: Observable<IDay[][]>;
    selectedDate$: BehaviorSubject<string | null>;
    hoveredDate: BehaviorSubject<string | null>;
    days: string[];
    month$: any;
    currentDateStyle$: Observable<IDateStyle>;
    display$: any;
    hint$: any;
    customDates: {
        label: string;
        range: {
            start: any;
            end: any;
        };
        isSingleDay: boolean;
        hasToday: boolean;
    }[];
    customDates$: any;
    constructor();
    ngOnInit(): void;
    ngOnChanges(): void;
    changeMonth(inc: number): void;
    generateDates(monthStart: Date, dateStyle: IDateStyle): IDay[][];
    getDay(date: Date, monthStart: Date, dateStyle: IDateStyle): IDay;
    isHovered(date: any, dateStyle: IDateStyle): boolean;
    setDateRange(range: IDateRange): void;
    getRangeFromStyle({selectedRange, hoveredDate}: IDateStyle): Partial<IDateRange>;
    pickDate(date: IDay): boolean;
    setDateFromDayRange(date: IDay, dateStyle: IDateStyle): void;
    hoverDate(date: IDay | null): void;
    indexBy(a: any, v: IDay): string;
    indexByWeek(a: any, v: IDay[]): string;
    reset(): void;
}
export interface IDateStyle {
    selectedRange?: Partial<IDateRange>;
    hoveredDate: string | null;
    display?: [string | null, string | null];
}
