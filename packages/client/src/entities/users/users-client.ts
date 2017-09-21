import {HtUsersIndexClient} from "./users-index-client";
import {HtUserPlacelineClient} from "./user-placeline-client";
import {HtUsersApi} from "../../api/users";
import {
  AllData,
  IDateRange, IItemClientOptions, IListClientOptions, IUsersClientOptions,
  PlacelineSegmentId
} from "../../interfaces";
import {Partial, IUserAnalyticsPage, IUserData, IUserPage, IUser, IUserAnalytics} from "ht-models";
import {HtUsersAnalytics} from "./users-analytics-client";
import {Observable} from "rxjs/Observable";
import * as _ from "underscore";
import {EntityClient} from "../../base/entity-client";
import {HtUsersAnalyticsMarkers} from "./users-analytics-markers";
import {htUser} from "ht-js-data";
import {ApiType} from "../../interfaces";
import {HtUsersIndexMarkers} from "./users-index-markers";
import {DefaultUsersFilter} from "../../filters/users-filter";
import {QueryLabel} from "../../filters/base-filter";
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
  placeline: HtUserPlacelineClient;
  /**
   * Fetches across the page (complete data of users) from `/users/analytics/`
   */
  marksAnalytics: HtUsersAnalyticsMarkers;
  /**
   * Fetches across the page (complete data of users) from `/users/`
   */
  marksIndex: HtUsersIndexMarkers;
  filterClass: DefaultUsersFilter;
  dateRangeObserver: QueryObserver;
  initialDateRange: IDateRange;
  mapClass: HtMapClass;
  userDispatcher = fromUsersDispatcher;
  queryDispatcher = fromQueryDispatcher;

  list;
  markers;

  constructor(req, private store: Store<fromRoot.State>, public options: IUsersClientOptions = {}) {
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
      onDataUpdate: (data) => this.setUsersIndexPage(data),
      store: this.store,
      loadingDispatcher: (data) => this.setLoadingUserIndex(data)
    });

    this.analytics = new HtUsersAnalytics({
      api,
      dateRangeSource$,
      onDataUpdate: (data) => this.setUsersAnalyticsPage(data),
      store: this.store,
      loadingDispatcher: (data) => this.setLoadingUserAnalytics(data)
    });


    this.placeline = new HtUserPlacelineClient({
      api,
      dateRangeSource$,
      onDataUpdate: (data) => this.setUserData(data),
      loadingDispatcher: (data) => this.setLoadingUserData(data),
      store: this.store
    });

    this.marksAnalytics = new HtUsersAnalyticsMarkers({
      api,
      dateRangeSource$,
      onDataUpdate: (data) => this.setAnalyticsMarkers(data),
      loadingDispatcher: (data) => this.setLoadingUserAnalyticsAll(data),
      store: this.store
    });

    this.marksIndex = new HtUsersIndexMarkers({
      api,
      dateRangeSource$,
      onDataUpdate: (data) => this.setIndexMarkers(data),
      loadingDispatcher: (data) => this.setLoadingUserIndexAll(data),
      store: this.store
    });

    this.list = new UsersList(this.store, this.index, this.analytics);

    this.markers = new UsersMarkers(this.store, this.marksIndex, this.marksAnalytics);

    this.filterClass = new DefaultUsersFilter();

    this.initEffects()
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
    const selected$ = this.placeline.data$;
    // let id$ = this.list.idObservable.data$().distinctUntilChanged();
    // let dataArray$ = this.list.dataArray$;
    // let selected$ = this.placeline.data$.distinctUntilChanged(); //todo take query from placeline
    return this.dataArrayWithSelected$(id$, dataArray$, selected$)

  }

  private initEffectsOld() {

    let segmentScan = this.placeline.segmentState$.scan((acc, data: any) => {
      return {
        current: data,
        old: acc.current
      }
    }, {old: {}, current: {}}).filter((data) => this.mapClass && !!data)
      .do(({oldSegment, newSegment}) => {
      const segment = newSegment;

      if (!segment.resetBoundsId && segment.highlightedId !== oldSegment.highlightedId ) {
        // this.mapClass.segmentTrace.highlightSegmentId(segment.highlightedId) //todo highlight
        //todo select segment
        // this.mapClass.segmentTrace.
      }
      // if(oldSegment) {
      //   let segment = oldSegment;
      //   this.segmentsTrace.unselectSegment(segment);
      // }
      // if(newSegment) {
      //   let segment = newSegment;
      //   this.segmentsTrace.selectSegment(segment);
      // }
    });
    //
    // let placelinseScan = this.placeline.dataObserver.scan((acc, data: any) => {
    //   return {
    //     current: data,
    //     old: acc.current
    //   }
    // }, {old: null, current: null}).filter((data) => this.mapClass && !!data);
    //
    // let setBounds1 = Observable.combineLatest(
    //   segmentScan,
    //   placelinseScan,
    //   (segmentScan, placelineScan) => {
    //     // console.log(segmentScan, "Scan");
    //     const firstPlaceline = placelineScan.current && !placelineScan.old;
    //     const placelineResetMap = !placelineScan.current;
    //     const firstResetSegment = !!segmentScan.current.resetBoundsId && !segmentScan.old.resetBoundsId;
    //     const segmentResetMap = firstResetSegment;
    //     // console.log("bools", firstResetSegment, segmentResetMap);
    //     let userData = placelineScan.current;
    //     let selectedId = segmentScan.current.selectedId;
    //     if(selectedId && userData) {
    //       let segments = _.filter(userData.segments, (segment) => {
    //         return segment.id === selectedId;
    //       }) ;
    //       userData = {...userData, segments, events: [], actions: []}
    //     }
    //     this.mapClass.tracePlaceline(userData);
    //     // console.log(placelineResetMap, segmentResetMap, "Test");
    //     const toReset = placelineResetMap || segmentResetMap;
    //     // if(placelineResetMap || segmentResetMap) {
    //     //   this.mapClass.resetBounds()
    //     // }
    //     return toReset
    //
    //   }
    // ).filter((data) => !!data);
    //
    // let setBounds2 = this.marks.dataObserver.filter(data => !!data).pluck('isFirst').filter(data => !!data);
    //
    // let setBounds3 = this.placeline.idObservable.data$().filter((data) => !!this.mapClass)
    //   .distinctUntilChanged();
    //
    // Observable.merge(
    //   setBounds1,
    //   setBounds2,
    //   setBounds3
    // ).debounceTime(100).subscribe((data) => {
    //   this.mapClass.resetBounds()
    // });

    // this.placeline.segmentIdObserver.data$()
    //   .filter((data) => !!this.mapClass)
    //   .filter((placelineSegmentId: PlacelineSegmentId) => {
    //     if (placelineSegmentId.selectedId) {
    //       this.mapClass.segmentTrace()
    //     }
    //   })
    //   .map((placelineSegmentId: PlacelineSegmentId) => !!placelineSegmentId.resetBoundsId)
    //   .distinctUntilChanged().subscribe((hasSelectedSegment) => {
    //   if (hasSelectedSegment) this.mapClass.resetBounds()
    // });

    // this.placeline.idObservable.data$().filter((data) => !!this.mapClass)
    //   .distinctUntilChanged()
    //   .subscribe((userId) => {
    //     // this.userClientService.marks.setFilter((user) => !userId);
    //     this.mapClass.resetBounds();
    //   });

    // const marks$ = this.allMarkers$();


    // marks$.subscribe((data) => {
    //   this.mapClass.usersCluster.trace(data, this.mapClass.map)
    // });
    //
    // this.marks.dataObserver.filter(data => !!data).pluck('isFirst').filter(data => !!data).subscribe((amrks) => {
    //   this.mapClass.resetBounds()
    // });
    // this.placeline.data$;

    // this.placeline.segmentIdObserver.data$().subscribe((placelineId: PlacelineSegmentId) => {
    //   console.log(placelineId, "ppp", this.mapClass);
    //
    // })
  }


  /**
   * Return label of current user queries
   * @returns {Observable<QueryLabel[]>}
   */
  get queryLabel$() {
    let query$ = this.list.getDataQuery$();
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
    return this.list.getDataQuery$().map((query) => {
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
      this.list.dataArray$
    );

    let hasPlaceline$ = this.placeline.id$.map((data) => !!data).distinctUntilChanged();

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

  getUsersIndexMarkers(): Observable<any[]> {
    return this.store.select(fromRoot.getUsersIndexFilteredMarker)
  }

  getUsersAnalyticsMarkers(): Observable<any[]> {
    return this.store.select(fromRoot.getUsersAnalyticsFilteredMarker)
  }

  getUsersMarkers(): Observable<any[]> {
    return this.getUserListApiType().distinctUntilChanged().switchMap((apiType: ApiType) => {
      return apiType === ApiType.index ? this.getUsersIndexMarkers() : this.getUsersAnalyticsMarkers()
    })
  }

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
      this.placeline.data$,
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


    // let segmentScan = this.getSegmentsStates().scan((acc, data: any) => {
    //   return {
    //     current: data,
    //     old: acc.current
    //   }
    // }, {old: {}, current: {}}).filter((data) => this.mapClass && !!data)
    //   .do(({oldSegment, newSegment}) => {
    //     const segment = newSegment;
    //
    //     if (!segment.resetMapId && segment.highlightedId !== oldSegment.highlightedId ) {
    //       this.mapClass.segmentTrace.highlightSegmentId(segment.highlightedId)
    //       //todo select segment
    //       // this.mapClass.segmentTrace.
    //     }
    //     // if(oldSegment) {
    //     //   let segment = oldSegment;
    //     //   this.segmentsTrace.unselectSegment(segment);
    //     // }
    //     // if(newSegment) {
    //     //   let segment = newSegment;
    //     //   this.segmentsTrace.selectSegment(segment);
    //     // }
    //   });
    //
    // let placelinseScan = this.getUserData().scan((acc, data: any) => {
    //   return {
    //     current: data,
    //     old: acc.current
    //   }
    // }, {old: null, current: null}).filter((data) => this.mapClass && !!data);
    //
    // let setBounds1 = Observable.combineLatest(
    //   segmentScan,
    //   placelinseScan,
    //   (segmentScan, placelineScan) => {
    //     // console.log(segmentScan, "Scan");
    //     const firstPlaceline = placelineScan.current && !placelineScan.old;
    //     const placelineResetMap = !placelineScan.current;
    //     const firstResetSegment = !!segmentScan.current.resetBoundsId && !segmentScan.old.resetBoundsId;
    //     const segmentResetMap = firstResetSegment;
    //     // console.log("bools", firstResetSegment, segmentResetMap);
    //     let userData = placelineScan.current;
    //     let selectedId = segmentScan.current.selectedId;
    //     if(selectedId && userData) {
    //       let segments = _.filter(userData.segments, (segment) => {
    //         return segment.id === selectedId;
    //       }) ;
    //       userData = {...userData, segments, events: [], actions: []}
    //     }
    //     this.mapClass.tracePlaceline(userData);
    //     // console.log(placelineResetMap, segmentResetMap, "Test");
    //     const toReset = placelineResetMap || segmentResetMap;
    //     // if(placelineResetMap || segmentResetMap) {
    //     //   this.mapClass.resetBounds()
    //     // }
    //     return toReset
    //
    //   }
    // ).filter((data) => !!data);
    //
    // // let setBounds2 = this.getUsersMarkers().filter(data => !!data).pluck('isFirst').filter(data => !!data);
    //
    // let setBounds3 = this.placeline.idObservable.data$().filter((data) => !!this.mapClass)
    //   .distinctUntilChanged();
    //
    // Observable.merge(
    //   // setBounds1,
    //   // setBounds2,
    //   setBounds3
    // ).debounceTime(100).subscribe((data) => {
    //   this.mapClass.resetBounds()
    // });
    //
    //
    // this.placeline.idObservable.data$().filter((data) => !!this.mapClass)
    //   .distinctUntilChanged()
    //   .subscribe((userId) => {
    //     // this.userClientService.marks.setFilter((user) => !userId);
    //     this.mapClass.resetBounds();
    //   });
    //
    const marks$ = this.allMarkers$().filter((data) => !!this.mapClass).pluck('valid');

    marks$.subscribe((data) => {
      this.mapClass.usersCluster.trace(data, this.mapClass.map)
    });


    this.placeline.id$.scan((acc, currentId) => {
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