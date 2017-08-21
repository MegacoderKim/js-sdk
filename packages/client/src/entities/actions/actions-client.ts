import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import {HtActionsListClient} from "./actions-list-client";

export class HtActionsClient {

  list: HtActionsListClient;

  constructor(req, options = {}) {
    // let {listConfig, defaultConfigQuery} = options;
    this.list = new HtActionsListClient(req, options['defaultConfigQuery'], options['listConfig'])
  }

  updateListQuery() {

  }
}




