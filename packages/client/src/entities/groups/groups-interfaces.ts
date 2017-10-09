import {HEntityTypeFunctions, HList} from "../base/interfaces";
import {Observable} from "rxjs/Observable";

export interface HGroupListMethods {
  getRoots: () => Observable<any>,
  getChildren: (parentId: string) => Observable<any>
}

export interface HGroupList extends HList, HGroupListMethods {

}

export interface HGroupsListFunctions extends HEntityTypeFunctions {
  methods: HGroupListMethods
}