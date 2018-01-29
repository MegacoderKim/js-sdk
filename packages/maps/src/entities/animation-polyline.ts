import {SegmentPolylines} from "./segment-polylines";
import {MarkersMixin} from "../mixins/marker-renderer";
import {PolylinesMixin} from "../mixins/polyline-renderer";
import {ExtendBoundsMixin} from "../mixins/extend-bounds";
import {TraceMixin} from "../mixins/trace";
import {StyleMixin} from "../mixins/styles";
import {AnimationMixin} from "../mixins/animation-renderer";
import {SingleItemMixin} from "../mixins/single-item";
import {MapInstance} from "../map-utils/map-instance";
import {Entity, StyleFunct} from "../interfaces";
import {HtPosition} from "ht-models";
import {TimeAwareAnimation, IPathBearing} from "time-aware-polyline";
import {LatLngBounds} from "leaflet";

export class AnimPolyline extends SegmentPolylines {
  mapInstance: MapInstance;
  animation: TimeAwareAnimation;
}

export const AnimPolylineTrace = AnimationMixin(SingleItemMixin(
  TraceMixin(ExtendBoundsMixin(
    PolylinesMixin(MarkersMixin(StyleMixin(AnimPolyline)))))
))
