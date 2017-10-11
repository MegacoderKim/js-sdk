import {
  EntityItem, EntityItemDispatchers, EntityItemSelectors, EntityTypeConfig, ItemDispatchers, GenItemSelectors,
  ItemState, Selectors
} from "../base/interfaces";

export interface AddUsersPlacelineSelector {

}

export interface AddUsersPlacelineDispatchers {
  setSegmentSelectedId: (segmentId) => any
  setSegmentResetMapId: (segmentId) => any
}

export interface UsersPlacelineSelector extends AddUsersPlacelineSelector, EntityItemSelectors, GenItemSelectors {

}

export interface UsersPlacelineDispatchers extends AddUsersPlacelineDispatchers, EntityItemDispatchers, ItemDispatchers {

}

export interface UsersPlaceline extends EntityItem {
  selectors: UsersPlacelineSelector,
  dispatchers: UsersPlacelineDispatchers
};

export type UsersPlacelineFactory = (itemEntityState: ItemState, config: Partial<EntityTypeConfig>) => UsersPlaceline

