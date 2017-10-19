import {HtMapItems} from "../map-items";
import {HtSegmentPolyline} from "./segment-polyline";
import {ISegment} from "ht-models";
import {MapUtils} from "../interfaces";
import {MapEntities} from "./interfaces";
import {Color} from "ht-js-utils";
import {markerRenderConfigFactory} from "../helpers/marker-render";
import {polylineRenderConfigFactory} from "../helpers/polyline-render";
import {dataFactory} from "../helpers/data-factory";
import {entityTraceFactory} from "../helpers/entity-trace";
import {stylesConfigFactory} from "../helpers/styles-factory";

export class HtSegmentPolylines extends HtMapItems<ISegment> {
  getItem(data) {
    let circle = new HtSegmentPolyline(this.mapType);
    circle.setMapTypeStyle();
    return circle;
  }
}

export const segmentFactory = (mapUtils: MapUtils): MapEntities<any> => {
  let state = {
    map: null,
  };
  let stylesObj = {
    google: {
      default: {
        strokeColor: Color.blue,
        strokeOpacity: 1,
        strokeWeight: 5
      }
    },
    leaflet: {
      default: {

      }
    }
  };
  let stylesConfig = stylesConfigFactory(stylesObj, mapUtils.type);
  let renderConfig = markerRenderConfigFactory(mapUtils);
  renderConfig = polylineRenderConfigFactory(renderConfig, mapUtils);
  let mapItems = {
    ...state,
    entities: {},
    renderer: renderConfig
  };
  let stop = dataFactory({
    getEncodedPath(data) {
      return data.encoded_polyline;
    }
  });
  let entityTrace = entityTraceFactory(mapUtils, mapItems, stop);
  return {
    name: 'segment',
    ...entityTrace,
    ...state,
    ...renderConfig,
    ...stylesConfig
  }
};