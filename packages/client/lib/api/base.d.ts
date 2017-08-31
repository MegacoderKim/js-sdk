import 'rxjs/add/observable/of';
export declare class HtBaseApi {
    private base;
    request: any;
    constructor(base: string, request: any);
    setRequest(request: any): void;
    get(id: string, query: any): any;
    index(query: any): any;
    summary(query: any): any;
    heatmap(query: any): any;
    getReqFromTail(tail: any, query: any): any;
    placeline(id: any, query: any): any;
}
