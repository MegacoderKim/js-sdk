// import {combineLatest} from "rxjs/observable/combineLatest";
// import {distinctUntilChanged} from "rxjs/operators";
// import {itemAsPage} from "./operators";
// import {Observable} from "rxjs/Observable";
// import {Page} from "ht-models";

// export const listwithSelectedId$ = (list$, id$): Observable<any> => {
//   return combineLatest(
//     list$,
//     id$.pipe(distinctUntilChanged()),
//     (list: Page<any>, id) => {
//       if(!list) return list;
//       return !id ?
//         list :
//         {
//           count: 1,
//           next: null,
//           page: null,
//           results: list.results.filter(item => {
//             return item.id === id;
//           })
//         }
//     }
//   )
// };
//
// export const dataWithSelectedId$ = (data$, id$, key: string): Observable<any> => {
//   return combineLatest(
//     data$,
//     id$,
//     (data, id) => {
//       if(!data) return data;
//       return id ?
//         {...data, [key]: data[key].filter(item => {
//           return item.id === id;
//         })} : data;
//     }
//   )
// };
//
// export const listWithItem$ = (list$, item$) => {
//   return combineLatest(
//     list$,
//     item$.pipe(itemAsPage()),
//     (list, itemPage) => {
//       return itemPage ? itemPage : list
//     }
//   )
// };
