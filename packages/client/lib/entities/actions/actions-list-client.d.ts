import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { IAction, Page } from "ht-models";
import 'rxjs/add/operator/expand';
import { HtListClient } from "../../base/list-client";
import { HtActionsApi } from "../../api/actions";
export declare class HtActionsListClient extends HtListClient {
    api: HtActionsApi;
    pageDataBeh$: BehaviorSubject<Page<IAction> | null>;
    setApi(request: any): void;
    readonly pageData$: Observable<Page<IAction>>;
}
