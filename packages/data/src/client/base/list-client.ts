import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Page} from "ht-models";
import {Observable} from "rxjs/Observable";
import {HtBaseApi} from "ht-js-client";
import {defaultListConfig, IIndexQuery, IListConfig} from "../../interfaces";
import * as _ from  "underscore";
import { GetUrlParam } from "ht-js-utils";

export class HtListClient {
  update$;
  api: any;
  pageDataBeh$: BehaviorSubject<Page<any> | null> =  new BehaviorSubject(null);
  listQueryBeh$: BehaviorSubject<object> = new BehaviorSubject({});
  pageQueryBeh$: BehaviorSubject<object> = new BehaviorSubject({});
  dateRangeQueryBeh$: BehaviorSubject<object> = new BehaviorSubject({});
  query: Observable<object>;

  constructor(request, public defaultConfigQuery: Partial<IIndexQuery> = {}, public config: IListConfig = defaultListConfig) {
    this.setApi(request);
    this.setDefaultQuery(defaultConfigQuery);
    this.query = Observable.combineLatest(
      this.listQuery$,
      this.pageQuery$,
      this.dateRangeQuery$
    ).map(([listQuery, pageQuery, dateRangeQuery]) => {
      return {...listQuery, ...pageQuery, ...dateRangeQuery}
    });

    // this.initListeners()
  }

  init({listQuery, pageQuery, dateRangeQuery}, config?) {
    if(config) this.config = config;
    this.updateListQuery(listQuery);
    this.updatePageQuery(pageQuery);
    this.updateDateRangeQuery(dateRangeQuery);
    this.initListeners()
  }

  initListeners() {
    this.update$ = this.query.switchMap((query) => this.update(query, this.config.isLive)).subscribe((pageData: Page<any>) => {
      this.pageDataBeh$.next(pageData)
    })
    // this.query.switchMap((query) => this.update(query, this.config.isLive))
  }

  setApi(request) {
    this.api =  new HtBaseApi('', request);
  }

  private setDefaultQuery(defaultConfigQuery: Partial<IIndexQuery>) {
    this.updateListQuery();
    this.updatePageQuery();
    this.updateDateRangeQuery()
  }

  get pageData$(): Observable<Page<any>> {
    // return this.query.switchMap((query) => this.update(query, this.config.isLive))
    return this.pageDataBeh$.asObservable()
  }

  get listQuery$() {
    return this.listQueryBeh$.asObservable();
  }

  get pageQuery$() {
    return this.pageQueryBeh$.asObservable()
  }

  get dateRangeQuery$() {
    return this.dateRangeQueryBeh$.asObservable()
  }

  updateListQuery(listQuery?) {
    let query = listQuery || this.defaultConfigQuery.listQuery;
    if(query) {
      this.listQuery$.take(1).map((currentQuery) => {
        return {...currentQuery, ...query}
      }).subscribe((query) => this.setListQuery(query))
    }
  }

  updatePageQuery(pageQuery?) {
    let query = pageQuery || this.defaultConfigQuery.pageQuery;
    if(query) {
      this.pageQuery$.take(1).map((currentQuery) => {
        return {...currentQuery, ...query}
      }).subscribe((query) => this.setPageQuery(query))
    }
  }

  updateDateRangeQuery(dateRangeQuery?) {
    let query = dateRangeQuery || this.defaultConfigQuery.dateRangeQuery;
    if(query) {
      this.dateRangeQuery$.take(1).map((currentQuery) => {
        return {...currentQuery, ...query}
      }).subscribe((query) => this.setDateRangeQuery(query))
    }

  }

  setListQuery(listQuery?) {
    let query = listQuery || this.defaultConfigQuery.listQuery;
    if(query) {
      this.listQueryBeh$.next(query)
    }
  }

  setPageQuery(pageQuery?) {
    let query = pageQuery || this.defaultConfigQuery.pageQuery;
    if(query) {
      this.pageQueryBeh$.next(query)
    }
  }

  setDateRangeQuery(dateRangeQuery?) {
    let query = dateRangeQuery || this.defaultConfigQuery.dateRangeQuery;
    if(query) {
      this.dateRangeQueryBeh$.next(query)
    }
  }

  turnPage(next: boolean = true) {

    this.pageData$.take(1)
      .map((pageData: Page<any>) => next ? pageData.next : pageData.previous)
      .map((url) => url ? GetUrlParam('page', url) : false)
      .filter((page) => !!page).map((page) => {
      return {page: +page}
    })
      .subscribe((pageQuery) => this.updatePageQuery(pageQuery))
  }

  setPage(number) {
    this.pageData$.take(1)
      .filter((pageData: Page<any>) => !!this.isValidPage(pageData.results.length, pageData.count, number))
      .map(() => {
        return {page: +number}
      }).subscribe((pageQuery) => this.updatePageQuery(pageQuery))
  }

  private isValidPage(pageSize: number = 50, count, page: number = 1) {
    if(page == 1) return true;
    if(page < 1) return false;
    return +count > (page -1) * +pageSize
  }

  update(query, isLive: boolean = false) {
    return this.api.index(query)
      .expand((pageData) => {
        return Observable.timer(10000).switchMap(() => {
          let toUpdate = !isLive || (pageData && pageData.results.length);
          let updateQuery = toUpdate ? { ...query, id: this.getIds(pageData).toString(), page: null} : query;
          return this.api.index(updateQuery)
            .map((updatedPageData) => {
              if(toUpdate) {
                return this.updatedPageData(pageData, updatedPageData)
              } else {
                return updatedPageData
              }
            })

        })
      })
  }

  private updatedPageData(pageData, updatedPageData) {
    let updatedDic = _.indexBy(updatedPageData.results, 'id');
    let results = _.map(pageData.results, (action) => {
      return updatedDic[action.id] || action
    });
    return {...pageData, results}
  }

  private getIds(pageData): string[] {
    let ids: string[] = _.map(pageData.results, (data) => data.id);
    return ids
  }

  clear() {
    if(this.update$) this.update$.unsubscribe()
  }

}