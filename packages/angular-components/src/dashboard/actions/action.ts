import {Action} from "@ngrx/store";
import {IAction, IActionHeat, IActionHeatPage, IActionMap} from "ht-models";
import {IPageData} from "../model/common";


export const UPDATE_ACTION_MAP = '[ACTION] Update Actions Map';
export const ADD_ACTIONS_MAP = '[ACTION] Add Actions Map';
export const ADD_FILTER_ACTIONS_MAP = '[USER] Add Filter Action Map';
export const CLEAR_ACTIONS_MAP = '[ACTION] Clear Actions Map';
export const SET_ACTION_FILTER = '[ACTION] Set Actions Filter';
export const SELECT_ACTION_ID = '[ACTION] Set Action Id';
export const CLEAR_ACTION = '[ACTION] Clear Action';
export const SET_PAGE_DATA = '[ACTION] Set Action Page Data';
export const UPDATE_PAGE_DATE = '[ACTION] Update Action Page Data';
export const SET_ACTION_SUMMARY = '[ACTION] Set Action Summary';
export const SET_ACTION_GRAPH = '[ACTION] Set Action Graph';
export const SET_ACTION_HEATMAP = '[ACTION] Set Action Heatmap';
export const UPDATE_ACTION_HEATMAP = '[ACTION] Update Action Heatmap';
export const SET_FILTER_HEATMAP = '[ACTION] Set Action Filter Heatmap';
export const CLEAR_ACTION_HEATMAP = '[ACTION] Clear Action Heatmap';

export class UpdateActionsMapAction implements Action {
    readonly type = UPDATE_ACTION_MAP;
    constructor(public payload: IActionMap[]) { }
}

export class AddActiosMapAction implements Action {
    readonly type = ADD_ACTIONS_MAP;
    constructor(public payload: IActionMap[]) { }
}

export class AddFilterActionsMapAction implements Action {
    readonly type = ADD_FILTER_ACTIONS_MAP;
    constructor(public payload: IActionMap[]) { }
}

export class ClearActionsMapAction implements Action {
    readonly type = CLEAR_ACTIONS_MAP;
}

export class SetActionsMapFilterAction implements Action {
    readonly type = SET_ACTION_FILTER;

    constructor(public payload: (actionMap: IActionMap) => boolean) {}
}

export class SelectActionIdAction implements Action {
    readonly type = SELECT_ACTION_ID;

    constructor(public payload: string) {}
}

export class ClearActionAction implements Action {
    readonly type = CLEAR_ACTION;

}

export class SetActionPageDataAction implements Action {
    readonly type = SET_PAGE_DATA;

    constructor(public  payload: IPageData) {}
}

export class UpdateActionPageDataAction implements Action {
    readonly type = SET_PAGE_DATA;

    constructor(public  payload: IPageData) {}
}

export class SetActionSummary implements Action {
    readonly type = SET_ACTION_SUMMARY;

    constructor(public  payload) {}
}

export class SetActionGraph implements Action {
  readonly type = SET_ACTION_GRAPH;

  constructor(public  payload) {}
}

export class SetActionHeatmap implements Action {
  readonly type = SET_ACTION_HEATMAP;

  constructor(public  payload: IActionHeat[]) {}
}

export class UpdateActionHeatmap implements Action {
  readonly type = UPDATE_ACTION_HEATMAP;

  constructor(public  payload: IActionHeat[]) {}
}

export class SetActionFilterHeatmap implements Action {
  readonly type = SET_FILTER_HEATMAP;

  constructor(public  payload: (action?: IActionHeat) => boolean) {}
}

export class ClearActionHeatmap implements Action {
  readonly type = CLEAR_ACTION_HEATMAP;

}

export type Actions
    = UpdateActionsMapAction
    | AddActiosMapAction
    | AddFilterActionsMapAction
    | ClearActionsMapAction
    | SetActionsMapFilterAction
    | SelectActionIdAction
    | ClearActionAction
    | SetActionPageDataAction
    | UpdateActionPageDataAction
    | SetActionSummary
    | SetActionGraph
    | SetActionHeatmap
    | UpdateActionHeatmap
    | ClearActionHeatmap
    | SetActionFilterHeatmap
