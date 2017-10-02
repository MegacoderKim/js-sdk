import {Observable} from "rxjs/Observable";
import {IItemClientOptions} from "../interfaces";
import {HtBaseApi} from "../api/base";
import {Partial} from "ht-models";
import {HtClientConfig} from "../config";
import {HtBaseClient} from "./base-client";

export abstract class ItemClient<T> extends HtBaseClient<T> {
  api: HtBaseApi;
  defaultQuery: object = {};
  name = "item";

  constructor(
    public options: IItemClientOptions<T>
  ) {
    super();
    this.initEffects();
  }

  initEffects() {
    let query$ = this.getApiQueryWithLoading$();

    let data$ = query$.switchMap((queryObj) => {
      return queryObj ?
        this.getData$(queryObj['id'], queryObj['query']) : Observable.of(null)
    })
      .do((data) => {
        this.updateLoadingData(false);
        //todo handle not found
      });
    data$.subscribe((userData) => {
      this.setData(userData)
    });

  }


  getApiQuery$() {
    let dataQuery$ = Observable.combineLatest(
      this.query$.distinctUntilChanged(),
      this.id$.distinctUntilChanged(),
      ((query, id) => {
        return id ? {id, query} : null
      })
    )
      .do((data) => {
        let loading = data && data['id'] ? data['id'] : true;
        this.updateLoadingData(<string>(loading))
      });

    return dataQuery$
  }

  getData$(id, query): Observable<T> {
    return id ?
      this.api$(id, query)
      .do(() => {
        this.updateLoadingData(false)
      })
      .expand((data: T) => {
        return Observable.timer(this.pollDuration)
          .switchMap(() => this.api$(id, {...this.defaultQuery, ...query}))
      }) : Observable.of(null)

  }

  abstract get id$()

  abstract get loading$()


  isNotFound() {
    // console.log("not founct");
  }

  onDataUpdate(data: T) {
    // console.log(data, "data");
  }
}