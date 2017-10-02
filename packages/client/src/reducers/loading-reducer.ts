import * as LoadingDispatcher from "../dispatchers/loading-dispatcher"

const initialState: State = {
  placeline: false,
  usersAnalytics: false,
  usersIndex: false,
  usersAnalyticsAll: false,
  usersIndexAll: false,
  usersSummary: false,
};

export interface State {
  placeline: boolean,
  usersAnalytics: boolean,
  usersIndex: boolean,
  usersAnalyticsAll: boolean,
  usersIndexAll: boolean,
  usersSummary: boolean
}

export function loadingReducer(state: State = initialState, action : LoadingDispatcher.All): State {
  switch (action.type) {
    case LoadingDispatcher.SET_USER_DATA: {
      return {...state, placeline: action.payload}
    }
    case LoadingDispatcher.SET_USER_ANALYTICS: {
      return {...state, usersAnalytics: action.payload}
    }
    case LoadingDispatcher.SET_USER_INDEX: {
      return {...state, usersIndex: action.payload}
    }
    case LoadingDispatcher.SET_USER_ANALYTICS_ALL: {
      return {...state, usersAnalyticsAll: action.payload}
    }
    case LoadingDispatcher.SET_USER_INDEX_ALL: {
      return {...state, usersIndexAll: action.payload}
    }
    case LoadingDispatcher.SET_USER_SUMMARY: {
      return {...state, usersSummary: action.payload}
    }
    default:
      return state
  }
}

export const getUserData = (state: State) => state.placeline;
export const getUserAnalytics = (state: State) => state.usersAnalytics;
export const getUserIndex = (state: State) => state.usersIndex;
export const getUserAnalyticsAll = (state: State) => state.usersAnalyticsAll;
export const getUserIndexAll = (state: State) => state.usersIndexAll;
export const getUserSummary = (state: State) => state.usersSummary;
