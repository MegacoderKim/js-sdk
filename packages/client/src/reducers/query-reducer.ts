import * as QueryDispatch from "../dispatchers/query-dispatcher";
import {IDateRange} from "../interfaces"
const initialState: State = {

};

export interface State {
  userQuery?: object | null,
  dateRange?: IDateRange
  placelineId?: string | null,
  userId?: string | null
}

export function queryReducer(state: State = initialState, action : QueryDispatch.All): State {
  switch (action.type) {
    case QueryDispatch.SET_DATE_RANGE: {
      return {...state, dateRange: action.payload}
    }
    case QueryDispatch.SET_USER_QUERY: {
      return {...state, userQuery: action.payload}
    }
    case QueryDispatch.SET_PLACELINE_ID: {
      return {...state, placelineId: action.payload}
    }
    case QueryDispatch.SET_USER_ID: {
      return {...state, userId: action.payload}
    }
    default: {
      return state
    }
  }
}

export const getPlacelineId = (state: State) => state.placelineId;