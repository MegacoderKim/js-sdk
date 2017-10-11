import {HtUsersIndexClient} from "./users-index-client";
import {HtUserPlacelineClient, UsersPlacelineClientFactory} from "./users-placeline-client";
import {HtUsersApi} from "../../api/users";
import {
  AllData,
  IDateRange, IItemClientOptions, IListClientOptions, IUsersClientOptions,
  PlacelineSegmentId, QueryLabel
} from "../../interfaces";
import {Partial, IUserAnalyticsPage, IUserData, IUserPage, IUser, IUserAnalytics, IUserListSummary} from "ht-models";
import {HtUsersAnalytics} from "./users-analytics-client";
import {Observable} from "rxjs/Observable";
import * as _ from "underscore";
import {EntityClient} from "../../base/entity-client";
import {HtUsersAnalyticsMarkers} from "./users-analytics-markers";
import {htUser} from "ht-js-data";
import {ApiType} from "../../interfaces";
import {HtUsersIndexMarkers} from "./users-index-markers";
import {DefaultUsersFilter} from "../../filters/users-filter";
import {QueryObserver} from "../../base/query-observer";
import * as moment from 'moment-mini'
import {IsRangeADay, IsRangeToday, DateString} from "ht-js-utils";
import {HtMapClass} from "ht-js-map";
import {ISegment} from "ht-models";
import {HtActionsApi} from "../../api/actions";
import {Store} from "../../store/store";
import * as fromRoot from "../../reducers";
import * as fromUsers from "../../reducers/user-reducer"
import * as fromQuery from "../../reducers/query-reducer"
import * as fromSegments from "../../reducers/segments-reducer"
import * as fromLoading from "../../reducers/loading-reducer"
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import * as fromQueryDispatcher from "../../dispatchers/query-dispatcher";
import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
import {UsersList} from "./users-list";
import {UsersMarkers} from "./users-markers";
import {HtUsersSummaryClient, HtUsersSummaryFactory} from "./users-summary-client";
import {EntityTypeState, ItemState, ListState} from "../base/interfaces";
import {UsersPlaceline} from "./users-placeline-interfaces";
import {UsersSummary} from "./users-summary-interface";
import {DateRangeToQuery} from "../base/helpers";
/**
 * Class containing all user related client entity like list of user, user placeline etc
 * @class
 */
export class HtUsersClient extends EntityClient {
  /**
   * Fetches from `/users/`
   */
  index: HtUsersIndexClient;
  /**
   * Fetches from `/users/analytics/`
   */
  analytics: HtUsersAnalytics;
  /**
   * Fetches user placeline
   */
  placeline: UsersPlaceline;
  /**
   * Fetches across the page (complete data of users) from `/users/analytics/`
   */
  marksAnalytics: HtUsersAnalyticsMarkers;
  /**
   * Fetches across the page (complete data of users) from `/users/`
   */
  marksIndex: HtUsersIndexMarkers;
  filterClass: DefaultUsersFilter = new DefaultUsersFilter();
  dateRangeObserver: QueryObserver;
  initialDateRange: IDateRange;
  mapClass: HtMapClass;
  userDispatcher = fromUsersDispatcher;
  queryDispatcher = fromQueryDispatcher;

