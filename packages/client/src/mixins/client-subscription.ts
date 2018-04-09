import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { empty } from "rxjs/observable/empty";
import { switchMap } from "rxjs/operators";
import { Constructor } from "ht-models";

export interface IClientBase {
  getApiParams$(): Observable<any>;
  setLoading(loading: boolean | string): void;
  getData$(data): any;
  setData(data): void;
  validQueryData?(data: any[]): boolean;
}

export function clientSubMixin<TBase extends Constructor<IClientBase>>(
  Base: TBase
) {
  return class extends Base {
    dataSub: Subscription;

    constructor(...args: any[]) {
      super(...args);
      this.init();
    }

    init() {
      if (!this.dataSub) {
        this.dataSub = this.getApiParams$()
          .pipe(
            switchMap(data => {
              const validApi =  this.validQueryData && data ? this.validQueryData(data) : data && data[0];
              if (validApi) {
                let loading = typeof data[0] === "string" ? data[0] : true;
                this.setLoading(loading);
                return this.getData$(data);
              } else {
                this.setLoading(false);
                return empty();
              }
            })
          )
          .subscribe(data => {
            this.setData(data);
          });
      }
    }
  };
}
