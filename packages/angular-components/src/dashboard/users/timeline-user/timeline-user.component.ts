import {ChangeDetectorRef, Component, Input, OnInit} from "@angular/core";
import {UserService} from "../user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import * as fromRoot from "../../reducers";
import * as fromUser from "../../actions/user";
import {Store} from "@ngrx/store";
import * as moment from "moment-mini";
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
    this.selectedPartialSegmentId$ = this.store.select(fromRoot.getUserSelectedPartialSegmentId);
    let sub = this.route.params.subscribe((params) => {
      this.loading.timeline = true;
      this.timeLineDay = params['day'];
      this.actionId = params['action_id'];
      this.actionLookupId = params['action_unique_id'] || params['action_lookup_id'];
      this.actionCollectionId = params['action_collection_id'];
      this.store.dispatch(new fromUser.SelectTimelineQueryAction({date: this.timeLineDay, action_id: this.actionId, action_unique_id: this.actionLookupId, action_collection_id: this.actionCollectionId}));
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

    this.userData$ = this.store.select(fromRoot.getUserData).filter(data => !!data);

    let sub2 = this.userData$.subscribe((timeLine: IUserPlaceline) => {
      // console.log("timel", timeLine);
      this.timeLine = timeLine;
      this.notToday = this.isBeforeToday(this.timeLine.timeline_date);
      this.loading.timeline = false;
      this.loading.data = false;
      this.timeLineDay = timeLine.timeline_date;
      this.notFound = false;
      // this.user = timeLine;
      this.updateSegmentsDisplay(timeLine.placeline);
      this.segmentsArray = timeLine.placeline;
      this.events = timeLine.events;
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

  updateSegmentsDisplay(segments: IPlaceline[]) {
    let interpolatedSegments: any = this.getInterpolatedSegments(segments);
    this.segmentsDisplay = interpolatedSegments.map((segment, index, arr) => {
      return this.createSegmentDisplay(segment, index, arr);
    });
    this.addEventsToSegments(this.segmentsDisplay);
  }

  segmentDisplayStructure(segment) {
    return segment;
  }

  isValidSegment(segment, prevSegment, first, last) {
    if (first) {
      return last ? (segment.started_at) : (segment.started_at && segment.ended_at);
    } else if (last) {
      return (segment.started_at && (segment.started_at > prevSegment.ended_at));
    } else {
      return (segment.started_at && segment.ended_at && (segment.started_at > prevSegment.ended_at));
    }
  }

  addEventsToSegments(segmentsDisplay) {
    let currentSegmentIndex = 0;
    let currentEventIndex = 0;
    let currentActionIndex = 0;
    while(currentSegmentIndex <= segmentsDisplay.length - 1) {
      currentActionIndex = 0;
      let lastSegment = (segmentsDisplay.length - 1) === currentSegmentIndex;
      let nextSegment = !lastSegment ? segmentsDisplay[currentSegmentIndex + 1] : null;
      let currentSegment = segmentsDisplay[currentSegmentIndex];
      currentSegment.display.markers = this.createCurrentSegmentMarkers(currentSegment, lastSegment);
      while(currentEventIndex <= this.timeLine.events.length - 1) {
        let event = this.timeLine.events[currentEventIndex];
        if (!this.showEvent(event)) {
          currentEventIndex++;
          continue;
        }
        if (this.isEventInSegment(currentSegment, event, lastSegment)) {
          if (this.showEvent(event)) {
            let markerPosition = this.getMarkerPositionForEvent(currentSegment, event);
            // console.log("Pushing event", currentEventIndex, "to marker", markerPosition);
            currentSegment.display.markers[markerPosition].events.push(this.getDisplayEvent(event));
          }
          currentEventIndex++;
        } else if (lastSegment && this.isOnline && !this.notToday) {
          let markerPosition = this.getMarkerPositionForEvent(currentSegment, event, true);
          // if (this.showEvent(event)) {
          //
          // }
          currentEventIndex++;
        } else {
          break;
        }
      }
      while(currentActionIndex <= this.timeLine.actions.length - 1) {
        let action = this.timeLine.actions[currentActionIndex];
        let actionTypeInSegment = this.getActionTypeInSegment(currentSegment, action, lastSegment);
        if (actionTypeInSegment.length > 0) {
          if (this.showAction(action)) {
            let markerPosition = this.getMarkerPositionForAction(currentSegment, action);
            if (markerPosition >=0 && currentSegment.display.markers.length > markerPosition) {
              Array.prototype.push.apply(currentSegment.display.markers[markerPosition].actions, this.getDisplayActions(action, actionTypeInSegment));
            }
          }
        }
        currentActionIndex++;
      }
      currentSegmentIndex++;
      if (currentEventIndex === this.timeLine.events.length) {
        break;
      }
    }
  }

  closePopup() {
    _.each(this.subs, sub => sub.unsubscribe());
    let base = config.isWidget ? this.baseLink : './';
    this.router.navigate([base, {}], {relativeTo: this.route, queryParamsHandling: 'preserve'})
  }

  createCurrentSegmentMarkers(segment, lastSegment) {
    if (segment.started_at && (segment.ended_at || lastSegment)) {
      let endedAt = segment.ended_at || new Date();
      let duration = moment(endedAt).diff(segment.started_at, 'minutes');
      let segmentHeight = this.getSegmentHeight(duration);
      let totalMarkers = Math.floor(segmentHeight / 50) > 0 ? Math.floor(segmentHeight / 50) : 1;
      let markers = [];
      for (let i = 0; i < totalMarkers; i++) {
        markers.push({
          events: [],
          actions: []
        });
      }
      return markers;
    }
    return [];
  }

  getMarkerPositionForEvent(segment, event, isLastSegment: boolean = false) {
    if (segment.started_at && segment.ended_at) {
      let totalDuration = moment(segment.ended_at).diff(segment.started_at, 'minutes');
      let segmentHeight = this.getSegmentHeight(totalDuration);
      let totalMarkers = Math.floor(segmentHeight / 50) > 0 ? Math.floor(segmentHeight / 50) : 1;
      let markerDuration = (totalDuration / totalMarkers);
      let eventTime = moment(event.recorded_at).diff(segment.started_at, 'minutes');
      let markerPosition = markerDuration > 0 ? Math.floor(eventTime / markerDuration) : 0;
      if (markerPosition > totalMarkers - 1) {
        // console.log("Marker position", markerPosition, eventTime, markerDuration);
        return (totalMarkers - 1) > 0 ? (totalMarkers - 1) : 0;
      }
      return markerPosition;
    } else if (isLastSegment) {
      let endTime = new Date();
      let totalDuration = moment(endTime).diff(segment.started_at, 'minutes');
      let segmentHeight = this.getSegmentHeight(totalDuration);
      let totalMarkers = Math.floor(segmentHeight / 50) > 0 ? Math.floor(segmentHeight / 50) : 1;
      let markerDuration = (totalDuration / totalMarkers);
      let eventTime = moment(event.recorded_at).diff(segment.started_at, 'minutes');
      let markerPosition = markerDuration > 0 ? Math.floor(eventTime / markerDuration) : 0;
      if (markerPosition > totalMarkers - 1) {
        // console.log("Marker position", markerPosition, eventTime, markerDuration);
        return (totalMarkers - 1) > 0 ? (totalMarkers - 1) : 0;
      }
      return markerPosition;
    }
    return 0;
  }

  getSegmentHeight(duration) {
    return 200;
  }

  isEventInSegment(segment, event, lastSegment) {
    if (segment.started_at && segment.ended_at) {
      return this.isDateGreater(event.recorded_at, segment.started_at, true) && this.isDateGreater(segment.ended_at, event.recorded_at, lastSegment);
    } else if (!segment.ended_at && lastSegment) {
      let currentDate = new Date();
      return this.isDateGreater(event.recorded_at, segment.started_at, true) && this.isDateGreater(currentDate, event.recorded_at);
    }
    return false;
  }

  getActionTypeInSegment(segment, action, lastSegment) {
    let createdActionTime = action.created_at;
    let assignedActionTime = action.assigned_at;
    let completedActionTime = action.completed_at;
    let actionTypesInSegment = [];
    if (createdActionTime && this.isActionInSegment(segment, action, lastSegment, createdActionTime)) {
      actionTypesInSegment.push('created');
    }
    if (assignedActionTime && this.isActionInSegment(segment, action, lastSegment, assignedActionTime)) {
      actionTypesInSegment.push('assigned');
    }
    if (completedActionTime && this.isActionInSegment(segment, action, lastSegment, completedActionTime)) {
      actionTypesInSegment.push('completed');
    }
    return actionTypesInSegment;
  }

  isActionInSegment(segment, action, lastSegment, actionTime = null) {
    if (!actionTime) actionTime = this.getActionTime(action);
    if (segment.started_at && segment.ended_at) {
      return this.isDateGreater(actionTime, segment.started_at, true) && this.isDateGreater(segment.ended_at, actionTime, lastSegment);
    } else if (!segment.ended_at && lastSegment) {
      let currentDate = new Date();
      return this.isDateGreater(actionTime, segment.started_at, true) && this.isDateGreater(currentDate, actionTime);
    }
    return false;
  }

  getMarkerPositionForAction(segment, action, isLastSegment: boolean = false) {
    let actionTime = this.getActionTime(action);
    if (segment.started_at && segment.ended_at) {
      let totalDuration = moment(segment.ended_at).diff(segment.started_at, 'minutes');
      let segmentHeight = this.getSegmentHeight(totalDuration);
      let totalMarkers = Math.floor(segmentHeight / 50) > 0 ? Math.floor(segmentHeight / 50) : 1;
      let markerDuration = (totalDuration / totalMarkers);
      let actionDuration = moment(actionTime).diff(segment.started_at, 'minutes');
      let markerPosition = markerDuration > 0 ? Math.floor(actionDuration / markerDuration) : 0;
      if (markerPosition >= totalMarkers - 1) {
        // console.log("Marker position", markerPosition, actionDuration, markerDuration);
        return (totalMarkers - 1) > 0 ? (totalMarkers - 1) : 0;
      }
      return markerPosition;
    } else if (isLastSegment) {
      let endTime = new Date();
      let totalDuration = moment(endTime).diff(segment.started_at, 'minutes');
      let segmentHeight = this.getSegmentHeight(totalDuration);
      let totalMarkers = Math.floor(segmentHeight / 50) > 0 ? Math.floor(segmentHeight / 50) : 1;
      let markerDuration = (totalDuration / totalMarkers);
      let actionDuration = moment(actionTime).diff(segment.started_at, 'minutes');
      let markerPosition = markerDuration > 0 ? Math.floor(actionDuration / markerDuration) : 0;
      if (markerPosition >= totalMarkers - 1) {
        // console.log("Marker position", markerPosition, actionDuration, markerDuration);
        return (totalMarkers - 1) > 0 ? (totalMarkers - 1) : 0;
      }
      return markerPosition;
    }
    return 0;
  }

  showAction(action) {
    return true;
  }

  getDisplayCompletedAction(action) {
    // console.log("Action", action.id, action.completed_at);
    let placeName = (action.expected_place && action.expected_place.name !== "") ? action.expected_place.name : "--";
    let placeAddress = (action.expected_place && action.expected_place.address !== "") ? action.expected_place.address : "--";
    let placeCity = (action.expected_place && action.expected_place.city !== "") ? action.expected_place.city : "--";
    let zipCode = (action.expected_place && action.expected_place.zip_code !== "") ? action.expected_place.zip_code : "--";
    let orderId = (action.lookup_id !== "") ? action.lookup_id : "-";
    let actionText = `${this.getActionType(action.type)} - ${action.display.status_text}`;
    let actionSubtext = action.display.sub_status_text;
    return {
      timestamp: `${TimeString(this.getActionTime(action, 'completed'))} | ${DateString(this.getActionTime(action, 'completed'))}`,
      actionText: actionText,
      actionSubtext: actionSubtext,
      placeName,
      placeAddress,
      placeCity,
      zipCode,
      orderId: `Order # ${orderId}`,
      typeInSegment: 'completed',
      ...action
    }
  }

  getDisplayCreatedAction(action) {
    let actionText = `Created ${this.getActionType(action.type)}`;
    return {
      timestamp: `${TimeString(this.getActionTime(action, 'created'))} | ${DateString(this.getActionTime(action, 'created'))}`,
      actionText: actionText,
      typeInSegment: 'created',
      ...action
    }
  }

  getDisplayAssignedAction(action) {
    let actionText = `Assigned ${this.getActionType(action.type)}`;
    return {
      timestamp: `${TimeString(this.getActionTime(action, 'assigned'))} | ${DateString(this.getActionTime(action, 'assigned'))}`,
      actionText: actionText,
      typeInSegment: 'assigned',
      ...action
    }
  }

  getDisplayActions(action, actionTypesInSegment) {
    let displayActions = [];
    actionTypesInSegment.forEach((actionType) => {
      if (actionType === 'created' && this.actionDetail) {
        displayActions.push(this.getDisplayCreatedAction(action));
      } else if (actionType === 'assigned' && this.actionDetail) {
        displayActions.push(this.getDisplayAssignedAction(action));
      } else if (actionType === 'completed') {
        displayActions.push(this.getDisplayCompletedAction(action));
      }
    });
    return displayActions;
  }

  getDisplayAction(action, actionTypeInSegment) {
    let placeName = (action.expected_place && action.expected_place.name !== "") ? action.expected_place.name : "--";
    let placeAddress = (action.expected_place && action.expected_place.address !== "") ? action.expected_place.address : "--";
    let placeCity = (action.expected_place && action.expected_place.city !== "") ? action.expected_place.city : "--";
    let zipCode = (action.expected_place && action.expected_place.zip_code !== "") ? action.expected_place.zip_code : "--";
    let orderId = (action.lookup_id !== "") ? action.lookup_id : "-";
    let actionText = `${this.getActionType(action.type)} - ${action.display.status_text}`;
    let actionSubtext = action.display.sub_status_text;
    if (actionTypeInSegment === 'created') {
      actionText = `Created ${this.getActionType(action.type)}`;
    } else if (actionTypeInSegment === 'assigned') {
      actionText = `Assigned ${this.getActionType(action.type)}`;
    }
    return {
      timestamp: `${TimeString(this.getActionTime(action, actionTypeInSegment))} | ${DateString(this.getActionTime(action, actionTypeInSegment))}`,
      actionText: actionText,
      actionSubtext: actionSubtext,
      placeName,
      placeAddress,
      placeCity,
      zipCode,
      orderId: `Order # ${orderId}`,
      typeInSegment: actionTypeInSegment,
      ...action
    }
  }

  getActionTime(action, actionTypeInSegment = null) {
    if (actionTypeInSegment) {
      switch (actionTypeInSegment) {
        case 'completed':
          return action.completed_at;
        case 'assigned':
          return (action.assigned_at);
        case 'started':
          return action.started_at;
        case 'created':
          return action.created_at;
      }
    }
    switch (action.status) {
      case 'completed':
        return action.completed_at;
      case 'assigned':
        return (action.eta || action.initial_eta || action.assigned_at);
      case 'started':
        return action.started_at;
      case 'created':
        return action.created_at;
    }
  }

  getActionType(actionType) {
    switch (actionType) {
      case 'task':
        return 'Task';
      case 'pickup':
        return 'Pickup';
      case 'stopover':
        return 'Stopover';
      case 'delivery':
        return 'Delivery';
      case 'visit':
        return 'Visit';
      case 'dropoff':
        return 'Drop-off';
      default:
        return 'Action';
    }
  }

  showEvent(event) {
    switch(event.type) {
      case 'tracking.started':
        return true;
      case 'tracking.ended':
        return true;
      case 'device.location.disabled':
        return true;
      case 'device.location.enabled':
        return true;
      case 'device.location_permission.disabled':
        return true;
      case 'device.location_permission.enabled':
        return true;
      default:
        return false;
    }
  }

  getDisplayEvent(event) {
    let displayEvent = {
      recorded_at: TimeString(event.recorded_at),
    };
    switch(event.type) {
      case 'tracking.started':
        return {
          ...displayEvent,
          text: 'Tracking Started',
          subtext: ''
        };
      case 'tracking.ended':
        return {
          ...displayEvent,
          text: 'Tracking ended',
          subtext: ''
        };
      case 'device.location.disabled':
        return {
          ...displayEvent,
          text: 'Location disabled',
          subtext: ''
        };
      case 'device.location.enabled':
        return {
          ...displayEvent,
          text: 'Location enabled',
          subtext: ''
        };
      case 'device.location_permission.disabled':
        return {
          ...displayEvent,
          text: 'Location permission disabled',
          subtext: ''
        };
      case 'device.location_permission.enabled':
        return {
          ...displayEvent,
          text: 'Location permission enabled',
          subtext: ''
        };
    }
  }

  getInterpolatedSegments(segments: IPlaceline[]) {
    let interpolatedSegments: any = [];
    segments.forEach((segment, index, arr) => {
      let nextSegment = (index < (arr.length - 1)) ? arr[index + 1] : null;
      interpolatedSegments.push({...segment});
      if (nextSegment && (!segment.ended_at || !nextSegment.started_at)) {
        interpolatedSegments.push(this.createNoInformationSegment(segment, nextSegment));
      } else if (nextSegment && !moment(segment.ended_at).isSame(moment(nextSegment.started_at), 'minute')) {
        interpolatedSegments.push(this.createNoInformationSegment(segment, nextSegment));
      }
    });
    return interpolatedSegments;
  }

  createNoInformationSegment(segment, nextSegment) {
    return         {
      id: `${segment.id}_${nextSegment.id}`,
      user_id: segment.id,
      started_at: segment.ended_at,
      ended_at: nextSegment.started_at,
      type: "empty"
    }
  }

  createSegmentDisplay(segment: any, index: number, segments: IPlaceline[]) {
    let display = {
      content: {
        type: '-',
        metadata: ' | -'
      },
      startedAt: '-',
      endedAt: '-',
      className: '',
      events: []
    };
    if (index === 0) display.className = 'first ';
    let lastSegment = (segments.length - 1) === index;
    if (segment.type === 'trip') {
      display.className += 'trip';
      display.content.type = 'Trip';
      display.content.metadata = ` | ${this.getSegmentDuration(segment)} | ${this.getSegmentDistance(segment)}`;
    } else if (segment.type === 'stop') {
      display.className += 'stop';
      display.content.type = 'Stop';
      display.content.metadata = ` | ${this.getSegmentDuration(segment)}`;
    } else if (segment.type === 'location_void') {
      display.className += 'location-void';
      display.content.type = this.getLocationVoidText(segment);
      display.content.metadata = ` | ${this.getSegmentDuration(segment)}`;
    } else if (segment.type === 'empty') {
      display.className += 'empty-segment';
      display.content.type = 'No Information';
      display.content.metadata = ` | ${this.getSegmentDuration(segment)}`;
    }
    display.startedAt = `${DotString(TimeString(segment.started_at), '--:--')} | ${DotString(DateString(segment.started_at), '--')}`;
    display.endedAt = (index === (segments.length - 1) && !segment.ended_at) ? '' : `${DotString(TimeString(segment.ended_at), '--:--')} | ${DotString(DateString(segment.ended_at), '--')}`;
    return {...segment, display};
  }

  getLocationVoidText(segment) {
    switch(segment.reason) {
      case 'disabled':
        return "Location disabled";
      case 'no_permission':
        return "Location permission unavailable";
      case 'unknown':
        return "Location unavailable";
      default:
        return "Location unavailable"
    }
  }

  getSegmentDuration(segment: IPlaceline) {
    if (segment.started_at && segment.ended_at) {
      let minutes = moment(segment.ended_at).diff(moment(segment.started_at), 'minutes');
      return `${moment(segment.started_at).to(moment(segment.ended_at), true)}`;
    }
    return '-';
  }

  getTimeDuration(date1, date2) {
    if (date1 && date2) {
      let time1 = new Date(date1).getTime(), time2 = new Date(date2).getTime();
      return (time2 - time1);
    }
    return null;
  }

  isDateGreater(date1, date2, equality: boolean = false) {
    if (!date1 || !date2) return false;
    let _date1 = new Date(date1).getTime();
    let _date2 = new Date(date2).getTime();
    let minutes = moment(_date1).diff(_date2, 'minutes');
    if (equality) {
      return minutes >= 0;
      //return _date1 >= _date2;
    }
    //return _date1 > _date2;
    return minutes > 0;
  }

  getSegmentDistance(segment: IPlaceline) {
    if (segment && segment.distance >= 0) {
      let distance = segment.distance;
      return DistanceLocale(distance, config.timezone);
    }
    return '-';
  }

  updateUserTimeLine(userId) {
    this.store.dispatch(new fromUser.SelectUserIdAction(userId));
  }

  handleMouseOver(id: string) {
    if (!id) {
      this.handleMouseOut();
    } else {
      this.store.dispatch(new fromUser.SelectSegmentAction(id));
    }

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
    if(partialSegment) {
      this.store.dispatch(new fromUser.SelectPartialSegmentAction(partialSegment))
    } else {
      this.store.dispatch(new fromUser.ClearPartialSegmentAction())
    }
  }

  changeDateTimeLine(date: string, offset: number) {
    if(this.loading.timeline) return false;
    if(!this.notToday && offset > 0) return false;
    let newDate = moment(date).add(offset, 'day').format('YYYY-MM-DD');
    this.setDate(newDate)
  }

  setDate(date) {
    this.store.dispatch(new fromUser.ClearUserAction());
    let base = config.isWidget ? this.baseLink : './';
    this.router.navigate([base, {...this.route.snapshot.params, day: date}],
      {relativeTo: this.route, queryParamsHandling: 'preserve'}
    )
  }

  selectAction(actionId: string) {
    if(actionId) {
      this.store.dispatch(new fromUser.SelectUserActionId(actionId))

    } else {
      this.store.dispatch(new fromUser.ClearUserActionId())
    }
  }


  private isBeforeToday(time): boolean {
    return time ? moment(time).diff(moment(), 'day') <= -1 : false;
  }

  trackSegment(index, segment) {
    return segment ? segment.id : null;
  }

  trackEvent(index, event) {
    return event ? event.id : null;
  }

  trackAction(index, action) {
    return action ? action.id : null;
  }

  trackMarker(index, marker) {
    return marker ? marker.id : null;
  }

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
