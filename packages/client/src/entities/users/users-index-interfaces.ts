import {
  EntityList, EntityListDispatchers, EntityListSelectors, EntityTypeConfig, ListDispatchers, ListSelectors,
  ListState
} from "../base/arc";
import {Observable} from "rxjs/Observable";

export interface AddUsersIndexSelector {

}

export interface AddUsersIndexDispatchers {

}

export interface UsersIndexSelector extends AddUsersIndexSelector, EntityListSelectors, ListSelectors {

}

export interface UsersIndexDispatchers extends AddUsersIndexDispatchers, EntityListDispatchers, ListDispatchers {

}

export interface UsersIndex extends EntityList {
  selectors: UsersIndexSelector,
  dispatchers: UsersIndexDispatchers
}

export type UsersIndexFactory = (listEntityState: ListState, config: Partial<EntityTypeConfig>) => UsersIndex