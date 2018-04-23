import {Component, OnInit} from "@angular/core";
import * as fromRoot from "../../reducers";
import * as fromQuery from "../../actions/query";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import * as _ from "underscore";
import {IsRangeToday} from "ht-utility";
import {ActivatedRoute, Router} from "@angular/router";
import {IRange} from "../../model/common";
import {config} from "../../config";
import {empty} from "rxjs/observable/empty";
import {of} from "rxjs/observable/of";
import {distinctUntilChanged, flatMap, map, share, take} from "rxjs/operators";
var download = require('../../../assets/download.js');

@Component({
  selector: 'app-filter-common',
  templateUrl: './filter-common.component.html',
  styleUrls: ['./filter-common.component.less']
})
export class FilterCommonComponent implements OnInit {
  switchViewLink$;
  entity$;
  filters$;
  mobileFilters$;
  showMobileMap$;
  ordering$;
  dateRange;
  subs: Subscription[] = [];
  loading$;
  isToday: boolean;
  gloabalQuery = [
    'live',
    'view',
    'key'
  ];
  config = config;
  downloadLoading: boolean = false;
  constructor(
      public store: Store<fromRoot.State>,
      public router: Router,
      public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initSubs();
    this.entity$ = this.store.select(fromRoot.getQueryEntity);
    this.switchViewLink$ = this.entity$.pipe(
      share(),
      map(entity => {
        let base = config.isWidget ? '/widget' : '/';
        return {
          map: [base, 'map', entity],
          list: [base, 'list', entity],
          entity: entity
        }
      })
    );
    this.showMobileMap$ = this.store.select(fromRoot.getUiShowMapMobile);
    this.loading$ = this.store.select(fromRoot.getQueryLoading).pipe(distinctUntilChanged())

  }

  initSubs() {
    this.filters$ = this.getListQuery$().pipe(
      map((obj: object) => {
        let keys = _.keys(obj);
        let query = _.reduce(keys, (acc, key: string) => {
          if(this.isValidFilter(key, obj)) {
            let value = this.getCustomFilterValue(key, obj);
            return [...acc, {key, value}]
          } else {
            return acc
          }
        }, []);
        return query;
      })
    );

    this.mobileFilters$ = this.filters$.pipe(
      map((filters: any[]) => {
        return filters && filters.length ? filters : null
      })
    );

    this.ordering$ = this.getOrdering$();
    let queryParam = this.route.snapshot.queryParams;

    if(queryParam.start || queryParam.end) {
      // this.dateRange = {start: queryParam.start, end: queryParam.end};
    }
    let sub3 = this.store.select(fromRoot.getQueryDateRange).subscribe(dateRange => {
      this.dateRange = dateRange;
    });

    if(queryParam.id) {
      this.dispatchUpdateQuery({id: queryParam.id})
    }

    // this.store.dispatch(new fromQuery.SetUserListQueryQueryAction(queryParam));
    let sub = this.getQuery$().subscribe((query: IRange) => {
      let globalQuery = _.reduce(this.gloabalQuery, (query, param) => {
        return {...query, [param]: this.route.snapshot.queryParamMap.get(param)}
      }, {});
      let filteredQuery = IsRangeToday(query) ? {...globalQuery, ...query, start: null, end: null} : query;
      if(!config.isWidget) this.router.navigate(['./'], {queryParams: filteredQuery, relativeTo: this.route})
    });

    let sub2 = this.store.select(fromRoot.getQueryDateRange).subscribe((range: IRange) => {
      this.isToday = range.isToday;
      // console.log(range, "range");
    })

    this.subs.push(sub, sub2, sub3);
  }

  clearFilter(filter) {
    this.dispatchClearQuery(filter.key)
  }


  selectFilter(query) {
    this.dispatchUpdateQuery(query)
  }

  getListQuery$() {
    return empty()
  }

  getPageQuery$() {
    return empty()
  }

  getOrdering$() {
    return empty()
  }

  getQuery$() {
    return empty()
  }

  getListData() {
    return empty()
  }

  dispatchClearQuery(key: string) {

  }

  dispatchUpdateQuery(query: object) {

  }

  dispatchPageQuery(query) {

  }

  setSorting(key, sign: 0 | 1 = 1) {
    let ordering = sign ? key : '-'+key;
    this.dispatchPageQuery({ordering})
  }

  setDateRange(query) {
    this.store.dispatch(new fromQuery.UpdateDateRangeQueryAction(query));
  }

  isValidFilter(key: string, obj: object) {
    return key != 'page_size' && obj[key]
  }

  ngOnDestroy() {
    _.each(this.subs, sub => sub.unsubscribe())
  }

  private getCustomFilterValue(key: string, obj: Object) {
    let customValue = this.customFilterValueMap()[key];
    if(customValue) {
      return customValue
    } else {
      return obj[key]
    }
  }

  customFilterValueMap() {
    return {}
  }

  downloadCsv() {
    this.downloadLoading = true;
    this.getQuery$().pipe(take(1), flatMap((query: any) => this.csvApi$(query))).subscribe((data) => {
      this.downloadLoading = false;
      download(data, this.fileName(), "text/csv")
    })
  }

  fileName(): string {
    return ""
    // return 'drivers.csv'
    // return 'actions.csv'
  }

  csvApi$(query) {
    return of({})
  }

}
