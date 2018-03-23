import * as fromUi from "./ui";
import * as fromUser from "./user";
import * as fromAction from "./action";
import * as fromAccountUser from "./account-user";
import * as fromReplay from "./replay";
import * as fromQuery from "./query";
import {ActionReducer, ActionReducerMap, combineReducers, createFeatureSelector, MetaReducer} from "@ngrx/store";
import {compose, createSelector} from "@ngrx/store";
import {storeFreeze} from "ngrx-store-freeze";
import {environment} from "../../environments/environment";
// import {createSelector} from "reselect";

export interface State {
    ui: fromUi.State,
    user: fromUser.State,
    accountUser: fromAccountUser.State,
    action: fromAction.State,
    replay: fromReplay.State,
    query: fromQuery.State
};

export const reducers: ActionReducerMap<State> = {
    ui: fromUi.uiReducer,
    user: fromUser.userReducer,
    action: fromAction.actionReducer,
    accountUser: fromAccountUser.accountUserReducer,
    replay: fromReplay.replayReducer,
    query: fromQuery.queryReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];

const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  return productionReducer(state, action);
}


//ui
// export const getUiState = (state: State) => state.ui;
export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getUiShowPopup = createSelector(getUiState, fromUi.getPopup);
export const getUiShowMapMobile = createSelector(getUiState, fromUi.getShowMapMobile);
export const getUiLoadingMap = createSelector(getUiState, fromUi.getLoadingMap);
export const getUiShowFilter = createSelector(getUiState, fromUi.getShowFilter);

//accountUser
export const getAccountUser = createFeatureSelector<fromAccountUser.State>('accountUser');
export const getAccountUserCurrent = createSelector(getAccountUser, fromAccountUser.getAccountUser);
export const getAccountMemberships = createSelector(getAccountUser, fromAccountUser.getMemberships);
export const getCurrentAccount = createSelector(getAccountUser, fromAccountUser.getCurrentAccount);

export const getAccountUserCurrentMember = createSelector(getAccountUser, fromAccountUser.getMember);
export const getAccountUserLoading = createSelector(getAccountUser, fromAccountUser.getLoading);

//user
export const getUserState = createFeatureSelector<fromUser.State>('user');

export const getUserSelectedUserId = createSelector(getUserState, fromUser.getSelectedUserId);

export const getUserTimelineQuery = createSelector(getUserState, fromUser.getTimelineQuery);

export const getUserSegments = createSelector(getUserState, fromUser.getSegmentsArray);

export const getUserSelectedPartialSegments = createSelector(getUserState, fromUser.getSelectedPartialSegment);

export const getUserSelectedPartialSegmentId = createSelector(getUserState, fromUser.getSelectedPartialSegmentId);

export const getUserSelectedSegment = createSelector(getUserState, fromUser.getSelectedSegment);

export const getUserSelectedEventId = createSelector(getUserState, fromUser.getSelectedEventId);

export const getUserSelectedActionId = createSelector(getUserState, fromUser.getSelectedActionId);

export const getUserMapList = createSelector(getUserState, fromUser.getFilteredMapArray);

// export const getUserInvalidMarker = createSelector(getUserState, fromUser.getInvalidMarker);

export const getUserData = createSelector(getUserState, fromUser.getUserDate);

export const getCurrentUserData = createSelector(getUserState, fromUser.getCurrentUserData);

export const getUserSummary = createSelector(getUserState, fromUser.getSummary);

export const getUserPageData = createSelector(getUserState, fromUser.getPageData);

export const getUserPlaceList = createSelector(getUserState, fromUser.getFilteredPlaceArray);

export const getSelectedUserPlaces = createSelector(getUserState, fromUser.getSelectedUserPlace)



//action
export const getActionState = createFeatureSelector<fromAction.State>('action');

export const getActionMapList = createSelector(getActionState, fromAction.getFilteredMapArray);

export const getActionPageData = createSelector(getActionState, fromAction.getPageData);

export const getActionSummary = createSelector(getActionState, fromAction.getSummary);

export const getActionGraph = createSelector(getActionState, fromAction.getGraph);

export const getActionHeat = createSelector(getActionState, fromAction.getActionsHeat);

export const getActionFilteredHeat = createSelector(getActionState, fromAction.getFilteredActionsHeat);

//replay

export const getReplayState = createFeatureSelector<fromReplay.State>('replay');

export const getReplayStatsState = createSelector(getReplayState, fromReplay.getStats);

export const getReplayHeadState = createSelector(getReplayState, fromReplay.getHead);

export const getReplaySpeedState = createSelector(getReplayState, fromReplay.getSpeed);

export const getReplayIsPlayingState = createSelector(getReplayState, fromReplay.getIsPlaying);

//query

export const getQueryState = createFeatureSelector<fromQuery.State>('query');

export const getQueryEntity = createSelector(getQueryState, fromQuery.getEntityQuery);

export const getQueryShowDetail = createSelector(getQueryState, fromQuery.getShowDetailQuery);

export const getQueryView = createSelector(getQueryState, fromQuery.getViewQuery);

export const getQueryUserListQuery = createSelector(getQueryState, fromQuery.getUserListQuery);
export const getQueryUserListDateQuery = createSelector(getQueryState, fromQuery.getUserListDateQuery);
export const getQueryUserPageQuery = createSelector(getQueryState, fromQuery.getUserPageQuery);
export const getQueryUserPageDateQuery = createSelector(getQueryState, fromQuery.getUserListDateQuery);
export const getQueryUserSorting = createSelector(getQueryState, fromQuery.getUserOrdering);

export const getQueryActionListQuery = createSelector(getQueryState, fromQuery.getActionListQuery);
export const getQueryActionListDateQuery = createSelector(getQueryState, fromQuery.getActionListDateQuery);
export const getQueryActionPageQuery = createSelector(getQueryState, fromQuery.getActionPageQuery);
export const getQueryActionSorting = createSelector(getQueryState, fromQuery.getActionOrdering);

export const getQueryDateRange = createSelector(getQueryState, fromQuery.getDateRangeQuery);

export const getQueryUserQuery = createSelector(getQueryState, fromQuery.getUserQuery);

export const getQueryActionQuery = createSelector(getQueryState, fromQuery.getActionQuery);

export const getQueryLoading = createSelector(getQueryState, fromQuery.getLoadingQuery);
