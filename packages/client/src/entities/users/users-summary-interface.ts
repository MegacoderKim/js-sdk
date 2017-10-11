import {
  EntityItem, EntityItemDispatchers, EntityItemSelectors, EntityList, EntityListDispatchers, EntityListSelectors,
  EntityTypeConfig,
  ItemDispatchers, ItemSelectors,
  ItemState, ListDispatchers, ListSelectors, ListState
} from "../base/interfaces";

export interface AddUsersSummarySelector {

}

export interface AddUsersSummaryDispatchers {

}

export interface UsersSummarySelector extends AddUsersSummarySelector, EntityListSelectors, ListSelectors {

}

export interface UsersSummaryDispatchers extends AddUsersSummaryDispatchers, EntityListDispatchers, ListDispatchers {

}

export interface UsersSummary extends EntityList {
  selectors: UsersSummarySelector,
  dispatchers: UsersSummaryDispatchers
};

export type UsersSummaryFactory = (itemEntityState: ListState, config: Partial<EntityTypeConfig>) => UsersSummary

