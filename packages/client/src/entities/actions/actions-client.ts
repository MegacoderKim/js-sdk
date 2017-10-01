import {HtActionsListClient} from "./actions-list-client";
import {HtActionsGetClient} from "./actions-get-client";
import {HtActionsApi} from "../../api/actions";
import {IItemClientOptions, IListClientOptions, IActionsClientOptions} from "../../interfaces";
import {Partial} from "ht-models";

export class HtActionsClient {
  item: HtActionsGetClient;
  list: HtActionsListClient;
  api;
  constructor(req, options: IActionsClientOptions = {} ) {
    // let {listConfig, defaultConfigQuery} = options;
    let api = new HtActionsApi(req);
    this.api = api;
    this.list = new HtActionsListClient(req, options['defaultConfigQuery'], options['listConfig']);
    // this.item = new HtActionsGetClient({
    //   api$: this.api.get,
    //   ...options.getClientOptions
    // })
  }

  updateListQuery() {

  }
}





