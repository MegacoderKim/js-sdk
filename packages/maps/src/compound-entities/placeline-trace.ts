import * as _ from "underscore";
import { IAction, ISegment, ITimelineEvent, IUserData, IPlacelineMod } from "ht-models";
import { SegmentPolylinesTrace } from "../entities/segment-polylines";
import {StopMarkersTrace} from "../entities/stop-markers";
import { ActionMarkersTrace } from "../entities/action-markers";
import { htAction } from "ht-data";
import { CurrentUserTrace } from "../entities/current-user";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import {
  CompoundDataObservableMixin,
  CompoundSetDataConfig
} from "../mixins/compounds-data-observable";
import { HtPosition } from "ht-models";
import {MapInstance} from "../map-utils/map-instance";
import {HtMap} from "../map-utils/interfaces";
import {TimeAwareAnimation} from "time-aware-polyline";
import {SingleItemMixin} from "../mixins/single-item";
import {ClusterMixin} from "../mixins/clusters";
import {debounceTime} from "rxjs/operators";
import {AnimationMixin} from "../mixins/animation-renderer";
import {AnimPolylineTrace} from "../entities/animation-polyline";

export class Placeline {
  segmentsPolylines;
  stopMarkers;
  actionMarkers;
  userMarker;
  animPolyline;
  allowedEvents = {};
  mapInstance: MapInstance;
  anim = new TimeAwareAnimation();
  constructor(public options: HtSegmentsTraceOptions) {
    this.mapInstance = this.options.mapInstance;
    this.stopMarkers = new StopMarkersTrace(this.mapInstance);
    this.userMarker = new CurrentUserTrace(this.mapInstance);
    this.userMarker.setTimeAwareAnimation(this.anim);
    this.segmentsPolylines = new SegmentPolylinesTrace(this.mapInstance);
    this.actionMarkers = new ActionMarkersTrace(this.mapInstance);
    this.animPolyline = new AnimPolylineTrace(this.mapInstance);
    this.animPolyline.setTimeAwareAnimation(this.anim)
  }

  get map(): HtMap {
    return this.mapInstance.map;
  }

  trace(user: IPlacelineMod, map?) {
    const selectedSegment = user ? user.selectedSegment : null;
    this.setHighlightId(user);
    let userSegments = user && user.segments ? user.segments : [];
    let segType = this.getSegmentTypes(userSegments);
    let lastSegment = segType.lastSegment;
    let restTrips = segType.tripSegment.pop();
    this.traceStops(segType.stopSegment, selectedSegment, lastSegment);
    if (lastSegment) {
      var string = this.getTimeAwarePolyline(lastSegment);
      if(string) {
        //todo infer toNotTraceItem from animMixin trace
        this.userMarker.toNotTraceItem = true;
        this.animPolyline.toNotTraceItem = true;
        // console.log(restTrips, "er", segType.tripSegment);
        this.animPolyline.trace(restTrips);
        this.anim.updatePolylineString(string);
      } else {
        //reset anim
        this.animPolyline.toNotTraceItem = false;
        this.userMarker.toNotTraceItem = false;
        this.anim.clear();
        this.animPolyline.trace(restTrips);
      }
      this.animPolyline.trace(restTrips);
    } else {
      this.anim.clear();
      this.userMarker.removeAll();

    }
    this.traceSegments(segType.tripSegment, selectedSegment);
    this.userMarker.trace(user);
    this.traceAction(user, selectedSegment);
  };

  traceStops(stops: ISegment[], selectedSegment, lastSegment) {
    if (selectedSegment) {
      stops = selectedSegment.type == 'stop' ? [selectedSegment] : [];
    }
    this.stopMarkers.trace(stops);
  }

  traceSegments(trips: ISegment[] = [], selectedSegment) {
    if (selectedSegment) {
      trips = selectedSegment.type === 'trip' ? [selectedSegment] : [];
    }
    this.segmentsPolylines.trace(trips);
  }


  traceAction(user: IUserData, selectedSegment) {
    let actions = user && user.actions && !selectedSegment ? user.actions : [];
    let filteredActions = _.filter(actions, (action: IAction) => {
      return htAction(action).isValidMarker();
    });
    if (this.actionMarkers) this.actionMarkers.trace(filteredActions);
  }

  setHighlightId(user) {
    const data = user ? user.highlightedSegment : null;
    const id = data ? data.id : null;
    this.stopMarkers.highlightedId = id;
    this.segmentsPolylines.highlightedId = id;
    this.animPolyline.highlightedId = id;
  }

  getTimeAwarePolyline(segment: ISegment) {
    return segment ? segment.time_aware_polyline : null
  }

  extendBounds(bounds) {
    bounds = this.stopMarkers.extendBounds(bounds);
    bounds = this.segmentsPolylines.extendBounds(bounds);
    bounds = this.actionMarkers.extendBounds(bounds);
    // bounds = this.userMarker.extendBounds(bounds);
    // console.log(bounds, "final");
    return bounds;
  }


  protected getSegmentTypes(userSegments: ISegment[]) {
    return _.reduce(
      userSegments,
      (segmentType: ISegmentType, segment: ISegment) => {
        segmentType.lastSegment = segment;
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

}

export const PlacelineTrace = CompoundDataObservableMixin(Placeline);

export interface ISegmentType {
  tripSegment: ISegment[];
  stopSegment: ISegment[];
  lastSegment?: ISegment
}

export interface HtSegmentsTraceOptions {
  mapInstance: MapInstance
}
