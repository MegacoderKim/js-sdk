import {Observable} from "rxjs/Observable";
import {HtBaseClient} from "./base-client";
import {IListClientOptions, IDateRange, ApiType} from "../interfaces";
import {IUserAnalytics} from "ht-models";
import {HtBaseApi} from "../api/base";
import * as _ from "underscore";

export abstract class HtListClient<T> extends HtBaseClient<T>{

  name = "list";
  toUpdate: boolean;
  constructor(
    public options: IListClientOptions<T>
  ) {
    super();
    this.initEffects();
  }

  initEffects() {
    let query$ = this.isActive$.mergeMap((isActive: boolean) => {
      return isActive ? this.getApiQueryWithLoading$() : Observable.of(null)
    });
    // let query$ = this.getApiQueryWithLoading$();

    let data$ = query$.switchMap((queryObj) => {
      return queryObj ?
        this.getData$(queryObj) : Observable.of(null)
    });
      // .do((data) => {
      //   this.updateLoadingData(false);
      //   //todo handle not found
      // });
    data$.subscribe((userData) => {
      this.setData(userData)
    });

  }

  getApiQuery$() {
    let dataQuery$ = Observable.combineLatest(
      this.query$,
      this.options.dateRangeSource$,
      (query, range) => {
        return {...this.getDefaultQuery(), ...query, ...range}
        // return id ? {id, ...query} : query
      }
    );
    return dataQuery$
  }

  getAll$(type: ApiType) {
    return this.api.all$<IUserAnalytics>({}, type);
  }

  getDefaultQuery() {
    return {page_size: 10, ...super.getDefaultQuery()}
  }

  getData$(query): Observable<T> {

    let first = this.api$(query).do(() => {
      this.updateLoadingData(false)
    });

    let update = first.expand(() => {
      return Observable.timer(this.pollDuration).switchMap(() => {
        return this.api$(query)
      })
    });

    return this.toUpdate ? update : first

    // return this.api$(query).do(() => {
    //   this.updateLoadingData(false)
    // })

  }

  setFilter(filterResults = (data) => true) {
    let filter = (pageData) => {
      let results = _.filter(pageData.results, (data) => {
        return filterResults(data)
      });
      return {...pageData, results}
    };
    // todo update data map
    // this.dataMap$.updateData(filter);
  }

  get isActive$() {
    return Observable.of(false)
  }

  abstract get data$()

  abstract get loading$()

}