import {Observable} from "rxjs/Observable";
import {HClientFactory} from "./client-factory";
import {EntityTypeConfig, EntityTypeConfigFactory} from "./interfaces";

export const EntityConfigFactory: EntityTypeConfigFactory = (overrideConfig: Partial<EntityTypeConfig>): EntityTypeConfig => {
  const config: EntityTypeConfig = {
    name: overrideConfig.name || 'list',
    defaultQuery: {page_size: 10, ...overrideConfig.defaultQuery},
    pollDuration: overrideConfig.pollDuration || 10000,
    updateStrategy: overrideConfig.updateStrategy || 'live',
  };

  return {
    ...config,
  }
};