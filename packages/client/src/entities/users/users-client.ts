import {UsersIndexClientFactory} from "./users-index-client";
import {UsersPlacelineClientFactory} from "./users-placeline-client";
import {AllData, IDateRange, IUsersClientOptions, QueryLabel} from "../../interfaces";
import {ISegment, IUserData, IUserListSummary, Partial} from "ht-models";
import {UsersAnalyticsClientFactory} from "./users-analytics-client";
import {Observable} from "rxjs/Observable";
import * as _ from "underscore";
import {EntityClient} from "../../base/entity-client";
import {usersAnalyticsMarkersFactory} from "./users-analytics-markers";
import {htUser} from "ht-data";
import {usersIndexMarkersFactory} from "./users-index-markers";
import {DefaultUsersFilter} from "../../filters/users-filter";
import {QueryObserver} from "../../base/query-observer";
import * as moment from 'moment-mini'
import {DateString, IsRangeADay, IsRangeToday} from "ht-utility";
import {HtMapClass} from "ht-maps";
import * as fromRoot from "../../reducers";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import * as fromQueryDispatcher from "../../dispatchers/query-dispatcher";
import {HtUsersSummaryFactory} from "./users-summary-client";
import {UsersPlaceline} from "./users-placeline-interfaces";
import {DateRangeToQuery} from "../base/helpers";
import {UsersIndex} from "./users-index-interfaces";
import {UsersAnalytics} from "./users-analytics-interfaces";
import {IUsersMarkers} from "./users-markers-interfaces";
import {store} from "../../store-provider";
import {clientApi} from "../../client-api";
import {IUserAnalytics} from "ht-models";

/**
 * Class containing all user related client entity like list of user, user placeline etc
 * @class
 */
export class HtUsersClient extends EntityClient {
  /**
   * Fetches from `/users/`
   */
  index: UsersIndex;
  /**
   * Fetches from `/users/analytics/`
   */
  analytics: UsersAnalytics;
  /**
   * Fetches user placeline
   */
  placeline: UsersPlaceline;
  /**
   * Fetches across the page (complete data of users) from `/users/analytics/`
   */
  analyticsAll: IUsersMarkers;
  /**
   * Fetches across the page (complete data of users) from `/users/`
   */
  indexAll: IUsersMarkers;
  filterClass: DefaultUsersFilter = new DefaultUsersFilter();
  dateRangeObserver: QueryObserver;
  initialDateRange: IDateRange;
  // mapClass: HtMapClass;
  userDispatcher = fromUsersDispatcher;
  queryDispatcher = fromQueryDispatcher;

  list: UsersAnalytics;
  summary;
  listAll: IUsersMarkers;
  _statusQueryArray: QueryLabel[];
  store;
  constructor(public options: IUsersClientOptions = {}) {
    super();
    let api = clientApi.users;
    this.api = api;
    this.store = store;
    this.initialDateRange = this.getInitialDateRange();
    this.dateRangeObserver = new QueryObserver({initialData: this.initialDateRange});
    this.dateRangeObserver.updateData(this.initialDateRange);

    let listState = {
      dateRangeQuery$: this.dateRangeObserver.data$().let(DateRangeToQuery('recorded_at'))
    };

    this.index = UsersIndexClientFactory(listState);

    this.analytics = UsersAnalyticsClientFactory(listState);


    this.placeline = UsersPlacelineClientFactory();

    this.analyticsAll = usersAnalyticsMarkersFactory(listState);

    this.indexAll = usersIndexMarkersFactory(listState);

    this.summary = HtUsersSummaryFactory(listState);

    this.list = this.analytics;


    this.listAll = this.analyticsAll;

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
    const selected$ = this.placeline.data$;
    return this.dataArrayWithSelected$(id$, dataArray$, selected$)

  }

  listPage$() {
    const id$ = this.list.id$.distinctUntilChanged();
    const dataArray$ = this.list.data$;
    const selected$ = this.placeline.data$;
    // let selected$ = this.placeline.data$.distinctUntilChanged(); //todo take query from placeline
    return this.pageDataWithSelected$(id$, dataArray$, selected$)
  }

