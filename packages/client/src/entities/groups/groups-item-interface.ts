import {
  EntityItem, EntityItemSelectors, EntityTypeConfig, ItemDispatchers, ItemSelectors,
  ItemState
} from "../base/interfaces";

export interface AddGroupsItemSelector {

}

export interface GroupsItemSelector extends AddGroupsItemSelector, EntityItemSelectors, ItemSelectors {

}

export interface GroupsItem extends EntityItem {
  selectors: GroupsItemSelector,
  dispatchers: ItemDispatchers
};

export type GroupsItemFactory = (itemEntityState: ItemState, config: Partial<EntityTypeConfig>) => GroupsItem

