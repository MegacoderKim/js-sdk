import {Color} from "ht-js-utils/dist";
import {HtPolyline} from "../polyline";
import { ISegment } from "ht-models";

export class HtSegmentPolyline extends HtPolyline {
  googleStyle: google.maps.PolylineOptions = {
    strokeColor: Color.blue,
    strokeOpacity: 1,
    strokeWeight: 5
  };

}