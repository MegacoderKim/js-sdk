import {Observable} from "rxjs/Observable";
import * as _ from "underscore";
import {expand, filter, map, switchMap, takeUntil, tap} from "rxjs/operators";
import {timer} from "rxjs/observable/timer";
import {Constructor} from "ht-models";

import {Subscription} from "rxjs/Subscription";
import {empty} from "rxjs/observable/empty";
import {Page} from "ht-models";


export abstract class ListGetData {
  abstract updateStrategy: string;
  abstract pollDuration: number;
  abstract api$: (...arg: any[]) => Observable<any>;
  abstract firstDataEffect: (data) => void;
  getData$([query]) {
    let entity = this;
    // console.log(entity.nam , "nam");
    let updateStrategy = entity.updateStrategy;
    let first = entity.api$(query).pipe(
      tap((data) => {
        if(entity.firstDataEffect) {
          entity.firstDataEffect(data)
        }
      })
    );
    let update = first.pipe(
      expand((data) => {
        return timer(entity.pollDuration).pipe(
          switchMap(() => {
            // console.log(entity.pollDuration);
            if(updateStrategy == 'live') {
              return entity.api$(query)
            } else {
              let ids: string[] = _.map(data.results, (item) => {
                return item['id']
              });
              let updateQuery = {...query, id: ids.toString(), status: null, page: null};
              return entity.api$(updateQuery).pipe(
                map(newData => {
                  return {...data, results: newData.results}
                })
              )
            }

          })
        )
      })
    );

    return entity.updateStrategy != 'once' ? update : first
  }
}


export class ItemGetData {
  updateStrategy: string;
  pollDuration: number;
  api$: (...arg: any[]) => Observable<any>;
  firstDataEffect: (data) => void;

  getData$([query, y]) {
    let entity = this;
    console.log(query, "iem q", y);
    let updateStrategy = entity.updateStrategy;
    let first = entity.api$(query).pipe(
      tap((data) => {
        if(entity.firstDataEffect) {
          entity.firstDataEffect(data)
        }
      })
    );
    let update = first.pipe(
      expand((data) => {
        return timer(entity.pollDuration).pipe(
          switchMap(() => {
            return entity.api$(query)
          })
        )
      })
    );

    return entity.updateStrategy != 'once' ? update : first
  }
}


export interface IItemDataBase {
  updateStrategy: string,
  // firstDataEffect(data): void,
  pollDuration: number,
  setLoading(any): void,
  api$(id, query): Observable<any>
}

export function getItemDataMixin <TBase extends Constructor<IItemDataBase>>(Base: TBase) {
  return class extends Base {
    getData$([id, query]) {
      let entity = this;
      let first = entity.api$(id, query).pipe(
        tap((data) => {
          this.setLoading(false);
        })
      );
      let update = first.pipe(
        expand((data) => {
          return timer(entity.pollDuration).pipe(
            switchMap(() => {
              return entity.api$(id, query)
            })
          )
        })
      );

      return entity.updateStrategy != 'once' ? update : first
    }
  }
}

export interface IGetPageDataBase {
  updateStrategy: string,
  firstDataEffect(data): void,
  pollDuration: number,
  api$(query): Observable<Page<any>>
}

export function getPageDataMixin <TBase extends Constructor<IGetPageDataBase>>(Base: TBase) {
  return class extends Base {
    getData$([query]) {
      let entity = this;
      let updateStrategy = entity.updateStrategy;
      let first = entity.api$(query).pipe(
        tap((data) => {
          if(entity.firstDataEffect) {
            entity.firstDataEffect(data)
          }
        })
      );
      let update = first.pipe(
        expand((data) => {
          return timer(entity.pollDuration).pipe(
            switchMap(() => {
              if(updateStrategy == 'live') {
                return entity.api$(query)
              } else {
                let ids: string[] = _.map(data.results, (item) => {
                  return item['id']
                });
                let updateQuery = {...query, id: ids.toString(), status: null, page: null};
                return entity.api$(updateQuery).pipe(map(newData => {
                  return {...data, results: newData.results}
                }))
              }

            })
          )
        })
      );

      return entity.updateStrategy != 'once' ? update : first
    }
  }
}

export interface IIdGetPageDataBase {
  updateStrategy: string,
  firstDataEffect(data): void,
  pollDuration: number,
  active$: Observable<boolean>,
  api$(id, query): Observable<Page<any>>
}

export function getIdPageDataMixin <TBase extends Constructor<IIdGetPageDataBase>>(Base: TBase) {
  return class extends Base {
    getData$([id, query]) {
      let entity = this;
      let updateStrategy = entity.updateStrategy;
      let first = entity.api$(id, query).pipe(
        tap((data) => {
          if(entity.firstDataEffect) {
            entity.firstDataEffect(data)
          }
        })
      );
      let update = first.pipe(
        expand((data) => {
          return timer(entity.pollDuration).pipe(
            switchMap(() => {
              return entity.api$(id, query)

            })
          )
        }),
        takeUntil(this.active$.pipe(
          filter(data => !data)
        ))
      );

      return entity.updateStrategy != 'once' ? update : first
    }
  }
}
