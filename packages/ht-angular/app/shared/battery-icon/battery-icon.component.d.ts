import { OnInit } from '@angular/core';
export declare class BatteryIconComponent implements OnInit {
    battery: number;
    layout: 'column' | 'row';
    constructor();
    ngOnInit(): void;
    batteryClass(level: any): string;
}
