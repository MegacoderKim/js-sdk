import {HEntityTypeFunctions, HList} from "../base/interfaces";
import {Observable} from "rxjs/Observable";
import {
  EntityListState, EntityType, EntityTypeConfig, ListDispatchers, ListSelectors, ReqSelectors,
  EntityListSelectors, EntityList, EntityItemSelectors, ItemSelectors, EntityItem, ItemDispatchers, EntityItemState,
  ListState, ItemState
} from "../base/arc";

export interface HGroupListMethods {
  getRoots: () => Observable<any>,
  getChildren: (parentId: string) => Observable<any>
}

export interface HGroupList extends HList, HGroupListMethods, HEntityTypeFunctions {

}

export interface HGroupsListFunctions extends HEntityTypeFunctions {
  methods: HGroupListMethods
}

//list


//item
