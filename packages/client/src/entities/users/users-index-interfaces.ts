import {
  EntityList, EntityListDispatchers, EntityListSelectors, EntityTypeConfig, GenListSelectors, ListDispatchers,
  ListSelectors,
  ListState
} from "../base/interfaces";
import {Observable} from "rxjs/Observable";

export interface AddUsersIndexSelector {

}

export interface AddUsersIndexDispatchers {

}

export interface UsersIndexSelector extends AddUsersIndexSelector, EntityListSelectors, GenListSelectors {

}

export interface UsersIndexDispatchers extends AddUsersIndexDispatchers, EntityListDispatchers, ListDispatchers {

}

export interface UsersIndex extends EntityList, UsersIndexSelector, UsersIndexDispatchers {

}

export type UsersIndexFactory = (listEntityState: ListState, config: Partial<EntityTypeConfig>) => UsersIndex