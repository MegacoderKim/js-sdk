import {BaseFilter} from "./base-filter";

export class DefaultUsersFilter extends BaseFilter {

  statusQueryArray = [
    {
      label: "Stopped",
      values: ['stopped']
    },
    {
      label: "Moving",
      values: ['on_trip']
    },
    {
      label: "Logged off",
      values: ['logged_off']
    },
    {
      label: 'Location disabled',
      values: ['location_disabled']
    },
    {
      label: "Network offline",
      values: ['network_offline']
    }
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


}