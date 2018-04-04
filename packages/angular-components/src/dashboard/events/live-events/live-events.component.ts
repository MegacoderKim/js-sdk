import { Component, OnInit } from '@angular/core';
import {ListComponent} from "../../shared/list.component";
import {BroadcastService} from "../../core/broadcast.service";
import {IFilter} from "../../model/common";
import { Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ActivatedRoute} from "@angular/router";
import {IEvent} from "ht-models";
import * as fromRoot from "../../reducers";
import * as fromUser from "../../actions/user";
import {Store} from "@ngrx/store";
import * as _ from "underscore";
import {EventService} from "../event.service";
import {OffsetIsoTime} from "ht-utility";


@Component({
  selector: 'app-live-events',
  templateUrl: './live-events.component.html',
  styleUrls: ['./live-events.component.less']
})
export class LiveEventsComponent extends ListComponent implements OnInit {

  // filters: IFilter[] = [
  //   {
  //     params: 'recorded_at',
  //     query: {
  //       ordering: '-recorded_at',
  //       page_size: 20
  //     },
  //     newSetQuery: function (item) {
  //       return {'min_recorded_at': OffsetIsoTime(item[this.params])}
  //     },
  //     nextSetQuery: function (item) {
  //       return { 'max_recorded_at': OffsetIsoTime(item[this.params], -10)}
  //     },
  //     statusParam: 'availability_status',
  //     name: ''
  //   },
  // ];
  // selectedFiler$:  BehaviorSubject<Object> =  new BehaviorSubject(this.filters[0]);
  // selectedUserSegment$;
  // selectedUserSegmentId: string;
  // selectedEventId: string | null = null;
  // selectedEventUserId: string | null = null
  // loading = {
  //   events: true,
  //   overview: true
  // };
  // constructor(
  //     private eventService: EventService,
  //     public broadcast: BroadcastService,
  //     private store: Store<fromRoot.State>,
  //     private route: ActivatedRoute
  // ) {
  //   super(broadcast)
  // }
  //
  // ngOnInit() {
  //   super.ngOnInit();
  //   this.getOverviewData();
  //   this.getMapList();
  //   this.initListeners()
  // }
  // filter$(): Observable<IFilter> {
  //   return this.selectedFiler$
  // }
  //
  // getList$(query) {
  //   return this.eventService.index(query)
  // }
  //
  // selectEvent(select: boolean, event: IEvent) {
  //   if(select) {
  //     this.store.dispatch(new fromUser.SetUsersMapFilterAction(() => false));
  //     this.selectedEventId = event.id;
  //     this.store.dispatch(new fromUser.ClearUserAction());
  //     this.store.dispatch(new fromUser.SelectUserIdAction(event.user_id));
  //   } else {
  //     this.selectedEventId = null;
  //     // this.selectedUser$.next(null);
  //
  //     this.store.dispatch(new fromUser.ClearUserAction());
  //     this.store.dispatch(new fromUser.SetUsersMapFilterAction(() => true));
  //   }
  // }
  //
  //
  // private getOverviewData() {
  //   // this.actionService.overview().subscribe(data => {
  //   //   this.overview  = data;
  //   // });
  // }
  //
  //
  // private getMapList() {
  //   let mapQuery = {
  //     status: 'assigned,started'
  //   };
  //   // this.actionService.mapList(mapQuery, (actionMapPage: IActionMapPage) => {
  //   //   let actionMap = _.filter(actionMapPage.results, (actionMap: IActionMap) => {
  //   //     return true;
  //   //     // return !!(actionMap.last_location && actionMap.last_location.geojson)
  //   //   });
  //   //   if(!actionMapPage.previous) {
  //   //     this.store.dispatch(new fromAction.UpdateActionsMapAction(actionMap));
  //   //   } else {
  //   //     this.store.dispatch(new fromAction.AddActiosMapAction(actionMap))
  //   //   }
  //   // }).subscribe((actionsMap: IActionMap[]) => {
  //   //
  //   // })
  // }
  //
  // private initListeners() {
  //   let sub2 = this.route.params.pluck('id').subscribe((id: string) => {
  //     console.log("selected", id);
  //     this.selectedEventUserId = id;
  //     if(id) {
  //       this.selectedEventUserId = id;
  //       // this.store.dispatch(new fromUser.SetUsersMapFilterAction(() => false));
  //     }
  //   });
  //
  //   let sub3 = this.listData$.subscribe(data => {
  //     this.loading.events = false;
  //     // this.broadcast.emit('list-update')
  //   });
  //
  //   this.selectedFiler$.do(() => {
  //     this.loading.events = true;
  //   });
  //
  //   this.subs.push(sub2, sub3);
  // }
  //
  //
  // ngOnDestroy() {
  //   this.store.dispatch(new fromUser.ClearUserAction());
  //   this.store.dispatch(new fromUser.ClearUsersMapAction());
  //   super.ngOnDestroy()
  // }

}
