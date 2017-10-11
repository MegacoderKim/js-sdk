import {
  EntityList, EntityListDispatchers, EntityListSelectors, EntityTypeConfig, GenListSelectors, ListDispatchers,
  ListSelectors,
  ListState
} from "../base/interfaces";
import {Observable} from "rxjs/Observable";

export interface AddUsersMarkersSelector {

}

export interface AddUsersMarkersDispatchers {
  setDataMap: (mapFunc) => any
}

export interface UsersMarkersSelector extends AddUsersMarkersSelector, EntityListSelectors, GenListSelectors {

}

export interface UsersMarkersDispatchers extends AddUsersMarkersDispatchers, EntityListDispatchers, ListDispatchers {

}

export interface IUsersMarkers extends EntityList, UsersMarkersSelector, UsersMarkersDispatchers {

}

export type UsersMarkersFactory = (listEntityState: ListState, config: Partial<EntityTypeConfig>) => IUsersMarkers