  list;
  summary: UsersSummary;
  markers;
  _statusQueryArray: QueryLabel[];
  constructor(req, private store: Store<fromRoot.State>, public options: IUsersClientOptions = {}) {
    super();
    let api = new HtUsersApi(req);

    this.initialDateRange = this.getInitialDateRange();
    this.dateRangeObserver = new QueryObserver({initialData: this.initialDateRange});
    this.dateRangeObserver.updateData(this.initialDateRange);

    let entityState: EntityTypeState = {
      store,

    };

    let listState = {
      dateRangeQuery$: this.dateRangeObserver.data$().let(DateRangeToQuery('recorded_at'))
    };

    let indexState: ListState = {
      ...entityState,
      ...listState,
      api$: (query) => api.index(query),
    };

    let analyticsState: ListState = {
      ...entityState,
      ...listState,
      api$: (query) => api.analytics(query),
    };

    let placelineState: ItemState = {
      ...entityState,
      api$: (id, query) => api.placeline(id, query),
    };


    this.api = api;
    const dateRangeSource$ = this.dateRangeObserver.data$()
      .map((range: IDateRange) => {
      return this.getQueryFromDateRange(range)
    });

    this.index = new HtUsersIndexClient({
      api$: (query) => api.index(query),
      dateRangeSource$,
      store: this.store,
      loadingDispatcher: (data) => this.setLoadingUserIndex(data)
    });



    this.analytics = new HtUsersAnalytics({
      api$: (query) => this.api.analytics(query),
      dateRangeSource$,
      store: this.store,
      loadingDispatcher: (data) => this.setLoadingUserAnalytics(data)
    });


    this.placeline = UsersPlacelineClientFactory(
      placelineState,
      {}
    );
    // this.placeline = new HtUserPlacelineClient({
    //   api$: (id, query) => this.api.placeline(id, query),
    //   dateRangeSource$,
    //   loadingDispatcher: (data) => this.setLoadingUserData(data),
    //   store: this.store
    // });

    this.marksAnalytics = new HtUsersAnalyticsMarkers({
      api$: (query) => this.api.all$(query, ApiType.analytics),
      dateRangeSource$,
      loadingDispatcher: (data) => this.setLoadingUserAnalyticsAll(data),
      store: this.store
    });

    this.marksIndex = new HtUsersIndexMarkers({
      api$: (query) => this.api.all$(query, ApiType.index),
      dateRangeSource$,
      loadingDispatcher: (data) => this.setLoadingUserIndexAll(data),
      store: this.store
    });

    let summaryState: ListState = {
      ...entityState,
      ...listState,
      api$: (query) => api.summary(query),
    };

    this.summary = HtUsersSummaryFactory(summaryState, {});
    // this.summary  = new HtUsersSummaryClient({
    //   api$: (query) => api.summary(query),
    //   dateRangeSource$,
    //   store: this.store,
    //   loadingDispatcher: (data) => this.store.dispatch(new fromLoadingDispatcher.SetLoadingUserSummary(data))
    // });

    this.list = new UsersList(this.store, this.index, this.analytics);


    this.markers = new UsersMarkers(this.store, this.marksIndex, this.marksAnalytics);

    // this.filterClass = new DefaultUsersFilter();

    this.initEffects()
  }

  set statusQueryArray(data: QueryLabel[]) {
    this._statusQueryArray = data;
    this.filterClass.customQueryArray = data
  }

  setActive(): void {
    this.store.dispatch(new fromUsersDispatcher.InitUsers())
  }

  getInitialDateRange(range: Partial<IDateRange> = {}): IDateRange {
    let start = moment().startOf('day').toISOString();
    let end =  moment().endOf('day').toISOString();
    return {...range, start, end}
  }

  /**
   * Return users list array or array of length 1 with selected user if user is selected (userId not null)
   * @returns {any}
   */
  placelineOrList$() {
    const id$ = this.list.id$.distinctUntilChanged();
    const dataArray$ = this.list.dataArray$;
    const selected$ = this.placeline.selectors.data$;
    // let id$ = this.list.idObservable.data$().distinctUntilChanged();
    // let dataArray$ = this.list.dataArray$;
    // let selected$ = this.placeline.data$.distinctUntilChanged(); //todo take query from placeline
    return this.dataArrayWithSelected$(id$, dataArray$, selected$)

  }

  listPage$() {
    const id$ = this.list.id$.distinctUntilChanged();
    const dataArray$ = this.list.data$;
    const selected$ = this.placeline.selectors.data$;
    // let id$ = this.list.idObservable.data$().distinctUntilChanged();
    // let dataArray$ = this.list.dataArray$;
    // let selected$ = this.placeline.data$.distinctUntilChanged(); //todo take query from placeline
    return this.pageDataWithSelected$(id$, dataArray$, selected$)
  }

  listSummary$() {
    return Observable.combineLatest(
      this.summary.selectors.data$,
      this.list.id$,
      (summary, userId) => userId ? null : summary
    )
  }

  listStatusOverview$() {
    return this.listSummary$().map((summary: IUserListSummary) => {
      if(summary) {
        return summary.status_overview
      }
      return null
    })
  }

  listStatusChart$() {
    // return status_overview.
    return Observable.combineLatest(
      this.list.query$,
      this.listStatusOverview$()
    )
      .map(([query, overview]) => {
      if(overview) {
        let total = 0;
        let statusTotal;
        let max = 0;
        let summaryEntity = this._statusQueryArray || this.filterClass.statusQueryArray;
        let status = query ? query['status'] : null;
        // let summaryEntity = this.filterClass.activityQueryArray;
        let values = _.map(summaryEntity, (entity) => {
          let sum = _.reduce(entity.values, (acc, key: string) => {
            return acc + overview[key]
          }, 0);
          let value = entity.value || 0 + sum;
          max = max && value < max ? max : value;
          total = total + value;
          return {...entity, value }
        });
        let totalUsers = total;
        let hasSelected = false;
        let chart = _.map(values, (datum) => {
          let selected = false;
          if(status && status == datum.values.toString()) {
            selected = true;
            hasSelected = true;
          }
          let w = max ? datum.value / max : 0;

          return {...datum, w, selected}
        });
        return {totalUsers, chart, hasSelected}
      }
      return null
    })
    // return status_overview ? Object.keys(status_overview) : null
  }


