import {ActionReducerMap} from "../store/models";
import {combineReducers} from "../store/utils";
import { Action, ActionReducer } from "../store/models";
import {createFeatureSelector, createSelector, MemoizedSelector} from "../store/selector";
import * as fromUsers from "./user-reducer";
import * as fromSegments from "./segments-reducer";
import * as fromQuery from "./query-reducer";
import {IUserData, IUser, IUserAnalytics } from "ht-models"
import {ApiType, AllData} from "../interfaces"

export interface State {
  users: fromUsers.State,
  segments: fromSegments.State,
  query: fromQuery.State
};

export const reducers: ActionReducerMap<State> = {
  users: fromUsers.usersReducer,
  segments: fromSegments.segmentsReducer,
  query: fromQuery.queryReducer,
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
export const getUsersAnalyticsPage = createSelector(getUsersState, fromUsers.getAnalyticsPage);
export const getUsersListApiType = createSelector(getUsersState, fromUsers.getListApiType);
export const getUsersListActive = createSelector(getUsersState, fromUsers.getListActive);
export const getUsersIndexIsActive = createSelector(getUsersState, fromUsers.getIndexActive);
export const getUsersAnalyticsIsActive = createSelector(getUsersState, fromUsers.getAnalyticsActive);
export const getUsersIndexMarkersIsActive = createSelector(getUsersState, fromUsers.getIndexMarkersActive);
export const getUsersAnalyticsMarkersIsActive = createSelector(getUsersState, fromUsers.getAnalyticsMarkersActive);
export const getUsersIndexFilteredMarker = createSelector(getUsersState, fromUsers.getIndexFilteredMarkers);
export const getUsersAnalyticsFilteredMarker = createSelector(getUsersState, fromUsers.getAnalyticFilteredsMarkers);
/**
 * Segment selectors
 */
export const getSegmentsState = createFeatureSelector<fromSegments.State>('segments');

/**
 * Query selectors
 */
export const getQueryState = createFeatureSelector<fromQuery.State>('query');
export const getQueryPlacelineId = createSelector(getQueryState, fromQuery.getPlacelineId);
export const getQueryUserQuery = createSelector(getQueryState, fromQuery.getUsersQuery);
export const getQueryUserId = createSelector(getQueryState, fromQuery.getUsersId);