import {Observable} from "rxjs/Observable";
import * as _ from "underscore";
import {expand, map, switchMap, tap} from "rxjs/operators";
import {timer} from "rxjs/observable/timer";


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
  // type: 'list' | 'item';

  // getData$(param) {
  //   return this.type === 'item' ? this.getItemData$(param) : this.getListData$(param)
  // }

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

  // getItemData$([id, query]) {
  //   let entity = this;
  //   let first = entity.api$(id, query).do((data) => {
  //     if(entity.firstDataEffect) {
  //       entity.firstDataEffect(data)
  //     }
  //   });
  //
  //   let update = first.expand((data) => {
  //     let pollDuration = entity.pollDuration;
  //     if(pollDuration > 0) {
  //       return Observable.timer(entity.pollDuration).switchMap(() => {
  //         return entity.api$(id, query)
  //
  //       })
  //     } else {
  //       return Observable.empty()
  //     }
  //
  //   });
  //
  //   return entity.updateStrategy != 'once' ? update : first
  // }
}


// export const itemGetDataFactory$ = (entity) => {
//
//   return {
//     ...entity,
//     getData$([id, query]) {
//       let entity = this;
//       let first = entity.api$(id, query).do((data) => {
//         if(entity.firstDataEffect) {
//           entity.firstDataEffect(data)
//         }
//       });
//
//       let update = first.expand((data) => {
//         let pollDuration = entity.pollDuration;
//         if(pollDuration > 0) {
//           return Observable.timer(entity.pollDuration).switchMap(() => {
//             return entity.api$(id, query)
//
//           })
//         } else {
//           return Observable.empty()
//         }
//
//       });
//
//       return entity.updateStrategy != 'once' ? update : first
//     }
//   };
//
// };


// export const listGetDataFactory = (entity: any): any => {
//
//   return {
//     ...entity,
//     getData$([query]) {
//       let entity = this;
//       let updateStrategy = entity.updateStrategy;
//       let first = entity.api$(query).do((data) => {
//         if(entity.firstDataEffect) {
//           entity.firstDataEffect(data)
//         }
//       });
//       let update = first.expand((data) => {
//         return Observable.timer(entity.pollDuration).switchMap(() => {
//           if(updateStrategy == 'live') {
//             return entity.api$(query)
//           } else {
//             let ids: string[] = _.map(data.results, (item) => {
//               return item['id']
//             });
//             let updateQuery = {...query, id: ids.toString(), status: null, page: null};
//             return entity.api$(updateQuery).map(newData => {
//               return {...data, results: newData.results}
//             })
//           }
//
//         })
//       });
//
//       return entity.updateStrategy != 'once' ? update : first
//     }
//   }
// };