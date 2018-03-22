import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";
import * as _ from "underscore";
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {IRange} from "../model/common";
import * as moment from "moment-mini";

@Component({
  template: '',
})
export class AnalyticsCommon {
  subs: Subscription[] = [];
  filter: Subject<Object> = new Subject();
  graphFilter: Subject<Object> = new Subject();
  summaryFilter: Subject<Object> = new Subject();
  defaultFilter = {
    page_size: 15
  };
  currentFilter = {
    page_size: 15
  };
  defaultDateRange = {
    start: moment().subtract(29, 'days').toISOString(),
    end: moment().endOf('day').toISOString()
  };
  defaultGraphFilter = {};
  currentGraphFilter = this.defaultGraphFilter;
  defaultSummaryFilter = {};
  currentSummaryFilter = this.defaultSummaryFilter;
  activeSortColumnKey = null;
  dataColumns = [];
  currentPage: number = 1;
  loading = {
    page: false,
    sort: false,
    search: false
  };
  searchBox = {
    activeSearchQuery: ''
  };
  errorMessage: string = null;
  dataResult: any = null;
  selectedItemId: string | null = null;
  constructor(
      public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentFilter = this.defaultFilter;
    this.currentGraphFilter = this.defaultGraphFilter;
    this.currentSummaryFilter = this.defaultSummaryFilter;
    this.initListener();
    this.loading.page = true;
    this.filter.next(this.defaultFilter);
    this.graphFilter.next(this.currentGraphFilter);
    this.summaryFilter.next(this.currentSummaryFilter);
  }

  private initListener() {
    let sub = this.filter.switchMap((query) => {
      return this.getData(query);
    }).subscribe((data: any) => {
      this.errorMessage = null;
      this.fillData(data);
      this.resetLoadingState();
    }, (error) => {
      this.errorMessage = "Sorry, something unexpected happened. Please try again in few minutes.";
      console.log("HTTP ERROR: ", error);
    });

    let sub2 = this.route.params.subscribe(params => {
      let actionId = params['id'];
      let lookupId = params['lookup_id'];
      this.selectedItemId = actionId || lookupId;
    });

    let sub3 = this.graphFilter.switchMap((query) => {
      return this.getGraphData(query);
    }).subscribe((data: any) => {
      this.fillGraphData(data);
    }, (error) => {
      console.log("HTTP ERROR: ", error);
    });
    let sub4 = this.summaryFilter.switchMap((query) => {
      return this.getSummaryData(query);
    }).subscribe((data: any) => {
      this.fillSummaryData(data);
    }, (error) => {
      console.log("HTTP ERROR: ", error);
    });
    this.subs.push(sub, sub2, sub3, sub4)
  }

  handleSorting(key, sortOrder) {
    if (!key || !!this.errorMessage || !this.dataResult || (this.dataResult.results && this.dataResult.results.length === 0)) return;
    let selectedSortColumn = _.find(this.dataColumns, column => {
      return column.key == key;
    });
    let activeSortColumn = _.find(this.dataColumns, column => {
      return column.key == this.activeSortColumnKey;
    });
    let newSortOrder = '-';
    if (sortOrder) {
      newSortOrder = sortOrder;
    } else if (selectedSortColumn.key === activeSortColumn.key) {
      newSortOrder = this.getReverseSortOrder(activeSortColumn.sortOrder);
    } else {
      newSortOrder = selectedSortColumn.sortOrder;
    }
    this.activeSortColumnKey = key;
    let newOrdering = (newSortOrder === '-') ? `-${key}` : key;
    this.dataColumns = this.dataColumns.map((column) => {
      if (column.key === key) {
        return {
          ...column,
          sortOrder: newSortOrder
        }
      }
      return {...column}
    });
    this.loading.sort = true;
    this.currentPage = 1;
    this.filter.next({ordering: newOrdering, page: 1});
  }

  getReverseSortOrder(sortOrder) {
    if (sortOrder === '+') return '-';
    if (sortOrder === '-') return '+';
  }

  isActiveSortOrder(key, sortOrder) {
    let activeSortColumn = _.find(this.dataColumns, column => {
      return column.key == this.activeSortColumnKey;
    });
    return (activeSortColumn.key === key && activeSortColumn.sortOrder === sortOrder);
  }

  resetLoadingState() {
    this.loading.search = false;
    this.loading.sort = false;
    this.loading.page = false;
  }

  onFetchPage(page: number) {
    this.loading.page = true;
    this.currentPage = page;
    this.filter.next({page});
  }

  getData(query) {
    return Observable.empty();
  }

  getGraphData(query) {
    return Observable.empty();
  }

  getSummaryData(query) {
    return Observable.empty();
  }

  fillData(data) {}

  fillGraphData(data) {}

  fillSummaryData(data) {}

  handleSearch(elem) {
    let query = elem.value;
    //if (query === '') return;
    this.executeSearch(query);
    elem.blur();
  }

  resetSearch(elem) {
    elem.value = '';
    this.loading.search = true;
    this.searchBox.activeSearchQuery = '';
    let queryObject = this.getSearchQueryFilter('');
    this.filter.next(queryObject);
  }

  getSearchPlaceholder() {
    return (!this.searchBox.activeSearchQuery ? "Search" : this.searchBox.activeSearchQuery);
  }

  ngOnDestroy() {
    _.each(this.subs, sub => sub.unsubscribe())
  }

  private executeSearch(searchQuery: string) {
    this.searchBox.activeSearchQuery = searchQuery;
    this.loading.search = true;
    let queryObject = this.getSearchQueryFilter(searchQuery);
    this.currentPage = 1;
    this.filter.next({...queryObject, page: 1});
  }

  executeRangeChange(range: IRange) {
    let queryObject = this.getDateRangeQueryFilter(range);
    this.executeQuery(queryObject);
    this.executeGraphQuery(queryObject);
    this.executeSummaryQuery(queryObject);
  }

  private executeGraphQuery(queryObject) {
    this.graphFilter.next(queryObject);
  }

  executeQuery(queryObject) {
    this.loading.page = true;
    this.currentPage = 1;
    this.filter.next({...queryObject, page: 1})
  }

  executeSummaryQuery(query) {
    this.summaryFilter.next({...query})
  }

  getSearchQueryFilter(query: string) {
    return {}
  }

  getDateRangeQueryFilter(range: IRange) {
    return {}
  }
}
