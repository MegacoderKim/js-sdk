import {
  EntityItem, EntityItemDispatchers, EntityItemSelectors, EntityTypeConfig, ItemDispatchers, GenItemSelectors,
  ItemState, Selectors
} from "../base/interfaces";

export interface AddGroupsItemSelector {

}

export interface AddGroupsItemDispatchers {

}

export interface GroupsItemSelector extends AddGroupsItemSelector, EntityItemSelectors, GenItemSelectors {

}

export interface GroupsItemDispatchers extends AddGroupsItemDispatchers, EntityItemDispatchers, ItemDispatchers {

}

export interface GroupsItem extends EntityItem, GroupsItemSelector, GroupsItemDispatchers {

};

export type GroupsItemFactory = (itemEntityState: ItemState, config: Partial<EntityTypeConfig>) => GroupsItem

