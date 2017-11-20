import {Partial} from "ht-models";
import {EntityTypeConfig} from "../base/interfaces";
import {AllData} from "../../interfaces";
import * as _ from "underscore";
import {htUser} from "ht-data";
import {filter} from "rxjs/operators/filter";
import {map} from "rxjs/operators/map";

export const AllItemsHelpers = {
  getDefaultQuery(query) {
    return {ordering: '-created_at', page_size: 50, ...query}
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
      getDataArray$() {
        let dataArray$ = this.data$.pipe(
          filter((data: any) => !!data),
          map((data: AllData<any>) => {
            var resutls = _.values(data.resultsEntity);
            return resutls
          })
        )
        return dataArray$
      },
      getAllMarkers$(){
        const allMarkers$ = this.getDataArray$().pipe(
          map((markers) => {
            return _.reduce(markers, (acc, marker) => {
              const isValid = htUser(marker).isValidMarker();
              if (isValid) {
                acc.valid.push(marker)
              } else {
                acc.invalid.push(marker)
              };
              return acc
            }, {valid: [], invalid: []})
            // return markers
          })
        );

        return allMarkers$;

      },
      getMarkers$() {
        return this.getAllMarkers$()
          .pluck('valid')

      },
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

