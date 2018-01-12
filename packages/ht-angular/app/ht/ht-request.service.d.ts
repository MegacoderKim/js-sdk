import { Observable } from "rxjs/Observable";
import { HtRequest } from "ht-client";
import { HttpClient } from "@angular/common/http";
export declare class HtRequestService extends HtRequest {
    private http;
    constructor(http: HttpClient);
    getObservable<T>(url: any, options?: object): Observable<T>;
    postObservable<T>(url: any, body: any, options?: object): Observable<T>;
}
