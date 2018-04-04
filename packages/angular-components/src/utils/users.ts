import {GetDateRangeQuery} from "./time-utils";
import * as _ from "underscore";
import {IUserAnalytics} from "ht-models";
import {htUser} from "ht-data";

export function  GetUserStatusString(status) {
  return htUser().statusQueryMap[status] || status
};

export function GetUserSortingString(sorting: string) {
  return htUser().sortingQueryMap[sorting] || sorting;
}

export function GetUserDateRangeQuery(query) {
  return GetDateRangeQuery(query, 'recorded_at');
}

export function GetUserMarkerSeached(key: string) {
  return (user: IUserAnalytics) => user.name.indexOf(key) > -1;
}

export function GetUserMarkerFilter(key?: string) { //todo use htUser().getMarkerFilter
  let filter = htUser().markerFilterMap[key];
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

const UserFilters = [
  { status: 'stopped'},
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

let sortingQueryMap = {
  // num_trips: 'Trips',
  name: 'Name',
  status: 'Status',
  total_distance: 'Distance',
  total_duration: 'Duration',
  // stop_duration: 'Stop duration',
  location_disabled_duration: 'Location disabled',
  network_offline_duration: 'Network offline',
  num_actions: 'Actions',
  last_heartbeat_at: 'Last updated'
};

let sortings = Object.keys(sortingQueryMap);
export const GetUserSortingMap = _.map(sortings, (sort: string) => {
  let label = sortingQueryMap[sort] || sort;
  return {
    key: sort,
    label
  }
});
