import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {IAction, Page} from "ht-models";
import 'rxjs/add/operator/expand';
import {HtListClient} from "../../base/list-client";
import {HtActionsApi} from "../../api/actions";

export class HtActionsListClient extends HtListClient{

  api: HtActionsApi;
  pageDataBeh$: BehaviorSubject<Page<IAction> | null> =  new BehaviorSubject(null);

  setApi(request) {
    this.api =  new HtActionsApi(request);
  }

  get pageData$(): Observable<Page<IAction>> {
    // return this.query.switchMap((query) => this.update(query, this.config.isLive))
    return this.pageData$;
  }

}