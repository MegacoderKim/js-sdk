import {Observable} from "rxjs/Observable";
import {HtBaseClient} from "./base-client";
import {IListClientOptions, IDateRange, ApiType} from "../interfaces";
import {IUserAnalytics} from "ht-models";
import {HtBaseApi} from "../api/base";
import * as _ from "underscore";

export abstract class HtListClient<T> extends HtBaseClient<T>{

  name = "list";
  toUpdate: boolean;
  isLive: boolean;
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
      this.allowedQuery$,
      this.options.dateRangeSource$,
      (query, range) => {
        return {...this.getDefaultQuery(), ...query, ...range}
        // return id ? {id, ...query} : query
      }
    );
    return dataQuery$
  }

  // getAll$(type: ApiType) {
  //   return this.api.all$<IUserAnalytics>({}, type);
  // }

  getDefaultQuery() {
    return {page_size: 10, ...super.getDefaultQuery()}
  }

  getData$(query): Observable<T> {

    let first = this.api$(query).do((data) => {
      this.firstDataEffect(data)
    });

    let update = first.expand((data) => {
      return Observable.timer(this.pollDuration).switchMap(() => {
        if(this.isLive) {
          return this.api$(query)
        } else {
          let ids: string[] = _.map(data.results, (item) => {
            return item.id
          });
          let updateQuery = {...query, id: ids.toString(), status: null, page: null};
          return this.api$(updateQuery).map(data => {
            let dataEntity = _.indexBy(data.results, 'id');
            let results = _.map(data.results, item => {
              return dataEntity[item.id]
            });
            return {...data, results}
          })
        }

      })
    });

    return this.toUpdate ? update : first

  }

  firstDataEffect(data) {
    this.updateLoadingData(false)
  }

  get isActive$() {
    return Observable.of(false)
  }

  abstract get data$()

  abstract get loading$()

}