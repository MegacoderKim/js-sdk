import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { ActionsStatusGraphService } from "./actions-status-graph.service";
export declare class ActionsStatusGraphComponent implements OnInit, AfterViewInit, OnDestroy {
    service: ActionsStatusGraphService;
    data: any;
    chart: any;
    noData: boolean;
    charElem: any;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    setChart(data: any): boolean;
    ngOnDestroy(): void;
}
