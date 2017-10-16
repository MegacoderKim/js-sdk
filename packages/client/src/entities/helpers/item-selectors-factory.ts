import {apiQueryFactory$, ItemApiQueryConfig} from "./api-query-factory";
import {Selectors} from "../base/interfaces";
import {Observable} from "rxjs/Observable";

export const itemSelectorsFactory = ({itemApiQuery, selectors}) => {
  let apiQuery$ = apiQueryFactory$(itemApiQuery);
  let itemSelectors = {
    apiQuery$
  };

  return itemSelectors
};

export interface ItemSelectorsConfig {
  selectors: Selectors,
  itemApiQuery: ItemApiQueryConfig
}