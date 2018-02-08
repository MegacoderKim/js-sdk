import {CompoundDataObservableMixin, CompoundSetDataConfig} from "../mixins/compounds-data-observable";
import {MapInstance} from "../map-utils/map-instance";
import {IAction} from "ht-models";
import {DestinationMarker} from "../entities/destination-marker";
import { Observable } from "rxjs/Observable"
import { Subscription} from "rxjs/Subscription"
import { ActionsPolylineTrace} from "../entities/actions-data-polyline";
import { StartMarkerTrace } from "../entities/start-marker";
import {TimeAwareAnimation} from "time-aware-polyline";
import {map} from "rxjs/operators";
import {ActionUserTrace} from "../entities/action-user";

export class ActionMap {
  mapInstance: MapInstance;
  destination;
  polyline;
  start;
  user;
  pulse;
  anim = new TimeAwareAnimation();
  constructor(mapInstance, options: IActionTraceOptions = {}) {
    this.mapInstance = mapInstance;
    this.destination = new DestinationMarker(mapInstance);
    this.polyline = new ActionsPolylineTrace(mapInstance);
    this.polyline.setTimeAwareAnimation(this.anim);
    this.user = new ActionUserTrace(mapInstance);
    if (options.hasPulse) {
      this.pulse = new ActionUserTrace(mapInstance);
      // this.pulse.setTimeAwareAnimation(this.anim);
      // this.pulse.toNotTraceItem = true;
    }
    // this.user.setTimeAwareAnimation(this.anim);
    // this.user.toNotTraceItem = true;
    this.start = new StartMarkerTrace(mapInstance);
  }

  setData$(data$) {
    this.destination.setData$(data$);
    this.polyline.setData$(data$);
    this.start.setData$(data$);
    if (this.pulse) this.pulse.setData$(data$.pipe(map((actions: IAction[]) => {
      return actions.reduce((acc, action) =>{
        return action.display.show_summary ? acc : [...acc, action.user];
      }, [])
    })));
    this.user.setData$(data$.pipe(map((actions: IAction[]) => {
      return actions.reduce((acc, action) =>{
        return action.display.show_summary ? acc : [...acc, action.user];
      }, [])
    })));

  };


}

export interface IActionTraceOptions {
  hasPulse?: boolean
}

export const ActionTrace = ActionMap;