import {Action} from "@ngrx/store";
import {IRange} from "../model/common";

export const CHANGE_VIEW = '[QUERY] Change View';
export const CHANGE_DATE_RANGE = '[QUERY] Change Date Range';
export const CHANGE_ENTITY = '[QUERY] Change Entity';
export const UPDATE_USER_LIST_QUERY = '[QUERY] Update User List Query';
export const UPDATE_USER_PAGE_QUERY = '[QUERY] Update User Page Query';
export const UPDATE_ACTION_LIST_QUERY = '[QUERY] Update Action List Query';
export const UPDATE_ACTION_PAGE_QUERY = '[QUERY] Update Action Page Query';
export const SET_USER_LIST_QUERY = '[QUERY] Set User List Query';
export const SET_ACTION_LIST_QUERY = '[QUERY] Set Action List Query';
export const UPDATE_DATE_RANGE = '[QUERY] Update Date Range';
export const CLEAR_USER_QUERY_KEY = '[QUERY] Clear User Query Key';
export const CLEAR_USER_PAGE_QUERY_KEY = '[QUERY] Clear User Page Query Key';
export const CLEAR_ACTION_QUERY_KEY = '[QUERY] Clear Action Query Key';
export const CHANGE_SHOW_DETAIL = '[QUERY] Change Show Detail';
export const CLEAR_LOADING = '[QUERY] Clear Query Loading';

export class ChangeViewQueryAction implements Action {
    readonly type = CHANGE_VIEW;
    constructor(public payload: string) { }
}

export class ChangeDateRangeQueryAction implements Action {
    readonly type = CHANGE_DATE_RANGE;
    constructor(public payload: IRange) { }
}

export class ChangeEntityQueryAction implements Action {
    readonly type = CHANGE_ENTITY;
    constructor(public payload: 'actions' | 'users') { }
}

export class UpdateUserListQueryQueryAction implements Action {
    readonly type = UPDATE_USER_LIST_QUERY;
    constructor(public payload: object) { }
}

export class UpdateUserPageQueryQueryAction implements Action {
    readonly type = UPDATE_USER_PAGE_QUERY;
    constructor(public payload: object) { }
}

export class UpdateActionListQueryQueryAction implements Action {
  readonly type = UPDATE_ACTION_LIST_QUERY;
  constructor(public payload: object) { }
}

export class UpdateActionPageQueryQueryAction implements Action {
  readonly type = UPDATE_ACTION_PAGE_QUERY;
  constructor(public payload: object) { }
}

export class SetUserListQueryQueryAction implements Action {
    readonly type = SET_USER_LIST_QUERY;
    constructor(public payload: object) { }
}

export class SetActionListQueryQueryAction implements Action {
    readonly type = SET_ACTION_LIST_QUERY;
    constructor(public payload: object) { }
}

export class UpdateDateRangeQueryAction implements Action {
    readonly type = UPDATE_DATE_RANGE;
    constructor(public payload: IRange) { }
}

export class ClearUserQueryKeyQueryAction implements Action {
    readonly type = CLEAR_USER_QUERY_KEY;
    constructor(public payload: string) { }
}

export class ClearUserPageQueryKeyQueryAction implements Action {
    readonly type = CLEAR_USER_PAGE_QUERY_KEY;
    constructor(public payload: string) { }
}

export class ClearActionQueryKeyQueryAction implements Action {
  readonly type = CLEAR_ACTION_QUERY_KEY;
  constructor(public payload: string) { }
}

export class ChangeShowDetailQueryAction implements Action {
    readonly type = CHANGE_SHOW_DETAIL;
    constructor(public payload: boolean) { }
}

export class ClearLoadingQueryAction implements Action {
    readonly type = CLEAR_LOADING;
}

export type Actions
    = ChangeViewQueryAction
    | ChangeDateRangeQueryAction
    | ChangeEntityQueryAction
    | UpdateUserListQueryQueryAction
    | UpdateUserPageQueryQueryAction
    | UpdateActionPageQueryQueryAction
    | UpdateActionListQueryQueryAction
    | SetUserListQueryQueryAction
    | SetActionListQueryQueryAction
    | UpdateDateRangeQueryAction
    | ClearUserQueryKeyQueryAction
    | ClearUserPageQueryKeyQueryAction
    | ClearActionQueryKeyQueryAction
    | ChangeShowDetailQueryAction
    | ClearLoadingQueryAction
