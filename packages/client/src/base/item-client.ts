import {ClientSub} from "../entities/base/client-factory";
import {ItemQuery} from "../entities/helpers/api-query-factory";
import {ItemGetData} from "../entities/helpers/get-data-factory";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {applyBaseMixins} from "../entities/helpers/mix";

export class EntityItemClient implements ClientSub, ItemQuery, ItemGetData  {
  //listGetData
  updateStrategy = 'live';
  pollDuration = 10000;
  api$;
  name = "item";
  id$: Observable<undefined | null | string>;
  query$;
  defaultQuery;
  allowedQueryKeys = null;
  dateRangeQuery$;
  active$ = null;
  // apiQuery$;
  // apiParams$;
  getApiParams$: () => Observable<any[]>;
  getApiQuery$: () => Observable<any>;
  init: () => void;
  getData$: (data) => any;

  // constructor() {
  //   console.log(this);
  //   // super.init()
  // }

  firstDataEffect() {
    this.setLoading(false);
  }
  getDefaultQuery() {
    return this.defaultQuery;
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
// applyBaseMixins(EntityItemClient, [ItemGetData, ItemQuery, ClientSub]);
