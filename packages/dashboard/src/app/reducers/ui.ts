import * as ui from '../actions/ui';

const initialState: State = {
    showPopup: false,
    showMap: false,
    showMapMobile: false,
    loadingMapData: false,
    mapView: false,
  showFilter: true
};

export interface State {
    showPopup: boolean,
    showMap: boolean,
    showMapMobile: boolean,
    loadingMapData: boolean,
    mapView: boolean,
  showFilter: boolean
}

export function  uiReducer(state: State = initialState, {type, payload} : ui.Actions): State {
    // console.log(type, payload);
    switch (type) {
        case ui.UPDATE_POPUP: {
            return {...state, showPopup: payload}
        }
        case ui.UPDATE_MAP: {
            return {...state, showMap: payload}
        }
        case ui.UPDATE_MAP_MOBILE: {
          return {...state, showMapMobile: payload}
        }
        case ui.LOADING_UI_MAP: {
          return {...state, loadingMapData: payload}
        }
        case ui.UPDATE_VIEW: {
            return {...state, mapView: payload}
        }
      case ui.UPDATE_SHOW_FILTER: {
        return {...state, showFilter: payload}
      }
        // case ui.UPDATE_VIEW: {
        //     return {...state, view: payload}
        // }

        default: {
            return state
        }
    }
}

export const getPopup = (state: State) => state.showPopup;
export const getLoadingMap = (state: State) => state.loadingMapData;
export const getShowMapMobile = (state: State) => state.showMapMobile;
export const getShowFilter = (state: State) => state.showFilter;
