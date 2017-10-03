import {BaseFilter} from "./base-filter";
import {Color} from "ht-js-utils";

export class DefaultUsersFilter extends BaseFilter {

  statusQueryArray = [
    {
      label: "Stopped",
      values: ['stopped'],
      color: Color.stop
    },
    {
      label: "Moving",
      values: ['on_trip'],
      color: Color.blue
    },
    {
      label: "Logged off",
      values: ['logged_off'],
      color: '#8a91a0'
    },
    {
      label: 'Location disabled',
      values: ['location_disabled'],
      color: Color.red
    },
    {
      label: "Network offline",
      values: ['network_offline'],
      color: '#ccc',
    }
  ];

  activityQueryArray = [
    {
      label: 'Logged in',
      values: ['stopped', 'on_trip', 'network_offline'],
      color: Color.blue
    },
    {
      label: 'Logged off',
      values: ['logged_off'],
      color: '#a8a8a8',
    },
    {
      label: 'Location disabled',
      values: ['location_disabled'],
      color: Color.red
    },
  ];

  genericQueryArray = [
    {
      label: "Show all",
      values: ['show_all']
    }
  ];

  showAllQueryArray = [
    {
      label: "Never tracked",
      values: ['never_tracked']
    }
  ];

  sortingQueryMap = {
    num_trips: 'Trips',
    name: 'Name',
    status: 'Status',
    num_places: 'Places',
    total_distance: 'Distance',
    total_duration: 'Duration',
    stop_duration: 'Stop duration',
    location_disabled_duration: 'Location disabled',
    network_offline_duration: 'Network offline',
    num_actions: 'Actions',
    last_heartbeat_at: 'Last updated'
  };

  get allQueryArray() {
    return [...this.statusQueryArray, ...this.genericQueryArray, ...this.showAllQueryArray]
  }

  mapQueries = [

  ];

  statusOverviewQueries = [
    'search',
    'show_all'
  ]


}