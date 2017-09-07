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
        this.loadingObserver.updateData(<string>(data['id']) || true)
      });

    return dataQuery$
  }

  getData$({id, query}): Observable<T> {
    return id ?
      this.api$(id, query)
      .do(() => {
        this.loadingObserver.updateData(false)
      })
      .expand((data: T) => {
        return Observable.timer(this.pollDuration)
          .switchMap(() => this.api$(id, {...this.defaultQuery, ...query}))
      }) : Observable.of(null)

  }

  setId(id) {
    this.clearDiffData(id);
    super.setId(id)
  }

  clearDiffData(id) {
    this.idObservable.data$().take(1).subscribe(currentId => {
      if(id != currentId) this.clearData()
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