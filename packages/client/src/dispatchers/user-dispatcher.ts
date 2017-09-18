import {Action} from "../store/models";
import {IUserData} from "ht-models"
import {IUserAnalytics, IUser, Page} from "ht-models";
import {AllData, ApiType} from "../interfaces";

export const SET_USER_DATA = '[USERS] set user data';
export const SET_USERS_ANALYTICS_PAGE = '[USERS] set user analytics page';
export const SET_USERS_INDEX_PAGE = '[USERS] set user index page';
export const SET_USERS_ANALYTICS_ALL = '[USERS] set users analytics all';
export const SET_USERS_INDEX_ALL = '[USERS] set users index all';
export const SET_USERS_LIST_API_TYPE = '[USERS] set users list api type';
export const SET_USERS_LIST_DATA_MAP = '[USERS] set users list data map';
export const SET_USERS_MARKERS_DATA_MAP = '[USERS] set users markers data map';

export const INIT_USERS_LIST = "[USERS] init users list";
export const INIT_USERS_MARKERS = "[USERS] init users markers";
export const INIT_USERS = "[USERS] init users";
export const PAUSE_USERS = "[USERS] pause users";

export class SetUserData implements Action {
  readonly type = SET_USER_DATA;
  constructor(public payload: IUserData | null) {}
}

export class SetUsersAnalyticsPage implements Action {
  readonly type = SET_USERS_ANALYTICS_PAGE;
  constructor(public payload: Page<IUserAnalytics>) {}
}

export class SetUsersIndexPage implements Action {
  readonly type = SET_USERS_INDEX_PAGE;
  constructor(public payload: Page<IUser>) {}
}

export class SetUsersAnalyticsAll implements Action {
  readonly type = SET_USERS_ANALYTICS_ALL;
  constructor(public payload: AllData<IUserAnalytics>) {}
}

export class SetUsersIndexAll implements Action {
  readonly type = SET_USERS_INDEX_ALL;
  constructor(public payload: AllData<IUser>) {}
};

export class SetUsersListApiType implements Action {
  readonly type = SET_USERS_LIST_API_TYPE;
  constructor(public payload: ApiType) {}
}

export class SetUsersListDataMap implements Action {
  readonly type = SET_USERS_LIST_DATA_MAP;
  constructor(public payload: (user) => any) {}
};

export class SetUsersMarkersDataMap implements Action {
  readonly type = SET_USERS_MARKERS_DATA_MAP;
  constructor(public payload: (data) => any) {}
}

export class InitUsersList implements Action {
  readonly type = INIT_USERS_LIST;
  constructor(public payload: boolean = true) {}
}

export class InitUsersMarkers implements Action {
  readonly type = INIT_USERS_MARKERS;
  constructor(public payload: boolean = true) {}
}

export class InitUsers implements Action {
  readonly type = INIT_USERS;
  constructor() {}
}

export class PauseUsers implements Action {
  readonly type = PAUSE_USERS;
  constructor() {}
}

export type All
  = SetUserData
  | SetUsersAnalyticsPage
  | SetUsersIndexPage
  | SetUsersAnalyticsAll
  | SetUsersIndexAll
  | SetUsersListApiType
  | SetUsersListDataMap
  | SetUsersMarkersDataMap
  | InitUsersList
  | InitUsersMarkers
  | InitUsers
  | PauseUsers