import { IAction } from "../model";
export declare class Destination {
    marker: any;
    constructor();
    update(action: IAction, map: any): void;
    getPosition(): any;
    clear(): void;
    getMap(): any;
    private getContent(action);
    private secToMin(durationMin);
}
