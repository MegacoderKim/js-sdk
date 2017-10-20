import * as _ from "underscore";
import {TimelineSegment} from "./timeline-segment";
import {IAction, ISegment, ITimelineEvent, IUserData} from "ht-models";
import {HtMapType} from "./interfaces";
import {segmentFactory} from "./entities/segment-polylines";
import {stopFactory} from "./entities/stop-markers";
import {actionsFactory} from "./entities/action-markers";
import {htAction} from "ht-js-data";
import {IEvent} from "ht-models";
import {LeafletUtils} from "./leaflet-map-utils";
import {GoogleMapUtils} from "./google-map-utils";
import {markersFactory} from "./base/marker-factory";
import {htUser} from "ht-js-data";
import {MapService} from "./map-service";
import {currentUserFactory} from "./entities/current-user";

export class HtSegmentsTrace {

  segmentsPolylines;
  stopMarkers;
  actionMarkers;
  actionsPolylines;
  timelineSegment = new TimelineSegment();
  userMarker;
  replayMarker;
  eventMarkers;
  allowedEvents = {};
  // map;

  constructor(public options: HtSegmentsTraceOptions = {}) {
    let mapUtils = MapService.mapUtils;
    this.initBaseItems();
    this.timelineSegment.head$.filter(() => !!this.map).subscribe((head) => {
      this.setReplayHead(head, this.map)
    })
  }

  get map() {
    return MapService.map
  }

  protected initBaseItems() {
    // let mapUtils = mapType == 'leaflet' ? LeafletUtils : GoogleMapUtils;
    this.segmentsPolylines = segmentFactory();
    this.stopMarkers = stopFactory();
    this.actionMarkers = actionsFactory();
    this.actionsPolylines = actionsFactory();
    this.userMarker = currentUserFactory();
    // this.userMarker = new HtCurrentUser(mapType);ht-js-utils/dist/sr
    this.replayMarker = stopFactory();
    this.eventMarkers = stopFactory();
    this.initItems()
  }

  initItems() {

  }

  trace(user) {
    // this.map = map;
    let userSegments = user && user.segments ? user.segments : [];
    let segType = this.getSegmentTypes(userSegments);
    if(this.segmentsPolylines) this.segmentsPolylines.trace(segType.tripSegment);
    if(this.stopMarkers) this.stopMarkers.trace(segType.stopSegment);
    this.traceAction(user);
    this.userMarker.trace(user)
    // this.traceCurrentUser(_.last(userSegments));
    // this.traceActionPolyline(user, map, this.getCurrentUserPosition());
    // this.traceEvents(user, ht-map)
  }

  highlightAll(toHighlight) {
    this.segmentsPolylines.highlight({}, !!toHighlight);
    this.stopMarkers.highlight({}, !!toHighlight)
  }

  extendBounds(bounds) {
    bounds = this.stopMarkers.extendBounds(bounds);
    bounds = this.segmentsPolylines.extendBounds(bounds);
    bounds = this.actionMarkers.extendBounds(bounds);
    // console.log(bounds, "final");
    return bounds
  }

  highlightSegmentId(segmentId: string) {
    this.segmentsPolylines.highlight(segmentId);
    this.stopMarkers.hightlight(segmentId);
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
    if(segment.type == 'trip') {
      this.segmentsPolylines.resetHighlights();
      this.stopMarkers.resetHighlights();
    } else if (segment.type == 'stop') {
      // console.log("stop select");
      this.stopMarkers.resetHighlights();
      this.stopMarkers.resetHighlights();
      // this.segmentsPolylines.resetHighlights();
    }
    this.unselectSegmentEffect(segment)
  }

  selectSegmentEffect(segment) {
    this.actionMarkers.highlight({})
  }

  unselectSegmentEffect(segment) {
    this.actionMarkers.resetHighlights()
  }

  traceAction(user: IUserData) {
    let actions = user && user.actions ? user.actions : [];
    let filteredActions = _.filter(actions, (action: IAction) => {
      return htAction(action).isValidMarker();
      // return !!((action.expected_place && action.expected_place.location) || (action.completed_place && action.completed_place.location));
    });
    if(this.actionMarkers) this.actionMarkers.trace(filteredActions);
  }

