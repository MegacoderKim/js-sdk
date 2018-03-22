import * as fromAction from "../actions/action";
import {IActionHeat, IActionMap, IAction} from "ht-models";
import * as _ from 'underscore';
import { createSelector } from 'reselect';
import {IPageData} from "../model/common";

const initialState: State = {
  actionsMapEntity: {},
  selectedActionId: null,
  filterMap: () => true,
  filterHeatmap: () => true,
};

export interface State {
  actionsMapEntity: {
    [id: string]: IActionMap
  },
  selectedActionId: string | null,
  filterMap: (userMap: IActionMap) => boolean,
  pageData?: IPageData,
  summary?: object,
  graph?: object,
  actionHeatmaps?: IActionHeat[] | null
  filterHeatmap: (action?: IActionHeat) => boolean
}

export function actionReducer(state: State = initialState, action : fromAction.Actions): State {
  // console.log(action);
  switch (action.type) {
    case fromAction.SELECT_ACTION_ID: {
      return {...state, selectedActionId: action.payload}
    }
    case fromAction.CLEAR_ACTION: {
      return {...state, selectedActionId: null}
    }
    case fromAction.UPDATE_ACTION_MAP: {
      let actionsMapEntity = _.indexBy(action.payload, 'id');
      return {...state, actionsMapEntity: actionsMapEntity}
    }
    case fromAction.ADD_ACTIONS_MAP: {
      let actionsMapEntity = _.indexBy(action.payload, 'id');
      return {...state, actionsMapEntity: {...state.actionsMapEntity, ...actionsMapEntity}}
    }
    case fromAction.ADD_FILTER_ACTIONS_MAP: {
      let actionsArray = _.values(state.actionsMapEntity);
      let actions = _.reject(actionsArray, state.filterMap);
      // console.log(actionsArray.length, actions.length, action.payload.length);
      let actionsMapEntity = _.indexBy([...actions, ...action.payload], 'id');
      return {...state, actionsMapEntity: actionsMapEntity}
    }
    case fromAction.CLEAR_ACTIONS_MAP: {
      return {...state, actionsMapEntity: {}}
    }
    case fromAction.SET_ACTION_FILTER: {
      return {...state, filterMap: action.payload}
    }
    case fromAction.SET_PAGE_DATA: {
      return {...state, pageData: action.payload}
    }
    case fromAction.SET_ACTION_SUMMARY: {
      return {...state, summary: action.payload}
    }
    case fromAction.SET_ACTION_GRAPH: {
      return {...state, graph: action.payload}
    }
    case fromAction.SET_ACTION_HEATMAP: {
      return {...state, actionHeatmaps: action.payload}
    }
    case fromAction.UPDATE_ACTION_HEATMAP: {
      return {...state, actionHeatmaps: [...state.actionHeatmaps, ...action.payload]}
    }
    case fromAction.SET_FILTER_HEATMAP: {
      return {...state, filterHeatmap: action.payload}
    }
    case fromAction.CLEAR_ACTION_HEATMAP: {
      return {...state, actionHeatmaps: null}
    }
    default: {
      return state
    }
  }
}

export const getActionsMapEntity = (state: State) => state.actionsMapEntity;

export const getFilterMap = (state: State) => state.filterMap;

export const getFilteredMapArray = createSelector(
  getActionsMapEntity,
  getFilterMap,
  (actionsMapEntity, filterMap) => {
  return _.filter(actionsMapEntity, filterMap)
});

export const getPageData = (state: State) => state.pageData;

export const getSummary = (state: State) => state.summary;

export const getGraph = (state: State) => state.graph;

export const getActionsHeat = (state: State) => state.actionHeatmaps;

export const getActionHeatmapFilter = (state: State) => state.filterHeatmap;

export const getFilteredActionsHeat = createSelector(getActionsHeat, getActionHeatmapFilter, (actionHeatmap, filter) => {
  return _.filter(actionHeatmap, (action) => {
    return filter(action)
  })
});
