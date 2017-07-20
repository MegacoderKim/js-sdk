export declare class CustomRichMarker {
    marker: any;
    constructor(content?: string);
    render(position: any, map: any, content?: string): void;
    setMap(map: any): void;
    setPosition(position: any): void;
    setMarkerDiv(content: string): void;
    getMap(): any;
    clear(): void;
    getPosition(): any;
}
