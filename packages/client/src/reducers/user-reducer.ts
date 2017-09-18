import * as UserDispatch from "../dispatchers/user-dispatcher";
import {IUserData, Page, IUser, IUserAnalytics} from "ht-models";
import {AllData, ApiType} from "../interfaces";
import {createSelector, MemoizedSelector} from "../store/selector";
import * as _ from "underscore";
import {htUser} from "ht-js-data";

const initialState: State = {
  usersListActive: false,
  usersMarkersActive: false,
  listApiType: ApiType.analytics,
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
  usersListActive: boolean,
  usersMarkersActive: boolean
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
      return {...state, usersAnalyticsAll: action.payload}
    }
    case UserDispatch.SET_USERS_INDEX_ALL: {
      return {...state, usersIndexAll: action.payload}
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
      let usersListActive = !!action.payload;
      return {...state, listApiType: action.payload, usersListActive}
    }
    case UserDispatch.SET_LIST_ACTIVE: {
      return {...state, usersListActive: action.payload}
    }
    case UserDispatch.SET_MARKERS_ACTIVE: {
      return {...state, usersMarkersActive: action.payload}
    }
    default: {
      return state
    }
  }
}

export const getUserData = (state: State) => state.userData;
export const getAnalyticsMarkers = (state: State) => state.usersAnalyticsAll;
export const getIndexMarkers = (state: State) => state.usersIndexAll;
export const getAnalyticFilteredsMarkers = (state: State) => validMarkers(state.usersAnalyticsAll);
export const getIndexFilteredMarkers = (state: State) => validMarkers(state.usersIndexAll);
export const getIndexPage = (state: State) => state.usersIndexPage;
export const getAnalyticsPage = (state: State) => state.usersAnalyticsPage;
export const getListApiType = (state: State) => state.listApiType;
export const getListActive = (state: State) => state.usersListActive;
export const getMarkersActive = (state: State) => state.usersMarkersActive;
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

function validMarkers(markers: AllData<IUser | IUserAnalytics>) {
  if(!markers) return markers;
  return _.reduce(markers.results, (acc, marker) => {
    return htUser(marker).isValidMarker() ? [...acc, marker] : acc
  }, [])
}





