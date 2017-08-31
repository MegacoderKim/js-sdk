import { HtMapItem } from "./map-item";
import { HtBounds, HtMap } from "./interfaces";
export declare class HtPolyline extends HtMapItem {
    constructor(mapType: any, options?: any);
    update(data: any, map: HtMap): void;
    getEncodedPath(data: any): any;
    extendBounds(bounds: HtBounds): HtBounds;
}