  listMap$() {
    const withSummary = Observable.zip(
      this.placelineOrList$(),
      this.summary.selectors.data$,
      (placelineList, summary) => {
        console.log("sasd", placelineList, summary);
        return {placelineList, summary}
      }
    );

    const list$ = this.placelineOrList$().map((placelineList) => {
      console.log("adas");
      return {placelineList, summary: null}
    });

    return this.summary.selectors.active$
      .switchMap((summaryActive) => {
      return summaryActive ?
        withSummary :
        list$
    })
  }


  /**
   * Return label of current user queries
   * @returns {Observable<QueryLabel[]>}
   */
  get queryLabel$() {
    let query$ = this.list.getApiQuery$();
    return query$.map((query) => {
      let queryLabel =  this.filterClass.getQueryLabel(query);
      return queryLabel
    })
  }

  /**
   * Return orderings labels and sign for display
   * @returns {Observable<any>}
   */
  get ordering$() {
    return this.list.getApiQuery$().map((query) => {
      let ordering = query ? query['ordering'] : null;
      let orderingMod = this.getOrderingMod(ordering);
      return {string: this.filterClass.sortingQueryMap[orderingMod.string], sign: orderingMod.sign}
    }).distinctUntilChanged();
  }

  /**
   * Return display string for date range
   * @returns {Observable<string>}
   */
  get dateRangeDisplay$(): Observable<string> {
    return this.dateRangeObserver.data$().map((range: IDateRange) => {
      let isSingleDay = IsRangeADay(range);
      if(isSingleDay) {
        let isToday = IsRangeToday(range);
        let suffix = isToday ? 'Today ' : '';
        let string = suffix + DateString(range.start);
        return string
      } else {
        // console.log(DateString(range.start), range.start);
        return DateString(range.start) + " - " + DateString(range.end)
      }
    })
  }

