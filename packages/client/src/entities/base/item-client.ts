import {
  HEntityType, HEntityTypeClientOptions, HEntity, IDispatchers, ISelectors, HEntityState,
  HClientConfig, HEntityTypeFunctions, HEntityItemFunctions, HItem
} from "./interfaces";
import {Observable} from "rxjs/Observable";
import {HClientFactory} from "./client-factory";
import * as _ from "underscore";
import {HEntityFactory} from "./entity-factory";

export const HItemFactory = (api$, store, entityFunction: HEntityItemFunctions, entityState: HEntityState, overrideConfig: Partial<HEntityType>): HItem => {

  let {dispatchers, selectors, methods} = entityFunction;

  let entity = HEntityFactory(entityState, {
    ...overrideConfig,
    firstDataEffect(data) {
      dispatchers.setLoading(false)
    }
  });

  let apiQuery$ = Observable.combineLatest(
    selectors.id$.distinctUntilChanged(),
    selectors.query$.distinctUntilChanged()
  );

  let overriderClient: HClientConfig = {
    apiQuery$,
    getData$([query]) {
      let first = api$(query).do((data) => {
        entity.firstDataEffect(data)
      });

      let update = first.expand((data) => {
        return Observable.timer(entity.pollDuration).switchMap(() => {
          if(overrideConfig.updateStrategy == 'live') {
            return api$(query)
          } else {
            let ids: string[] = _.map(data.results, (item) => {
              return item['id']
            });
            let updateQuery = {...query, id: ids.toString(), status: null, page: null};
            return api$(updateQuery).map(newData => {
              return {...data, results: newData.results}
            })
          }

        })
      });

      return overrideConfig.updateStrategy != 'once' ? update : first
    },
  };

  let client = HClientFactory(dispatchers, overriderClient);

  return {
    ...entity,
    client,
    dispatchers,
    selectors,
    // ...methods
  }
};