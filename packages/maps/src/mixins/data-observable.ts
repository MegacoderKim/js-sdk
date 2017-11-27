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

export function DataObservableMixin <TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    dataSub: Subscription;
    trace: (data, map?) => any;
    dataSource$: Observable<object | null>;
    data$: Observable<object>;
    isValidMapItems?: (data) => boolean;
    getPosition: (data) => HtPosition;

    _procData$() {
      return (source$: Observable<object | null>) => {
        return source$.pipe(
          map((markers) => {
            return _.reduce(markers, (acc, item) => {
              const isValid = this.isValidMapItems ? this.isValidMapItems(item) : !!this.getPosition(item);
              if (isValid) {
                acc.valid.push(item)
              } else {
                acc.invalid.push(item)
              };
              return acc
            }, {valid: [], invalid: []})
            // return markers
          })
        )
      }
    }

    setData$(data$: Observable<object | null>, config: SetDataConfig = {}) {
      if (this.dataSub) {
        this.dataSub.unsubscribe();
      }
      const hide$ = config.hide$;
      this.dataSource$ = hide$ ? combineLatest(
        data$,
        hide$.pipe(distinctUntilChanged()),
        (data, hide) => !!hide ? [] : data
      ) : data$;
      this.data$ = this.dataSource$.pipe(
        this._procData$()
      );
      this._initDataObserver()
    };

    _initData$() {
      let userData$ = this.data$.pipe(
        filter(data => !!MapService.map),
        pluck('valid'),
        scan((acc: {user: any, oldUser: any}, data: object) => {
          const oldUser = acc.user;
          return {user: data, oldUser }
        }, {user: null, oldUser: null})
      );
      return userData$;
    };

    _initDataObserver() {

      let userData$ = this._initData$();

      // let userData$ = data$.pipe(
      //   filter(data => !!MapService.map),
      //   scan((acc: {user: any, oldUser: any}, data: IUserData) => {
      //     const oldUser = acc.user;
      //     return {user: data, oldUser }
      //   }, {user: null, oldUser: null})
      // );
      // let userData$ = data$.filter(data => !!MapService.map).scan((acc, data) => {
      //   const oldId = acc.user ? acc.user.id : null;
      //   const currentId = data ? data.id : null;
      //   const isNew = currentId && oldId ? currentId !== oldId : true;
      //   return {user: data, isNew, oldId }
      // }, {user: null, oldId: null, isNew: true});
      function isNewId (newItem, old) {
        if(!old && newItem) return true;
        if(newItem && old) return  newItem.id !== old.id
      }
      function isNewList(newList, old) {
        if(!old && newList) return true;
        if(newList && old) return  newList.length !== old.length
      }
      let sub = userData$.subscribe((acc: {user: any, oldUser: any}) => {
        const userData = acc.user;
        // const isNew = acc.isNew;
        this.trace(userData);
        let isNew = false;
        isNew = isNewList(acc.user, acc.oldUser);
        // if (dataType == 'list') {
        //   isNew = isNewList(acc.user, acc.oldUser)
        // } else {
        //   isNew = isNewId(acc.user, acc.oldUser)
        // }
        if(isNew) MapService.resetBounds()
      });
      this.dataSub = sub;
    }
  }
};

export interface SetDataConfig {
  hide$?: Observable<any>,
}