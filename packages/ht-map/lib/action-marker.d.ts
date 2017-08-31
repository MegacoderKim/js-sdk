import { HtMapItem } from "./map-item";
import { IActionMap, IAction } from "ht-models";
import { HtMapType } from "./interfaces";
export declare class HtActionMarker extends HtMapItem {
    mapType: HtMapType;
    showExpected: boolean;
    hasExpected: boolean;
    constructor(showExpected: boolean, mapType: HtMapType, options?: {});
    getInfoContent(item: IActionMap | IAction): string;
    unselectedContent(): string;
}
