import {
  EntityItem, EntityItemDispatchers, EntityItemSelectors, EntityTypeConfig, ItemDispatchers, ItemSelectors,
  ItemState
} from "../base/arc";

export interface AddUsersPlacelineSelector {

}

export interface AddUsersPlacelineDispatchers {
  setSegmentSelectedId: (segmentId) => any
  setSegmentResetMapId: (segmentId) => any
}

export interface UsersPlacelineSelector extends AddUsersPlacelineSelector, EntityItemSelectors, ItemSelectors {

}

export interface UsersPlacelineDispatchers extends AddUsersPlacelineDispatchers, EntityItemDispatchers, ItemDispatchers {

}

export interface UsersPlaceline extends EntityItem {
  selectors: UsersPlacelineSelector,
  dispatchers: UsersPlacelineDispatchers
};

export type UsersPlacelineFactory = (itemEntityState: ItemState, config: Partial<EntityTypeConfig>) => UsersPlaceline

