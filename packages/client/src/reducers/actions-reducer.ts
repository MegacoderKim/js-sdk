import * as ActionsDispatcher from "../dispatchers/actions-dispatcher";
import { IAction, IActionHeatPage, IActionStatusGraph, Page, IActionsSummary, AllData } from "ht-models";
import { createSelector, MemoizedSelector } from "../store/selector";
import * as _ from "underscore";

export interface State {
  list: Page<IAction> | null,
  listLoading: boolean | string,
  listQuery: object,
  listActive: string | boolean,

  listAll: AllData<IAction> | null,
  listAllLoading: boolean,
  listAllActive: boolean | string,
  listAllDataMap?: (data) => any,
  summary: IActionsSummary | null,
  summaryActive: boolean | string,
  summaryLoading: boolean
  summaryQuery: object,

  graph: IActionStatusGraph[] | null,
  graphLoading: boolean,
  graphQuery: object,
  graphActive: boolean
};

export const initialState: State = {
  list: null,
  listLoading: false,
  listQuery: {},
  listActive: false,

  listAll: null,
  listAllLoading: false,
  listAllActive: false,

  summary: null,
  summaryActive: false,
  summaryLoading: false,
  summaryQuery: {},

  graph: null,
  graphLoading: false,
  graphQuery: {},
  graphActive: false
};

export function actionsReducer(
  state: State = initialState,
  action: ActionsDispatcher.All
): State {
  switch (action.type) {
    /*
    list
     */
    case ActionsDispatcher.SET_ACTIONS_LIST: {
      return { ...state, list: action.payload };
    }
    case ActionsDispatcher.SET_ACTIONS_LIST_ACTIVE: {
      return { ...state, listActive: action.payload };
    }
    case ActionsDispatcher.SET_ACTIONS_LIST_QUERY: {
      return { ...state, listQuery: action.payload };
    }
    case ActionsDispatcher.CLEAR_ACTION_QUERY_KEY: {
      let listQuery = { ...state.listQuery };
      if (listQuery) delete listQuery[action.payload];
      return { ...state, listQuery: listQuery };
    }
    case ActionsDispatcher.ADD_ACTIONS_LIST_QUERY: {
      const listQuery = {...state.listQuery, ...action.payload};
      return { ...state, listQuery };
    }
    case ActionsDispatcher.SET_ACTIONS_LIST_LOADING: {
      return { ...state, listLoading: action.payload };
    }
    /*
    List all
     */
    case ActionsDispatcher.SET_ACTIONS_LIST_ALL: {
      const listAllPage = action.payload;
      if (listAllPage) {
        return {
          ...state,
          listAll: {
            count: listAllPage.count,
            next: listAllPage.next,
            previous: listAllPage.previous,
            resultsEntity: _.indexBy(listAllPage.results, 'id')
          }
        }
      } else {
        return {
          ...state,
          listAll: null
        }
      }

    }
    case ActionsDispatcher.SET_ACTIONS_LIST_ALL_ACTIVE: {
      return {...state, listAllActive: action.payload}
    }
    case ActionsDispatcher.SET_ACTIONS_LIST_ALL_LOADING: {
      return {...state, listAllLoading: action.payload}
    }
    case ActionsDispatcher.SET_ACTIONS_LIST_ALL_DATA_MAP: {
      return { ...state, listAllDataMap: action.payload };
    }
    /*
    Summary
     */
    case ActionsDispatcher.SET_ACTIONS_SUMMARY: {
      return { ...state, summary: action.payload };
    }
    case ActionsDispatcher.SET_ACTIONS_SUMMARY_LOADING: {
      return { ...state, summaryLoading: action.payload };
    }
    case ActionsDispatcher.SET_ACTIONS_SUMMARY_ACTIVE: {
      return { ...state, summaryActive: action.payload };

    }
    case ActionsDispatcher.SET_ACTIONS_SUMMARY_QUERY: {
      return { ...state, summaryQuery: action.payload };

    }
    case ActionsDispatcher.ADD_ACTIONS_SUMMARY_QUERY: {
      const summaryQuery = {...state.summaryQuery, ...action.payload};
      return { ...state, summaryQuery };
    }
    /*
    Graph
     */
    case ActionsDispatcher.SET_ACTIONS_GRAPH: {
      return {...state, graph: action.payload}
    }
    case ActionsDispatcher.SET_ACTIONS_GRAPH_LOADING: {
      return {...state, graphLoading: action.payload}
    }
    case ActionsDispatcher.SET_ACTIONS_GRAPH_QUERY: {
      return {...state, graphQuery: action.payload}
    }
    case ActionsDispatcher.ADD_ACTIONS_GRAPH_QUERY: {
      const graphQuery = {...state.graphQuery, ...action.payload};
      return {...state, graphQuery}
    }
    case ActionsDispatcher.SET_ACTIONS_GRAPH_ACTIVE: {
      return {...state, graphActive: action.payload}
    }
    default: {
      return state;
    }
  }
};

export const getList = (state: State) => state.list;
export const getListLoading = (state: State) => state.listLoading;
export const getListActive = (state: State) => state.listActive;
export const getListQuery = (state: State) => state.listQuery;

export const getListAll = (state: State) => state.listAll;
export const getListAllLoading = (state: State) => state.listAllLoading;
export const getListAllActive = (state: State) => state.listAllActive;
export const getListAllDataMap = (state: State) => state.listAllDataMap;
export const getListAllFiltered = createSelector(getListAll, getListAllDataMap, (listAll, dataMap) => {
  return dataMap && listAll ? dataMap(listAll) : listAll;
});

export const getSummary = (state: State) => state.summary;
export const getSummaryActive = (state: State) => state.summaryActive;
export const getSummaryQuery = (state: State) => state.summaryQuery;
export const getSummaryLoading = (state: State) => state.summaryLoading;

export const getGraph = (state: State) => state.graph;
export const getGraphQuery = (state: State) => state.graphQuery;
export const getGraphLoading = (state: State) => state.graphLoading;
export const getGraphActive = (state: State) => state.graphActive;