import {CompoundDataObservableMixin, CompoundSetDataConfig} from "../mixins/compounds-data-observable";
import {MapInstance} from "../map-utils/map-instance";
import {IAction} from "ht-models";
import {DestinationMarker} from "../entities/destination-marker";
import { Observable } from "rxjs/Observable"
import { Subscription} from "rxjs/Subscription"
import { ActionsPolylineTrace} from "../entities/actions-data-polyline";
import { StartMarkerTrace } from "../entities/start-marker";
import {TimeAwareAnimation} from "time-aware-polyline";

export class ActionMap {
  mapInstance: MapInstance;
  destination;
  polyline;
  start;
  anim = new TimeAwareAnimation();
  constructor(mapInstance) {
    this.mapInstance = mapInstance;
    this.destination = new DestinationMarker(mapInstance);
    this.polyline = new ActionsPolylineTrace(mapInstance);
    this.polyline.setTimeAwareAnimation(this.anim);
    this.start = new StartMarkerTrace(mapInstance);
    // this.start.setTimeAwareAnimation(this.anim);
  }

  setData$(data$) {
    this.destination.setData$(data$);
    this.polyline.setData$(data$);
    this.start.setData$(data$)
  }


}

export const ActionTrace = ActionMap;