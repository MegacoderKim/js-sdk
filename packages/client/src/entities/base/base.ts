// import {Observable} from "rxjs/Observable";
//
// export interface IBaseClient {
//   name: string,
//   allowedQueryKeys?: string[],
//   setData: (data) => void;
//   getDefaultQuery: () => object,
//   updateLoadingData: (data) => void
//   getAllowedQuery$: () => Observable<object>,
//   getPollDuration: () => number,
//   getApiQuery$: () => Observable<object>,
//   query$: () => Observable<object>
// }
import {Observable} from "rxjs/Observable";
import * as _ from "underscore";

const baseClient = (dispatcher: IDispatcher, config: IBaseClientConfig): IBaseClient => {
  let internalState = {
    pollDuration: 10000,
    allowedQuery$() {
      let queryStore$ = this.query$;
      if(config.allowedQueryKeys && config.allowedQueryKeys.length) {
        let keys$ = _.map(config.allowedQueryKeys, (key: string) => {
          return queryStore$
            .map(store => store ? store[key] : null)
            .distinctUntilChanged()
            .map(value => {
              return value ? {[key]: value} : null
            })
        });
        return Observable.combineLatest(...keys$).map(obsArray => {
          return _.reduce(obsArray, (acc, query) => {
            return query ? {...acc, ...query} : acc
          }, {});
        })
      } else if(this.allowedQueryKeys) {
        return Observable.of({})
      } else {
        return queryStore$
      }
    },
    ...config
  };

  return internalState
};

interface IBaseClientConfig {
  onQuery: (a, b?) => void,
  allowedQueryKeys?: string[]
}

interface IBaseClient {
  pollDuration: number
}

const listClient = (dispatcher: IDispatcher, selector: ISelector, options) => {
  let state: IListClientConfig = {
    name: options.name || 'list client',
    updateStrategy: options.updateStrategy || 'live',
    pollDuration: options.pollDuration,
    defaultQuery: { page_size: 10, ...options.defaultQuery},
  };

  let clientConfig: IBaseClientConfig = {
    onQuery(data) {
      let loading = data && data['id'] ? data['id'] : true;
      // set loading
    }
  };

  let client = baseClient(dispatcher, clientConfig);

  let methods = {

  };

  return {
    ...state,
    ...methods
  }

};

interface IListApi {
  api$: (query) => Observable<any>,
};

interface IDispatcher {
  setData: (data) => any,
};

const dispatcherFactory = (apiData$: Observable<any>, state: IDispatcher): IDispatcher => {
  apiData$.subscribe((data) => {
    state.setData(data)
  });
  return state
};

interface ISelector {
  query$: Observable<object>
};

const groupsListClient = (api, options: Partial<IListClientConfig>) => {
  let configState = {
    name: 'group client',
    ...options
  };
  let entityState: IListApi = {
    api$(query) {
      return api.index(query)
    },

  };
  let dispatcherState: IDispatcher = {
    setData() {

    }
  };

  let dispatcher = dispatcherFactory(Observable.of("data"), dispatcherState);

  let selectorState = {
      query$: Observable.of({}),
  };

  let state = {...configState, ...entityState};
  let client: IListClientConfig = {...listClient(dispatcher, selectorState, configState), ...configState};
  // client.apiData$.subscribe((data) => {
  //   client.setData(data)
  // });
  return client;
};

interface IListClientConfig {
  name: string,
  defaultQuery: object,
  pollDuration: number,
  updateStrategy: string,
}

const api = {
  index(query) {
    console.log("return list ", query);
  }
};

const options = {
  api,
  setData: (data) => console.log('Data add ', data)
};