import {ClientSub} from "../mixins/client-subscription";
import {ItemQuery} from "../mixins/entity-query";
import {ItemGetData} from "../mixins/get-data";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {applyBaseMixins, applyMixins} from "../helpers/mix";

export class EntityItemClient implements ClientSub, ItemQuery, ItemGetData  {
  //listGetData
  updateStrategy = 'live';
  pollDuration = 10000;
  api$;
  name = "item";
  id$: Observable<undefined | null | string>;
  query$;
  allowedQueryKeys = null;
  dateRangeQuery$;
  active$ = null;
  // apiQuery$;
  // apiParams$;
  getApiParams$: () => Observable<any[]>;
  getApiQuery$: () => Observable<any>;
  init: () => void;
  getData$: (data) => any;

  firstDataEffect() {
    this.setLoading(false);
  }
  getDefaultQuery(): object {
    return {};
  }
  get apiParams$() {
    return this.getApiParams$()
  }
  get apiQuery$() {
    return this.getApiQuery$();
  }

  dataSub: Subscription;

  setLoading(data) {

  };

  setData(data) {

  };

  setActive(isActive: boolean = true){

  }

};
