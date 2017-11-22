import {Constructor} from "../interfaces";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {MapService} from "../global/map-service";
import {filter, scan} from "rxjs/operators";

export function DataObservableMixin <TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    dataSub: Subscription;
    trace: (data, map?) => any;
    dataSource$: Observable<object | null>;

    setData$(data$: Observable<object | null>, dataType: 'list' | 'item' = 'list') {
      if (this.dataSub) {
        this.dataSub.unsubscribe();
      }
      this.dataSource$ = data$;
      this._initDataObserver(dataType)
    };

    _initData$(dataType: 'list' | 'item' = 'list') {
      let userData$ = this.dataSource$.pipe(
        filter(data => !!MapService.map),
        scan((acc: {user: any, oldUser: any}, data: object) => {
          const oldUser = acc.user;
          return {user: data, oldUser }
        }, {user: null, oldUser: null})
      );
      return userData$;
    };

    _initDataObserver(dataType: 'list' | 'item' = 'list') {
      // Observable.of(3).let(
      //   filter((x: number) => !!x)
      // )
      // data$
      //   .subscribe((data) => {
      //   console.log(data, "data$");
      //
      // })

      let userData$ = this._initData$(dataType);

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
        if (dataType == 'list') {
          isNew = isNewList(acc.user, acc.oldUser)
        } else {
          isNew = isNewId(acc.user, acc.oldUser)
        }
        if(isNew) MapService.resetBounds()
      });
      this.dataSub = sub;
    }
  }
}