import {StopMarkers} from "./stop-markers";
import {HtPolylines} from "./polylines";
import {HtActionsPolylines} from "./actions-polylines";
import {ActionMarkers} from "./actions";
import {CurrentUserMarker} from "./current-user-marker";
import {ReplayMarker} from "./replay-marker";
import {EventMarkers} from "./events";
import {htAction} from "ht-data";
import {IAction} from "ht-models";
import * as _ from "underscore";
import { StopMarkersTrace} from "ht-maps";
import {HtSegmentsTrace} from "./ht-js-map/segments-trace";

export class SegmentsTrace extends HtSegmentsTrace {
  segmentsPolylines: HtPolylines = new HtPolylines();
  stopMarkers: StopMarkers = new StopMarkers();
  actionMarkers: ActionMarkers = new ActionMarkers();
  actionsPolylines: HtActionsPolylines = new HtActionsPolylines();
  userMarker: CurrentUserMarker = new CurrentUserMarker();
  replayMarker: ReplayMarker = new ReplayMarker();
  allowedEvents = AllowedEvents;
  eventMarkers: EventMarkers = new EventMarkers();

  extendBounds(bounds) {
    this.stopMarkers.getBounds(bounds);
    this.segmentsPolylines.getBounds(bounds);
    this.actionMarkers.getBounds(bounds);
  }

  getActionPolylineWithId(currentPosition, items: IAction[]) {
    let sortedAction = _.sortBy(items, action => {
      let finalEta = action.eta || action.expected_at;
      return finalEta
    });
    let polylinesWithId = sortedAction.reduce((acc, action: IAction) => {
      let finalEta = action.eta || action.expected_at;
      if(finalEta && !action.completed_at) {
        let actionPostiion = htAction(action).getPositionsObject().position;
        if(acc.length == 0) {
          return actionPostiion ? [...acc, {
            path: [currentPosition, [actionPostiion.lat, actionPostiion.lng]],
            id: action.id
          }]: acc
        } else {
          let pastPoint = _.last(acc).path[1];
          return actionPostiion ? [...acc, {
            path: [pastPoint, [actionPostiion.lat, actionPostiion.lng]],
            id: action.id
          }] : acc

        }
      } else {
        return acc
      }
    }, []);
    return polylinesWithId;
  }
}

const AllowedEvents = {
  'tracking.started': 'Tracking started',
  'tracking.ended': 'Tracking ended',
  'user.speeding': 'User is speeding',
  'user.stuck_in_traffic': 'User is stuck in traffic',
  'user.walking': 'User is walking',
  'device.location.disabled': 'Location disabled',
  'device.location.enabled': 'Location enabled',
  'device.location_permission.disabled': 'Location permission disabled',
  'device.location_permission.enabled': 'Location permission enabled',
  'action.assigned': 'Action assigned',
  'action.delayed': 'Action delayed',
};
