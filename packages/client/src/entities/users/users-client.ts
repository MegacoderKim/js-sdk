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
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import * as fromQueryDispatcher from "../../dispatchers/query-dispatcher";
import * as fromSegmentsDispatcher from "../../dispatchers/segments-dispatcher";
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
      querySource$: this.getUserListQuery(),
      onDataUpdate: (data) => this.setUsersIndexPage(data),
      isActive$: this.getIndexIsActive()
    });

    this.analytics = new HtUsersAnalytics({
      api,
      dateRangeSource$,
      querySource$: this.getUserListQuery(),
      onDataUpdate: (data) => this.setUsersAnalyticsPage(data),
      isActive$: this.getAnalyticsIsActive()
    });

    let idSource$ = this.getPlacelineId()
    //   .do((id) => {
    //   console.log("placelien id ", id);
    // });
    //
    // this.getUserData().subscribe((userdata) => {
    //   console.log("placeline user", !!userdata);
    // })

    // this.getPlacelineId().subscribe((id) => {
    //   console.log("palceline ", id);
    // })

    this.placeline = new HtUserPlacelineClient({
      api,
      dateRangeSource$,
      idSource$,
      querySource$: this.getPlacelineQuery(),
      onDataUpdate: (data) => this.setUserData(data)
    });

    this.marksAnalytics = new HtUsersAnalyticsMarkers({
      api,
      dateRangeSource$,
      querySource$: this.getUserListQuery(),
      onDataUpdate: (data) => this.setAnalyticsMarkers(data),
      isActive$: this.getAnalyticsMarkersIsActive()
    });

    this.marksIndex = new HtUsersIndexMarkers({
      api,
      dateRangeSource$,
      querySource$: this.getUserListQuery(),
      onDataUpdate: (data) => this.setIndexMarkers(data),
      isActive$: this.getIndexMarkersIsActive()
    });

    // this.filterClass = new DefaultUsersFilter();

    this.initEffects()
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
  usersPlaceline$() {
    const id$ = this.getUserId().distinctUntilChanged();
    const dataArray$ = this.getUsersListArray();
    const selected$ = this.getUserData();
    // let id$ = this.list.idObservable.data$().distinctUntilChanged();
    // let dataArray$ = this.list.dataArray$;
    // let selected$ = this.placeline.data$.distinctUntilChanged(); //todo take query from placeline
    return this.dataArrayWithSelected$(id$, dataArray$, selected$)

  }

  /**
   * Handle effects of placeline segments and stuff
   */
  private initEffectsOld() {


    //
    // const segmeentFilter = {
    //
    // };
    //
    //
    //
    let segmentScan = this.placeline.segmentIdObserver.data$().scan((acc, data: any) => {
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

    this.placeline.idObservable.data$().filter((data) => !!this.mapClass)
      .distinctUntilChanged()
      .subscribe((userId) => {
        // this.userClientService.marks.setFilter((user) => !userId);
        this.mapClass.resetBounds();
      });

    // const marks$ = this.usersMarkers$();


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
   * Return list client based on api type (index/analytics)
   * @returns {HtUsersIndexClient | HtUsersAnalytics}
   */
  // get list (): HtUsersIndexClient | HtUsersAnalytics {
  //   let apiType = this.options.listApiType || ApiType.analytics;
  //   return this.getListClient(apiType)
  // }

  /**
   * Returns markers array based on api type
   * @returns {HtUsersIndexMarkers | HtUsersAnalyticsMarkers}
   */
  // get marks(): HtUsersIndexMarkers | HtUsersAnalyticsMarkers {
  //   let apiType = this.options.listApiType || ApiType.analytics;
  //   return this.getMarkerClient(apiType)
  // }

  /**
   * Return label of current user queries
   * @returns {Observable<QueryLabel[]>}
   */
  // get queryLabel$() {
  //   let query$ = this.list.queryObserver.data$();
  //   return query$.map((query) => {
  //     query = {...this.list.getDefaultQuery(), ...query};
  //     return this.filterClass.getQueryLabel(query)
  //   })
  // }

  /**
   * Return orderings labels and sign for display
   * @returns {Observable<any>}
   */
  // get ordering$() {
  //   return this.list.queryObserver.data$().map((query) => {
  //     query = {...this.list.getDefaultQuery(), ...query};
  //     let ordering = query ? query['ordering'] : null;
  //     let orderingMod = this.getOrderingMod(ordering);
  //     return {string: this.filterClass.sortingQueryMap[orderingMod.string], sign: orderingMod.sign}
  //   }).distinctUntilChanged()
  // }

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
        console.log(DateString(range.start), range.start);
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
  usersMarkers$() {

    // let dataArray$ = apiType == ApiType.index ? this.index.dataArray$ : this.analytics.dataArray$;
    // let dataArray$ = this.list.dataArray$;
    let markers$ = Observable.merge(
      this.getUsersMarkers().filter(data => !!data),
      this.getUsersListArray()
    );

    let hasPlaceline$ = this.getPlacelineId().map((data) => !!data).distinctUntilChanged();

    let dataArray$ = Observable.combineLatest(
      markers$,
      hasPlaceline$,
      (markers, hasPlaceline) => {
        return hasPlaceline ? [] : markers
      }
    );

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

  getIndexIsActive(): Observable<boolean> {
    return this.store.select(fromRoot.getUsersIndexIsActive)
  }

  getIndexMarkersIsActive(): Observable<boolean> {
    return this.store.select(fromRoot.getUsersIndexMarkersIsActive)
  }

  getAnalyticsIsActive(): Observable<boolean> {
    return this.store.select(fromRoot.getUsersAnalyticsIsActive)
  }

  getAnalyticsMarkersIsActive(): Observable<boolean> {
    return this.store.select(fromRoot.getUsersAnalyticsMarkersIsActive)
  }

  getPlacelineId(): Observable<string | null> {
    return this.store.select(fromRoot.getQueryPlacelineId)//.share()
  }

  getUserData(): Observable<IUserData | null> {
    return this.store.select(fromRoot.getUsersUsersData)
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

  getUsersIndexMarkers(): Observable<any[]> {
    return this.store.select(fromRoot.getUsersIndexFilteredMarker)
  }

  getUsersAnalyticsMarkers(): Observable<any[]> {
    return this.store.select(fromRoot.getUsersAnalyticsFilteredMarker)
  }

  getUsersListArray(): Observable<any[]> {
    return this.getUsersListPage().map((usersPage) => {
      return usersPage ? usersPage.results : usersPage;
    })
  }

  getUsersMarkers(): Observable<any[]> {
    return this.getUserListApiType().distinctUntilChanged().switchMap((apiType: ApiType) => {
      return apiType === ApiType.index ? this.getUsersIndexMarkers() : this.getUsersAnalyticsMarkers()
    })
  }

  getUserListQuery(): Observable<object> {
    return this.store.select(fromRoot.getQueryUserQuery)
  }

  getUserId() {
    return this.store.select(fromRoot.getQueryUserId)
  }

  getUserListApiType() {
    return this.store.select(fromRoot.getUsersListApiType)
  }

  getSegmentsStates() {
    return this.store.select(fromRoot.getSegmentsState)
  }

  //dispatchers

  setPlacelineId(placelineId: string) {
    this.store.dispatch(new this.queryDispatcher.SetPlacelineId(placelineId))
  }

  setUserData(userData: IUserData) {
    this.store.dispatch(new fromUsersDispatcher.SetUserData(userData))
  }

  setUsersMarkersActive(isActive?: boolean) {
    this.store.dispatch(new fromUsersDispatcher.SetMarkersActive(isActive))
  }

  setListApiType(apiType: ApiType) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersListApiType(apiType))
  }

  setUsersIndexPage(usersPage) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersIndexPage(usersPage))
  }

  setUsersAnalyticsPage(usersPage) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsPage(usersPage))
  }

  setToggleUserId(userId: string) {
    this.store.dispatch(new fromQueryDispatcher.ToggleUserId(userId))
  }

  setTogglePlacelineId(userId: string) {
    this.store.dispatch(new fromQueryDispatcher.TogglePlacelineId(userId))
  }

  setUserId(userId: string | null) {
    this.store.dispatch(new fromQueryDispatcher.SetUserId(userId))
  }

  setIndexMarkers(data: AllData<IUser>) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersIndexAll(data))
  }

  setAnalyticsMarkers(data: AllData<IUserAnalytics>) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsAll(data))
  }

  setSegmentSelectedId(segmentId: string) {
    this.store.dispatch(new fromSegmentsDispatcher.SetSelectedId(segmentId))
  }

  setSegmentResetMapId(segmentId: string) {
    this.store.dispatch(new fromSegmentsDispatcher.SetResetMapId(segmentId))
  }

  private initEffects() {
    Observable.combineLatest(
      this.getUserData(),
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
    const marks$ = this.usersMarkers$().filter((data) => !!this.mapClass);


    marks$.subscribe((data) => {
      this.mapClass.usersCluster.trace(data, this.mapClass.map)
    });



  }

}