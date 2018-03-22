import {HtMapItems} from "./map-items";
import {htAction} from "ht-data";
import * as _ from "underscore";
import {TimelineSegment} from "./timeline-segment";
import {HtMapItem} from "./map-item";
import {HtCurrentUser} from "./current-user";
import {HtMarkerItem} from "./marker-item";
import {IAction, IPlaceline, ITimelineEvent, IUserPlaceline} from "ht-models";
import {Color} from "ht-utility";

export class HtSegmentsTrace {

  segmentsPolylines = new HtMapItems();
  stopMarkers = new HtMapItems();
  actionMarkers = new HtMapItems();
  actionsPolylines = new HtMapItems();
  timelineSegment =  new TimelineSegment();
  userMarker: HtCurrentUser = new HtCurrentUser();
  replayMarker = new HtMarkerItem();
  eventMarkers: HtMapItems = new HtMapItems();
  allowedEvents = {};
  map;

  constructor() {
    this.timelineSegment.head$.filter(() => !!this.map).subscribe((head) => {
      this.setReplayHead(head, this.map)
    })
  }

  trace(user, map, params = {}) {
    this.map = map;
    let userSegments = user ? user.placeline : [];
    let segType = this.getSegmentTypes(userSegments);
    this.segmentsPolylines.trace(segType.tripSegment, map);
    this.stopMarkers.trace(segType.stopSegment, map, true);
    this.traceAction(user, map);
    this.traceCurrentUser(user, map);
    this.traceActionPolyline(user, map, this.getCurrentUserPosition());
    this.traceEvents(user, map)
  }

  setStipStyle() {
    let styleFunct = {
      get(type) {
        return {
          default: {
            radius: 10,
            fillColor: Color.stop,
            fillOpacity: 1,
            weight: 2,
            color: Color.stopDark,
            pane: "markerPane"
          },
          popup: {
            offset: [0, -5],
            // offset: point(0, -5),
            closeButton: false
          },
          faded: {
            fillOpacity: 0,
            opacity: 0.1
          },
          highlighted: {

          }
        }
      }
    };
  }

  highlightAll(toHighlight) {
    this.segmentsPolylines.highlight({}, !!toHighlight);
    this.stopMarkers.highlight({}, !!toHighlight)
  }

  // extendBounds(bounds) {
  //   this.stopMarkers.getBounds(bounds);
  //   this.segmentsPolylines.getBounds(bounds);
  //   this.actionMarkers.getBounds(bounds);
  // }

  selectSegment(segment: IPlaceline) {
    if(segment.type == 'trip') {
      this.segmentsPolylines.highlight(segment);
      this.stopMarkers.unHighlight()
    } else if (segment.type == 'stop') {
      this.stopMarkers.highlight(segment);
      // this.segmentsPolylines.unHighlight();
    }
    this.selectSegmentEffect(segment)
  }

  unselectSegment(segment: IPlaceline) {
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

  traceAction(user: IUserPlaceline, map) {
    let actions = user ? user.actions : [];
    let filteredActions = _.filter(actions, (action: IAction) => {
      return !!((action.expected_place && action.expected_place.location) || (action.completed_place && action.completed_place.location));
    });
    this.actionMarkers.trace(filteredActions, map, true);
  }

  traceActionPolyline(user, map, currentPosition) {
    let actions = user ? user.actions : [];
    let ongoingAction = currentPosition ?
      actions : [];
    if(currentPosition) {
      let polylines = this.getActionPolylineWithId(currentPosition, ongoingAction);
      this.actionsPolylines.trace(polylines, map, true)

    } else {
      this.actionsPolylines.clearAll()
    }
  }

  getActionPolylineWithId(currentPosition, items: IAction[]) {
    let sortedAction = _.sortBy(items, action => {
      let finalEta = action.eta || action.expected_at;
      return finalEta
    });
    let polylinesWithId = sortedAction.reduce((acc, action: IAction) => {
      let finalEta = action.eta || action.expected_at;
      if(finalEta && !action.completed_at) {
        // let actionPostiion = GetActionPosition(action);
        let pos = htAction(action).getPosition();
        console.log(pos, currentPosition);
        let actionPostiion = [pos.lat, pos.lng];
        if(acc.length == 0) {
          return actionPostiion ? [...acc, {
            path: [currentPosition, actionPostiion],
            id: action.id
          }]: acc
        } else {
          let pastPoint = _.last(acc).path[1];
          return actionPostiion ? [...acc, {
            path: [pastPoint, actionPostiion],
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

  private getSegmentTypes(userSegments: IPlaceline[]) {
    return _.reduce(userSegments, (segmentType: ISegmentType, segment: IPlaceline) => {
      if(segment.type == 'stop') {
        if(segment.place && segment.place.location) segmentType.stopSegment.push(segment)
      } else {
        if(segment.route) segmentType.tripSegment.push(segment)
      }
      return segmentType;
    }, {tripSegment: [], stopSegment: []});
  }

  traceCurrentUser(userData, map) {
    let segment = userData ? _.last(userData.placeline) : null;
    if(segment && this.timelineSegment.timeAwareArray && this.timelineSegment.timeAwareArray.length) {
      // let lastSegment = segment;
      let positionBearing = this.timelineSegment.getLastPositionBearing();
      this.userMarker.update({segment, positionBearing}, map, userData)
    } else {
      this.userMarker.clear();
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
  //   return this.timelineSegment.placeline
  // }

  updateTimeline(user: IUserPlaceline) {
    this.timelineSegment.update(user)
  }

  getCurrentUserPosition() {
    return this.userMarker.getCurrentPosition()
  }

  focusUserMarker(map) {
    this.userMarker.setFocus(map);
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

  private traceEvents(user: IUserPlaceline, map) {
    let events: ITimelineEvent[] = user ? user.events : [];
    let locations = this.timelineSegment.getLocationsAtTimesT(events.map(event => event.recorded_at));
    let eventsWithPosition = events.reduce((acc, event, i) => {
      let info = this.allowedEvents[event.type];
      if(info) {
        var lastEvent = _.last(acc);
        let sameAsLastEvent = lastEvent && lastEvent.recorded_at == event.recorded_at;
        if(sameAsLastEvent) {
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
  tripSegment: IPlaceline[],
  stopSegment: IPlaceline[]
};
