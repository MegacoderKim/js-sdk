import {ChangeDetectorRef, Component, Input, OnInit} from "@angular/core";
import {UserService} from "../user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import * as fromRoot from "../../reducers";
import * as fromUser from "../../actions/user";
import {Store} from "@ngrx/store";
// import * as moment from "moment-mini";
import * as _ from "underscore";
import {TimeString, DotString, DateString, DistanceLocale} from "ht-utility";
import {ActionService} from "../../action/action.service";
import {IAction, IPlaceline, IUserPlaceline} from "ht-models";
import {BroadcastService} from "../../core/broadcast.service";
import {ContainerService} from "../../container/container.service";
import {anim} from "../../../utils/animations";
import {config} from "../../config";
import {LinkBaseUrl} from "../../../utils/base-url";
import {InnerMapService} from "../../map-container/map.service";
import {isToday, startOfDay, endOfDay} from "date-fns"
import {HtUsersService} from "ht-angular";
declare let $: any;

@Component({
  selector: 'app-timeline-user',
  templateUrl: './timeline-user.component.html',
  styleUrls: ['./timeline-user.component.less'],
  animations: [
      anim.sticky,
      anim.appear
  ]
})
export class TimelineUserComponent implements OnInit {
  timeLine: IUserPlaceline;
  subs: Subscription[] = [];
  id: string;
  user: any = {
    name: "Unknown",
    photo: null,
    subStatus: ""
  };
  segmentsDisplay: any = [];
  segmentsArray: any = [];
  events: any = [];
  actions: any = [];
  timeLineDay: string;
  loading = {
    data: true,
    timeline: true
  };
  userData$: Observable<IUserPlaceline>;
  notToday: boolean = true;
  isOnline: boolean = false;
  @Input() paramsKey: string = 'id';
  @Input() showPop: boolean = false;
  @Input() forceClose: boolean = false;
  @Input() actionDetail: boolean = false;
  @Input() baseLink: string = './';
  actionId: string | null = null;
  actionLookupId: string | null = null;
  actionCollectionId: string | null = null;
  action: IAction;
  notFound: boolean = false;
  isMobile = config.isMobile;
  selectedPartialSegmentId$;
  timezone = config.timezone;

  constructor(
      private route: ActivatedRoute,
      private userService: UserService,
      private htUserService: HtUsersService,
      private actionService: ActionService,
      private store: Store<fromRoot.State>,
      private router: Router,
      private broadcast: BroadcastService,
      private containerService: ContainerService,
      private mapService: InnerMapService,
      private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.containerService.setDetailView(true);
    if(!this.showPop) this.mapService.showMapSwitch = true;
    this.selectedPartialSegmentId$ = this.htUserService.placeline.segmentResetId$;
    let sub = this.route.params.subscribe((params) => {
      this.loading.timeline = true;
      this.timeLineDay = params['day'];
      this.actionId = params['action_id'];
      this.actionLookupId = params['action_unique_id'] || params['action_lookup_id'];
      this.actionCollectionId = params['action_collection_id'];
      const timelineQuery = this.timeLineDay ?
        {min_recorded_at: startOfDay(this.timeLineDay).toISOString(), max_recorded_at: endOfDay(this.timeLineDay).toISOString()} : {}
      this.htUserService.placeline.setQuery({...timelineQuery, action_id: this.actionId, action_unique_id: this.actionLookupId, action_collection_id: this.actionCollectionId})
      // this.store.dispatch(new fromUser.SelectTimelineQueryAction({date: this.timeLineDay, action_id: this.actionId, action_unique_id: this.actionLookupId, action_collection_id: this.actionCollectionId}));
      this.notToday = this.isBeforeToday(this.timeLineDay);
      let id = params[this.paramsKey];
      if(id) {
        this.updateUserTimeLine(id)
      }
      if(this.actionId) {
        this.getAction(this.actionId)
      }
      this.id = id;
    });

    // this.userData$ = this.store.select(fromRoot.getUserData).filter(data => !!data);
    this.userData$ = this.htUserService.placeline.data$.filter(data => !!data);

    let sub2 = this.userData$.subscribe((timeLine: IUserPlaceline) => {
      // console.log("timel", timeLine);
      this.timeLine = timeLine;
      this.notToday = this.isBeforeToday(this.timeLine.timeline_date);
      this.loading.timeline = false;
      this.loading.data = false;
      this.timeLineDay = timeLine.timeline_date;
      this.notFound = false;
      // this.user = timeLine;
      // this.updateSegmentsDisplay(timeLine.placeline);
      // this.segmentsArray = timeLine.placeline;
      // this.events = timeLine.events;
      this.actions = timeLine.actions;
      this.isOnline = this.timeLine.availability_status === "online" || this.timeLine.availability_status === "active";
      if(this.actionId) {
        this.getAction(this.actionId)
      }
      this.cd.detectChanges();
    });

    let sub3 = this.broadcast.on('user-not-found').subscribe(() => {
      this.notFound = true;
    });

    // this.store.dispatch(new fromQuery.ChangeShowDetailQueryAction(true));

    this.subs.push(sub, sub2, sub3)
  }

