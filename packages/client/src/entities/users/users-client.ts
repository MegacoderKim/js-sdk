import {HtUsersIndexClient} from "./users-index-client";
import {HtUserPlacelineClient} from "./user-placeline-client";
import {HtUsersApi} from "../../api/users";
import {IItemClientOptions, IListClientOptions} from "../../interfaces";
import {Partial, IUserAnalyticsPage, IUserData} from "ht-models";
import {HtUsersAnalytics} from "./users-analytics";
import {Observable} from "rxjs/Observable";
import * as _ from "underscore";
import {EntityClient} from "../../base/entity-client";
import {HtUsersAnalyticsMarkers} from "./users-analytics-markers";
import {htUser} from "ht-js-data";
import {ApiType} from "../../api/base";
import {HtUsersIndexMarkers} from "./users-index-markers";

export class HtUsersClient extends EntityClient {
  index: HtUsersIndexClient;
  analytics: HtUsersAnalytics;
  placeline: HtUserPlacelineClient;
  api;
  marksAnalytics: HtUsersAnalyticsMarkers;
  marksIndex: HtUsersIndexMarkers;

  constructor(req, public options: IUsersClientOptions = {}) {
    super();
    let api = new HtUsersApi(req);
    this.api = api;
    this.index = new HtUsersIndexClient({
      api,
      ...options.indexOptions
    });

    this.analytics = new HtUsersAnalytics({
      api,
      ...options.analyticsOptions
    });

    this.placeline = new HtUserPlacelineClient({
      api,
      ...options.placelineOptions
    });

    this.marksAnalytics = new HtUsersAnalyticsMarkers({
      api,
      ...options.analyticsOptions
    });
    this.marksIndex = new HtUsersIndexMarkers({
      api,
      ...options.indexOptions
    })
  }

  usersPlaceline$() {
    let id$ = this.list.idObservable.data$().distinctUntilChanged();
    let dataArray$ = this.list.dataArray$;
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

  get list () {
    let apiType = this.options.listApiType || ApiType.analytics;
    return this.getListClient(apiType)
  }

  get marks() {
    let apiType = this.options.listApiType || ApiType.analytics;
    return this.getMarkerClient(apiType)
  }

  getListClient(apiType: ApiType) {
    return apiType == ApiType.analytics ? this.analytics : this.index;
  }

  getMarkerClient(apiType: ApiType) {
    return apiType == ApiType.analytics ? this.marksAnalytics : this.marksIndex;
  }

  usersMarkers$(apiType: ApiType = ApiType.analytics) {

    // let dataArray$ = apiType == ApiType.index ? this.index.dataArray$ : this.analytics.dataArray$;
    // let dataArray$ = this.list.dataArray$;
    let dataArray$ = Observable.merge(
      this.marks.data$.filter(data => !!data).pluck('results'),
      this.list.dataArray$
    ).map((users) => {
      return _.filter(users, (user) => {
        return (user.last_location && user.last_location.geojson)
      })
    });

    return dataArray$
  }

  clearData() {
    this.index.clearData();
    this.placeline.clearData();
    this.analytics.clearData();
    this.marksAnalytics.clearData();
  }

}

export interface IUsersClientOptions {
  placelineOptions?: Partial<IItemClientOptions<HtUsersApi>>,
  indexOptions?: Partial<IListClientOptions<HtUsersApi>>,
  analyticsOptions?: Partial<IListClientOptions<HtUsersApi>>,
  listApiType?: ApiType
}