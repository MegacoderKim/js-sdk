import { AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { HtMapService } from "../ht/ht-map.service";
import { HtUsersService } from "../ht/ht-users.service";
export declare class MapComponent implements OnInit, AfterViewInit {
    private elRef;
    private mapService;
    private userService;
    options: any;
    constructor(elRef: ElementRef, mapService: HtMapService, userService: HtUsersService);
    onMapResize(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
