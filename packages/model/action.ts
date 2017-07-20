import {IPageData, HtLocation, GeoJson, IPlace} from "./common";
import {IUser} from "./user";

export interface IAction {
    id: string;
    user: IUser;
    display: {
        status_text: string;
        sub_status_text: string;
        duration_remaining: number;
        show_summary: boolean;
        is_late: boolean;
        ended_at: null | string,
    };
    lookup_id: string;
    assigned_at: string;
    distance: number | null,
    duration: number | null,
    created_at: string;
    completed_place: IPlace;
    completed_at: string | null;
    suspended_at: string | null;
    canceled_at: string | null;
    expected_place: IPlace;
    initial_eta: string;
    eta: string;
    status: string;
    expected_at: string | null;
    type: string;
    tracking_url: string;
    encoded_polyline: string;
    event_flags: string[];
    metadata: object
}


export interface IActionMap {
    id: string,
    lookup_id: string,
    type: string,
    status: string,
    expected_place: {
        location: GeoJson
    } | null,
    expected_at: string | null,
    eta: string | null,
    initial_eta: string | null,
    completed_at: string | null,
    completed_place: {
        location: GeoJson
    } | null,
    display: {
        status_text: string,
        sub_status_text: string,
        duration_remaining: number,
        show_summary: boolean,
      is_late: boolean
    },
    user: {
        id: string,
        name: string
    }
}

export interface IActionHeat {
  completed_place_id: string,
  completed_place__location: [number, number],
  num_actions: number
}

export interface IActionHeatPage extends IPageData{
  results: IActionHeat[]
}

export interface IActionPage extends IPageData {
    results: IAction[]
}

export interface IActionMapPage extends IPageData {
    results: IActionMap[]
}
