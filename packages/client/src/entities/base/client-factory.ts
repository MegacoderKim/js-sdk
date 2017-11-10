import {Observable} from "rxjs/Observable";

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