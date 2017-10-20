import {HtMapUtils} from "../map-utils";
import * as _ from "underscore";
import {entityTraceFactory} from "./entity-trace";
import {MapUtils} from "../interfaces";
import {MapService} from "../map-service";

export const clusterTraceFactory = (renderConfig, dataFactory) => {
  let mapUtils = MapService.mapUtils;

  let entityTrace = entityTraceFactory(renderConfig, dataFactory);

  return {
    cluster: null,
    ...entityTrace
  }
};