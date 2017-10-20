import {htUser} from "ht-js-data";
import {markersFactory} from "../base/marker-factory";
import {MapEntities, MapEntity} from "./interfaces";
import {dataFactory} from "../helpers/data-factory";
import {IUserData} from "ht-models";
import * as _ from "underscore";
var Polyline = require('time-aware-polyline');

export const currentUserFactory = (mapUtils) => {
  // let data = dataFactory({
  //   getPosition(user: IUserData) {
  //     let lastSeg = _.last(user.segments);
  //     // return {lat: 0, lng: 0};
  //     if(lastSeg && lastSeg.time_aware_polyline && !lastSeg.ended_at) {
  //       let decoded = Polyline.decodeTimeAwarePolyline(lastSeg.time_aware_polyline);
  //       let lastPos = _.last(decoded);
  //       return {lat: lastPos[0], lng: lastPos[1]}
  //     } else {
  //       return null;
  //     }
  //
  //   }
  // });
  let markers = markersFactory(mapUtils, {data: htUser});
  return {
    ...markers,
    trace(data) {
      markers.trace([data])
    }
  }
};