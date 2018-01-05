import * as _ from "underscore";
import { TimelineSegment } from "../timeline-segment";
import { IAction, ISegment, ITimelineEvent, IUserData } from "ht-models";
import { segmentsPolylinesTrace } from "../entities/segment-polylines";
import { stopMarkersTrace } from "../entities/stop-markers";
import { actionsMarkersTrace } from "../entities/action-markers";
import { htAction } from "ht-data";
import { MapService } from "../global/map-service";
import { currentUserTrace } from "../entities/current-user";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
// import {filter} from "rxjs/operators/filter";
import { scan } from "rxjs/operators/scan";
import {
  CompoundDataObservableMixin,
  CompoundSetDataConfig
} from "../mixins/compounds-data-observable";
import { HtPosition } from "ht-data";

export class Placeline {
  segmentsPolylines = segmentsPolylinesTrace();
  stopMarkers = stopMarkersTrace();
  actionMarkers = actionsMarkersTrace();
  // actionsPolylines = new ActionMarkersTrace();
  timelineSegment = new TimelineSegment();
  userMarker = currentUserTrace();
  replayMarker = stopMarkersTrace();
  eventMarkers = stopMarkersTrace();
  allowedEvents = {};
  // map;
  // dataSub: Subscription;
  // data$: Observable<null | IUserData>;
  constructor(public options: HtSegmentsTraceOptions = {}) {
    // this.initBaseItems();
  }

  get map() {
    return MapService.map;
  }

  // setData$(data$: Observable<IUserData | null>) {
  //   if (this.dataSub) {
  //     this.dataSub.unsubscribe();
  //   }
  //   this.data$ = data$;
  //   this.initDataObserver()
  // }

  // initDataObserver() {
  //   let userData$ = this.data$.pipe(
  //     filter(data => !!MapService.map),
  //     scan((acc: any, data) => {
  //       const oldId = acc.user ? acc.user.id : null;
  //       const currentId = data ? data.id : null;
  //       const isNew = currentId && oldId ? currentId !== oldId : true;
  //       return {user: data, isNew, oldId }
  //     }, {user: null, oldId: null, isNew: true})
  //   );
  //
  //   let sub = userData$.subscribe((acc) => {
  //     const userData = acc.user;
  //     const isNew = acc.isNew;
  //     this.trace(userData);
  //     if(isNew) MapService.resetBounds()
  //   });
  //   this.dataSub = sub;
  // }

  trace(user, map?) {
    // this.map = map;
    let userSegments = user && user.segments ? user.segments : [];
    let segType = this.getSegmentTypes(userSegments);
    if (this.segmentsPolylines)
      this.segmentsPolylines.trace(segType.tripSegment);
    if (this.stopMarkers) this.stopMarkers.trace(segType.stopSegment);
    this.traceAction(user);
    this.userMarker.trace(user);
    // this.traceCurrentUser(_.last(userSegments));
    // this.traceActionPolyline(user, map, this.getCurrentUserPosition());
    // this.traceEvents(user, ht-map)
  }

  highlightAll(toHighlight) {
    // this.segmentsPolylines.highlight({}, !!toHighlight);
    // this.stopMarkers.highlight({}, !!toHighlight)
  }

  extendBounds(bounds) {
    bounds = this.stopMarkers.extendBounds(bounds);
    bounds = this.segmentsPolylines.extendBounds(bounds);
    bounds = this.actionMarkers.extendBounds(bounds);
    // bounds = this.userMarker.extendBounds(bounds);
    // console.log(bounds, "final");
    return bounds;
  }

  highlightSegmentId(segmentId: string) {
    // this.segmentsPolylines.highlight(segmentId);
    // this.stopMarkers.hightlight(segmentId);
    // if(segmentId.type == 'trip') {
    //   this.segmentsPolylines.highlight(segment);
    //   this.stopMarkers.unHighlight()
    // } else if (segment.type == 'stop') {
    //   this.stopMarkers.highlight(segment);
    //   // this.segmentsPolylines.unHighlight();
    // }
    // this.selectSegmentEffect(segment)
  }

  unselectSegment(segment: ISegment) {
    if (segment.type == "trip") {
      // this.segmentsPolylines.resetHighlights();
      // this.stopMarkers.resetHighlights();
    } else if (segment.type == "stop") {
      // console.log("stop select");
      // this.stopMarkers.resetHighlights();
      // this.stopMarkers.resetHighlights();
      // this.segmentsPolylines.resetHighlights();
    }
    this.unselectSegmentEffect(segment);
  }

  selectSegmentEffect(segment) {
    // this.actionMarkers.highlight({})
  }

  unselectSegmentEffect(segment) {
    // this.actionMarkers.resetHighlights()
  }

  traceAction(user: IUserData) {
    let actions = user && user.actions ? user.actions : [];
    let filteredActions = _.filter(actions, (action: IAction) => {
      return htAction(action).isValidMarker();
      // return !!((action.expected_place && action.expected_place.location) || (action.completed_place && action.completed_place.location));
    });
    if (this.actionMarkers) this.actionMarkers.trace(filteredActions);
  }

