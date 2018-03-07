import { IPageData, HtLocation, GeoJson, IPlace } from "./common";
import { IUser } from "./user";
import { ITimeAwarePoint } from "./ht-models";

export interface IAction {
  id: string;
  user: IUser;
  // user_id: string;
  display: {
    status_text: string;
    sub_status_text: string;
    duration_remaining: number;
    show_summary: boolean;
    is_late: boolean;
    ended_at: null | string;
    duration_elapsed: number;
    distance_remaining: string | null;
  };
  unique_id: string;
  lookup_id: string;
  assigned_at: string;
  distance_to_arrival: null | number,
  distance: number | null;
  duration: number | null;
  created_at: string;
  started_at: string;
  started_place: IPlace,
  completed_place: IPlace;
  ended_at: string | null;
  latest_activity: null;
  latest_health: null | {

  },
  latest_locations: null | any[],
  // suspended_at: string | null;
  // canceled_at: string | null;
  expected_place: IPlace;
  eta_at_creation: string;
  eta: string;
  status: string;
  expected_at: string | null;
  type: string;
  tracking_url: string;
  // short_code: string;
  // time_aware_polyline: string,
  // encoded_polyline: string;
  // event_flags: string[];
  metadata: object[];
  // account?: any
}

export interface IActionMap {
  id: string;
  lookup_id: string;
  type: string;
  status: string;
  created_at: string;
  expected_place: {
    location: GeoJson;
  } | null;
  expected_at: string | null;
  eta: string | null;
  initial_eta: string | null;
  completed_at: string | null;
  completed_place: {
    location: GeoJson;
  } | null;
  display: {
    status_text: string;
    sub_status_text: string;
    duration_remaining: number;
    show_summary: boolean;
    is_late: boolean;
  };
  user: {
    id: string;
    name: string;
  };
}

export interface IActionHeat {
  completed_place_id: string;
  completed_place__location: [number, number];
  num_actions: number;
}

export interface IActionHeatPage extends IPageData {
  results: IActionHeat[];
}

export interface IActionPage extends IPageData {
  results: IAction[];
}

export interface IActionMapPage extends IPageData {
  results: IActionMap[];
}

export interface IActionStatusGraph {
  created_date: string,
  created: number,
  completed: number,
  assigned: number,
  started: number
}

export interface IActionsSummary {
  created: number,
  assigned: number,
  started: number,
  completed: number,
  suspended: number,
}

export interface ITrackAction {
    user: IUser,
    actions: IAction[],
    account: {
      logo: string | null
    }
};

export interface IActionPolyline {
  id: string,
  unique_id: string,
  status: string,
  updated_at: string,
  distance: number,
  encoded_polyline: string,
  time_aware_polyline: string,
  shortest_distance: number,
  shortest_polyline: string
};

export interface IActionWithPolyline extends IAction {
  encoded_polyline: string,
  time_aware_polyline: string,
  shortest_distance: number,
  shortest_polyline: string
};

export interface IActionMod extends IActionWithPolyline {
  timeAwarePath: ITimeAwarePoint[]
}
