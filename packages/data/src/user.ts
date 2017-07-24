import {ISegment, IUser, IUserAnalytics, IUserData} from "ht-models";
import {ISegmentType} from "./interfaces";
import * as _ from "underscore";

export class HtUser {
  statusQueryMap = {
    stopped: 'Stopped',
    on_trip: 'Moving',
    logged_off: 'Logged off',
    "location_disabled,network_offline": 'Error',
    "location_disabled": 'Location disabled',
    "network_offline": 'Network offline'
  };

  sortingQueryMap = {
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

  markerFilterMap = {
    stopped: (user: IUserAnalytics) => {
      return user.status == 'stopped'
    },
    on_trip: (user: IUserAnalytics) => {
      return user.status == 'walk' || user.status == 'run' || user.status == 'cycle' || user.status == 'drive'
      //moving: walk, drive, cycle, run
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

  constructor(public data?: IUserData | IUser) {}

  getMarkerSeached(key: string) {
    return (user: IUserAnalytics) => user.name.indexOf(key) > -1;
  }

  getMarkerFilter(key?: string) {
    let filter = this.markerFilterMap[key];
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

  get sortings(): string[] {
    return Object.keys(this.sortingQueryMap)
  }

  getSegmentTypes(userSegments: ISegment[]) {
    return _.reduce(userSegments, (segmentType: ISegmentType, segment: ISegment) => {
      if(segment.type == 'stop') {
        if(segment.location && segment.location.geojson) segmentType.stopSegment.push(segment)
      } else {
        if(segment.encoded_polyline) segmentType.tripSegment.push(segment)
      }
      return segmentType;
    }, {tripSegment: [], stopSegment: []});
  }
}

export const htUser = (user?: IUser | IUserData) => new HtUser(user);