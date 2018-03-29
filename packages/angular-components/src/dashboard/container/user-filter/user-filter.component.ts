import {Component, OnInit} from "@angular/core";
import * as fromRoot from "../../reducers";
import * as fromQuery from "../../actions/query";
import {Store} from "@ngrx/store";
import {FilterCommonComponent} from "../filter-common/filter-common.component";
import {UserService} from "../../users/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GetUserFiltersMap, GetUserSortingMap} from "../../../utils/users";
import {HtQuerySerialize} from "../../../utils/query-serializer";
import {InnerMapService} from "../../map-container/map.service";
import {config} from "../../config";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {BroadcastService} from "../../core/broadcast.service";
import {FitToMapService} from "./fit-to-map.service";
import {HttpClient} from "@angular/common/http";
import {DateRangeLabelMap, DateRangeMap, isSameDateRange} from "ht-data";
import {IDateRange} from "ht-models";
import {DateString, IsRangeADay, IsRangeToday, isSameRange} from "ht-utility";

var download = require('../../../assets/download.js');

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.less', '../filter.less']
})
export class UserFilterComponent extends FilterCommonComponent implements OnInit {
  userFilters = GetUserFiltersMap;
  userSorings = GetUserSortingMap;
  toFitMapFilter: boolean = false;
  toShowRecommended: boolean = false;
  dateRange = DateRangeMap.today;
  constructor(
      public store: Store<fromRoot.State>,
      public userService: UserService,
      public router: Router,
      public route: ActivatedRoute,
      public http: HttpClient,
      public fitToMap: FitToMapService
  ) {
    super(store, router, route)
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getListData() {
    return this.store.select(fromRoot.getUserPageData)
  }

  getListQuery$() {
    return this.store.select(fromRoot.getQueryUserListQuery)
  }

  getPageQuery$() {
    return this.store.select(fromRoot.getQueryUserPageQuery)
  }

  getOrdering$() {
    return this.store.select(fromRoot.getQueryUserSorting)
  }

  getQuery$() {
    return this.store.select(fromRoot.getQueryUserQuery)
  }

  dispatchUpdateQuery(query) {
    this.store.dispatch(new fromQuery.UpdateUserListQueryQueryAction(query))
  }

  dispatchClearQuery(key) {
    if(key == 'show_all') {
      this.showAll(false)
      return true
    }
    this.store.dispatch(new fromQuery.ClearUserQueryKeyQueryAction(key))
  }

  dispatchPageQuery(query) {
    this.store.dispatch(new fromQuery.UpdateUserPageQueryQueryAction(query))
  }

  searchApi(query) {
    return this.userService.summary(query)
  }

  customFilterValueMap() {
    return {
      show_all: 'Show All'
    }
  }

  showAll(show_all: boolean = true) {
    let query = {show_all, status: null, search: null};
    if(show_all) {
      this.fitToMap.clear()
    } else {
      this.fitToMap.init()
    }
    this.dispatchUpdateQuery(query)
  }

  csvApi$(query) {
    let string = HtQuerySerialize({...query, output_format: 'csv', 'min_recorded_at': query.start, 'max_recorded_at': query.end, start: null, end: null, page_size: null});
    let url = `https://api.hypertrack.com/api/v2/users/analytics/?${string}`
    return this.http.get(url, {responseType: 'text'})
  }

  fileName(): string {
    return 'drivers.csv'
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
