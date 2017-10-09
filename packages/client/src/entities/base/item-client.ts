import {HEntityType, HEntityTypeClientOptions, HEntity, IDispatchers, ISelectors} from "./interfaces";
import {Observable} from "rxjs/Observable";
import {HClientFactory} from "./client-factory";
import * as _ from "underscore";

export const HItemFactory = (api$, store, overrideConfig: Partial<HEntityType>): HEntity => {
  const config: HEntityType = {
    name: overrideConfig.name || 'list',
    defaultQuery: {page_size: 10, ...overrideConfig.defaultQuery},
    pollDuration: overrideConfig.pollDuration || 1000,
    updateStrategy: overrideConfig.updateStrategy || 'live'
  };
  let selectors: ISelectors = {
    query$: Observable.of({}),
    data$: Observable.of({})
  };
  let dispatchers: IDispatchers = {
    setData(data) {
      console.log("Set data", config.name, data);
    },
    setLoading() {

    }
  };
  let dateRangeQuery$ = Observable.of({start: '', end: ''});

  let apiQuery$ = Observable.of([]);

  let client = HClientFactory(dispatchers, {
    apiQuery$,
    getData$([id, query]) {
      let first = api$(id, query).do((data) => {
        // this.firstDataEffect(data)
      });

      let update = first.expand(() => {
        return Observable.timer(config.pollDuration).switchMap(() => {
          return api$(id, query)
        })
      });

      return this.updateStrategy != 'once' ? update : first
    }
  });

  return {
    ...config,
    selectors,
    dispatchers,
    client
  }
};