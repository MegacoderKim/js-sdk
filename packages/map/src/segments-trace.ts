import {ISegment, IUserData} from "../model/user";
import {HtMapItems} from "./map-items";
import {IAction} from "../model/action";
import {GetActionPosition} from "ht-js-utils";
import * as _ from "underscore";

export class HtSegmentsTrace {
  segmentsPolylines = new HtMapItems();
  stopMarkers = new HtMapItems();
  actionMarkers = new HtMapItems();
  actionsPolylines = new HtMapItems();

  trace(user, map, params = {}) {
    let userSegments = user ? user.segments : [];
    let segType = this.getSegmentTypes(userSegments);
    this.segmentsPolylines.trace(segType.tripSegment, map);
    this.stopMarkers.trace(segType.stopSegment, map, true);
    this.traceAction(user, map);
    this.traceActionPolyline(user, map, params['currentPosition'])
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

  selectSegment(segment: ISegment) {
    if(segment.type == 'trip') {
      this.segmentsPolylines.highlight(segment);
      this.stopMarkers.unHighlight()
    } else if (segment.type == 'stop') {
      this.stopMarkers.highlight(segment);
      // this.segmentsPolylines.unHighlight();
    }
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
  }

  traceAction(user: IUserData, map) {
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
      console.log(polylines);
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
      if(finalEta && !action.display.show_summary) {
        let actionPostiion = GetActionPosition(action);
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

  private getSegmentTypes(userSegments: ISegment[]) {
    return _.reduce(userSegments, (segmentType: ISegmentType, segment: ISegment) => {
      if(segment.type == 'stop') {
        if(segment.location && segment.location.geojson) segmentType.stopSegment.push(segment)
      } else {
        if(segment.encoded_polyline) segmentType.tripSegment.push(segment)
      }
      return segmentType;
    }, {tripSegment: [], stopSegment: []});
  }
}

interface ISegmentType {
  tripSegment: ISegment[],
  stopSegment: ISegment[]
};