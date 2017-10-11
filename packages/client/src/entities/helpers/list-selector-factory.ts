import {PageResults} from "../base/helpers";
import {apiQueryFactory$, ListApiQueryConfig} from "./api-query-factory";
import {GenListSelectors, Selectors} from "../base/interfaces";
import {Observable} from "rxjs/Observable";

export const ListSelectorsFactory = ({selectors, apiQueryConfig}: ListSelectorsConfig): GenListSelectors => {
  let listApiQueryConfig: ListApiQueryConfig = apiQueryConfig;
  let apiQuery$ = apiQueryFactory$(listApiQueryConfig);
  let listSelectors: GenListSelectors = {
    dataArray$: selectors.data$.let(PageResults),
    apiQuery$
  };
  return listSelectors
};

export interface ListSelectorsConfig {
  apiQueryConfig: ListApiQueryConfig,
  selectors: Selectors
}