  listSummary$() {
    return Observable.combineLatest(
      this.summary.data$,
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

  listStatusChart$(queryLabels?: QueryLabel[]) {
    // return status_overview.
    if(queryLabels) this.filterClass.customQueryArray.push(...queryLabels);
    return Observable.combineLatest(
      this.list.query$,
      this.listStatusOverview$()
    )
      .map(([query, overview]) => {
      if(overview) {
        let total = 0;
        let statusTotal;
        let max = 0;
        let summaryEntity = queryLabels || this.filterClass.statusQueryArray;
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
      this.summary.data$,
      (placelineList, summary) => {
        console.log("sasd", placelineList, summary);
        return {placelineList, summary}
      }
    );

    const list$ = this.placelineOrList$().map((placelineList) => {
      console.log("adas");
      return {placelineList, summary: null}
    });

    return this.summary.active$
      .switchMap((summaryActive) => {
      return summaryActive ?
        withSummary :
        list$
    })
  }

  get queryLabel$() {
    let query$ = this.list.getApiQuery$().filter(data => !!data);
    return query$.map((query) => {
      let queryLabel =  this.filterClass.getQueryLabel(query);
      return queryLabel
    })
  }

  get ordering$() {
    return this.list.getApiQuery$().filter(data => !!data).map((query) => {
      let ordering = query ? query['ordering'] : null;
      let orderingMod = this.getOrderingMod(ordering);
      return {string: this.filterClass.sortingQueryMap[orderingMod.string], sign: orderingMod.sign}
    }).distinctUntilChanged();
  }

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

  allMarkers$() {

    // let isFirstCb = () => !!this.mapClass && this.mapClass.resetBounds();
    let isFirstCb = () => {

    };
    let userMarkers$ = this.listAll.dataArray$;

    let allMarkers$ = Observable.merge(
      userMarkers$,
      // this.list.dataArray$
    );

    let hasPlaceline$ = this.placeline.id$.map((data) => !!data).distinctUntilChanged();

    let dataArray$ = Observable.combineLatest(
      userMarkers$,
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

    return dataArray$
  }

  markers$() {
    return this.allMarkers$().pluck('valid');
  }

  getSegmentsStates() {
    return this.store.select(fromRoot.getSegmentsState)
  }

  getCurrentPlaceline$() {
    return Observable.combineLatest(
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
    )

  }

  private initEffects() {
    // Observable.combineLatest(
    //   this.placeline.data$,
    //   this.getSegmentsStates(),
    //   (userData: IUserData, {selectedId, resetMapId}) => {
    //     if(userData && (selectedId || resetMapId)) {
    //       const id = selectedId || resetMapId;
    //       let segments = _.filter(userData.segments, (segment: ISegment) => {
    //         return segment.id === id;
    //       });
    //       userData = {...userData, segments: segments, events: [], actions: []}
    //     }
    //     return userData
    //   }
    // ).filter((data) => !!this.mapClass).do((userData) => {
    //   this.mapClass.segmentTrace.trace(null, this.mapClass.map)
    // }).map((userData) => {
    //   return userData ? userData.id : null
    // }).distinctUntilChanged().subscribe(() => {
    //   this.mapClass.resetBounds()
    // });


    // const marks$ = this.allMarkers$().filter((data) => !!this.mapClass).pluck('valid');

    // this.mapClass.usersCluster.setData$(marks$);

    // marks$.subscribe((data) => {
    //   this.mapClass.usersCluster.trace(data, this.mapClass.map)
    // });

    this.list.query$.filter(data => !!data).subscribe((query) => {
      this.setListAllFilter(query)
    });

    this.listAll.active$.filter(data => !!data).flatMap(() => {
      return this.listStatusChart$()
    })
      .takeUntil(this.listAll.active$.filter(data => !data).skip(1))
      .withLatestFrom(this.list.query$)
      .switchMap(([statusOverview, query]) => {
        // return Observable.of({})
        console.log(statusOverview, query);
        return this.getListAllUpdateQuery$(statusOverview, query)
      })//todo finish this
    //   .subscribe(data => {
    //   console.log("mar", data);
    // });


    this.placeline.id$.scan((acc, currentId) => {
      let isSame = acc.oldId === currentId;
      let oldId = currentId;
      return {isSame, oldId}
    }, {isSame: false, oldId: null})
      .pluck('isSame').filter(data => !data)
      .subscribe((isDiff: boolean) => {
        this.placeline.setData(null)
      });

  }

  setListAllFilter(query) {
    let statusString = query['status'];
    let search = query['search'];
    let ids = query['id'];
    let userMarkerFilters: ((users) => any)[] = [];

    if(statusString) {
      let statusArray = statusString.split(',');
      // this.updateUserMap(query);
      let statusFilter: any[] = [];
      statusArray.forEach((status) => {
        statusFilter.push(htUser().getMarkerFilter(status))
      });
      let allStatusFilter = (user) => {
        return _.reduce(statusFilter, (acc, filter: (user) => boolean) => {
          return acc || filter(user)
        }, false);
      };

      userMarkerFilters.push(allStatusFilter)
    }
    if(search) {
      userMarkerFilters.push(((user: IUserAnalytics) => {
        return htUser().getMarkerSearched(search)(user) // || userMarkerFilter(user)
      }));
      // this.updateUserMap(query);
    }
    if(ids) {
      let userIds = ids.split(',');
      userMarkerFilters.push((user: IUserAnalytics) => {
        return _.contains(userIds, user.id)
      })
    }
    let userMarkerFilter = (user) => {
      return _.reduce(userMarkerFilters, (acc, filter: (user) => boolean) => {
        return acc && filter(user)
      }, true)
    };

    let dataMap = (allResults: AllData<any>) => {
      let results = _.filter(allResults.resultsEntity, userMarkerFilter);
      let resultsEntity = _.indexBy(results, 'id');
      return {...allResults, resultsEntity}
    };
    this.listAll.setDataMap(dataMap);
    // this.store.dispatch(new fromUsersDispatcher.SetUsersMarkersDataMap(dataMap))
  }


  getListAllUpdateQuery$(overview, query) {
    return this.listAll.data$.flatMap((allData: AllData<any>) => {
      let results = _.values(allData.resultsEntity);
      let currentTotalUsers = results.length;
      let {totalUsers, chart} = overview;
      let status = query['status'];
      if(!!status) {
        let value = _.find(chart, (datum) => {
          return datum.keys.toString(',') == status;
        });
        return value && value !== currentTotalUsers ? Observable.of(true) : Observable.empty();
      } else if(currentTotalUsers < totalUsers) {
        return Observable.of(true)
      }
      return Observable.empty()
    })
  }

}