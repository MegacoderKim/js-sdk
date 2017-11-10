import {Observable} from "rxjs/Observable";
import * as _ from "underscore";

export const listGetDataFactory = (entity: any): any => {

  return {
    ...entity,
    getData$([query]) {
      let entity = this;
      let updateStrategy = entity.updateStrategy;
      let first = entity.api$(query).do((data) => {
        if(entity.firstDataEffect) {
          entity.firstDataEffect(data)
        }
      });
      let update = first.expand((data) => {
        return Observable.timer(entity.pollDuration).switchMap(() => {
          if(updateStrategy == 'live') {
            return entity.api$(query)
          } else {
            let ids: string[] = _.map(data.results, (item) => {
              return item['id']
            });
            let updateQuery = {...query, id: ids.toString(), status: null, page: null};
            return entity.api$(updateQuery).map(newData => {
              return {...data, results: newData.results}
            })
          }

        })
      });

      return entity.updateStrategy != 'once' ? update : first
    }
  }
};

export const itemGetDataFactory$ = (entity) => {

  return {
    ...entity,
    getData$([id, query]) {
      let entity = this;
      let first = entity.api$(id, query).do((data) => {
        if(entity.firstDataEffect) {
          entity.firstDataEffect(data)
        }
      });

      let update = first.expand((data) => {
        let pollDuration = entity.pollDuration;
        if(pollDuration > 0) {
          return Observable.timer(entity.pollDuration).switchMap(() => {
            return entity.api$(id, query)

          })
        } else {
          return Observable.empty()
        }

      });

      return entity.updateStrategy != 'once' ? update : first
    }
  };

};