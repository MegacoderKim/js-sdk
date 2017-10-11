import {
  EntityList, EntityListSelectors, EntityTypeConfig, GenListSelectors, ListDispatchers, ListSelectors,
  ListState
} from "../base/interfaces";
import {Observable} from "rxjs/Observable";

export interface AddGroupsListSelector {
  getRoots: () => Observable<any>
  getChildren: (groupId: string) => Observable<any>
}

export interface GroupsListSelector extends AddGroupsListSelector, EntityListSelectors, GenListSelectors {

}

export interface GroupsList extends EntityList {
  selectors: GroupsListSelector,
  dispatchers: ListDispatchers
}

export type GroupListFactory = (listEntityState: ListState, config: Partial<EntityTypeConfig>) => GroupsList