import { OnInit } from '@angular/core';
import { IDateRange } from "ht-client";
export declare class DateRangeComponent implements OnInit {
    dateRangeService$: any;
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
    constructor();
    ngOnInit(): void;
    setDateRange(range: IDateRange): void;
}