  traceActionPolyline(user, map, currentPosition) {
    let actions = user && user.actions ? user.actions : [];
    let ongoingAction = currentPosition ?
      actions : [];
    if(currentPosition) {
      let polylines = this.getActionPolylineWithId(currentPosition, ongoingAction);
      // console.log(polylines);
      this.actionsPolylines.trace(polylines, map, true)

    } else {
      this.actionsPolylines.removeAll()
    }
  }

  getActionPolylineWithId(currentPosition, items: IAction[]) {
    let sortedAction = _.sortBy(items, action => {
      return action.eta || action.expected_at
    });
    let polylinesWithId = sortedAction.reduce((acc, action: IAction) => {
      let finalEta = action.eta || action.expected_at;
      if(finalEta && !action.display.show_summary) {
        let {lat, lng} = htAction(action).getPositionsObject().position;
        let actionPosition = [lat, lng];
        if(acc.length == 0) {
          return actionPosition ? [...acc, {
            path: [currentPosition, actionPosition],
            id: action.id
          }]: acc
        } else {
          let pastPoint = _.last(acc).path[1];
          return actionPosition ? [...acc, {
            path: [pastPoint, actionPosition],
            id: action.id
          }] : acc

        }
      } else {
        return acc
      }
    }, []);
    return polylinesWithId;
  }

  selectAction(actionId: string) {
    if(actionId) {
      this.actionMarkers.highlight({id: actionId});
    } else {
      this.actionMarkers.resetHighlights()
    }
    this.highlightAll(!!actionId)
  }

  protected getSegmentTypes(userSegments: ISegment[]) {
    return _.reduce(userSegments, (segmentType: ISegmentType, segment: ISegment) => {
      if(segment.type == 'stop') {
        if(segment.location && segment.location.geojson) segmentType.stopSegment.push(segment)
      } else {
        if(segment.encoded_polyline) segmentType.tripSegment.push(segment)
      }
      return segmentType;
    }, {tripSegment: [], stopSegment: []});
  }

  traceCurrentUser(segment) {
    console.log("seg,emt", segment);
    if(segment && this.timelineSegment.timeAwareArray && this.timelineSegment.timeAwareArray.length) {
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
    this.timelineSegment.clearTimeline()
  }

  get stats() {
    return this.timelineSegment.stats
  }

  // get segments() {
  //   return this.timelineSegment.segments
  // }

  updateTimeline(user: IUserData) {
    this.timelineSegment.update(user)
  }

  getCurrentUserPosition() {
    return this.userMarker.getPosition()
  }

  focusUserMarker(map, config) {
    console.log(this.userMarker);
    console.error("focus user not implimente");
    // this.userMarker.setFocus(map);
  }

  setSegmentPlayCallback(cb) {
    this.timelineSegment.playSegmentCallback = cb
  }

  setReplayHead(head, map) {
    if(head && head.currentPosition) {
      this.replayMarker.setPositionBearing([head.currentPosition[0], head.currentPosition[1]], head.bearing, map);
    } else {
      this.replayMarker.clear()
    }
  }

  private traceEvents(user: IUserData, map) {
    let events: ITimelineEvent[] = user && user.events ? user.events : [];
    let locations = this.timelineSegment.getLocationsAtTimesT(events.map(event => event.recorded_at));
    let eventsWithPosition = events.reduce((acc, event, i) => {
      let info = this.allowedEvents[event.type];
      if(info) {
        var lastEvent = _.last(acc);
        let sameAsLastEvent = lastEvent && lastEvent.recorded_at == event.recorded_at;
        if (sameAsLastEvent) {
          let lastInfo = lastEvent.info + ', ' + info;
          let newLastEvent = {...lastEvent, info: lastInfo};
          acc.pop();
          return [...acc, newLastEvent]
        } else {
          let position = locations[i];
          // let position = this.timelinePolyline.getLocationAtTime(event.recorded_at);
          if(position.length) {
            let eventWithPosition = {...event, position, info};
            return [...acc, eventWithPosition]
          } else {
            return acc
          }
        }

      } else {
        return acc
      }

    }, []);
    this.eventMarkers.trace(eventsWithPosition, map, true)
  }
}

interface ISegmentType {
  tripSegment: ISegment[],
  stopSegment: ISegment[]
};

export interface HtSegmentsTraceOptions {

}