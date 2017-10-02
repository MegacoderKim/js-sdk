import {Action} from "../store/models";

export const SET_USER_DATA = "[LOADING] set user data";
export const SET_USER_ANALYTICS = "[LOADING] set user analytics";
export const SET_USER_INDEX = "[LOADING] set user index";
export const SET_USER_ANALYTICS_ALL = "[LOADING] set user analytics all";
export const SET_USER_INDEX_ALL = "[LOADING] set user index all";
export const SET_USER_SUMMARY = "[LOADING] set user summary";

export class SetLoadingUserData implements Action {
  readonly type = SET_USER_DATA;
  constructor(public payload: boolean) {}
}

export class SetLoadingUserAnalytics implements Action {
  readonly type = SET_USER_ANALYTICS;
  constructor(public payload: boolean) {}
}

export class SetLoadingUserIndex implements Action {
  readonly type = SET_USER_INDEX;
  constructor(public payload: boolean) {}
}

export class SetLoadingUserAnalyticsAll implements Action {
  readonly type = SET_USER_ANALYTICS_ALL;
  constructor(public payload: boolean) {}
}

export class SetLoadingUserIndexAll implements Action {
  readonly type = SET_USER_INDEX_ALL;
  constructor(public payload: boolean) {}
}

export class SetLoadingUserSummary implements Action {
  readonly type = SET_USER_SUMMARY;
  constructor(public payload: boolean) {}
}

export type All
  = SetLoadingUserData
  | SetLoadingUserAnalytics
  | SetLoadingUserIndex
  | SetLoadingUserAnalyticsAll
  | SetLoadingUserIndexAll
  | SetLoadingUserSummary