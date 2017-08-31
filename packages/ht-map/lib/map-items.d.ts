import { HtMap, HtMapType, MapUtils } from "./interfaces";
import { HtMapItem } from "./map-item";
export declare class HtMapItems {
    mapType: HtMapType;
    itemEntities: {
        [id: string]: HtMapItem;
    };
    defaultStyle: {};
    fadeStyle: {};
    map: any;
    mapUtils: MapUtils;
    defaultOptions: {
        mapType: string;
        defaultStyle: {};
    };
    constructor(mapType: HtMapType, options?: {});
    traceOnMap(items: any[], map: HtMap): void;
    trace(items: any[], map: HtMap, setMap?: boolean): void;
    getItem(data: any): HtMapItem;
    itemEffect(item: any): void;
    traceItemEffect(itemEntities: {}): void;
    extendBounds(bounds: any): any;
    addClick(cb: any): void;
    onHoverIn(cb: any): void;
    onHoverOut(cb: any): void;
    unHighlight(): void;
    highlight(selectedItem: any, toHighlight?: boolean): void;
    unHighlightItem(item: any): void;
    highlightItem(item: any): void;
    setFade(selectedItem: any, toFade?: boolean): void;
    resetHighlights(): void;
    onEach(cb: any): void;
    resetHighlight(item: any): void;
    resetItems(): void;
    resetItem(item: any): void;
    bustOlditem(): void;
    private traceItems(items, setMap?);
    private updateItem(data, setMap?);
    private createItem(data, setMap?);
    removeItem(item: any): void;
    clearAll(): void;
}
