import {MarkerFactoryConfig, mapItemsFactory} from "./map-items-factory";
import {MapEntity, MapEntities} from "../entities/interfaces";
import {MapService} from "../map-service";

export const clustersFactory = (config: MarkerFactoryConfig) => {
  config = {
    ...config,
    name: config.name || 'cluster',
    isCluster: true
  };
  let markers = mapItemsFactory(config);
  let cluster = {
    ...markers,
    cluster: null
  };
  MapService.addCluster(cluster);
  return cluster
};