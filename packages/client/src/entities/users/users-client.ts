import {HtUsersListClient} from "./users-list-client";
import {HtUserPlacelineClient} from "./user-placeline-client";
import {HtUsersApi} from "../../api/users";
import {IItemClientOptions, IListClientOptions} from "../../interfaces";
import {Partial, IUserAnalyticsPage, IUserData} from "ht-models";
import {HtUsersAnalytics} from "./users-analytics";
import {Observable} from "rxjs/Observable";
import * as _ from "underscore";
import {EntityClient} from "../../base/entity-client";
import {HtUsersMarkers} from "./users-markers";
import {htUser} from "../../../../data/src/entities/user";

export class HtUsersClient extends EntityClient {
  list: HtUsersListClient;
  analytics: HtUsersAnalytics;
  placeline: HtUserPlacelineClient;
  api;
  marks: HtUsersMarkers;
  constructor(req, options: IUsersClientOptions = {}) {
    super();
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
    });

    this.marks = new HtUsersMarkers({
      api,
      ...options.analyticsOptions
    })
  }

  usersPlaceline$() {
    let id$ = this.analytics.idObservable.data$().distinctUntilChanged();
    let dataArray$ = this.analytics.dataArray$;
    let selected$ = this.placeline.data$.distinctUntilChanged();
    return this.dataArrayWithSelected$(id$, dataArray$, selected$)

    // const userId$ = this.analytics.idObservable.data$().distinctUntilChanged();
    // const placelinePage$ = this.placeline.data$.distinctUntilChanged()
    //   .map((data) => {
    //   return data ? [data] : null;
    // }); //todo take query from placeline
    //
    // const dataArray$ = this.analytics.dataArray$;
    //
    // const d = Observable.combineLatest(
    //   placelinePage$,
    //   userId$,
    //   dataArray$,
    //   (placelinePage, userId, dataArray) => {
    //     return placelinePage && userId ? placelinePage : _.filter(dataArray, (user) => {
    //       return userId ? user.id == userId : true;
    //     })
    //   }
    // );
    //
    //
    // return d

  }

  usersMarkers$() {
    let a = Observable.merge(
      this.marks.data$.filter(data => !!data).pluck('results'),
      this.analytics.dataArray$
    ).map((users) => {
      return _.filter(users, (user) => {
        return (user.last_location && user.last_location.geojson)
      })
    });

    return a
  }

  clearData() {
    this.list.clearData();
    this.placeline.clearData();
    this.analytics.clearData();
    this.marks.clearData();
  }

}

export interface IUsersClientOptions {
  placelineOptions?: Partial<IItemClientOptions<HtUsersApi>>,
  listOptions?: Partial<IListClientOptions<HtUsersApi>>,
  analyticsOptions?: Partial<IListClientOptions<HtUsersApi>>
}