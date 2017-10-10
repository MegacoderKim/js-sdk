import {HClient, HClientConfig, IDispatchers} from "./interfaces";
import {Observable} from "rxjs/Observable";
import {ClientSubs, Dispatchers, Selectors} from "./arc";

export const HClientFactory: ClientSubs = (dispatchers: Dispatchers, apiQuery$: Observable<any[] | null>, getData$) => {

  apiQuery$.switchMap((data) => {
    if(data && data[0]) {
      let loading = typeof data[0] === 'string' ? data[0] : true;
      dispatchers.setLoading(loading);
      return getData$(data)
    } else {
      return Observable.empty()
    }
  }).subscribe((data) => {
    dispatchers.setData(data);
  });

};