  traceActionPolyline(user, map, currentPosition) {
    let actions = user && user.actions ? user.actions : [];
    let ongoingAction = currentPosition ? actions : [];
    if (currentPosition) {
      let polylines = this.getActionPolylineWithId(
        currentPosition,
        ongoingAction
      );
      // console.log(polylines);
      // this.actionsPolylines.trace(polylines)
    } else {
      // this.actionsPolylines.removeAll()
    }
  }

  getActionPolylineWithId(currentPosition, items: IAction[]) {
    let sortedAction = _.sortBy(items, action => {
      return action.eta || action.expected_at;
    });
    let polylinesWithId = sortedAction.reduce((acc, action: IAction) => {
      let finalEta = action.eta || action.expected_at;
      if (finalEta && !action.display.show_summary) {
        let { lat, lng } = htAction(action).getPositionsObject().position;
        let actionPosition = [lat, lng];
        if (acc.length == 0) {
          return actionPosition
            ? [
                ...acc,
                {
                  path: [currentPosition, actionPosition],
                  id: action.id
                }
              ]
            : acc;
        } else {
          let pastPoint = _.last(acc).path[1];
          return actionPosition
            ? [
                ...acc,
                {
                  path: [pastPoint, actionPosition],
                  id: action.id
                }
              ]
            : acc;
        }
      } else {
        return acc;
      }
    }, []);
    return polylinesWithId;
  }

  selectAction(actionId: string) {
    if (actionId) {
      // this.actionMarkers.highlight({id: actionId});
    } else {
      // this.actionMarkers.resetHighlights()
    }
    this.highlightAll(!!actionId);
  }

  protected getSegmentTypes(userSegments: ISegment[]) {
    return _.reduce(
      userSegments,
      (segmentType: ISegmentType, segment: ISegment) => {
        if (segment.type == "stop") {
          if (segment.location && segment.location.geojson)
            segmentType.stopSegment.push(segment);
        } else {
          if (segment.encoded_polyline) segmentType.tripSegment.push(segment);
        }
        return segmentType;
      },
      { tripSegment: [], stopSegment: [] }
    );
  }

  traceCurrentUser(segment) {
    console.log("seg,emt", segment);
    if (
      segment &&
      this.timelineSegment.timeAwareArray &&
      this.timelineSegment.timeAwareArray.length
    ) {
      // let lastSegment = segment;
      let positionBearing = this.timelineSegment.getLastPositionBearing();
      console.log(positionBearing);
      // this.userMarker.trace({segment, positionBearing})
    } else {
      // this.userMarker.removeAll();
    }
  }

  //segments replay
  clearTimeline() {
    this.timelineSegment.clearTimeline();
  }

  get stats() {
    return this.timelineSegment.stats;
  }

  // get segments() {
  //   return this.timelineSegment.segments
  // }

  updateTimeline(user: IUserData) {
    this.timelineSegment.update(user);
  }

  getCurrentUserPosition() {
    let entity = this.userMarker.getEntity();
    let data = entity.data;
    // return this.userMarker.getPosition(data)
  }

  focusUserMarker(map, config) {
    console.log(this.userMarker);
    console.error("focus user not implimented");
    MapService.mapUtils.setFocus(this.userMarker.getEntity(), map, {
      force: true,
      zoom: 15,
      center: true,
      ...config
    });
    // this.userMarker.setFocus(map);
  }

  setSegmentPlayCallback(cb) {
    this.timelineSegment.playSegmentCallback = cb;
  }

  setReplayHead(head, map) {
    if (head && head.currentPosition) {
      // this.replayMarker.setPositionBearing([head.currentPosition[0], head.currentPosition[1]], head.bearing, map);
    } else {
      // this.replayMarker.clear()
    }
  }

  private traceEvents(user: IUserData, map) {
    let events: ITimelineEvent[] = user && user.events ? user.events : [];
    let locations = this.timelineSegment.getLocationsAtTimesT(
      events.map(event => event.recorded_at)
    );
    let eventsWithPosition = events.reduce((acc, event, i) => {
      let info = this.allowedEvents[event.type];
      if (info) {
        var lastEvent = _.last(acc);
        let sameAsLastEvent =
          lastEvent && lastEvent.recorded_at == event.recorded_at;
        if (sameAsLastEvent) {
          let lastInfo = lastEvent.info + ", " + info;
          let newLastEvent = { ...lastEvent, info: lastInfo };
          acc.pop();
          return [...acc, newLastEvent];
        } else {
          let position = locations[i];
          // let position = this.timelinePolyline.getLocationAtTime(event.recorded_at);
          if (position.length) {
            let eventWithPosition = { ...event, position, info };
            return [...acc, eventWithPosition];
          } else {
            return acc;
          }
        }
      } else {
        return acc;
      }
    }, []);
    this.eventMarkers.trace(eventsWithPosition);
  }
}

export const PlacelineTrace = CompoundDataObservableMixin(Placeline);

interface ISegmentType {
  tripSegment: ISegment[];
  stopSegment: ISegment[];
}

export interface HtSegmentsTraceOptions {}
