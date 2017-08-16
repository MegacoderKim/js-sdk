import { Observable } from "rxjs/Observable";
export declare class HtRequest {
    private token;
    baseUrl: string;
    constructor(token?: string);
    headerObj(): {
        'Authorization': string;
    };
    headerStrings(): [string, string];
    url(url: string, query?: {}): string;
    getObservable(url: any, options?: object): Observable<any>;
    postObservable(url: any, body: any, options?: object): Observable<{}>;
    api$(url: string, query: any): Observable<any>;
    postApi$(url: any, body: any, options?: any): Observable<{}>;
}
