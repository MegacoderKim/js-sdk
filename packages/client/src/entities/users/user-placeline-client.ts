import {ItemClient} from "../../base/item-client";
import {IUserData} from "ht-models";
import {Observable} from "rxjs/Observable";
import {htPlaceline} from "ht-js-data";
import {HtUsersApi} from "../../api/users";
import {HtClientConfig} from "../../config";

export class HtUserPlacelineClient extends ItemClient<IUserData, HtUsersApi> {
  entityName = "placeliine";
  // initListener() {
  //   if(!this.data$) {
  //     // console.log("iii");
  //     let data$ = this.getDataQuery$()
  //       .switchMap(({id, query}) => {
  //         return this.getData$({id, query})
  //       })
  //       .share();
  //
  //     this.data$ = data$;
  //   }
  // }

  // getData$({id, query}): Observable<IUserData> {
  //   return this.api$(id, query)
  //     .expand((data: IUserData) => {
  //       return Observable.timer(this.pollDuration)
  //         .switchMap(() => this.api$(id, {...this.defaultQuery, ...query}))
  //       // .takeUntil(this.getDataQuery$().skip(1))
  //     })
  //
  // }

  getUpdate$(data, {id, query}) {
    // console.log("up", id, query);
    return this.api$(id, query)
  }

  api$(id, query = {}): Observable<IUserData> {
    return this.api.placeline<IUserData>(id, {...this.defaultQuery, ...query})
  }
}