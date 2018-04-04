import { Component, OnInit } from '@angular/core';
import * as fromRoot from "../../reducers";
import {Store} from "@ngrx/store";
import {FilterCommonComponent} from "../filter-common/filter-common.component";
import {ActionService} from "../../action/action.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "underscore";
import * as fromQuery from "../../actions/query";
import {
  GetActionStatusFiltersMap, GetActionSortingMap, GetActionTypesMap,
  GetActionOntimeFiltersMap
} from "../../../utils/actions-helpers";
import {HtQuerySerialize} from "ht-utility";
import {HttpClient} from "@angular/common/http";
import {DateRangeMap} from "ht-data";

@Component({
  selector: 'app-action-filter',
  templateUrl: './action-filter.component.html',
  styleUrls: ['./action-filter.component.less', '../filter.less']
})
export class ActionFilterComponent extends FilterCommonComponent implements OnInit {
  actionStatusFilters = GetActionStatusFiltersMap;
  actionOntimeFilters =  GetActionOntimeFiltersMap;
  actionTypes = GetActionTypesMap;
  actionSortings = GetActionSortingMap;
  dateRange = DateRangeMap.today;

  constructor(
      public store: Store<fromRoot.State>,
      public actionService: ActionService,
      public router: Router,
      public route: ActivatedRoute,
      public http: HttpClient
  ) {
    super(store, router, route)
  }

  ngOnInit() {
    super.ngOnInit()
  }

  getListData() {
    return this.store.select(fromRoot.getActionPageData)
  }

  getListQuery$() {
    return this.store.select(fromRoot.getQueryActionListQuery)
  }

  getPageQuery$() {
    return this.store.select(fromRoot.getQueryActionPageQuery)
  }

  getOrdering$() {
    return this.store.select(fromRoot.getQueryActionSorting)
  }

  getQuery$() {
    return this.store.select(fromRoot.getQueryActionQuery)
  }

  dispatchUpdateQuery(query) {
    this.store.dispatch(new fromQuery.UpdateActionListQueryQueryAction(query))
  }

  dispatchClearQuery(key) {
    this.store.dispatch(new fromQuery.ClearActionQueryKeyQueryAction(key))
  }

  dispatchPageQuery(query) {
    this.store.dispatch(new fromQuery.UpdateActionPageQueryQueryAction(query))
  }

  selectFilter(query) {
    this.store.dispatch(new fromQuery.UpdateActionListQueryQueryAction(query))
  }

  clearFilter(filter) {
    console.log(filter);
    this.store.dispatch(new fromQuery.ClearActionQueryKeyQueryAction(filter.key))
  }

  searchApi(query) {
    return this.actionService.indexOnDate(query)
  }

  csvApi$(query) {
    let string = HtQuerySerialize({...query, output_format: 'csv', 'min_created_at': query.start, 'max_created_at': query.end, start: null, end: null, page_size: null});
    let url = `https://api.hypertrack.com/api/v2/actions/?${string}`;
    return this.http.get(url, {responseType: 'text'})
  }

  fileName(): string {
    return 'actions.csv'
  }

  ngOnDestroy() {
    super.ngOnDestroy()
  }

}
