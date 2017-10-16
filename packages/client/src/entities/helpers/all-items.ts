import {Partial} from "ht-models";
import {EntityTypeConfig} from "../base/interfaces";

export const AllItemsHelpers = {
  getDefaultQuery(query) {
    return {ordering: '-created_at', page_size: 200, ...query}
  },
  getConfig(config: Partial<EntityTypeConfig>): Partial<EntityTypeConfig> {
    return {
      updateStrategy: 'once',
      ...config,
      defaultQuery: this.getDefaultQuery(config.defaultQuery),
    }
  }
};