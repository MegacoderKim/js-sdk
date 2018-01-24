import {
  IPageData,
  HtLocation,
  GeoJson,
  ITimeAwarePoint,
  IPlace
} from "./common";
import { IEvent, ITimelineEvent } from "./event";
import { IAction } from "./action";

export interface IUserPage extends IPageData {
  results: IUser[];
}

export interface IUser {
  created_at: string;
  id: string;
  lookup_id: string;
  group_id: string;
  phone: string | null;
  photo: string | null;
  name: string;
  vehicle_type: string;
  availability_status: string;
  last_location: HtLocation | null;
  last_heartbeat_at: string | null;
  last_online_at: string | null;
  display: {
    status_text: string;
    sub_status_text: string;
    activity_text?: string;
    has_new_sdk: boolean;
    is_warning: boolean;
    seconds_elapsed_since_last_heartbeat: number;
    battery: number;
  };
}

export interface IUserData extends IUser {
  segments: ISegment[];
  events: ITimelineEvent[];
  actions: IAction[];
  timeline_date: string;
  pending_actions: string[];
  last_battery: number | null;
  location_status: string;
}

export interface ISegment {
  id: string;
  user_id: string;
  started_at: string;
  ended_at: string;
  place?: IPlace;
  duration: number;
  // start_location: HtLocation,
  // end_location: HtLocation,
  location?: HtLocation;
  type: "stop" | "trip" | "location_void";
  distance?: number;
  display?: string;
  encoded_polyline?: string;
  time_aware_polyline?: string;
  vehicle_type?: string;
  displayColor?: string;
  trip_id?: string;
  activity?: string;
}

export interface IUserMap {
  id: string;
  name: string;
  photo: string;
  last_location: null | HtLocation;
  availability_status: string;
  display: {
    status_text: string;
    sub_status_text: string;
  };
}

export interface IUserAnalytics {
  id: string;
  name: string;
  photo: string;
  status: string;
  last_heartbeat_at: string;
  num_trips: number;
  num_places: number;
  total_distance: number;
  total_duration: number;
  stop_duration: number | null;
  num_actions: number;
  location_disabled_duration: null | number;
  network_offline_duration: null | number;
  has_new_sdk: boolean;
  last_location: HtLocation | null;
  display: {
    activity_text: string;
    status_text: string;
    sub_status_text: string;
    has_new_sdk: boolean;
    is_warning: boolean;
  };
}

export interface IUserAnalyticsPage extends IPageData {
  results: IUserAnalytics[];
}

export interface IUserListSummary {
  num_users: number;
  total_duration: number;
  stop_duration: number;
  location_disabled_duration: number;
  num_actions: number;
  total_distance: number;
  num_trips: number;
  network_offline_duration: number;
  num_places: number;
  status_overview: {
    location_disabled: number;
    logged_off: number;
    at_place: number;
    on_trip: number;
    network_offline: number;
  };
}

export interface IUserMapPage extends IPageData {
  results: IUserMap[];
}

export interface IListFilter {
  name: string;
  query: Object;
}

export interface IUserPlace {
  id: string;
  name: string;
  photo: string;
  display: {
    activity_text: string;
    status_text: string;
    sub_status_text: string;
    has_new_sdk: string;
    is_warning: string;
  };
  places: IPlace[];
}

export interface IPlaceHeat {
  place__location: number[];
  place_id: string;
  num_stops: number;
  intensity: number;
}

export interface IUserPlacePage extends IPageData {
  results: IUserPlace[];
}
export interface IPlaceHeatPage extends IPageData {
  results: IPlaceHeat[];
}

export interface IDecodedSegment extends Partial<ISegment> {
  startPercent: number;
  endPercent: number;
  timeAwareArray?: ITimeAwarePoint[];
  start?: number;
  end?: number;
  bearing?: number;
  position?: number[];
  durationSeg: number;
  pstart?: string;
  pend?: string;
}

export interface IUserDevice {
  user_id: string,
  recorded_at: string,
  time_zone: string,
  sdk_version: string,
  device_model: string,
  device_manufacturer: string,
  os_name: string,
  os_version: string,
  device_id: string,
  has_play_services: string,
  play_services_version: string,
  app_version: string,
  app_package_name: string
}
// export type IUserData = IUserData
