import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from "@angular/core";
import {IPlaceline} from "ht-models";
import * as moment from "moment-mini";
import {TimeString} from "../../../utils/time-string";
import {DateString} from "../../../utils/date-string";
import {DistanceLocale} from "../../../utils/distance-locale";
import {HMString} from "../../../utils/hm-string";
import {scaleLog} from "d3-scale";
import {Router} from "@angular/router";
import {config} from "../../config";
import {BroadcastService} from "../../core/broadcast.service";
import {Subscription} from "rxjs/Subscription";
import {NameCase} from "ht-utility";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent implements OnInit {
  @Input() segments: any[] = [];
  @Input() lastHeartbeatAt: string;
  @Input() events: any = [];
  @Input() actions: any = [];
  @Input() loading: boolean = false;
  @Input() notToday: boolean = false;
  @Input() isOnline: boolean = false;
  @Input() showActionDetails: boolean = true;
  @Output() handleMouseOver: EventEmitter<string> = new EventEmitter();
  @Output() handleMouseOut: EventEmitter<string> = new EventEmitter();
  @Output() selectAction: EventEmitter<string | null> = new EventEmitter();
  currentMarkerHover: string = null;
  displaySegments: any = [];
  sanitizedEvents: any[] = [];
  sanitizedActions: any[] = [];
  highlightSegmentId: string = '';
  scrollSub: Subscription;
  constructor(
    private router: Router,
    private broadcast: BroadcastService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if(document) {
      let sidebar = document.getElementById('sidebar');
      this.scrollSub = this.broadcast.on('replay-segment').distinctUntilChanged()
        .throttleTime(1000)
        .subscribe((segmentId: string) => {
        let el = document.getElementById(segmentId);
        this.highlightSegmentId = segmentId;
        console.log(segmentId, "segment");
        segmentId ? this.handleMouseOver.emit(segmentId) : this.handleMouseOut.emit();
        this.ref.markForCheck();
        if(el && sidebar) {
          let height = el.offsetTop + el.parentElement.offsetTop - 160 ;
          sidebar.scroll({top: height, left: 0, behavior: 'smooth'})
        }
      });
    }

  }

  segmentDisplay() {
    this.displaySegments = this.getDisplaySegments(this.segments);
    return this.displaySegments;
  }

  getDisplaySegments(segments: IPlaceline[]) {
    return this.getSanitizedSegments(segments);
  }

  getSanitizedSegments(segments: IPlaceline[]) {
    let sanitizedSegments = [];
    let cleanedSegments = this.cleanSegmentsNotEnded(segments);
    for (let i = 0; i < cleanedSegments.length; i++) {
      let segment = cleanedSegments[i];
      if (this.isValidSegment(segment, i, cleanedSegments)) {
        let displaySegment = this.getDisplaySegment(segment, i, cleanedSegments);
        sanitizedSegments.push(displaySegment);
      }
    }
    this.sanitizedEvents = this.sanitizeEvents(this.events);
    this.sanitizedActions = this.sanitizeActions(this.actions);
    let interpolatedSegments = this.getInterpolatedSegments(sanitizedSegments, this.sanitizedEvents, this.sanitizedActions);
    let segmentsWithEvents = this.addEventsToSegments(interpolatedSegments, this.sanitizedEvents);
    let segmentsWithActions = this.addActionsToSegments(segmentsWithEvents, this.sanitizedActions);
    if (segmentsWithActions.length > 0) {
      let expectedSegment = segmentsWithActions[segmentsWithActions.length - 1];
      if (expectedSegment.type === 'expected' && expectedSegment.display.markers[1].actions.length === 0) {
        expectedSegment.display.className+=" hide";
      }
    }
    return segmentsWithActions;
  }

  cleanSegmentsNotEnded(segments) {
    let cleanedSegments = [];
    for (let i = 0; i < segments.length; i++) {
      let segment = segments[i];
      let first = (i === 0);
      let last = (i === segments.length - 1);
      if (first) {
        if (segment.started_at && segment.ended_at) {
          cleanedSegments.push(segment);
        } else if (segment.started_at && last && this.lastHeartbeatAt) {
          cleanedSegments.push(segment);
        }
      } else if (last) {
        if (segment.started_at && this.lastHeartbeatAt) {
          cleanedSegments.push(segment);
        }
      } else if (segment.started_at && segment.ended_at) {
          cleanedSegments.push(segment);
      }
    }
    return cleanedSegments;
  }

  getEarliestEventTime(sanitizedEvents, sanitizedActions) {
    if (sanitizedEvents.length > 0 && sanitizedActions.length > 0) {
      let minEvent = sanitizedEvents[0].calculated.recordedAt;
      let minAction = sanitizedActions[0].calculated.recordedAt;
      return moment.min(minEvent, minAction);
    } else if (sanitizedEvents.length === 0 && sanitizedActions.length === 0 ) {
      return null;
    } else {
      if (sanitizedEvents.length > 0) return sanitizedEvents[0].calculated.recordedAt;
      if (sanitizedActions.length > 0) return sanitizedActions[0].calculated.recordedAt;
      return null;
    }
  }
  getLatestEventTime(sanitizedEvents, sanitizedActions) {
    if (sanitizedEvents.length > 0 && sanitizedActions.length > 0) {
      let maxEvent = sanitizedEvents[sanitizedEvents.length - 1].calculated.recordedAt;
      let maxAction = sanitizedActions[sanitizedActions.length - 1].calculated.recordedAt;
      return moment.max(maxEvent, maxAction);
    } else if (sanitizedEvents.length === 0 && sanitizedActions.length === 0 ) {
      return null;
    } else {
      if (sanitizedEvents.length > 0) return sanitizedEvents[sanitizedEvents.length - 1].calculated.recordedAt;
      if (sanitizedActions.length > 0) return sanitizedActions[sanitizedActions.length - 1].calculated.recordedAt;
      return null;
    }
  }

  onMarkerMouseEnter(markerId) {
    console.log("Current marker Hover", markerId);
    this.currentMarkerHover = markerId;
  }

  getMarkerUIClass(marker) {
    let hidden = ((marker.events.length !== 0 || marker.actions.length !== 0) ? '' : 'v-hidden');
    let fade = '';
    if (this.currentMarkerHover) {
      fade = (this.currentMarkerHover === marker.id) ? '' : 'ht-fade';
    }
    return `${hidden} ${fade}`;
  }


  onMarkerMouseLeave() {
    console.log("Current marker Hover", "null");
    this.currentMarkerHover = null;
  }

  addActionsToSegments(interpolatedSegments, sanitizedActions) {
    let segmentsWithActions = [...interpolatedSegments];
    let currentSegmentIndex = 0;
    let currentActionIndex = 0;
    while(currentSegmentIndex <= segmentsWithActions.length - 1) {
      let segment = segmentsWithActions[currentSegmentIndex];
      currentActionIndex = 0;
      while(currentActionIndex <= sanitizedActions.length - 1) {
        let action = sanitizedActions[currentActionIndex];
        if (this.isActionInSegment(segment, action)) {
          this.addActionToSegment(segment, action);
        }
        currentActionIndex++;
      }
      currentSegmentIndex++;
    }
    return segmentsWithActions;
  }

  sanitizeActions(actions) {
    let sanitizedActions = [];
    actions.forEach((action) => {
      if (this.showActionDetails && action.created_at) {
        if (action.assigned_at && moment(action.assigned_at).diff(moment(action.created_at), 'minutes') > 0) {
          let createdActionDisplay = this.getActionDisplay(action, 'created');
          sanitizedActions.push(createdActionDisplay);
        }
      }
      if (action.assigned_at) {
        let assignedActionDisplay = this.getActionDisplay(action, 'assigned');
        sanitizedActions.push(assignedActionDisplay);
      }
      if (action.status == 'completed' && action.completed_at) {
        let completedActionDisplay = this.getActionDisplay(action, 'completed');
        sanitizedActions.push(completedActionDisplay);
      }
      else if (action.status == 'suspended' && action.suspended_at) {
        let suspendedActionDisplay = this.getActionDisplay(action, 'suspended');
        sanitizedActions.push(suspendedActionDisplay);
      }
      else if (action.status == 'canceled' && action.canceled_at) {
        let cancelledActionDisplay = this.getActionDisplay(action, 'canceled');
        sanitizedActions.push(cancelledActionDisplay);
      }
      else if (this.showETAAction(action)) {
        let etaActionDisplay = this.getActionDisplay(action, 'eta');
        sanitizedActions.push(etaActionDisplay);
      }
      else if (this.showExpectedAction(action)) {
        let expectedActionDisplay = this.getActionDisplay(action, 'expected');
        sanitizedActions.push(expectedActionDisplay);
      }
    });
    sanitizedActions = this.sortActions(sanitizedActions);
    return sanitizedActions;
  }

  showETAAction(action) {
    return (action.status !== 'completed' && action.status !== 'suspended' && action.status !== 'canceled' && action.eta);
  }

  showExpectedAction(action) {
    return (action.status !== 'completed' && action.status !== 'suspended' && action.status !== 'canceled' && action.expected_at);
  }

  getActionDisplay(action, type) {
    let place = action.expected_place;
    let timestamp = null;
    let recordedAt = null;
    let displayTimestamp = "";
    let statusText = "";
    let statusSubtext = "";
    let showDetails = false;
    let durationToAction = action.display.duration_remaining ? HMString(action.display.duration_remaining, 60) : '';
    let actionId = action.id;
    switch(type) {
      case 'created':
        actionId = `${actionId}_created`;
        recordedAt = this.getNearestMinute(action.created_at);
        displayTimestamp = `${TimeString(recordedAt.toISOString())}`;
        statusText = `Created ${this.getActionType(action.type)}`;
        showDetails = false;
        break;
      case 'assigned':
        actionId = `${actionId}_assigned`;
        recordedAt = this.getNearestMinute(action.assigned_at);
        displayTimestamp = `${TimeString(recordedAt.toISOString())}`;
        timestamp = action.assigned_at;
        statusText = `Assigned ${this.getActionType(action.type)}`;
        showDetails = true;
        break;
      case 'completed':
        actionId = `${actionId}_completed`;
        place = action.completed_place;
        recordedAt = this.getNearestMinute(action.completed_at);
        displayTimestamp = `${TimeString(recordedAt.toISOString())}`;
        statusText = `Completed ${this.getActionType(action.type)}`;
        statusSubtext = this.getActionSubtext(action);
        showDetails = true;
        break;
      case 'suspended':
        actionId = `${actionId}_suspended`;
        place = null;
        recordedAt = this.getNearestMinute(action.suspended_at);
        displayTimestamp = `${TimeString(recordedAt.toISOString())}`;
        statusText = `Suspended ${this.getActionType(action.type)}`;
        statusSubtext = this.getActionSubtext(action);
        showDetails = true;
        break;
      case 'canceled':
        actionId = `${actionId}_canceled`;
        place = null;
        recordedAt = this.getNearestMinute(action.canceled_at);
        displayTimestamp = `${TimeString(recordedAt.toISOString())}`;
        statusText = `Canceled ${this.getActionType(action.type)}`;
        statusSubtext = this.getActionSubtext(action);
        showDetails = true;
        break;
      case 'eta':
        actionId = `${actionId}_eta`;
        let etaTimestamp = action.eta;
        recordedAt = this.getNearestMinuteForEta(etaTimestamp);
        displayTimestamp = "";
        statusText = `${this.getActionType(action.type)} in ${durationToAction}`;
        statusSubtext = this.getActionSubtext(action);
        showDetails = true;
        break;
      case 'expected':
        actionId = `${actionId}_expected`;
        recordedAt = this.getNearestMinute(action.expected_at);
        displayTimestamp = `${TimeString(recordedAt.toISOString())}`;
        statusText = `Expected ${this.getActionType(action.type)}`;
        statusSubtext = "";
        showDetails = true;
        break;
      default:
        console.error("BAD getActionDisplay:", type, "didn't match any case");
    }
    let placeName = (showDetails && place && place.name !== "") ? place.name : "";
    let placeAddress = (showDetails && place && place.address !== "") ? place.address : "";
    let placeCity = (showDetails && place && place.city !== "") ? place.city : "";
    let zipCode = (showDetails && place && place.zip_code !== "") ? place.zip_code : "";
    let orderId = (showDetails && action.lookup_id) ? `Lookup id #${action.lookup_id}` : "";
    return {
      ...action,
      calculated: {
        recordedAt: recordedAt,
        actionId: actionId
      },
      displayContent: {
        recordedAt: displayTimestamp,
        type: type,
        text: statusText,
        subtext: statusSubtext,
        placeName,
        placeAddress,
        placeCity,
        zipCode,
        orderId
      }
    }
  }

  openLookupIdPage(lookupId) {
    this.router.navigate(['/actions', {lookup_id: lookupId}]);
  }

  getActionSubtext(action) {
    let expectedText = action.expected_at ? `Scheduled at ${TimeString(action.expected_at)}` : '';
    return (action.display.substatus ? action.display.substatus : expectedText);
  }

  getActionType(actionType) {
    return NameCase(actionType)
  }

  isActionInSegment(segment, action) {
    let isLast = segment.display.isLast;
    if (segment.type === 'expected') {
      return (action.calculated.recordedAt.diff(segment.calculated.startedAt, 'minutes') > 0
      && segment.calculated.endedAt.diff(action.calculated.recordedAt, 'minutes') > 0);
    }
    return isLast
      ? (action.calculated.recordedAt.diff(segment.calculated.startedAt, 'minutes') >= 0
        && segment.calculated.endedAt.diff(action.calculated.recordedAt, 'minutes') >= 0)
      : (action.calculated.recordedAt.diff(segment.calculated.startedAt, 'minutes') >= 0
        && segment.calculated.endedAt.diff(action.calculated.recordedAt, 'minutes') > 0);
  }

  getPixelDurationForSegment(segment, segments) {
    if (segments.length === 0) return 100;

    let segmentDuration = this.getSegmentDurationMinutes(segment);
    //let minSegmentDuration = this.getSegmentDurationMinutes(sortedSegments[0]);
    // let maxSegmentDuration = this.getSegmentDurationMinutes(sortedSegments[sortedSegments.length - 1]);
    //let powerScale = scalePow().exponent(0.5).domain([5, 180]).rangeRound([50, 200]).clamp(true);
    let minSegmentDuration = 5;
    let maxSegmentDuration = 180;
    let minPixelLength = 80;
    let maxPixelLength = 220;
    let powerScale = scaleLog().base(10).domain([minSegmentDuration, maxSegmentDuration]).rangeRound([minPixelLength, maxPixelLength]).clamp(true);
    let pixel = minPixelLength;
    if (segmentDuration < minSegmentDuration) {
      pixel = minPixelLength;
    } else if (segmentDuration > maxSegmentDuration) {
      pixel = maxPixelLength;
    } else if (segmentDuration >= minSegmentDuration && segmentDuration <= maxSegmentDuration) {
      //pixel = ((segmentDuration - minSegmentDuration) / (maxSegmentDuration - minSegmentDuration)) * (maxPixelLength - minPixelLength);
      pixel = powerScale(segmentDuration);
      //pixel = Math.floor(pixel) + minPixelLength;
    }
    return pixel
  }

  addActionToSegment(segment, action) {
    let isLastSegment = segment.display.isLast;

    if (segment.type === 'expected') {
      segment.display.markers[1].actions.push(action);
      segment.display.markers[1].actions = this.sortActions(segment.display.markers[1].actions);
      return;
    }
    let actionDurationInSegment = action.calculated.recordedAt.diff(segment.calculated.startedAt, 'minutes');
    segment.display.markers.forEach((marker, index, markers) => {
      let isLastMarker = (index === markers.length - 1);
      if (this.isActionInMarker(marker, actionDurationInSegment, isLastSegment, isLastMarker)) {
        segment.display.markers[index].actions.push(action);
        segment.display.markers[index].actions = this.cleanupActionTimestampInMarker(this.sortActions(segment.display.markers[index].actions));
      }
    });
  }

  cleanupActionTimestampInMarker(markerActions) {
    let cleanedActions = [];
    for (let i = 0; i < markerActions.length; i++) {
      let action = markerActions[i];
      let prevAction = markerActions[i - 1];
      if (!prevAction) {
        cleanedActions.push(action);
        continue;
      }
      if (prevAction.calculated.recordedAt.isSame(action.calculated.recordedAt)) {
        let editedAction = {...action};
        editedAction.displayContent.recordedAt = '';
        cleanedActions.push(editedAction);
        continue;
      }
      cleanedActions.push(action);
      //if (prevAction)
    }
    return cleanedActions;
  }

  addEventsToSegments(interpolatedSegments, sanitizedEvents) {
    let segmentsWithEvents = [...interpolatedSegments];
    let currentSegmentIndex = 0;
    let currentEventIndex = 0;
    while(currentSegmentIndex <= segmentsWithEvents.length - 1) {
      let segment = segmentsWithEvents[currentSegmentIndex];
      while(currentEventIndex <= sanitizedEvents.length - 1) {
        let event = sanitizedEvents[currentEventIndex];
        if (this.isEventInSegment(segment, event)) {
          // console.log("Event", currentEventIndex, "is in", currentSegmentIndex);
          this.addEventToSegment(segment, event);
          currentEventIndex++;
        } else {
          currentSegmentIndex++;
          break;
        }
      }
      if (currentEventIndex === sanitizedEvents.length) break;
    }
    // console.log("Segments with events", segmentsWithEvents);
    return segmentsWithEvents;
  }

  addEventToSegment(segment, event) {
    if (segment.type === 'expected') {
      return;
    }
    let isLastSegment = segment.display.isLast;
    let eventDurationInSegment = event.calculated.recordedAt.diff(segment.calculated.startedAt, 'minutes');
    segment.display.markers.forEach((marker, index, markers) => {
      let isLastMarker = (index === markers.length - 1);
      if (this.isEventInMarker(marker, eventDurationInSegment, isLastSegment, isLastMarker)) {
        segment.display.markers[index].events.push(event);
        segment.display.markers[index].events = this.sortEvents(segment.display.markers[index].events);
      }
    });
  }

  isEventInMarker(marker, eventDurationInSegment, isLastSegment = false, isLastMarker = false) {
    if (isLastSegment && isLastMarker) {
      return eventDurationInSegment >= marker.startDuration && eventDurationInSegment <= marker.endDuration;
    }
    return (eventDurationInSegment >= marker.startDuration && eventDurationInSegment < marker.endDuration);
  }

  isActionInMarker(marker, actionDurationInSegment, isLastSegment = false, isLastMarker = false) {
    if (isLastSegment && isLastMarker) {
      return actionDurationInSegment >= marker.startDuration && actionDurationInSegment <= marker.endDuration;
    }
    return (actionDurationInSegment >= marker.startDuration && actionDurationInSegment < marker.endDuration);
  }

  isEventInSegment(segment, event) {
    let isLast = segment.display.isLast;
    if (segment.type === 'expected') {
      return false;
    }
    return isLast
      ? (event.calculated.recordedAt.diff(segment.calculated.startedAt, 'minutes') >= 0
      && segment.calculated.endedAt.diff(event.calculated.recordedAt, 'minutes') >= 0)
      : (event.calculated.recordedAt.diff(segment.calculated.startedAt, 'minutes') >= 0
      && segment.calculated.endedAt.diff(event.calculated.recordedAt, 'minutes') > 0);
  }

  sortActions(actions) {
    let sortedActions = [...actions];
    let compare = (a,b) => {
      return a.calculated.recordedAt.diff(b.calculated.recordedAt, 'minutes');
    };
    return sortedActions.sort(compare);
  }

  sortSegments(segments) {
    let sortedSegments = [...segments];
    let compare = (a,b) => {
      return this.getSegmentDurationMinutes(a) - this.getSegmentDurationMinutes(b);
    };
    return sortedSegments.sort(compare);
  }

  getSegmentDurationMinutes(segment) {
    if (segment.duration) {
      return moment.duration(segment.duration, 'seconds').asMinutes();
    }
    if (segment.calculated.startedAt && segment.calculated.endedAt) {
      return segment.calculated.endedAt.diff(segment.calculated.startedAt, 'minutes');
    }
    return 0;
  }

  sortEvents(events) {
    let sortedEvents = [...events];
    let compare = (a,b) => {
      return a.calculated.recordedAt.diff(b.calculated.recordedAt, 'minutes');
    };
    return sortedEvents.sort(compare);
  }

  sanitizeEvents(events) {
    let sanitizedEvents = [];
    for (let i = 0; i < events.length; i++) {
      let event = events[i];
      let sanitizedEvent = {
        ...event,
        display: {
          ...this.getEventDisplay(event)
        },
        calculated: {
          recordedAt: this.getNearestMinute(event.recorded_at)
        }
      };
      sanitizedEvents.push(sanitizedEvent);
    }
    // console.log("events", sanitizedEvents);
    sanitizedEvents = this.sortEvents(sanitizedEvents);
    return sanitizedEvents;
  }

  getEventDisplay(event) {
    let recordedAt = this.getNearestMinute(event.recorded_at).format('h:mm a');
    switch(event.type) {
      case 'tracking.started':
        return {
          recordedAt,
          text: 'Tracking started',
          subtext: ''
        };
      case 'tracking.ended':
        return {
          recordedAt,
          text: 'Tracking ended',
          subtext: ''
        };
      case 'device.location.disabled':
        return {
          recordedAt,
          text: 'Location disabled',
          subtext: ''
        };
      case 'device.location.enabled':
        return {
          recordedAt,
          text: 'Location enabled',
          subtext: ''
        };
      case 'device.location_permission.disabled':
        return {
          recordedAt,
          text: 'Location permission disabled',
          subtext: ''
        };
      case 'device.location_permission.enabled':
        return {
          recordedAt,
          text: 'Location permission enabled',
          subtext: ''
        };
      case 'device.secondary.ignored':
        return {
          recordedAt,
          text: 'Secondary device ignored',
          subtext: ''
        };
    }
  }

  getInterpolatedSegments(segments, events, actions) {
    let interpolatedSegments = [];
    for (let i = 0; i < segments.length; i++) {
      let first = (i === 0);
      let previous = (i > 0) ? segments[i - 1] : null;
      let segment = segments[i];
      if (first) {
        if (segment.calculated.endedAt.isSame(segment.calculated.startedAt, 'day')) {
          segment.display.endedAt = `${TimeString(moment(segment.calculated.endedAt).toISOString())}`
        }
        interpolatedSegments.push(segment);
      } else {
        if (segment.calculated.startedAt.isSame(previous.calculated.endedAt)) {
          if (segment.calculated.endedAt.isSame(segment.calculated.startedAt, 'day')) {
            segment.display.endedAt = `${TimeString(moment(segment.calculated.endedAt).toISOString())}`
          }
          interpolatedSegments.push(segment);
        } else {
          let interpolatedSegment = this.createNoInfoSegment(segment, previous);
          if (interpolatedSegment.calculated.endedAt.isSame(previous.calculated.endedAt, 'day')) {
            interpolatedSegment.display.endedAt = `${TimeString(moment(interpolatedSegment.calculated.endedAt).toISOString())}`
          }
          interpolatedSegments.push(interpolatedSegment);
          if (segment.calculated.endedAt.isSame(interpolatedSegment.calculated.endedAt, 'day')) {
            segment.display.endedAt = `${TimeString(moment(segment.calculated.endedAt).toISOString())}`
          }
          interpolatedSegments.push(segment);
        }
      }
    }
    let earliestEventTime = this.getEarliestEventTime(events, actions);
    let latestEventTime = this.getLatestEventTime(events, actions);

    if (interpolatedSegments.length >= 1) {
      let currentTimestamp = this.getNearestMinute(Date.now());
      let firstActiveSegment = interpolatedSegments[0];
      // TODO - Cover for the edge cases on equality time
      if (earliestEventTime && earliestEventTime.isBefore(firstActiveSegment.calculated.startedAt)) {
        let missingFirstSegment = this.createMissingTimeFirstSection(firstActiveSegment, earliestEventTime);
        if (missingFirstSegment.calculated.endedAt.isSame(missingFirstSegment.calculated.startedAt, 'day')) {
          missingFirstSegment.display.endedAt = TimeString(missingFirstSegment.calculated.endedAt.toISOString());
        }
        if (firstActiveSegment.calculated.endedAt.isSame(missingFirstSegment.calculated.endedAt, 'day')) {
          firstActiveSegment.display.endedAt = TimeString(firstActiveSegment.calculated.endedAt.toISOString());
        }
        if (missingFirstSegment) interpolatedSegments.unshift(missingFirstSegment);
      }
      // if (!lastActiveSegment.calculated.endedAt.isSame(currentTimestamp, 'minute')) {
      //   let missingLastSegment = this.createMissingTimeLastSection(lastActiveSegment, earliestEventTime);
      //   interpolatedSegments.push(missingLastSegment);
      // }
      let lastSegment = interpolatedSegments[interpolatedSegments.length - 1];
      lastSegment.display.isLast = true;
      interpolatedSegments[0].display.isFirst = true;

      interpolatedSegments = this.addDurationPixelToSegments(interpolatedSegments);
      if (latestEventTime && latestEventTime.isAfter(lastSegment.calculated.endedAt)) {
        let expectedInfoSegment = this.createExpectedInfoSegment(lastSegment);
        interpolatedSegments.push(expectedInfoSegment);
      }
    }
    if (interpolatedSegments.length === 0) {
      // TODO - Consider case when expected event is at the current time
      if (earliestEventTime && earliestEventTime.isBefore(this.getNearestMinute(Date.now()))) {
        let missingLastSegment = this.createMissingTimeLastSection(null, earliestEventTime);
        missingLastSegment.display.isFirst = true;
        missingLastSegment.display.isLast = true;
        interpolatedSegments.push(missingLastSegment);
      }
      if (latestEventTime && latestEventTime.isAfter(this.getNearestMinute(Date.now()))) {
        let expectedInfoSegment = this.createExpectedInfoSegment(interpolatedSegments[interpolatedSegments.length - 1]);
        interpolatedSegments.push(expectedInfoSegment);
      }
    }
    return interpolatedSegments;
  }

  addDurationPixelToSegments(segments) {
    //let sortedSegments = this.sortSegments(segments);
    let segmentWithPixels = [...segments];
    for (let i = 0; i < segmentWithPixels.length; i++) {
      let segment = segments[i];
      segment.calculated.pixelDuration = this.getPixelDurationForSegment(segment, segments);
    }
    return segmentWithPixels;

  }

  getStopAddress(segment, hover = false) {
    if (segment.type === 'stop' && segment.place) {
      if (hover) return segment.place.address;
      return segment.place.locality || segment.place.address;
    }
    return '';
  }

  createNoInfoSegment(segment, prevSegment) {
    let calculatedStartTime = prevSegment.calculated.endedAt;
    let calculatedEndTime = segment.calculated.startedAt;
    let duration = `${calculatedStartTime.to(calculatedEndTime, true)}`;
    let displayStartTime = `${calculatedStartTime.format('h:mm a')} | ${DateString(calculatedStartTime.toString())}`;
    let displayEndTime = `${calculatedEndTime.format('h:mm a')} | ${DateString(calculatedEndTime.toString())}`;
    let segmentId = `${segment.id}_${prevSegment.id}`;
    return {
      id: `${segment.id}_${prevSegment.id}`,
      user_id: segment.user_id,
      started_at: calculatedStartTime.toString(),
      ended_at: calculatedEndTime.toString(),
      display: {
        className: 'empty-segment',
        content: {
          type: 'No information',
          metadata: `${duration}`
        },
        startedAt: displayStartTime,
        markers: this.createSegmentMarkers(segmentId, calculatedStartTime, calculatedEndTime),
        endedAt: displayEndTime
      },
      calculated: {
        startedAt: calculatedStartTime,
        endedAt: calculatedEndTime
      },
      type: "empty"
    }
  }

  createMissingTimeLastSection(prevSegment, minimumEventTime) {
    let calculatedStartTime = prevSegment ? prevSegment.calculated.endedAt : moment(minimumEventTime);
    let calculatedEndTime = this.getNearestMinute(Date.now());
    let duration = `${calculatedStartTime.to(calculatedEndTime, true)}`;
    let displayStartTime = `${calculatedStartTime.format('h:mm a')} | ${DateString(calculatedStartTime.toString())}`;
    let displayEndTime = `${calculatedEndTime.format('h:mm a')} | ${DateString(calculatedEndTime.toString())}`;
    if (prevSegment && prevSegment.calculated.endedAt.isSame(calculatedEndTime, 'day')) {
      displayStartTime = TimeString(calculatedStartTime.toISOString());
    } else if (!prevSegment && calculatedStartTime.isSame(calculatedEndTime, 'day')) {
      displayEndTime = TimeString(calculatedEndTime.toISOString());
    }
    let segmentId = prevSegment ? `${prevSegment.id}_last_missing`: 'last_missing';
    let userId = prevSegment ? prevSegment.user_id : '';
    return {
      id: segmentId,
      user_id: userId,
      started_at: calculatedStartTime.toString(),
      ended_at: calculatedEndTime.toString(),
      display: {
        className: 'missing-last',
        content: {
          type: 'No information',
          metadata: `${duration}`
        },
        startedAt: displayStartTime,
        markers: this.createSegmentMarkers('missing_last', calculatedStartTime, calculatedEndTime),
        endedAt: displayEndTime,
        isFirst: false,
        isLast: false
      },
      calculated: {
        startedAt: calculatedStartTime,
        endedAt: calculatedEndTime,
        previousSegment: prevSegment
      },
      type: "missingLast"
    }
  }

  createMissingTimeFirstSection(nextSegment, earliestEventTime) {
    if (!nextSegment) return null;
    let calculatedEndTime = moment(nextSegment.calculated.startedAt);
    let calculatedStartTime = moment(earliestEventTime);
    let duration = `${calculatedStartTime.to(calculatedEndTime, true)}`;
    let displayStartTime = `${calculatedStartTime.format('h:mm a')} | ${DateString(calculatedStartTime.toString())}`;
    let displayEndTime = `${calculatedEndTime.format('h:mm a')} | ${DateString(calculatedEndTime.toString())}`;
    let segmentId = `${nextSegment.id}_first_missing`;
    let userId = nextSegment.user_id;
    return {
      id: segmentId,
      user_id: userId,
      started_at: calculatedStartTime.toString(),
      ended_at: calculatedEndTime.toString(),
      display: {
        className: 'missing-first',
        content: {
          type: 'No information',
          metadata: `${duration}`
        },
        startedAt: displayStartTime,
        markers: this.createSegmentMarkers('missing_first', calculatedStartTime, calculatedEndTime),
        endedAt: displayEndTime
      },
      calculated: {
        startedAt: calculatedStartTime,
        endedAt: calculatedEndTime
      },
      type: "missingFirst"
    }
  }

  createExpectedInfoSegment(prevSegment) {
    let calculatedStartTime = prevSegment ? prevSegment.calculated.endedAt: this.getNearestMinute(Date.now());
    let calculatedEndTime = moment(calculatedStartTime).add(150, 'days');
    let displayStartTime = `${calculatedStartTime.format('h:mm a')} | ${DateString(calculatedStartTime.toString())}`;
    let segmentId = prevSegment ? `expected_${prevSegment.id}` : 'expected_segment';
    let userId = prevSegment ? prevSegment.user_id : '';
    return {
      id: segmentId,
      user_id: userId,
      started_at: calculatedStartTime.toString(),
      ended_at: calculatedEndTime.toString(),
      display: {
        className: 'expected',
        content: {
          type: '',
          metadata: ''
        },
        startedAt: displayStartTime,
        markers: this.createSegmentMarkersExpected('expected'),
        endedAt: ''
      },
      calculated: {
        startedAt: calculatedStartTime,
        endedAt: calculatedEndTime
      },
      type: "expected"
    }
  }

  createSegmentMarkers(segmentId, calculatedStartAt, calculatedEndAt) {
    let markers = [];
    let segmentDuration = calculatedEndAt.diff(calculatedStartAt, 'minutes');
    let totalMarkers = this.getTotalMarkersForSegment(segmentDuration);
    for (let i = 0; i < totalMarkers; i++) {
      markers.push({
        id: `${segmentId}_marker_${i}`,
        events: [],
        actions: [],
        ...this.getMarkerDurations(segmentDuration, i)
      });
    }
    return markers;
  }

  createSegmentMarkersExpected(segmentId) {
    let markers = [];
    let totalMarkers = 2;
    for (let i = 0; i < totalMarkers; i++) {
      markers.push({
        id: `${segmentId}_marker_${i}`,
        events: [],
        actions: [],
      });
    }
    return markers;
  }

  getTotalMarkersForSegment(segmentDuration) {
    if (segmentDuration === 0) {
      return 1;
    }
    if (segmentDuration < 4) {
      return segmentDuration;
    }
    return 4;
  }

  getMarkerDurations(segmentDuration, index) {
    let markerDurations = {
      startDuration: null,
      endDuration: null
    };
    let totalMarkers = this.getTotalMarkersForSegment(segmentDuration);
    if (totalMarkers < 4) {
      markerDurations.startDuration = index;
      markerDurations.endDuration = index + 1;
    } else {
      let perMarkerDuration = (segmentDuration / 4);
      markerDurations.startDuration = Math.floor(index * perMarkerDuration);
      markerDurations.endDuration = Math.floor((index + 1) * perMarkerDuration);
    }
    return markerDurations;

  }

  getDisplaySegment(segment, index, segments) {
    let last = (index === segments.length - 1);

    let displayStartTime = this.getDisplayStartTime(segment);
    let displayEndTime = this.getDisplayEndTime(segment);

    let calculatedStartTime = this.getNearestMinute(segment.started_at);
    let calculatedEndTime = segment.ended_at ? this.getNearestMinute(segment.ended_at) : '';

    if (last && !segment.ended_at) {
      let endTime = this.lastHeartbeatAt || Date.now();
      // TODO - Log cases without lastHeartbeatAt
      calculatedEndTime = this.getNearestMinute(endTime);
      displayEndTime = `${moment(calculatedEndTime).format('h:mm a')} | ${DateString(moment(calculatedEndTime).toString())}`;
    }
    let segmentDisplayData = {
      startedAt: displayStartTime,
      endedAt: displayEndTime,
      events: [],
      actions: [],
      markers: this.createSegmentMarkers(segment.id, calculatedStartTime, calculatedEndTime),
      ...this.updateSegmentDisplay(segment)
    };
    let newSegment = {
      ...segment,
      display: {
        ...segmentDisplayData
      },
      calculated: {
        startedAt: calculatedStartTime,
        endedAt: calculatedEndTime
      }
    };
    return newSegment;
  }

  updateSegmentDisplay(segment) {
    let display = {
      className: '',
      content: {
        type: '',
        metadata: '',
      }
    };
    if (segment.type === 'trip') {
      display.className += 'trip';
      display.content.type = segment.activity || 'Trip';
      display.content.metadata = `${this.getSegmentDuration(segment)}, ${this.getSegmentDistance(segment)}`;
    } else if (segment.type === 'stop') {
      let stopAddress = this.getStopAddress(segment) ? this.getStopAddress(segment) : 'Stop';
      let stopInfoValue = `${this.getSegmentDuration(segment)}${this.getStopStepCountDisplay(segment)}${this.getStopStepDistanceDisplay(segment)}`;
      display.className += 'stop';
      display.content.type = `${stopAddress}`;
      display.content.metadata = `${stopInfoValue}`;
    } else if (segment.type === 'location_void') {
      display.className += 'location-void';
      display.content.type = this.getLocationVoidText(segment);
      display.content.metadata = `${this.getSegmentDuration(segment)}`;
    } else if (segment.type === 'empty') {
      display.className += 'empty-segment';
      display.content.type = 'No Information';
      display.content.metadata = `${this.getSegmentDuration(segment)}`;
    }
    return display;
  }

  getStopStepCountDisplay(segment) {
    return segment.step_count ? `, ${segment.step_count.toLocaleString()} steps` : '';
  }

  getStopStepDistanceDisplay(segment) {
    return segment.step_distance ? `, ${DistanceLocale(segment.step_distance)}` : '';
  }

  getSegmentDistance(segment) {
    if (segment.distance >= 0) {
      let distance = segment.distance;
      return DistanceLocale(distance);
    }
    return '-';
  }

  getSegmentDuration(segment) {
    if (segment.duration) {
      return HMString(segment.duration, 60);
      //return moment.duration(segment.duration, "seconds").humanize();
    }
    return '-';
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

  getDisplayStartTime(segment) {
    return `${this.getNearestMinute(segment.started_at).format('h:mm a')} | ${DateString(this.getNearestMinute(segment.started_at).toString())}`;
  }

  getDisplayEndTime(segment) {
    return segment.ended_at ? `${this.getNearestMinute(segment.ended_at).format('h:mm a')} | ${DateString(this.getNearestMinute(segment.ended_at).toString())}` : '';
  }

  getNearestMinute(date) {
    // if (moment(date).seconds() > 30) {
    //   let roundedDate = moment(date).add(1, "minute");
    //   return moment(roundedDate).startOf('minute');
    // }
    return moment(date).startOf('minute');
  }

  getNearestMinuteForEta(date) {
    let roundedDate = moment(date).add(1, "minute");
    return moment(roundedDate).startOf('minute');
  }

  isValidSegment(segment, index, segments) {
    let first = (index === 0);
    let last = (index === segments.length - 1);
    let previous = (index > 0) ? segments[index - 1] : null;
    if (first) {
      if (segment.started_at && segment.ended_at) {
        return true;
      }
      return !!(segment.started_at && last && this.lastHeartbeatAt);

    } else if (last) {
      if (segment.started_at && this.lastHeartbeatAt) {
        return this.isAfterPrevSegment(previous.ended_at, segment.started_at);
      }
      return (segment.started_at && this.isAfterPrevSegment(previous.ended_at, segment.started_at));
    } else {
      if (segment.started_at && segment.ended_at) {
        //let isGreaterThanMinute = (moment(segment.ended_at).diff(moment(segment.started_at), 'minutes') > 0);
        return this.isAfterPrevSegment(previous.ended_at, segment.started_at);
      }
      return false;
    }
  }

  isAfterPrevSegment(date1, date2) {
    return (moment(date1).isBefore(date2, 'seconds') || moment(date1).isSame(date2, 'seconds'));
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

  onMouseOver(id: string) {
    this.handleMouseOver.emit(id);
    if (config.isStaff) {
      console.info("_SEGMENT_ID_", id);
    }
  }

  selectActionId(actionId: string) {
    this.selectAction.next(actionId)
  }

  unselectAction() {
    this.selectAction.next(null)
  }

  onMouseOut() {
    this.handleMouseOut.emit();
  }

  ngOnDestroy() {
    if(this.scrollSub) this.scrollSub.unsubscribe()
  }
}
