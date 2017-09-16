import {ActionReducerMap} from "../store/models";
import {combineReducers} from "../store/utils";
import { Action, ActionReducer } from "../store/models";
import {createFeatureSelector, createSelector, MemoizedSelector} from "../store/selector";

export interface UiState {
  a?: string,
  b?: string
}

export function UiReducer(state: UiState = {}, action: any): UiState {
  console.log(action);
  switch (action['type']) {
    case "setA":
      return {...state, a: action['payload']};
    case "setB":
      return {...state, b: action['payload']};
    default: {
      return state
    }
  }
}

export interface State {
  ui: UiState
};

export const reducers: ActionReducerMap<State> = {
  ui: UiReducer,
};


export function reducer(state: any, action: any) {
  return combineReducers(reducers)
}

export const metaReducers: ActionReducer<any, any>[] = [];

export const getUiState = createFeatureSelector<UiState>('ui');

export const getUiAState = createSelector(getUiState, (state: UiState) => state.a);