import {HtUsersIndexClient} from "./users-index-client";
import {HtUserPlacelineClient} from "./user-placeline-client";
import {HtUsersApi} from "../../api/users";
import {IItemClientOptions, IListClientOptions} from "../../interfaces";
import {Partial, IUserAnalyticsPage, IUserData, IUserPage, IUser, IUserAnalytics} from "ht-models";
import {HtUsersAnalytics} from "./users-analytics-client";
import {Observable} from "rxjs/Observable";
import * as _ from "underscore";
import {EntityClient} from "../../base/entity-client";
import {HtUsersAnalyticsMarkers} from "./users-analytics-markers";
import {htUser} from "ht-js-data";
import {ApiType} from "../../api/base";
import {HtUsersIndexMarkers} from "./users-index-markers";
import {DefaultUsersFilter} from "../../filters/users-filter";
import {QueryLabel} from "../../filters/base-filter";
import {QueryObserver} from "../../base/query-observer";
import * as moment from 'moment-mini'

export class HtUsersClient extends EntityClient {
  index: HtUsersIndexClient;
  analytics: HtUsersAnalytics;
  placeline: HtUserPlacelineClient;
  api;
  marksAnalytics: HtUsersAnalyticsMarkers;
  marksIndex: HtUsersIndexMarkers;
  filterClass: DefaultUsersFilter;
  dateRangeObserver: QueryObserver;
  initialDateRange: IDateRange;
  dateRangeParam = 'recorded_at';

  constructor(req, public options: IUsersClientOptions = {}) {
    super();
    let api = new HtUsersApi(req);
    this.api = api;

    this.initialDateRange = this.getInitialDateRange();
    this.dateRangeObserver = new QueryObserver({initialData: this.initialDateRange});
    this.dateRangeObserver.updateData(this.initialDateRange);
    const dateRangeSource$ = this.dateRangeObserver.data$()
      .map((range: IDateRange) => {
      return this.getQueryFromDateRange(range)
    });

    this.index = new HtUsersIndexClient({
      api,
      dateRangeSource$,
      ...options.indexOptions
    });

    this.analytics = new HtUsersAnalytics({
      api,
      dateRangeSource$,
      ...options.analyticsOptions
    });

    this.placeline = new HtUserPlacelineClient({
      api,
      dateRangeSource$,
      ...options.placelineOptions
    });

    this.marksAnalytics = new HtUsersAnalyticsMarkers({
      api,
      dateRangeSource$,
      ...options.analyticsOptions
    });
    this.marksIndex = new HtUsersIndexMarkers({
      api,
      dateRangeSource$,
      ...options.indexOptions
    });

    this.filterClass = new DefaultUsersFilter();

  }

  getInitialDateRange(range: Partial<IDateRange> = {}): IDateRange {
    let start = moment().startOf('day').toISOString();
    let end =  moment().endOf('day').toISOString();
    return {...range, start, end}
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

  get list (): HtUsersIndexClient | HtUsersAnalytics {
    let apiType = this.options.listApiType || ApiType.analytics;
    return this.getListClient(apiType)
  }

  get marks(): HtUsersIndexMarkers | HtUsersAnalyticsMarkers {
    let apiType = this.options.listApiType || ApiType.analytics;
    return this.getMarkerClient(apiType)
  }

  get queryLabel$() {
    let query$ = this.list.queryObserver.data$();
    return query$.map((query) => {
      query = {...this.list.getDefaultQuery(), ...query};
      return this.filterClass.getQueryLabel(query)
    })
  }

  get ordering$() {
    return this.list.queryObserver.data$().map((query) => {
      query = {...this.list.getDefaultQuery(), ...query};
      let ordering = query ? query['ordering'] : null;
      let orderingMod = this.getOrderingMod(ordering);
      return {string: this.filterClass.sortingQueryMap[orderingMod.string], sign: orderingMod.sign}
    }).distinctUntilChanged()
  }

  getOrderingMod(ordering: string) {
    let string = ordering;
    let sign = 1;
    if (ordering.includes('-')) {
      string = ordering.substring(1);
      sign = 0;
    }
    return {
      string, sign
    }
  }

  getListClient(apiType: ApiType) {
    return apiType == ApiType.analytics ? this.analytics : this.index;
  }

  getMarkerClient(apiType: ApiType) {
    return apiType == ApiType.analytics ? this.marksAnalytics : this.marksIndex;
  }

  usersMarkers$() {

    // let dataArray$ = apiType == ApiType.index ? this.index.dataArray$ : this.analytics.dataArray$;
    // let dataArray$ = this.list.dataArray$;
    let markers$ = Observable.merge(
      this.marks.filteredDataArray$.filter(data => !!data),
      this.list.dataArray$
    );

    let hasPlaceline$ = this.placeline.data$.map((data) => !!data).distinctUntilChanged();

    let allDataArray$ = Observable.combineLatest(
      markers$,
      hasPlaceline$,
      (markers, hasPlaceline) => {
        return hasPlaceline ? [] : markers
      }
    );

    let dataArray$ = allDataArray$.map((users) => {
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
  listApiType?: ApiType,
  dateRangeOptions?: IDateRange
}

export interface IDateRange {
  start: string,
  end: string
}