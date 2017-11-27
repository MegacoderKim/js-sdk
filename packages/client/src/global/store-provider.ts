import {storeFactory, StoreProvider} from "../store/index";
import * as fromRoot from "../reducers";

// const storeProvider: StoreProvider = storeFactory(fromRoot.reducers);

// Object.freeze(storeProvider);
// export const store = storeProvider.STORE_PROVIDERS;

export const apiStoreFactory = () => {
  const storeProvider: StoreProvider = storeFactory(fromRoot.reducers);
  return storeProvider.STORE_PROVIDERS;
};

export const ApiStoreService = (() => {
  var instance: StoreProvider;

  return {
    getInstance() {
      if ( !instance ) {
        instance = apiStoreFactory();
      }
      return instance;
    },
    getNewInstance() {
      return apiStoreFactory()
    }
  }
})();