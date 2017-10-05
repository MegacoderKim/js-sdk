import * as UserDispatch from "../dispatchers/user-dispatcher";
import {IUserData, Page, IUser, IUserAnalytics, IUserListSummary} from "ht-models";
import {AllData, ApiType} from "../interfaces";
import {createSelector, MemoizedSelector} from "../store/selector";
import * as _ from "underscore";
import {htUser} from "ht-js-data";

const initialUsersAnalyticsAll = {
  resultsEntity: {},
  isFirst: false
};

const initialUsersIndexAll = {
  resultsEntity: {},
  isFirst: false
};

const initialState: State = {
  usersListActive: false,
  usersMarkersActive: false,
  usersSummaryActive: false,
  listApiType: ApiType.analytics,
  usersAnalyticsAll: initialUsersAnalyticsAll,
  usersIndexAll: initialUsersIndexAll
};

export interface State {
  userData?: IUserData, //placeline data,
  usersAnalyticsPage?: Page<IUserAnalytics>,
  usersIndexPage?: Page<IUser>,
  listApiType: ApiType
  usersAnalyticsAll?: AllData<IUserAnalytics>,
  usersIndexAll?: AllData<IUser>,
  usersListDataMap?: (data) => any,
  usersMarkersDataMap?: (data) => any,
  usersSummary?: IUserListSummary | null,
  usersListActive: boolean,
  usersMarkersActive: boolean,
  usersSummaryActive: boolean,
}

export function usersReducer(state: State = initialState, action : UserDispatch.All): State {
  switch (action.type) {
    case UserDispatch.SET_USER_DATA: {
      return {...state, userData: action.payload}
    }
    case UserDispatch.SET_USERS_ANALYTICS_PAGE: {
      return {...state, usersAnalyticsPage: action.payload}
    }
    case UserDispatch.SET_USERS_INDEX_PAGE: {
      return {...state, usersIndexPage: action.payload}
    }
    case UserDispatch.SET_USERS_ANALYTICS_ALL: {
      const resultsEntity = {...state.usersAnalyticsAll.resultsEntity, ...action.payload.resultsEntity};
      return {...state, usersAnalyticsAll: {...action.payload, resultsEntity}}
    }
    case UserDispatch.SET_USERS_INDEX_ALL: {
      // const newEntities = _.indexBy(action.payload.results, 'id');
      const resultsEntity = {...state.usersIndexAll.resultsEntity, ...action.payload.resultsEntity};
      return {...state, usersIndexAll: {...action.payload, resultsEntity}}
    }
    case UserDispatch.SET_USERS_SUMMARY: {
      return {...state, usersSummary: action.payload}
    }
    case UserDispatch.SET_USERS_LIST_DATA_MAP: {
      return {...state, usersListDataMap: action.payload}
    }
    case UserDispatch.SET_USERS_MARKERS_DATA_MAP: {
      return {...state, usersMarkersDataMap: action.payload}
    }
    case UserDispatch.INIT_USERS_LIST: {
      return {...state, usersListActive: action.payload}
    }
    case UserDispatch.INIT_USERS_MARKERS: {
      return {...state, usersMarkersActive: action.payload}
    }
    case UserDispatch.INIT_USERS: {
      return {...state, usersMarkersActive: true, usersListActive: true}
    }
    case UserDispatch.PAUSE_USERS: {
      return {...state, usersMarkersActive: false, usersListActive: false}
    }
    case UserDispatch.SET_USERS_LIST_API_TYPE: {
      return {...state, listApiType: action.payload}
    }
    case UserDispatch.SET_LIST_ACTIVE: {
      return {...state, usersListActive: action.payload}
    }
    case UserDispatch.SET_MARKERS_ACTIVE: {
      return {...state, usersMarkersActive: action.payload}
    }
    case UserDispatch.SET_SUMMARY_ACTIVE: {
      return {...state, usersSummaryActive: action.payload}
    }
    default: {
      return state
    }
  }
}

export const getUserData = (state: State) => state.userData;
export const getAnalyticsAll = (state: State) => state.usersAnalyticsAll;
export const getIndexAll = (state: State) => state.usersIndexAll;
export const getMarkerDataMap = (state: State) => state.usersMarkersDataMap;
// export const getAnalyticFilteredsMarkers = (state: State) => validMarkers(state.usersAnalyticsAll);
// export const getIndexFilteredMarkers = (state: State) => validMarkers(state.usersIndexAll);
export const getIndexPage = (state: State) => state.usersIndexPage;
export const getAnalyticsPage = (state: State) => state.usersAnalyticsPage;
export const getListApiType = (state: State) => state.listApiType;
export const getListActive = (state: State) => state.usersListActive;
export const getMarkersActive = (state: State) => state.usersMarkersActive;
export const getSummary = (state: State) => state.usersSummary;
export const getSummaryActive = (state: State) => state.usersSummaryActive;

export const getAnalyticFilteredMarkers = createSelector(getAnalyticsAll, getMarkerDataMap,
  (allData: AllData<any>, mapFunc) => {
  return mapFunc ? mapFunc(allData) : allData
});

export const getIndexFilteredMarkers = createSelector(getIndexAll, getMarkerDataMap,
  (allData: AllData<any>, mapFunc) => {
  return mapFunc ? mapFunc(allData) : allData
});

export const getIndexActive = createSelector(getListApiType, getListActive, (apiType, isListActive) => {
  return apiType === ApiType.index && isListActive
});
export const getAnalyticsActive = createSelector(getListApiType, getListActive, (apiType, isListActive) => {
  return apiType === ApiType.analytics && isListActive
});

export const getIndexMarkersActive = createSelector(getListApiType, getMarkersActive, (apiType, isMarkersActive) => {
  return apiType === ApiType.index && isMarkersActive
});
export const getAnalyticsMarkersActive = createSelector(getListApiType, getMarkersActive, (apiType, isMarkersActive) => {
  return apiType === ApiType.analytics && isMarkersActive
});






