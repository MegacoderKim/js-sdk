import { AfterViewInit, ElementRef, OnInit, EventEmitter } from '@angular/core';
import { HtMap, MapInstance } from "ht-maps";
export declare class MapComponent implements OnInit, AfterViewInit {
    private elRef;
    options: any;
    onReady: EventEmitter<HtMap>;
    mapInstance: MapInstance;
    loading: boolean;
    showReset: boolean;
    mapElem: any;
    constructor(elRef: ElementRef);
    onMapResize(): void;
    ngOnInit(): void;
    resetMap(): void;
    ngAfterViewInit(): void;
}
