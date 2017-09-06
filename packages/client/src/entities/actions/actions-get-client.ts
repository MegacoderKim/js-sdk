import {HtActionsApi} from "../../api/actions";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Page, IAction} from "ht-models";
import {Observable} from "rxjs/Observable";
import {ItemClient} from "../../base/item-client";
import {IItemClientOptions} from "../../interfaces";

export class HtActionsGetClient extends ItemClient<IAction, HtActionsApi>{

  api$(id, query) {
    return this.api.get<IAction>(id, {...this.defaultQuery, ...query})
  }


}