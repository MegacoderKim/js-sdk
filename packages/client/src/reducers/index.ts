import {ActionReducerMap} from "../store/models";
import {combineReducers} from "../store/utils";
import { Action, ActionReducer } from "../store/models";
import {createFeatureSelector, createSelector, MemoizedSelector} from "../store/selector";
import * as fromUsers from "./user-reducer";
import * as fromSegments from "./segments-reducer";
import * as fromQuery from "./query-reducer";
import * as fromLoading from "./loading-reducer";
import {IUserData, IUser, IUserAnalytics } from "ht-models"
import {ApiType, AllData} from "../interfaces"

export interface State {
  users: fromUsers.State,
  segments: fromSegments.State,
  query: fromQuery.State,
  loading: fromLoading.State
};

export const reducers: ActionReducerMap<State> = {
  users: fromUsers.usersReducer,
  segments: fromSegments.segmentsReducer,
  query: fromQuery.queryReducer,
  loading: fromLoading.loadingReducer
};


export function reducer(state: any, action: any) {
  return combineReducers(reducers)
}

export const metaReducers: ActionReducer<any, any>[] = [];

/**
 * Users selectors
 */
export const getUsersState = createFeatureSelector<fromUsers.State>('users');
export const getUsersUsersData = createSelector(getUsersState, fromUsers.getUserData);
export const getUsersIndexPage = createSelector(getUsersState, fromUsers.getIndexPage);
export const getUsersListPage = createSelector(getUsersState, fromUsers.getListPage);
export const getUsersAnalyticsPage = createSelector(getUsersState, fromUsers.getAnalyticsPage);
export const getUsersListApiType = createSelector(getUsersState, fromUsers.getListApiType);
export const getUsersListActive = createSelector(getUsersState, fromUsers.getListActive);
export const getUsersIndexIsActive = createSelector(getUsersState, fromUsers.getIndexActive);
export const getUsersAnalyticsIsActive = createSelector(getUsersState, fromUsers.getAnalyticsActive);
export const getUsersIndexMarkersIsActive = createSelector(getUsersState, fromUsers.getIndexMarkersActive);
export const getUsersAnalyticsMarkersIsActive = createSelector(getUsersState, fromUsers.getAnalyticsMarkersActive);
export const getUsersIndexFilteredMarker = createSelector(getUsersState, fromUsers.getIndexFilteredMarkers);
export const getUsersAnalyticsFilteredMarker = createSelector(getUsersState, fromUsers.getAnalyticFilteredsMarkers);
export const getUsersIndexAll = createSelector(getUsersState, fromUsers.getIndexAll);
export const getUsersAnalyticsAll = createSelector(getUsersState, fromUsers.getAnalyticsAll);
export const getUsersMarkersPage = createSelector(getUsersState, fromUsers.getMarkerPage);
/**
 * Segment selectors
 */
export const getSegmentsState = createFeatureSelector<fromSegments.State>('segments');
export const getSegmentsSelectedId = createSelector(getSegmentsState, fromSegments.getSelectedId);
export const getSegmentsResetMapId = createSelector(getSegmentsState, fromSegments.getResetMapId);

/**
 * Query selectors
 */
export const getQueryState = createFeatureSelector<fromQuery.State>('query');
export const getQueryPlacelineId = createSelector(getQueryState, fromQuery.getPlacelineId);
export const getQueryUserQuery = createSelector(getQueryState, fromQuery.getUsersQuery);
export const getQueryUserId = createSelector(getQueryState, fromQuery.getUsersId);

/**
 *
 * Loading selectors.
 */
export const getLoadingState = createFeatureSelector<fromLoading.State>('loading');
export const getLoadingUserData = createSelector(getLoadingState, fromLoading.getUserData);
export const getLoadingAnalytics = createSelector(getLoadingState, fromLoading.getUserAnalytics);
export const getLoadingUserIndex = createSelector(getLoadingState, fromLoading.getUserIndex);
export const getLoadingUserAnalyticsAll = createSelector(getLoadingState, fromLoading.getUserAnalyticsAll);
export const getLoadingUserIndexAll = createSelector(getLoadingState, fromLoading.getUserIndexAll);

