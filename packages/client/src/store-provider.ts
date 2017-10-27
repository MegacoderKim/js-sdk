import {storeFactory, StoreProvider} from "./store/index";
import * as fromRoot from "./reducers";

const storeProvider: StoreProvider = storeFactory(fromRoot.reducers);

Object.freeze(storeProvider);
export const store = storeProvider.STORE_PROVIDERS;