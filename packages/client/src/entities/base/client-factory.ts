import {HClient, HClientConfig, IDispatchers} from "./interfaces";
import {Observable} from "rxjs/Observable";

export const HClientFactory = (dispatchers: IDispatchers, config: HClientConfig): HClient => {

  config.apiQuery$.switchMap((data) => {
    if(data && data[0]) {
      let loading = typeof data[0] === 'string' ? data[0] : true;
      dispatchers.setLoading(loading);
      return config.getData$(data)
    } else {
      return Observable.empty()
    }
  }).subscribe((data) => {
    dispatchers.setData(data);
  });

  return {
    ...config,
  }
};