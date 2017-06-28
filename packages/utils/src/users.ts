import {GetDateRangeQuery} from "./time-utils";
import * as _ from "underscore";
import {IUserAnalytics} from "../model/user";

const statusString = {
  at_place: 'At place',
  on_trip: 'On trip',
  logged_off: 'Logged off',
  "location_disabled,network_offline": 'Error',
  "location_disabled": 'Location disabled',
  "network_offline": 'Network offline'
};

const sortingString = {
  num_trips: 'Trips',
  name: 'Name',
  status: 'Status',
  num_places: 'Places',
  total_distance: 'Distance',
  total_duration: 'Duration',
  location_disabled_duration: 'Location disabled',
  network_offline_duration: 'Network offline',
  num_actions: 'Actions',
  last_heartbeat_at: 'Last updated'
};

const userMarkerFilterMap = {
  at_place: (user: IUserAnalytics) => {
    return user.status == 'at_place'
  },
  on_trip: (user: IUserAnalytics) => {
    return user.status == 'on_trip'
  },
  logged_off: (user: IUserAnalytics) => {
    return user.status == 'logged_off'
  },
  "location_disabled": (user: IUserAnalytics) => {
    return user.status == 'location_disabled'
  },
  "network_offline": (user: IUserAnalytics) => {
    return user.status == 'network_offline'
  },
};

export function  GetUserStatusString(status) {
  if(status.split(',').length == 4) return 'Fit to map';
  return statusString[status] || status
};

export function GetUserSortingString(sorting: string) {
  return sortingString[sorting] || sorting;
}

export function GetUserDateRangeQuery(query) {
  return GetDateRangeQuery(query, 'recorded_at');
}

export function GetUserMarkerSeached(key: string) {
  return (user: IUserAnalytics) => user.name.indexOf(key) > -1;
}

export function GetUserMarkerFilter(key?: string) {
  let filter = userMarkerFilterMap[key];
  if(key) {
    if(filter) {
      return filter;
    } else {
      return () => false
    }
  } else {
    return () => true
  }
}

const UserSortings = [
  'num_trips',
  'name',
  'status',
  'num_places',
  'total_distance',
  'total_duration',
  'location_disabled_duration',
  'network_offline_duration',
  'num_actions',
  'last_heartbeat_at'
];

const UserFilters = [
  { status: 'at_place'},
  { status: 'on_trip'},
  { status: 'logged_off'},
  { status: 'location_disabled'},
  { status: 'network_offline'}
];

export const GetUserFiltersMap = _.map(UserFilters, (filter: object) => {
  let key = Object.keys(filter)[0];
  return {
    query: filter,
    label: GetUserStatusString(filter[key])
  }
});

export const GetUserSortingMap = _.map(UserSortings, (sort: string) => {
  let label = sortingString[sort] || sort;
  return {
    key: sort,
    label
  }
});
