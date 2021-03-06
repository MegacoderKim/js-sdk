import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import * as _ from "underscore";
import {ActivatedRoute} from "@angular/router";
import {IPageData} from "../../model/common";
import {BroadcastService} from "../../core/broadcast.service";
import {RangeHasToday} from "ht-utility";
import 'rxjs/add/observable/merge';
import {merge} from "rxjs/observable/merge";
import {empty} from "rxjs/observable/empty";

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.less']
})
export class EntityListComponent implements OnInit {
  updateSummary$:Subscription;
  items;
  summary;
  subs: Subscription[] = [];
  baseLoading = {
    data: false,
    page: false
  };
  currentPage = 1;
  orderingObj;
  hasToday: boolean;
  status: string | undefined;
  currentTotal: number | null = null;
  constructor(
    public route: ActivatedRoute,
    public broadcast: BroadcastService
  ) { }

  ngOnInit() {
    this.addListeners()
  }

  private addListeners() {
    let live = this.route.snapshot.queryParams['live'];
    let getList$ = (query) => {
      let update$;
      if(live) {
        update$ = this.broadcast.on('update-page-data').debounceTime(10000)
          .switchMap(() => {
            return this.getListApi(query)
          })
      } else {
        update$ = this.broadcast.on('update-page-data').debounceTime(10000)
          .filter(() => this.hasToday)
          .flatMap((query) => {
            return this.getPageData().take(1).map((pageData: IPageData) => {
              let ids: string[] = pageData ? _.map(pageData.results, (data) => data.id) : [];
              return {ids, pageData, query}
            })
          }).flatMap((currentData) => {
            let start = currentData.query['start'];
            let end = currentData.query['end'];
            let show_all = !!currentData.query['show_all'];
            const search = currentData.query['search'];
            const idString = currentData.ids.toString();
            let query = {start, end, show_all, page_size: 50};
            if (idString) {
              query['id'] = idString
            } else {
              query['search'] = search;
              query['status'] = currentData.query['status'];
            }

            // console.log("update", query);
            return this.getListApi(query).map((updatedPageData: IPageData) => {
              let updatedResultsEntity = _.indexBy(updatedPageData.results, 'id');
              let updatedResults = currentData.pageData && currentData.pageData.results.length ?
                _.map(currentData.pageData.results, (data: string) => updatedResultsEntity[data['id']] || data) : updatedPageData.results;
              // let updatedResults = _.map(currentData.ids, (id: string) => updatedResultsEntity[id]);
              let updatedSortedResults = this.markUnmatched(updatedResults, query);
              return {...currentData.pageData, results: updatedSortedResults}
            })
          });
      }

      // let firstLoad$ = Observable.zip(
      //   this.getListApi(query),
      //   this.getSummaryApi({...query, page: null, ordering: null})
      // ).map(([pageData, summary]) => {
      //   this.updateSummaryData(summary);
      //   return pageData
      // });
      //
      // firstLoad$ = this.getListApi(query)

      this.updateSummary(query);

      let firstFetch$ = this.firstFetch$(query);

      // console.log("first", query);
      return merge(
        firstFetch$.do((pageData) => {
          // console.log("first");
          this.getFirstPageData(pageData)
        }),
        // firstFetch$.skip(1).do((as) => {
        //   console.log("skip");
        // }),
        update$
      )
    };
    let sub = this.getQueryWithCallBack()
        .switchMap(query => getList$(query).do(() => {
          this.broadcast.emit('update-page-data', query);
        }))
      .subscribe((data) => {
        this.updateListData(data);
      this.baseLoading.data = false;
      this.baseLoading.page = false;
    });

    // let updateSummary$ = merge(
    //   this.getQuery(),
    //   this.broadcast.on('update-page-data').debounceTime(10000)
    // )



    let sub1 = this.getListDateQuery()
        .do((query) => {
          this.onListDateQueryChange(query)
        })
        .subscribe(() => {

    });

    let sub2 = this.getPageQuery()
        .subscribe((query) => {
          this.onPageQueryChange(query)
        });


    let sub3 = this.getOrdering$().subscribe((orderingObj) => {
      this.orderingObj = orderingObj;
    });

    this.subs.push(sub, sub1, sub2, sub3)
  }

  updateSummary(query) {
    let updateSummary$ = this.broadcast.on('update-page-data').debounceTime(10000);
    if(this.updateSummary$) this.updateSummary$.unsubscribe();
    this.updateSummary$ = updateSummary$
      .switchMap(query => {
        // console.log("summary", query);
        return this.getSummaryApi({...query, page: null, ordering: null})
      })
      .subscribe(data => {
        this.updateSummaryData(data);
      });
  }

  isActiveOrdering(key: string, hasSign: 0 | 1 | boolean) {
    return (this.isActiveOrderKey(key) && this.orderingObj.sign === hasSign);
  }

  isActiveOrderKey(key) {
    return this.orderingObj && this.orderingObj.type === key
  }

  firstFetch$(query) {
    return this.getListApi(query)
    // return Observable.zip(
    //   this.getListApi(query),
    //   this.getSummaryApi({...query, page: null, ordering: null})
    // ).map(([pageData, summary]) => {
    //   this.updateSummaryData(summary);
    //   return pageData
    // });
  }

  onListDateQueryChange(query) {
    this.hasToday = RangeHasToday(query);
    this.baseLoading.data = true;
    this.status = query['status']
    // this.currentPage = +query['page'] || 1;
  }

  onPageQueryChange(query) {
    this.currentTotal = null;
    this.currentPage = +query['page'] || 1;
  }

  onQueryChange(query) {
    // console.log("Query change", query);
  }

  getListQueryWithUpdate() {

    return merge(
        this.getQuery()
    )
  }

  getDateRange() {
    return empty()
  }

  getQueryWithCallBack() {
    return this.getQuery().do((query) => {
      this.onQueryChange(query)
    })
  }

  getQuery() {
    return empty()
  }

  getListDateQuery() {
    return empty()
  }

  getPageQuery() {
    return empty()
  }

  getOrdering$() {
    return empty()
  }

  getListApi(query) {
    return empty()
  }

  getSummaryApi(query) {
    return empty()
  }

  getGraphApi(query) {
    return empty()
  }

  getPageData() {
    return empty()
  }

  indexId(index, item){
    return item.id
  }

  onFetchPage(page) {
    this.updatePageQuery({page})
  }

  updatePageQuery(query = {}) {

  }

  getFirstPageData(pageData) {
    // console.log(this.items);
    if(this.items) this.broadcast.emit('scroll-top')
    // this.broadcast.emit('scroll-top')
  }

  ngOnDestroy() {
    if(this.updateSummary$) this.updateSummary$.unsubscribe();
    _.each(this.subs, sub => sub.unsubscribe())
  }

  updateListData(data) {

  }

  updateSummaryData(data) {}


  markUnmatched(results: any[], query: object) {
    return results
  }
}
