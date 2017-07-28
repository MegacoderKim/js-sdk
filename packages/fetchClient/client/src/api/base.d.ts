import 'rxjs/add/observable/of';
export declare class HtBaseApi {
    private base;
    private token;
    request: any;
    constructor(base: string, token: string);
    setRequest(token: any): void;
    get(id: string, query: any): any;
    index(query: any): any;
    overview(query: any): any;
    heatmap(query: any): any;
    getReqFromTail(tail: any, query: any): any;
}
