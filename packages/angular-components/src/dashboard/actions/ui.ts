import { Action } from '@ngrx/store';
import {type} from "./utils";

export const UPDATE_POPUP = '[UI] Update Popup';
export const HIDE_POPUP = '[UI] Hide Popup';
export const UPDATE_MAP = '[UI] Show Map';
export const HIDE_MAP = '[UI] Hide Map';
export const UPDATE_MAP_MOBILE = '[UI] Show Map Mobile';
export const HIDE_MAP_MOBILE = '[UI] Hide Map mobile';
export const LOADING_UI_MAP = '[UI] Loading UI Map';
export const UPDATE_SHOW_FILTER = '[UI} Update Show Filter';
export const UPDATE_VIEW = '[UI] Update View';

export class UpdatePopupShowAction implements Action {
    readonly type = UPDATE_POPUP;
    constructor(public payload: boolean) { }

}

export class UpdateMapShowAction implements Action {
    readonly type = UPDATE_MAP;
    constructor(public payload: boolean) { }

}

export class UpdateMapMobileShowAction implements Action {
    readonly type = UPDATE_MAP_MOBILE;
    constructor(public payload: boolean) { }

}

export class LoadingMapUiAction implements Action {
    readonly type = LOADING_UI_MAP;

    constructor(public payload: boolean) {}
}

export class UpdateViewUiAction implements Action {
    readonly type = UPDATE_VIEW;

    constructor(public payload: boolean) {}
}

export class UpdateShowFilterUiAction implements Action {
    readonly type = UPDATE_SHOW_FILTER;

    constructor(public payload: boolean) {}
}

export type Actions
    = UpdatePopupShowAction
    | UpdateMapShowAction
    | UpdateMapMobileShowAction
    | LoadingMapUiAction
    | UpdateShowFilterUiAction
    | UpdateViewUiAction


