import { Action } from "../store/models";
import { IAction, IActionHeatPage, IActionStatusGraph, Page, IActionsSummary } from "ht-models";

/*
List
 */
export const SET_ACTIONS_LIST = "[ACTIONS] set actions list";
export const SET_ACTIONS_LIST_QUERY = "[ACTIONS] set actions list query";
export const CLEAR_ACTION_QUERY_KEY = "[ACTIONS] clear list query key";
export const ADD_ACTIONS_LIST_QUERY = "[ACTIONS] add actions list query";
export const SET_ACTIONS_LIST_ACTIVE = "[ACTIONS] set actions list active";
export const SET_ACTIONS_LIST_LOADING = "[ACTIONS] set actions list loading";

/*
List all
 */
export const SET_ACTIONS_LIST_ALL = "[ACTIONS] set actions list all";
export const SET_ACTIONS_LIST_ALL_ACTIVE = "[ACTIONS] set actions list all active";
export const SET_ACTIONS_LIST_ALL_LOADING = "[ACTIONS] set actions list all loading";
export const SET_ACTIONS_LIST_ALL_DATA_MAP = "[ACTIONS] set actions list all data map";

/*
Graph
 */
export const SET_ACTIONS_GRAPH = "[ACTIONS] set actions graph";
export const SET_ACTIONS_GRAPH_QUERY = "[ACTIONS] set actions graph query";
export const ADD_ACTIONS_GRAPH_QUERY = "[ACTIONS] add actions graph query";
export const SET_ACTIONS_GRAPH_LOADING = "[ACTIONS] set actions graph loading";
export const SET_ACTIONS_GRAPH_ACTIVE = "[ACTIONS] set actions graph active";

/*
Summary
 */
export const SET_ACTIONS_SUMMARY = "[ACTIONS] set actions summary";
export const SET_ACTIONS_SUMMARY_ACTIVE = "[ACTIONS] set actions summary active";
export const ADD_ACTIONS_SUMMARY_QUERY = "[ACTIONS] actions summary query";
export const SET_ACTIONS_SUMMARY_QUERY = "[ACTIONS] add set actions summary query";
export const SET_ACTIONS_SUMMARY_LOADING = "[ACTIONS] set actions summary loading";

/*
Heatmap
 */
// export const SET_ACTIONS_HEATMAP = "[ACTIONS] set actions summary";
// export const SET_ACTIONS_HEATMAP_ACTIVE = "[ACTIONS] set actions summary active";
// export const ADD_ACTIONS_HEATMAP_QUERY = "[ACTIONS] actions summary query";
// export const SET_ACTIONS_HEATMAP_QUERY = "[ACTIONS] add set actions summary query";
// export const SET_ACTIONS_HEATMAP_LOADING = "[ACTIONS] set actions graph loading";



export class SetList implements Action {
  readonly type = SET_ACTIONS_LIST;
  constructor(public payload: Page<IAction>) {}
}

export class SetListQuery implements Action {
  readonly type = SET_ACTIONS_LIST_QUERY;
  constructor(public payload: object) {}
}

export class AddListQuery implements Action {
  readonly type = ADD_ACTIONS_LIST_QUERY;
  constructor(public payload: object) {}
}

export class ClearQueryKey implements Action {
  readonly type = CLEAR_ACTION_QUERY_KEY;
  constructor(public payload: string) {}
}

export class SetListActive implements Action {
  readonly type = SET_ACTIONS_LIST_ACTIVE;
  constructor(public payload: boolean | string = true) {}
}

export class SetListLoading implements Action {
  readonly type = SET_ACTIONS_LIST_LOADING;
  constructor(public payload: boolean | string = true) {}
}

export class SetListAll implements Action {
  readonly type = SET_ACTIONS_LIST_ALL;
  constructor(public payload: Page<IAction>) {}
}

export class SetListAllLoading implements Action {
  readonly type = SET_ACTIONS_LIST_ALL_LOADING;
  constructor(public payload: boolean) {}
}

export class SetListAllActive implements Action {
  readonly type = SET_ACTIONS_LIST_ALL_ACTIVE;
  constructor(public payload: boolean | string) {}
}

export class SetListAllDataMap implements Action {
  readonly type = SET_ACTIONS_LIST_ALL_DATA_MAP;
  constructor(public payload: (data) => any) {}
}

export class SetGraph implements Action {
  readonly type = SET_ACTIONS_GRAPH;
  constructor(public payload: IActionStatusGraph[] | null) {}
}

export class SetGraphQuery implements Action {
  readonly type = SET_ACTIONS_GRAPH_QUERY;
  constructor(public payload: object) {}
}

export class SetGraphLoading implements Action {
  readonly type = SET_ACTIONS_GRAPH_LOADING;
  constructor(public payload: boolean = true) {}
}

export class SetGraphActive implements Action {
  readonly type = SET_ACTIONS_GRAPH_ACTIVE;
  constructor(public payload: boolean = true) {}
}

export class AddGraphQuery implements Action {
  readonly type = ADD_ACTIONS_GRAPH_QUERY;
  constructor(public payload: object) {}
}

export class SetSummary implements Action {
  readonly type = SET_ACTIONS_SUMMARY;
  constructor(public payload: IActionsSummary) {}
}

export class AddSummaryQuery implements Action {
  readonly type = ADD_ACTIONS_SUMMARY_QUERY;
  constructor(public payload: object) {}
}

export class SetSummaryQuery implements Action {
  readonly type = SET_ACTIONS_SUMMARY_QUERY;
  constructor(public payload: object) {}
}

export class SetSummaryLoading implements Action {
  readonly type = SET_ACTIONS_SUMMARY_LOADING;
  constructor(public payload: boolean = true) {}
}

export class SetSummaryActive implements Action {
  readonly type = SET_ACTIONS_SUMMARY_ACTIVE;
  constructor(public payload: boolean | string = true) {}
}

export type All = SetList
  | SetListQuery
  | SetListActive
  | AddListQuery
  | ClearQueryKey
  | SetListLoading
  | SetListAll
  | SetListAllLoading
  | SetListAllActive
  | SetListAllDataMap
  | SetGraph
  | SetGraphLoading
  | SetGraphQuery
  | AddGraphQuery
  | SetGraphActive
  | SetSummary
  | SetSummaryActive
  | SetSummaryLoading
  | SetSummaryQuery
  | AddSummaryQuery
