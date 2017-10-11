import {GetData, ItemApi, ListApi} from "../base/interfaces";
import {Observable} from "rxjs/Observable";
import * as _ from "underscore";

export interface GetDataConfig<T> {
  api$: T,
  firstDataEffect?: (data) => any,
  pollDuration: number,
  updateStrategy: string
}

export const listGetDataFactory = ({api$, firstDataEffect, pollDuration, updateStrategy}: GetDataConfig<ListApi<any>>): GetData<any> => {
  return ([query]) => {
    let first = api$(query).do((data) => {
      if(firstDataEffect) {
        firstDataEffect(data)
      }
    });

    let update = first.expand((data) => {
      return Observable.timer(pollDuration).switchMap(() => {
        if(updateStrategy == 'live') {
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

    return updateStrategy != 'once' ? update : first
  }
};

export const itemGetDataFactory$ = (config: GetDataConfig<ItemApi<any>>): GetData<any> => {
  let {api$, firstDataEffect, pollDuration, updateStrategy} = config;
  return ([id, query]) => {
    let first = api$(id, query).do((data) => {
      if(firstDataEffect) {
        firstDataEffect(data)
      }
    });

    let update = first.expand((data) => {
      return Observable.timer(pollDuration).switchMap(() => {
        return api$(id, query)

      })
    });

    return updateStrategy != 'once' ? update : first
  }

};