  ngAfterViewInit() {
  }

  closePopup() {
    _.each(this.subs, sub => sub.unsubscribe());
    let base = config.isWidget ? this.baseLink : './';
    this.router.navigate([base, {}], {relativeTo: this.route, queryParamsHandling: 'preserve'})
  }

  updateUserTimeLine(userId) {
    this.htUserService.placeline.setId(userId)
    // this.store.dispatch(new fromUser.SelectUserIdAction(userId));
  }

  handleMouseOver(id: string) {
    this.htUserService.placeline.setSegmentSelectedId(id)
    // if (!id) {
    //   this.handleMouseOut();
    // } else {
    //   this.store.dispatch(new fromUser.SelectSegmentAction(id));
    // }

  }

  handleMouseOut() {
    this.store.dispatch(new fromUser.ClearSegmentAction());
  }

  hoverAction(actionId) {
    if(actionId) {
      this.store.dispatch(new fromUser.SelectUserActionId(actionId))

    } else {
      this.store.dispatch(new fromUser.ClearUserActionId())
    }
  }

  selectPartialSegment(partialSegment) {
    this.htUserService.placeline.setSegmentResetMapId(partialSegment)
    // if(partialSegment) {
    //   this.store.dispatch(new fromUser.SelectPartialSegmentAction(partialSegment))
    // } else {
    //   this.store.dispatch(new fromUser.ClearPartialSegmentAction())
    // }
  }

  // changeDateTimeLine(date: string, offset: number) {
  //   if(this.loading.timeline) return false;
  //   if(!this.notToday && offset > 0) return false;
  //   let newDate = moment(date).add(offset, 'day').format('YYYY-MM-DD');
  //   this.setDate(newDate)
  // }
  //
  setDate(date) {
    this.store.dispatch(new fromUser.ClearUserAction());
    let base = config.isWidget ? this.baseLink : './';
    this.router.navigate([base, {...this.route.snapshot.params, day: date}],
      {relativeTo: this.route, queryParamsHandling: 'preserve'}
    )
  }
  //
  // selectAction(actionId: string) {
  //   if(actionId) {
  //     this.store.dispatch(new fromUser.SelectUserActionId(actionId))
  //
  //   } else {
  //     this.store.dispatch(new fromUser.ClearUserActionId())
  //   }
  // }
  //
  //
  private isBeforeToday(time): boolean {
    return time ? !isToday(time) : false;
  }
  //
  // trackSegment(index, segment) {
  //   return segment ? segment.id : null;
  // }
  //
  // trackEvent(index, event) {
  //   return event ? event.id : null;
  // }
  //
  // trackAction(index, action) {
  //   return action ? action.id : null;
  // }
  //
  // trackMarker(index, marker) {
  //   return marker ? marker.id : null;
  // }
  //
  ngOnDestroy() {
    this.store.dispatch(new fromUser.ClearPartialSegmentAction());
    if(!this.showPop) this.mapService.showMapSwitch = false;
    if(!this.showPop || this.forceClose) this.store.dispatch(new fromUser.ClearUserAction());
    _.each(this.subs, sub => sub.unsubscribe());
    this.containerService.setDetailView(false);
  }

  private getAction(actionId: string) {
    this.actionService.getAction(actionId).subscribe((action: IAction) => {
      this.action = action
    })
  }

  onDebug(user, timelineDay) {
    if(!config.isStaff) return false;
    let user_id = this.timeLine.id;
    if(this.timeLine.placeline.length) {
      let min = _.first(this.timeLine.placeline)['started_at'];
      let max = _.last(this.timeLine.placeline)['ended_at'] || new Date().toISOString();
      let url = `/debug/events;user_id=${user_id};min_recorded_at=${min};max_recorded_at=${max}`;
      console.log(url);
      var win = window.open(url, '_blank');
      if (win) {
        //Browser has allowed it to be opened
        win.focus();
      } else {
        //Browser has blocked it
        alert('Please allow popups for this website');
      }
      // this.router.navigate(['/debug', 'events', {user_id, min_recorded_at: min, max_recorded_at: max}])
    };
    // console.log(user, timelineDay);
    // let min = new Date(timelineDay).toISOString();
    // let max = new Date(new Date(timelineDay).getTime() + 24 * 60 * 60 * 1000).toISOString();

  }
}

interface ISegmentDisplay {
  id: string,
  user_id: string,
  started_at: string,
  ended_at: string,
  distance: string,
  duration: string,
  type: string
}
