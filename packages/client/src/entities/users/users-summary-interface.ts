import {
  EntityItem, EntityItemDispatchers, EntityItemSelectors, EntityList, EntityListDispatchers, EntityListSelectors,
  EntityTypeConfig,
  ItemDispatchers, GenItemSelectors,
  ItemState, ListDispatchers, ListSelectors, ListState, GenListSelectors
} from "../base/interfaces";

export interface AddUsersSummarySelector {

}

export interface AddUsersSummaryDispatchers {

}

export interface UsersSummarySelector extends AddUsersSummarySelector, EntityListSelectors, GenListSelectors {

}

export interface UsersSummaryDispatchers extends AddUsersSummaryDispatchers, EntityListDispatchers, ListDispatchers {

}

export interface UsersSummary extends EntityList, UsersSummarySelector, UsersSummaryDispatchers {

};

export type UsersSummaryFactory = (itemEntityState: ListState, config: Partial<EntityTypeConfig>) => UsersSummary

