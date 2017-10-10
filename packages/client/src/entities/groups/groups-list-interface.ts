import {
  EntityList, EntityListSelectors, EntityTypeConfig, ListDispatchers, ListSelectors,
  ListState
} from "../base/arc";
import {Observable} from "rxjs/Observable";

export interface AddGroupsListSelector {
  getRoots: () => Observable<any>
  getChildren: (groupId: string) => Observable<any>
}

export interface GroupsListSelector extends AddGroupsListSelector, EntityListSelectors, ListSelectors {

}

export interface GroupsList extends EntityList {
  selectors: GroupsListSelector,
  dispatchers: ListDispatchers
}

export type GroupListFactory = (listEntityState: ListState, config: Partial<EntityTypeConfig>) => GroupsList