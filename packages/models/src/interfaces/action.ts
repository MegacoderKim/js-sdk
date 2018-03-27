import { IPageData, HtLocation, GeoJson, IPlace } from "./common";
import { IUser } from "./user";
import { ITimeAwarePoint } from "./common";
import {IPlaceline} from "./placeline";

export interface IAction {
  id: string;
  user: {
    created_at: string,
    group_id: string | null,
    id: string,
    is_tracking: boolean,
    name: string | null,
    phone: string | null,
    photo: string | null,
    unique_id: string | null,
    display: {
      last_updated_text: string,
      status_text: string,
      is_warning: boolean
      warning_since_text: string,
    }
    vehicle_type: string
  };
  // user_id: string;
  display: {
    status_text: string;
    sub_status_text: string;
    duration_remaining: number;
    // show_summary: boolean;
    is_late: boolean;
    // ended_at: null | string;
    duration_elapsed: number;
    distance_remaining: string | null;
  };
  unique_id: string;
  lookup_id: string;
  arrival_status: string,
  // assigned_at: string;
  distance_to_arrival: null | number,
  distance: number | null;
  duration: number | null;
  created_at: string;
  started_at: string;
  started_place: IPlace,
  completed_place: IPlace;
  completed_at: string | null;
  activity: null | {
    type: string,
    distance: number,
    duration: number,
    step_count: number,
    started_at: string
  };
  health: null | {
    battery_percentage: number,
    network_status: string,
    location_status: string,
    battery_status: string
  },
  location: null | HtLocation,
  place?: IPlace,
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
  route: string,
  expected_route: string,
  location_time_series: string,
  event_flags: string[];
  metadata: object;
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

export interface IActionWithPolyline extends IAction {
  timeAwarePath?: ITimeAwarePoint[]
};

export interface IActionMod extends IActionWithPolyline {
  timeAwarePath: ITimeAwarePoint[]
}

export interface IActionPlaceline extends IAction {
  placeline: IPlaceline[]
}
