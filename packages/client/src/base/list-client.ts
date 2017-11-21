import {ClientSub} from "../mixins/client-subscription";
import {ListQuery} from "../mixins/entity-query";
import {ListGetData} from "../mixins/get-data";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

export class EntityListClient implements ClientSub, ListQuery, ListGetData  {
  //listGetData
  updateStrategy = 'live';
  pollDuration = 10000;
  api$;
  name = "list";
  query$;
  // defaultQuery;
  allowedQueryKeys: string[] | null = null;
  dateRangeQuery$;
  active$ = null;
  // apiQuery$;
  // apiParams$;
  getApiParams$: () => Observable<any[]>;
  getApiQuery$: () => Observable<any>;
  init: () => void;
  getData$: (data) => any;
  dataSub: Subscription;

  firstDataEffect(data) {
    this.setLoading(false);
  }

  getDefaultQuery(): object {
    return {page_size: 10};
  }

  get apiParams$() {
    return this.getApiParams$()
  }
  get apiQuery$() {
    return this.getApiQuery$();
  }


  setLoading(data) {

  };

  setData(data) {

  };

  setActive(isActive: boolean = true){

  }

};