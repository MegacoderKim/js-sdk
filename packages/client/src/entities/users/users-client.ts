import {HtUsersListClient} from "./users-list-client";
import {HtUserPlacelineClient} from "./user-placeline-client";
import {HtUsersApi} from "../../api/users";
import {IItemClientOptions, IListClientOptions} from "../../interfaces";
import {Partial, IUserAnalyticsPage, IUserData} from "ht-models";
import {HtUsersAnalytics} from "./users-analytics";
import {Observable} from "rxjs/Observable";

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

    const userId$ = this.analytics.idObservable.data$();
    const placelinePage$ = this.placeline.data$
      .map((data) => {
      return data ? [data] : null;
    }); //todo take query from placeline

    const d$ = userId$.startWith(null).switchMap((placeline) => {
      if(placeline) {
        return placelinePage$
      } else {
        return this.analytics.dataArray$;
      }
    });

    return d$

    // return Observable.merge(
    //   this.analytics.dataArray$,
    //   placelinePage$
    // ).do((data) => {
    //   console.log(data, "Dadas");
    // })
  }

}

export interface IUsersClientOptions {
  placelineOptions?: Partial<IItemClientOptions<HtUsersApi>>,
  listOptions?: Partial<IListClientOptions<HtUsersApi>>,
  analyticsOptions?: Partial<IListClientOptions<HtUsersApi>>
}