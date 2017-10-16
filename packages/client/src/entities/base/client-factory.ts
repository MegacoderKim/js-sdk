import {Observable} from "rxjs/Observable";

export const HClientFactory: ClientSubs = (config) => {
  let  {apiQuery$, setLoading, setData,getData$} = config;
  apiQuery$.switchMap((data) => {
    if(data && data[0]) {
      let loading = typeof data[0] === 'string' ? data[0] : true;
      setLoading(loading);
      return getData$(data)
    } else {
      return Observable.empty()
    }
  }).subscribe((data) => {
    setData(data);
  });

};
export type ClientSubs = (config: ClientSubConfig) => void;

export interface ClientSubDispatchers {
  setData: (data) => any,
  setLoading: (data) => any
}
export interface ClientSubConfig extends ClientSubDispatchers {
  apiQuery$: Observable<any[] | null>,
  getData$: (data) => Observable<any>,
}