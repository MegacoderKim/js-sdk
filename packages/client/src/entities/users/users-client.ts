import {HtUsersListClient} from "./users-list-client";
import {HtUserPlacelineClient} from "./user-placeline-client";
import {HtUsersApi} from "../../api/users";
import {IItemClientOptions, IListClientOptions} from "../../interfaces";
import {Partial, IUserAnalyticsPage, IUserData} from "ht-models";
import {HtUsersAnalytics} from "./users-analytics";
import {Observable} from "rxjs/Observable";
import * as _ from "underscore";

export class HtUsersClient {
  list: HtUsersListClient;
  analytics: HtUsersAnalytics;
  placeline: HtUserPlacelineClient;
  api;
  constructor(req, options: IUsersClientOptions = {}) {
    let api = new HtUsersApi(req);
    this.api = api;
    this.list = new HtUsersListClient({
      api,
      ...options.listOptions
    });

    this.analytics = new HtUsersAnalytics({
      api,
      ...options.analyticsOptions
    });

    this.placeline = new HtUserPlacelineClient({
      api,
      ...options.placelineOptions
    })
  }

  usersPlaceline$() {

    const userId$ = this.analytics.idObservable.data$().distinctUntilChanged();
    const placelinePage$ = this.placeline.data$.distinctUntilChanged()
      .map((data) => {
      return data ? [data] : null;
    }); //todo take query from placeline

    const dataArray$ = this.analytics.dataArray$;

    // const d$ = userId$.startWith(null).switchMap((userId) => {
    //   console.log(userId, "user id");
    //   return Observable.combineLatest(
    //     placelinePage$.startWith(null).do((p) => {
    //       console.log("placeline", p);
    //     }),
    //     this.analytics.dataArray$.do((p) => {
    //       console.log("data array", p);
    //     }),
    //     (placelinePage, userPage) => {
    //       console.log("combine", placelinePage, userPage);
    //       return userId ? placelinePage || userPage : userPage
    //     }
    //   );
    //   //
    //   // if (userId) {
    //   //   return placelinePage$
    //   // } else {
    //   //   return this.analytics.dataArray$;
    //   // }
    // }).do((userp) => {
    //   // console.log("user place");
    // });

    // return d$

    // return Observable.merge(
    //   userId$.switchMap((id) => {
    //     return this.analytics.dataArray$
    //   }),
    //   placelinePage$.filter((data) => !!data)
    // ).do((data) => {
    //   console.log(data, "Dadas");
    // })
    const d = Observable.combineLatest(
      placelinePage$,
      userId$,
      dataArray$,
      (placelinePage, userId, dataArray) => {
        return placelinePage && userId ? placelinePage : _.filter(dataArray, (user) => {
          return userId ? user.id == userId : true;
        })
      }
    );
      // .switchMap(userId => {
      //   return userId ? placelinePage$ : dataArray$
      // })
    //   .subscribe(data => {
    //
    //   console.log("combbine", data);
    // });

    return d

    // return userId$.switchMap((id) => {
    //   console.log("user id", id);
    //   let pOrD = Observable.merge(
    //     dataArray$.take(1),
    //     placelinePage$
    //   );
    //   let p = this.placeline.dataObserver.take(1).switchMap((placeline) => {
    //     console.log("placeline", placeline);
    //     return placeline ? placelinePage$ : pOrD
    //   });
    //   return id ? p : dataArray$
    //   // return placelinePage$
    // })
  }

}

export interface IUsersClientOptions {
  placelineOptions?: Partial<IItemClientOptions<HtUsersApi>>,
  listOptions?: Partial<IListClientOptions<HtUsersApi>>,
  analyticsOptions?: Partial<IListClientOptions<HtUsersApi>>
}