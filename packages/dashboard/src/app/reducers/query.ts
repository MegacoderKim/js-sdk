import * as fromQuery from "../actions/query";
import {IRange} from "../model/common";
import {createSelector} from "reselect";
import {endOfToday, startOfToday} from 'date-fns';

const initialState: State = {
    actionQueryParams: {},
    actionListQueryParams: {},
    actionPageQueryParams: {
        ordering: '-created_at'
    },
    userQueryParams: {},
    userListQueryParams: {},
    userPageQueryParams: {
        ordering: '-last_heartbeat_at'
    },
    dateRange: {
        start: startOfToday().toISOString(),
        end: endOfToday().toISOString(),
        isToday: true
    },
    view: 'list',
    showDetail: false,
    loading: true
    // entity: 'users'
};

export interface State {
    actionQueryParams: object,
    actionListQueryParams: object,
    actionPageQueryParams: object,
    userQueryParams: object,
    userListQueryParams: object,
    userPageQueryParams: object,
    dateRange: IRange,
    view: string,
    showDetail: boolean,
    entity?: 'actions' | 'users',
    loading: boolean
}

const defaultUserListQueryParams = {
    ordering: '-total_duration'
}

const defaultActionListQueryParams = {
    ordering: '-completed_at'
}

export function queryReducer(state: State = initialState, action : fromQuery.Actions): State {
    switch (action.type) {
        case fromQuery.CHANGE_VIEW: {
            return {...state, view: action.payload, loading: true}
        }
        case fromQuery.CHANGE_DATE_RANGE: {
            return {...state, dateRange: action.payload, loading: true}
        }
        case fromQuery.CHANGE_ENTITY: {
            return {...state, entity: action.payload, loading: true}
        }
        case fromQuery.UPDATE_USER_LIST_QUERY: {
            return {
                ...state,
                userListQueryParams: {...state.userListQueryParams, ...action.payload},
                userPageQueryParams: {...state.userPageQueryParams, page: null},
                loading: true
            }
        }
        case fromQuery.UPDATE_USER_PAGE_QUERY: {
            let page = action.payload['page'] || null;
            return {
                ...state,
                userPageQueryParams: {...state.userPageQueryParams, ...action.payload, page},
                loading: true
            }
        }
        case fromQuery.UPDATE_ACTION_LIST_QUERY: {
            return {
              ...state,
              actionListQueryParams: {...state.actionListQueryParams, ...action.payload},
              actionPageQueryParams: {...state.actionPageQueryParams, page: null},
              loading: true
          }
        }
        case fromQuery.UPDATE_ACTION_PAGE_QUERY: {
            let page = action.payload['page'] || null;
            return {
                ...state,
                actionPageQueryParams: {...state.actionPageQueryParams, ...action.payload},
                loading: true
            }
        }
        case fromQuery.SET_USER_LIST_QUERY: {
            return {
                ...state,
                userListQueryParams: { ...action.payload},
                userPageQueryParams: { ...state.userPageQueryParams, page: null},
                loading: true
            }
        }
        case fromQuery.SET_ACTION_LIST_QUERY: {
            return {
                ...state,
                actionListQueryParams: { ...action.payload},
                actionPageQueryParams: { ...state.actionPageQueryParams, page: null},
                loading: true
            }
        }
        case fromQuery.UPDATE_DATE_RANGE: {
            return {
                ...state,
                dateRange: {...action.payload, isToday: checkIsToday(action.payload)},
                actionPageQueryParams: {...state.actionPageQueryParams, page: null},
                userPageQueryParams: {...state.userPageQueryParams, page: null, last_location__bbox: null},
              userListQueryParams: {...state.userListQueryParams, status: null},
                loading: true
            }
        }
        case fromQuery.CLEAR_USER_QUERY_KEY: {
            let query = state.userListQueryParams;
            let key = action.payload;
            return {
                ...state,
                userListQueryParams: {...query, [key]: null},
                userPageQueryParams: {...state.userPageQueryParams, page: null},
                loading: true
            }
        }
      case fromQuery.CLEAR_USER_PAGE_QUERY_KEY: {
        let query = state.userPageQueryParams;
        let key = action.payload;
        return {
          ...state,
          userPageQueryParams: {...query, [key]: null},
          loading: true
        }
      }
        case fromQuery.CLEAR_ACTION_QUERY_KEY: {
            let query = state.actionListQueryParams;
            let key = action.payload;
            return {
                ...state,
                actionListQueryParams: {...query, [key]: null},
                actionPageQueryParams: {...state.actionPageQueryParams, page: null},
                loading: true
            }
        }
        case fromQuery.CLEAR_LOADING: {
            return {...state, loading: false}
        }

        case fromQuery.CHANGE_SHOW_DETAIL: {
            return {...state, showDetail: action.payload}
        }
        default: {
            return state
        }
    }
}

export const getViewQuery = (state: State) => state.view;

export const getEntityQuery = (state: State) => state.entity;

export const getShowDetailQuery = (state: State) => state.showDetail;

export const getUserListQuery = (state: State) => state.userListQueryParams;
export const getUserPageQuery = (state: State) => state.userPageQueryParams;
export const getActionListQuery = (state: State) => state.actionListQueryParams;
export const getActionPageQuery = (state: State) => state.actionPageQueryParams;
export const getDateRangeQuery = (state: State) => state.dateRange;
export const getLoadingQuery = (state: State) => state.loading;

export const getUserListDateQuery = createSelector(getDateRangeQuery, getUserListQuery, (dateRange, userListQueryParams) => {
    return {...userListQueryParams, start: dateRange.start, end: dateRange.end}
})

export const getUserQuery =  createSelector(getDateRangeQuery, getUserListQuery, getUserPageQuery, (dateRange, userListQueryParams, userPageQuery) => {
    // let page = userPageQuery['page'] ? {...userPageQuery, page: userPageQuery['page']} : {...userPageQuery};
    return {...userListQueryParams, start: dateRange.start, end: dateRange.end, ...userPageQuery}
});

export const getUserOrdering = createSelector(getUserPageQuery, (pageQuery: object) => getOrdering(pageQuery));

export const getActionOrdering = createSelector(getActionPageQuery, (pageQuery) => getOrdering(pageQuery) );

function getOrdering (pageQuery) {
  let ordering = pageQuery['ordering'];
  if(ordering) {
    let hasSign = ordering.indexOf('-') > -1;
    return {
      type: hasSign ? ordering.substring(1) : ordering,
      sign: !hasSign
    }
  } else {
    return null
  }
}

export const getActionQuery = createSelector(getDateRangeQuery, getActionListQuery, getActionPageQuery, (dateRange, actionListQueryParams, actionPageQueryParams) => {
    return {...actionListQueryParams, start: dateRange.start, end: dateRange.end, ...actionPageQueryParams}
});

export const getActionListDateQuery = createSelector(getDateRangeQuery, getActionListQuery, (dateRange, actionListQueryParams) => {
    return {...actionListQueryParams, start: dateRange.start, end: dateRange.end}
});

export  const getUserPageDateQuery = createSelector(getDateRangeQuery, getActionPageQuery, (dateRange, actionPageQueryParams) => {
  return {...actionPageQueryParams, start: dateRange.start, end: dateRange.end}
});
function checkIsToday(range:IRange): boolean {
    return (range.start == startOfToday().toISOString() && range.end == endOfToday().toISOString())
}
