import { IAnalyticsItem } from "../interfaces/analytics-item";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
export declare class AnalyticsItemsService {
    presets: any;
    chosenItemCreater: any[];
    items$: BehaviorSubject<IAnalyticsItem[]>;
    filteredItems$: Observable<IAnalyticsItem[]>;
    allTags$: Observable<string[]>;
    tags$: Observable<ISelectedTag[]>;
    selectedTags$: BehaviorSubject<string[]>;
    totalTags: number;
    constructor();
    private isItemCreatorActive(itemCreator);
    toggleTag(tag: string): void;
    selectTag(tag: string): void;
    setPreset(choosenPreset: any): void;
    getItems(itemsConfigs: any): any;
    initServices(): void;
    private setServicesActive(isActive?);
    destroy(): void;
}
export interface ISelectedTag {
    key: string;
    isActive: boolean;
}
