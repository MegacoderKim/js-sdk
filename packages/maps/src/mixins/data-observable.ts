import {Constructor} from "../interfaces";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {MapService} from "../global/map-service";
import {distinctUntilChanged} from "rxjs/operators/distinctUntilChanged";
import {filter} from "rxjs/operators/filter";
import {map} from "rxjs/operators/map";
import {pluck} from "rxjs/operators/pluck";
import {scan} from "rxjs/operators/scan";
import * as _ from "underscore";
import {HtPosition} from "ht-data";
import {combineLatest} from "rxjs/observable/combineLatest";
import {AllData, Page} from "ht-models";

export interface IMarkersArray {
  valid: any[],
  invalid: any[],
  isNew: boolean,
}
export function DataObservableMixin <TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    dataSub: Subscription;
    trace: (data, map?) => any;
    dataSource$: Observable<Page<any>>;
    data$: Observable<IMarkersArray>;
    isValidMapItems?: (data) => boolean;
    getPosition: (data) => HtPosition;

    _procData$() {
      return (source$: Observable<Page<any>>) => {
        return source$.pipe(
          map((pageData) => {
            let isNew = pageData && pageData.count && !pageData.next;
            return _.reduce(pageData.results, (acc, item) => {
              const isValid = this.isValidMapItems ? this.isValidMapItems(item) : !!this.getPosition(item);
              if (isValid) {
                acc.valid.push(item)
              } else {
                acc.invalid.push(item)
              };
              return acc
            }, {valid: [], invalid: [], isNew})
            // return markers
          })
        )
      }
    }

    setPageData$(data$: Observable<Page<any> | null>, config: SetDataConfig = {}) { //todo take page data, add diff apis
      if (this.dataSub) {
        this.dataSub.unsubscribe();
      }
      const hide$ = config.hide$;
      this.dataSource$ = hide$ ? combineLatest(
        data$,
        hide$.pipe(distinctUntilChanged()),
        (data, hide) => !!hide ? {results: [], count: 0, next: '', previous: ''} : data
      ) : data$;
      this.data$ = this.dataSource$.pipe(
        this._procData$()
      );
      this._initDataObserver()
    };

    // _initData$() {
    //   let userData$ = this.dataSource$.pipe(
    //     filter(data => !!MapService.map),
    //     pluck('valid'),
    //     scan((acc: {user: any, oldUser: any}, data: object) => {
    //       const oldUser = acc.user;
    //       return {user: data, oldUser }
    //     }, {user: null, oldUser: null})
    //   );
    //   return userData$;
    // };

    _initDataObserver() {

      let userData$ = this.data$;

      // function isNewId (newItem, old) {
      //   if(!old && newItem) return true;
      //   if(newItem && old) return  newItem.id !== old.id
      // }
      // function isNewList(newList, old) {
      //   if(!old && newList) return true;
      //   if(newList && old) return !newList.next && newList.count
      // }
      let sub = userData$.subscribe(({valid, invalid, isNew}) => {
        this.trace(valid);
        if(isNew) MapService.resetBounds()
      });
      this.dataSub = sub;
    }
  }
};

export interface SetDataConfig {
  hide$?: Observable<any>,
}