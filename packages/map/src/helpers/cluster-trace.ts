import {HtMapUtils} from "../map-utils";
import * as _ from "underscore";
import {entityTraceFactory} from "./entity-trace";
import {MapUtils} from "../interfaces";

export const clusterTraceFactory = (mapUtils: MapUtils, renderConfig, dataFactory) => {

  let entityTrace = entityTraceFactory(mapUtils, renderConfig, dataFactory);

  return {
    cluster: null,
    ...entityTrace
  }
};