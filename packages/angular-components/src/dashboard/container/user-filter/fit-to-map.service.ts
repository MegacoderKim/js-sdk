import { Injectable } from '@angular/core';
import {InnerMapService} from "../../map-container/map.service";
import {Subscription} from "rxjs/Subscription";
import {BroadcastService} from "../../core/broadcast.service";
import {Observable} from "rxjs/Observable";
import * as fromRoot from "../../reducers";
import * as fromQuery from "../../actions/query";
import {Store} from "@ngrx/store";
import * as _ from "underscore";
import {config} from "../../config";
import {IsRangeToday} from "ht-utility";
import {combineLatest} from "rxjs/observable/combineLatest";
import {map} from "rxjs/operators";

@Injectable()
export class FitToMapService {
  toFitToMap: boolean = false;
  toShowFitToMap: boolean = false;
  subs: Subscription[] = [];
  checkZoomSub: Subscription;
  zoomCutOff: number = 11;
  isToday: boolean = false;
  constructor(
    private mapService: InnerMapService,
    public store: Store<fromRoot.State>,
  ) {
    // this.toFitToMap = config.isMobile ? false : true;
  }

  toggleFitToMap() {
    this.toFitToMap = !this.toFitToMap;

    if(this.toFitToMap) {
      this.dispatchFitMapFilter()
    } else {
      this.dispatchClearQuery()
    }
  }

  init() {

    let dateRange$ = this.store.select(fromRoot.getQueryDateRange).pipe(
      map(range => {
        let isToday = IsRangeToday(range);
        this.isToday = isToday;
        return isToday
      })
    );

    let selectedUser$ = this.store.select(fromRoot.getUserSelectedUserId).pipe(
      map(selectedUserId => {
        return !selectedUserId
      })
    );

    let sub = combineLatest(
      dateRange$,
      selectedUser$
    ).pipe(map(([a, b]) => a && b))
      .subscribe((toShow) => {
        if(toShow) {
        // this.disableResetBoundsTemp();
        this.startWatchZoom();
      } else if(this.getToFitToBounds()) {
        this.toShowFitToMap = false;
        if(this.checkZoomSub) this.checkZoomSub.unsubscribe();
      } else {
          if(this.checkZoomSub) this.checkZoomSub.unsubscribe();
        }
    });

    this.subs.push(sub)
  }

  startWatchZoom() {
    // let map = this.mapService.map;
    // if(!map) return false;
    // let moveEnd$ = Observable.fromEvent(map, 'moveend');
    // let userData$ = this.store.select(fromRoot.getUserPageData);
    // let checkZoom$ = moveEnd$
    //   .withLatestFrom(userData$).map(([e, userData]) => {
    //     // console.log(userId, userData, "zip");
    //     return userData && userData.results.length > 0
    //   }).filter(() => this.isToday);
    // if(this.checkZoomSub) this.checkZoomSub.unsubscribe();
    // this.checkZoomSub = checkZoom$.subscribe((toShow: boolean) => {
    //   let oldToShow = this.toShowFitToMap;
    //   this.toShowFitToMap = map.getZoom() > this.zoomCutOff && toShow ? true : false;
    //   if(!this.toShowFitToMap && oldToShow && this.toFitToMap) this.dispatchClearQuery();
    //   // this.mapService.toShowFitToMap = this.toShowRecommended;
    //   if(this.getToFitToBounds()) this.dispatchFitMapFilter();
    // });
  }

  clearFitToMap() {
    this.toShowFitToMap = false;
    if(this.toFitToMap) this.dispatchClearQuery();
    if(this.checkZoomSub) this.checkZoomSub.unsubscribe();
  }

  clear() {
    this.clearFitToMap();
    _.each(this.subs, sub => sub.unsubscribe())
  }

  private getToFitToBounds() {
    return this.toFitToMap && this.toShowFitToMap
  }

  private dispatchFitMapFilter() {
    // this.disableResetBounds();
    let filterQuery = this.getFitMapFilter();
    this.dispatchPageQuery(filterQuery)
  }

  private getFitMapFilter() {
    return {
      last_location__bbox: this.mapService.getBoundingBox()
    }
  }

  private dispatchPageQuery(query) {
    this.store.dispatch(new fromQuery.UpdateUserPageQueryQueryAction(query))
  }

  private dispatchClearQuery() {
    // this.disableResetBounds(false);
    let key = 'last_location__bbox';
    // if(key == 'last_location__bbox') this.clearFitMapFilter();
    this.store.dispatch(new fromQuery.ClearUserPageQueryKeyQueryAction(key))
  }

  private disableResetBounds(keep: boolean = true) {
    // config.toReset= false;
    // if(!keep) {
    //   setTimeout(() => {
    //     config.toReset = true;
    //   }, 5000)
    // }

  }

  private disableResetBoundsTemp() {
    config.toReset = config.isMobile ? true : false;
    setTimeout(() => {
      config.toReset = true;
    }, 1000)
  }
}
