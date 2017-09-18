import {Action} from "../store/models";
import {IDateRange} from "../interfaces";

export const SET_DATE_RANGE = '[QUERY] set date range';
export const SET_USER_QUERY = '[QUERY] set user query';
export const CLEAR_USER_QUERY_KEY = '[QUERY] clear user query key';
export const SET_PLACELINE_ID = '[USERS] set placeline id';
export const SET_USER_ID = '[USERS] set user id';

export class SetDateRange implements Action {
  readonly type = SET_DATE_RANGE;
  constructor(public payload: IDateRange) {}
}

export class SetUserQuery implements Action {
  readonly type = SET_USER_QUERY;
  constructor(public payload: object | null) {}
}

export class ClearUserQueryKey implements Action {
  readonly type = CLEAR_USER_QUERY_KEY;
  constructor(public payload: string) {}
}


export class SetPlacelineId implements Action {
  readonly type = SET_PLACELINE_ID;

  constructor(public payload: string | null) {}
}

export class SetUserId implements Action {
  readonly type = SET_USER_ID;
  constructor(public payload: string | null) {}
}

export type All
  = SetDateRange
  | SetUserQuery
  | ClearUserQueryKey
  | SetPlacelineId
  | SetUserId


