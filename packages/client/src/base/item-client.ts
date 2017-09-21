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
  // queryObserver: QueryObserver;
  // idObservable: IdObserver;
  api: HtBaseApi;
  defaultQuery: object = {};
  // idSource$;
  // querySource$;
  name = "item";
  getDataQuery$() {
    let dataQuery$ = Observable.combineLatest(
      this.query$.distinctUntilChanged(),
      this.id$.distinctUntilChanged(),
      ((query, id) => {
        return {id, query}
      })
    )
      .do((data) => {
        this.updateLoadingData(<string>(data['id']) || true)
      });

    return dataQuery$
  }

  getData$({id, query}): Observable<T> {
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

  // setId(id) {
  //   this.clearDiffData(id);
  //   super.setId(id)
  // }

  // clearDiffData(id) {
  //   this.idObservable.data$().take(1).subscribe(currentId => {
  //     if(id != currentId) this.idObservable.updateData(null)
  //   })
  // }


  abstract api$(id, query)

  abstract get id$()

  abstract get loading$()


  isNotFound() {
    // console.log("not founct");
  }

  onDataUpdate(data: T) {
    // console.log(data, "data");
  }
}