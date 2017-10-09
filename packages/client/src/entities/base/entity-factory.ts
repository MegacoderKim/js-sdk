import {Observable} from "rxjs/Observable";
import {HClientConfig, HEntityType, HClient, HEntityState} from "./interfaces";
import {HClientFactory} from "./client-factory";

export const HEntityFactory = (entityState: HEntityState, overrideConfig: Partial<HEntityType>) => {
  const config: HEntityType = {
    name: overrideConfig.name || 'list',
    defaultQuery: {page_size: 10, ...overrideConfig.defaultQuery},
    pollDuration: overrideConfig.pollDuration || 10000,
    updateStrategy: overrideConfig.updateStrategy || 'live',
    firstDataEffect: overrideConfig.firstDataEffect,
  };

  let dateRangeQuery$ = entityState.dateRangeQuery$ ?
    Observable.of({start: '', end: ''})
    .map(range => {
      if (!range) return {};
      let start =  range['start'];
      let end = range['end'];
      let param = entityState.dateRangeParam;
      return {[`min_${param}`]: start, [`max_${param}`]: end}
    }) : Observable.of({});

  return {
    ...config,
    dateRangeQuery$,
  }
};