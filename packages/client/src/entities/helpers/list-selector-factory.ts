import {PageResults} from "../base/helpers";
import {GenListSelectors} from "../base/interfaces";

export const ListSelectorsFactory = (selectors): GenListSelectors => {
  let listSelectors: GenListSelectors = {
    dataArray$: selectors.data$.let(PageResults),
  };
  return listSelectors
};
