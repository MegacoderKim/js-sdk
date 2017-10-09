import {
  HClientConfig, HEntityState, HEntityType, HEntityTypeClientOptions, HEntity, IDispatchers,
  ISelectors, HList, HListMethods
} from "./interfaces";
import {Observable} from "rxjs/Observable";
import {HClientFactory} from "./client-factory";
import * as _ from "underscore";
import {Partial} from "ht-models";
import {HEntityFactory} from "./entity-factory";
import {CombineQuery, MergeQuery, PageResults} from "./helpers";

export const HListFactory = (api$, store, entityFunction, entityState: HEntityState, overrideConfig: Partial<HEntityType>): HList => {
  let {dispatchers, selectors, methods} = entityFunction;
  let entity = HEntityFactory(entityState, {
    ...overrideConfig,
    firstDataEffect(data) {
      dispatchers.setLoading(false)
    }
  });

  let baseQuery$ = selectors.query$
    .let(MergeQuery(entity.defaultQuery))
    .let(CombineQuery(entity.dateRangeQuery$))
    .map(data => [data]);

  let apiQuery$ = selectors.active$ ? selectors.active$.mergeMap((isActive: boolean) => {
    return isActive ? baseQuery$ : Observable.of(null)
  }) : baseQuery$;

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

  let client = HClientFactory(dispatchers, {
    ...overriderClient,
  });

  let listMethods: HListMethods = {
    dataArray$: selectors.data$.let(PageResults),
    setActive(isActive: boolean = true) {
      dispatchers.setActive(isActive)
    }
  };

  return {
    ...entity,
    client,
    selectors,
    dispatchers,
    ...listMethods,
    ...methods
  }
};


