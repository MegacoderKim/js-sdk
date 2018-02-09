import { AfterViewInit, ElementRef, OnInit, EventEmitter } from '@angular/core';
import { HtMapService } from "../ht/ht-map.service";
import { HtMap, MapInstance } from "ht-maps";
export declare class MapComponent implements OnInit, AfterViewInit {
    private elRef;
    options: any;
    setBoundsOptions: any;
    mapInstance: MapInstance;
    loading: boolean;
    showReset: boolean;
    onReady: EventEmitter<HtMap>;
    onMapReset: EventEmitter<boolean>;
    mapElem: any;
    constructor(elRef: ElementRef, htMapService: HtMapService);
    onMapResize(): void;
    ngOnInit(): void;
    resetMap(): void;
    ngAfterViewInit(): void;
}
