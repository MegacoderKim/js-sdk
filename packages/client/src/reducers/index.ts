import {ActionReducerMap} from "../store/models";
import {combineReducers} from "../store/utils";
import { Action, ActionReducer } from "../store/models";
import {createFeatureSelector, createSelector, MemoizedSelector} from "../store/selector";
import * as fromUsers from "./user-reducer";
import * as fromSegments from "./segments-reducer";
import * as fromQuery from "./query-reducer";
import {IUserData } from "ht-models"
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

/**
 * Segment selectors
 */
export const getSegmentsState = createFeatureSelector<fromSegments.State>('segments');

/**
 * Query selectors
 */
export const getQueryState = createFeatureSelector<fromQuery.State>('query');

export const getQueryPlacelineId = createSelector(getQueryState, fromQuery.getPlacelineId);