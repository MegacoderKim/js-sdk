import {MarkerFactoryConfig, mapItemsFactory} from "./map-items-factory";
import {MapService} from "../map-service";
import {MapEntities, RenderConfig} from "../entities/interfaces";

export const clustersFactory = (config: MarkerFactoryConfig): ClusterEntities<any> => {
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

export interface ClusterEntities<T> extends MapEntities<T>, RenderConfig {
  cluster: any
}