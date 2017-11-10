import {Partial} from "ht-models";
import {EntityTypeConfig} from "../base/interfaces";
import {AllData} from "../../interfaces";
import * as _ from "underscore";

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
  },
  getSelectors(selectors) {
    return {
      getResults(isFirstCb?) {
        return selectors.data$.map((allData: AllData<any>) => {
          if(allData && allData.isFirst && isFirstCb) isFirstCb();
          if(!allData) return allData;
          return _.values(allData.resultsEntity)
        })
      }
    }
  }
};

