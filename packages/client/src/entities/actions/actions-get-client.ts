import {HtActionsApi} from "../../api/actions";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Page, IAction} from "ht-models";
import {Observable} from "rxjs/Observable";
import {ItemClient} from "../../base/item-client";
import {IItemClientOptions} from "../../interfaces";

export class HtActionsGetClient extends ItemClient<IAction>{

  api: HtActionsApi;
  dataBeh$: BehaviorSubject<Page<IAction> | null> =  new BehaviorSubject(null);

  setApi(request) {
    this.api =  new HtActionsApi(request);
  }

  defaultItemClientOptions: IItemClientOptions;

  get pageData$(): Observable<Page<IAction>> {
    // return this.query.switchMap((query) => this.update(query, this.config.isLive))
    return this.pageData$;
  }



  constructor(itemClientOptions: IItemClientOptions) {

    super(itemClientOptions)
  }


}