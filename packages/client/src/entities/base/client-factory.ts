import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

export const clientSubFactory = (entity) => {

  return {
    ...entity,
    dataSub: null,
    init() {
      let entity = this;
      if(!this.dataSub) {
        this.dataSub = entity.apiQuery$().switchMap(data => {
          if (data && data[0]) {
            let loading = typeof data[0] === 'string' ? data[0] : true;
            entity.setLoading(loading);
            return entity.getData$(data)
          } else {
            return Observable.empty()
          }
        }).subscribe(data => {
          entity.setData(data)
        })
      }
      return this
    }
  }
};

export class ClientSub {
  dataSub: Subscription;
  setLoading: (data?) => void;
  setData: (data) => void;
  // type: string;
  // apiParams$: Observable<any>;
  getApiParams$: () => Observable<any>;
  getData$: (data) => any;
  name;
  init() {
    // console.log("hrere", this.getData$({}), this);
    // let entity = this;
    if(!this.dataSub) {
      this.dataSub = this.getApiParams$().switchMap(data => {
        if (data && data[0]) {
          let loading = typeof data[0] === 'string' ? data[0] : true;
          this.setLoading(loading);
          return this.getData$(data)
        } else {
          return Observable.empty()
        }
      }).subscribe(data => {
        this.setData(data)
      })
    }
  }

}
