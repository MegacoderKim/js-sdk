import { ChangeDetectorRef, ElementRef, OnInit } from '@angular/core';
import { IDateRange, DateRange } from "ht-client";
export declare class DateRangeComponent implements OnInit {
    private elRef;
    private cd;
    dateRangeService$: DateRange;
    isRight: boolean;
    showSingleDay: boolean;
    dateRange$: any;
    dateRangeOptions$: any;
    customDates$: any;
    customDates: {
        label: string;
        range: {
            start: any;
            end: any;
        };
        isSingleDay: boolean;
        hasToday: boolean;
    }[];
    isActive: boolean;
    open(): void;
    close(): void;
    constructor(elRef: ElementRef, cd: ChangeDetectorRef);
    ngOnInit(): void;
    setDateRange(range: IDateRange): void;
}
