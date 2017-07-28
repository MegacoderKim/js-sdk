import { Observable } from "rxjs/Observable";
export declare class HtRequest {
    private token;
    private options;
    baseUrl: string;
    constructor(token: any, options?: any);
    headerObj(): {
        'Authorization': string;
    };
    url(url: string, query?: {}): string;
    getObservable(url: any, options?: object): Observable<any>;
    postObservable(url: any, body: any, options?: object): Observable<{}>;
    api$(url: string, query: any): Observable<any>;
    postApi$(url: any, body: any, options?: any): Observable<{}>;
}
export declare const htRequest: (token: string, options?: any) => HtRequest;
