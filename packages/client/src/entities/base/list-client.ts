import {
  HClientConfig, HEntityState, HEntityType, HEntityTypeClientOptions, HEntity, IDispatchers,
  ISelectors, HList, HListMethods
} from "./interfaces";
import {Observable} from "rxjs/Observable";
import {HClientFactory} from "./client-factory";
import * as _ from "underscore";
import {Partial} from "ht-models";
import {EntityConfigFactory} from "./entity-factory";
import {CombineQuery, DateRangeToQuery, MergeQuery, PageResults} from "./helpers";
import {
  EntityList, EntityListFactory, EntityListSelectors, EntityListState, EntityTypeConfig, EntityTypeState,
  ListSelectors
} from "./arc";

export const HListFactory: EntityListFactory = (entityState: EntityListState, overrideConfig: Partial<EntityTypeConfig>): EntityList => {
  let {
    dispatchers,
    // selectors,
    api$,
    dateRangeParam,
    dateRangeQuery$
  } = entityState;

  let entity = EntityConfigFactory(overrideConfig);

  let baseQuery$ = entityState.selectors.query$
    .let(MergeQuery(entity.defaultQuery))
    .let(CombineQuery(entityState.dateRangeQuery$))
    .map(data => [data]);

  let apiQuery$ = entityState.selectors.active$ ? entityState.selectors.active$.mergeMap((isActive: boolean) => {
    return isActive ? baseQuery$ : Observable.of(null)
  }) : baseQuery$;

  let selectors: EntityListSelectors = {
    ...entityState.selectors,
    dataArray$: entityState.selectors.data$.let(PageResults),
    apiQuery$
  };

  selectors = dateRangeQuery$ ? {...selectors, dateRangeQuery$: dateRangeQuery$.let(DateRangeToQuery(dateRangeParam)),
  } : selectors;

  let getData$ = ([query]) => {
    let first = api$(query).do((data) => {
      // entity.firstDataEffect(data)
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
  };

  HClientFactory(dispatchers, selectors.apiQuery$, getData$);

  return {
    ...entity,
    selectors,
    dispatchers,
    api$
  }
};


