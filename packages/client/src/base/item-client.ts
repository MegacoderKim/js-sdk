import {QueryObserver} from "./query-observer";
import {LoadingObserver} from "./loading-observer";
import {Observable} from "rxjs/Observable";
import {IItemClientOptions} from "../interfaces";
import {IdObserver} from "./id-observer";
import {HtBaseApi} from "../api/base";
import {Partial} from "ht-models";
import {HtClientConfig} from "../config";
import {HtBaseClient} from "./base-client";

export abstract class ItemClient<T, A> extends HtBaseClient<T, IItemClientOptions<A>, A> {
  loadingObserver: LoadingObserver;
  queryObserver: QueryObserver;
  idObservable: IdObserver;
  data$: Observable<T>;
  api: A;
  defaultQuery: object = {};


  getDataQuery$() {
    let dataQuery$ = Observable.combineLatest(
      this.queryObserver.data$().startWith({}),
      this.idObservable.data$(),
      ((query, id) => {
        return {id, query}
      })
    )
      .do((data) => {
        console.log(data, "query");
        this.loadingObserver.updateData(<string>(data['id']) || true)
      });

    return dataQuery$
  }

  getData$({id, query}): Observable<T> {
    return this.api$(id, query)
      .do(() => this.loadingObserver.updateData(false))
      .expand((data: T) => {
        return Observable.timer(this.pollDuration)
          .switchMap(() => this.api$(id, {...this.defaultQuery, ...query}))
      })

  }


  abstract api$(id, query)


  isNotFound() {
    // console.log("not founct");
  }

  onDataUpdate(data: T) {
    // console.log(data, "data");
  }
}