  /**
   * Processes ordering text to extract string and sign
   * @param {string} ordering
   * @returns {{string: string; sign: number}}
   */
  private getOrderingMod(ordering: string) {
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

  /**
   * Return array of markers to display. Return [] for selected placeline
   * @returns {any}
   */
  allMarkers$() {

    // let dataArray$ = apiType == ApiType.index ? this.index.dataArray$ : this.analytics.dataArray$;
    // let dataArray$ = this.list.dataArray$;
    let isFirstCb = () => !!this.mapClass && this.mapClass.resetBounds();
    let userMarkers$ = this.markers.getResults(isFirstCb).filter(data => !!data);

    let allMarkers$ = Observable.merge(
      userMarkers$,
      // this.list.dataArray$
    );

    let hasPlaceline$ = this.placeline.selectors.id$.map((data) => !!data).distinctUntilChanged();

    let dataArray$ = Observable.combineLatest(
      allMarkers$,
      hasPlaceline$,
      (markers, hasPlaceline) => {
        return hasPlaceline ? [] : markers
      }
    ).map((markers) => {
      return _.reduce(markers, (acc, marker) => {
        const isValid = htUser(marker).isValidMarker();
        if (isValid) {
          acc.valid.push(marker)
        } else {
          acc.invalid.push(marker)
        };
        return acc
      }, {valid: [], invalid: []})
    });

    // let dataArray$ = allDataArray$.map((users) => {
    //   return _.filter(users, (user) => {
    //     return (user.last_location && user.last_location.geojson)
    //   })
    // });

    return dataArray$
  }

  // clearData() {
  //   this.index.clearData();
  //   this.placeline.clearData();
  //   this.analytics.clearData();
  //   this.marksAnalytics.clearData();
  // }

  // store
  getState() {
    return this.store.select(fromRoot.getUsersState)
  }

  getPlacelineQuery(): Observable<object> {
    return Observable.of({})
  }

  getUsersIndexPage(): Observable<any> {
    return this.store.select(fromRoot.getUsersIndexPage)
  }

  getUsersAnalyticsPage(): Observable<any> {
    return this.store.select(fromRoot.getUsersAnalyticsPage)
  }

  getUsersListPage(): Observable<any> {
    return this.getUserListApiType().distinctUntilChanged().switchMap((apiType: ApiType) => {
      return apiType === ApiType.index ? this.getUsersIndexPage() : this.getUsersAnalyticsPage()
    })
  }

  fromApiType(obIndex, obAnalytics) {
    return this.getUserListApiType().distinctUntilChanged().switchMap((apiType: ApiType) => {
      return apiType === ApiType.index ? obIndex : obAnalytics
    })
  }

  // getUsersIndexMarkers(): Observable<any[]> {
  //   return this.store.select(fromRoot.getUsersIndexFilteredMarker)
  // }
  //
  // getUsersAnalyticsMarkers(): Observable<any[]> {
  //   return this.store.select(fromRoot.getUsersAnalyticsFilteredMarker)
  // }

  // getUsersMarkers(): Observable<any[]> {
  //   return this.getUserListApiType().distinctUntilChanged().switchMap((apiType: ApiType) => {
  //     return apiType === ApiType.index ? this.getUsersIndexMarkers() : this.getUsersAnalyticsMarkers()
  //   })
  // }

  getUserListQuery(): Observable<object> {
    return this.store.select(fromRoot.getQueryUserQuery)
  }

  getUserListApiType() {
    return this.store.select(fromRoot.getUsersListApiType)
  }

  getSegmentsStates() {
    return this.store.select(fromRoot.getSegmentsState)
  }

  //dispatchers

  setUserData(userData: IUserData) {
    this.store.dispatch(new fromUsersDispatcher.SetUserData(userData))
  }

  setUsersIndexPage(usersPage) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersIndexPage(usersPage))
  }

  setUsersAnalyticsPage(usersPage) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsPage(usersPage))
  }

  setIndexMarkers(data: AllData<IUser>) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersIndexAll(data))
  }

  setAnalyticsMarkers(data: AllData<IUserAnalytics>) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsAll(data))
  }

  setLoadingUserData(data) {
    this.store.dispatch(new fromLoadingDispatcher.SetLoadingUserData(data))
  }

  setLoadingUserAnalytics(data) {
    this.store.dispatch(new fromLoadingDispatcher.SetLoadingUserAnalytics(data))
  }

  setLoadingUserIndex(data) {
    this.store.dispatch(new fromLoadingDispatcher.SetLoadingUserIndex(data))
  }

  setLoadingUserAnalyticsAll(data) {
    this.store.dispatch(new fromLoadingDispatcher.SetLoadingUserAnalyticsAll(data))
  }

  setLoadingUserIndexAll(data) {
    this.store.dispatch(new fromLoadingDispatcher.SetLoadingUserIndexAll(data))
  }

  private initEffects() {
    Observable.combineLatest(
      this.placeline.selectors.data$,
      this.getSegmentsStates(),
      (userData: IUserData, {selectedId, resetMapId}) => {
        if(userData && (selectedId || resetMapId)) {
          const id = selectedId || resetMapId;
          let segments = _.filter(userData.segments, (segment: ISegment) => {
            return segment.id === id;
          });
          userData = {...userData, segments: segments, events: [], actions: []}
        }
        return userData
      }
    ).filter((data) => !!this.mapClass).do((userData) => {
      if (userData) {
        this.mapClass.tracePlaceline(userData);

        // if (toReset) this.mapClass.resetBounds()
      } else {
        this.mapClass.segmentTrace.trace(null, this.mapClass.map)
      }
    }).map((userData) => {
      return userData ? userData.id : null
    }).distinctUntilChanged().subscribe(() => {
      this.mapClass.resetBounds()
    });


    const marks$ = this.allMarkers$().filter((data) => !!this.mapClass).pluck('valid');

    marks$.subscribe((data) => {
      this.mapClass.usersCluster.trace(data, this.mapClass.map)
    });

    this.list.query$.filter(data => !!data).subscribe((query) => {
      this.markers.setFilter(query)
    });

    this.markers.isActive$.filter(data => !!data).flatMap(() => {
      return this.listStatusChart$()
    })
      .takeUntil(this.markers.isActive$.filter(data => !data).skip(1))
      .withLatestFrom(this.list.query$)
      .switchMap(([statusOverview, query]) => {
        // return Observable.of({})
        console.log(statusOverview, query);
        return this.markers.getUpdateQuery$(statusOverview, query)
      })//todo finish this
    //   .subscribe(data => {
    //   console.log("mar", data);
    // });


    this.placeline.selectors.id$.scan((acc, currentId) => {
      let isSame = acc.oldId === currentId;
      let oldId = currentId;
      return {isSame, oldId}
    }, {isSame: false, oldId: null})
      .pluck('isSame').filter(data => !data)
      .subscribe((isDiff: boolean) => {
        this.setUserData(null)
      });

  }

}