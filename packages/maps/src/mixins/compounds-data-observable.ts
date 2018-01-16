import { Constructor } from "../interfaces";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { GlobalMap } from "../global/map-service";
import { distinctUntilChanged } from "rxjs/operators/distinctUntilChanged";
import { filter } from "rxjs/operators/filter";
import { map } from "rxjs/operators/map";
import { scan } from "rxjs/operators/scan";
import * as _ from "underscore";
import { HtPosition, dataWithSelectedId$ } from "ht-data";
import { combineLatest } from "rxjs/observable/combineLatest";
import { orCombine } from "ht-data";

export interface ICompoundsDataObservableBase {
  trace: (data, map?) => any;
  isValidMapItems?: (data) => boolean;
  // getPosition: (data) => HtPosition;
}

export function CompoundDataObservableMixin<
  TBase extends Constructor<ICompoundsDataObservableBase>
>(Base: TBase) {
  return class extends Base {
    dataSub: Subscription;
    dataSource$: Observable<object | null>;
    data$: Observable<object>;
    compoundSetDataConfig: CompoundSetDataConfig;
    _procData$() {
      return (source$: Observable<any | null>) => {
        return source$.pipe(
          map(markers => {
            return _.reduce(
              markers,
              (acc, item) => {
                const isValid = true;
                if (isValid) {
                  acc.valid.push(item);
                } else {
                  acc.invalid.push(item);
                }
                return acc;
              },
              { valid: [], invalid: [] }
            );
            // return markers
          })
        );
      };
    }

    setCompoundData$(
      data$: Observable<object | null>,
      config: CompoundSetDataConfig = {}
    ) {
      this.compoundSetDataConfig = config;
      if (this.dataSub) {
        this.dataSub.unsubscribe();
      }
      const hide$ = config.hide$;
      const filter$ = config.filter$;
      let dataSource$ = hide$
        ? combineLatest(
            data$,
            hide$.pipe(distinctUntilChanged()),
            (data, hide) => (!!hide ? null : data)
          )
        : data$;

      if (config.roots && filter$)
        dataSource$ = dataWithSelectedId$(dataSource$, filter$, config.roots);

      this.dataSource$ = dataSource$;

      this.data$ = this.dataSource$;

      this._initDataObserver();
    }

    _initData$() {
      let userData$ = this.data$.pipe(
        filter(data => !!GlobalMap.map),
        scan(
          (acc: { user: any; oldUser: any }, data: object) => {
            const oldUser = acc.user;
            return { user: data, oldUser };
          },
          { user: null, oldUser: null }
        )
      );
      return userData$;
    }

    _initDataObserver() {
      let userData$ = this._initData$();

      function isNewItem(newItem, old) {
        if (!old && newItem) return true;
        if (newItem && old) return !old && !!newItem;
      }

      let newPlaceline$ = userData$.pipe(
        map((acc: { user: any; oldUser: any }) => {
          const userData = acc.user;
          this.trace(userData);
          const isNew = isNewItem(acc.user, acc.oldUser);
          return isNew;
          // if(isNew) GlobalMap.resetBounds()
        })
      );

      let sub = orCombine(
        newPlaceline$,
        this.compoundSetDataConfig.resetMap$
      ).subscribe(toReset => {
        if (toReset) GlobalMap.resetBounds();
      });
      this.dataSub = sub;
    }
  };
}

export interface CompoundSetDataConfig {
  hide$?: Observable<any>;
  filter$?: Observable<string | null>;
  roots?: string[];
  resetMap$?: Observable<any>;
}
