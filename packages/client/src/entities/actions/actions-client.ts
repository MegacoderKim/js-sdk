import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import {HtActionsListClient} from "./actions-list-client";
import {HtActionsGetClient} from "./actions-get-client";
import {HtActionsApi} from "../../api/actions";
import {IItemClientOptions, IListClientOptions} from "../../interfaces";
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
    this.item = new HtActionsGetClient({
      api,
      ...options.getClientOptions
    })
  }

  updateListQuery() {

  }
}

export interface IActionsClientOptions {
  listClientOptions?: Partial<IListClientOptions<HtActionsApi>>,
  getClientOptions?: Partial<IItemClientOptions<HtActionsApi>>
}




