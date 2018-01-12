import { ComponentFactoryResolver, OnInit } from '@angular/core';
import { AnalyticsSlotDirective } from "./analytics-slot.directive";
import { IAnalyticsItem } from "../../interfaces/analytics-item";
export declare class AnalyticsItemComponent implements OnInit {
    private componentFactoryResolver;
    slot: AnalyticsSlotDirective;
    item: IAnalyticsItem;
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    private addComponent();
}
