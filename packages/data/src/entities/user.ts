import {
  IPlaceline,
  IUser,
  IUserAnalytics,
  IUserPlaceline,
  HtLocation,
  IAction,
  ITimelineEvent,
  HtPosition
} from "ht-models";
import { ISegmentType } from "../interfaces";
import _ from "underscore";

export class HtUser {
  statusQueryMap = {
    stopped: "Stopped",
    on_trip: "Moving",
    logged_off: "Logged off",
    "location_disabled,network_offline": "Error",
    location_disabled: "Location disabled",
    network_offline: "Network offline",
    never_tracked: "Never tracked"
  };

  sortingQueryMap = {
    num_trips: "Trips",
    name: "Name",
    status: "Status",
    num_places: "Places",
    total_distance: "Distance",
    total_duration: "Duration",
    stop_duration: "Stop duration",
    location_disabled_duration: "Location disabled",
    network_offline_duration: "Network offline",
    num_actions: "Actions",
    last_heartbeat_at: "Last updated"
  };

  markerFilterMap = {
    stopped: (user: IUserAnalytics) => {
      return user.status == "stopped";
    },
    on_trip: (user: IUserAnalytics) => {
      return (
        user.status == "walk" ||
        user.status == "run" ||
        user.status == "cycle" ||
        user.status == "drive" ||
        user.status == "moving"
      );
      //moving: walk, drive, cycle, run
    },
    logged_off: (user: IUserAnalytics) => {
      return user.status == "logged_off";
    },
    location_disabled: (user: IUserAnalytics) => {
      return user.status == "location_disabled";
    },
    network_offline: (user: IUserAnalytics) => {
      return user.status == "network_offline";
    }
  };

  constructor(public data?: IUserPlaceline | IUser | IUserAnalytics) {}

  getMarkerSearched(key: string) {
    return (user: IUserAnalytics) => {
      if (!user.name) return false;
      let name = user.name.toLowerCase();
      key = key.toLowerCase();
      return name.includes(key);
    };
  }

  getMarkerFilter(key?: string) {
    let filter = this.markerFilterMap[key];
    if (key) {
      if (filter) {
        return filter;
      } else {
        return () => false;
      }
    } else {
      return () => true;
    }
  }

  get sortings(): string[] {
    return Object.keys(this.sortingQueryMap);
  }

  getSegmentTypes(userSegments: IPlaceline[]) {
    return _.reduce(
      userSegments,
      (segmentType: ISegmentType, segment: IPlaceline) => {
        if (segment.type == "stop") {
          if (segment.place && segment.place.location.coordinates)
            segmentType.stopSegment.push(segment);
        } else {
          if (segment.route) segmentType.tripSegment.push(segment);
        }
        return segmentType;
      },
      { tripSegment: [], stopSegment: [] }
    );
  }

  getPosition(): HtPosition | null {
    let data = this.data;
    if (data.location && data.location.geojson) {
      const lat = data.location.geojson.coordinates[1];
      const lng = data.location.geojson.coordinates[0];
      return { lat, lng };
      // return L.latLng([item.last_location.geojson.coordinates[1], item.last_location.geojson.coordinates[0]])
    } else {
      return null;
    }
  }

  isValidMarker(user?: IUserAnalytics | IUser | IUserPlaceline) {
    user = user || this.data;
    return !!(user.location && user.location.geojson) && this.isLive(user);
  }

  isLive(user?: IUserAnalytics | IUser | IUserPlaceline) {
    user = user || this.data;
    return user.is_tracking;
  }
}

export const htUser = (user?: IUser | IUserPlaceline | IUserAnalytics) => {
  return new HtUser(user)
}

// export const htUser = (user?: IUser | IPlaceline | IUserAnalytics) => {
//   let extras = {
//     statusQueryMap: {
//       stopped: "Stopped",
//       on_trip: "Moving",
//       logged_off: "Logged off",
//       "location_disabled,network_offline": "Error",
//       location_disabled: "Location disabled",
//       network_offline: "Network offline",
//       never_tracked: "Never tracked"
//     },
//     sortingQueryMap: {
//       num_trips: "Trips",
//       name: "Name",
//       status: "Status",
//       num_places: "Places",
//       total_distance: "Distance",
//       total_duration: "Duration",
//       stop_duration: "Stop duration",
//       location_disabled_duration: "Location disabled",
//       network_offline_duration: "Network offline",
//       num_actions: "Actions",
//       last_heartbeat_at: "Last updated"
//     },
//     markerFilterMap: {
//       stopped: (user: IUserAnalytics) => {
//         return user.status == "stopped";
//       },
//       on_trip: (user: IUserAnalytics) => {
//         return (
//           user.status == "walk" ||
//           user.status == "run" ||
//           user.status == "cycle" ||
//           user.status == "drive" ||
//           user.status == "moving"
//         );
//         //moving: walk, drive, cycle, run
//       },
//       logged_off: (user: IUserAnalytics) => {
//         return user.status == "logged_off";
//       },
//       location_disabled: (user: IUserAnalytics) => {
//         return user.status == "location_disabled";
//       },
//       network_offline: (user: IUserAnalytics) => {
//         return user.status == "network_offline";
//       }
//     },
//     getMarkerSearched(key: string) {
//       return (user: IUserAnalytics) => {
//         if (!user.name) return false;
//         let name = user.name.toLowerCase();
//         key = key.toLowerCase();
//         return name.includes(key);
//       };
//     },
//     getMarkerFilter(key?: string) {
//       let filter = this.markerFilterMap[key];
//       if (key) {
//         if (filter) {
//           return filter;
//         } else {
//           return () => false;
//         }
//       } else {
//         return () => true;
//       }
//     }
//   };
//
//   return {
//     data: user,
//     isValidMarker() {
//       let user: IUser = this.data;
//       return !!(user.location && user.location.geojson);
//     },
//     getPosition(): HtPosition | null {
//       if (this.isValidMarker()) {
//         return this.getValidPosition();
//       } else {
//         return null;
//       }
//     },
//     getValidPosition(): HtPosition {
//       let data: IUser = this.data;
//       const lat = data.location.geojson.coordinates[1];
//       const lng = data.location.geojson.coordinates[0];
//       return { lat, lng };
//     },
//     // update(user) {
//     //   return {...this, ...user}
//     // },
//     getInfoContent() {
//       let user = this;
//       return user.name;
//     },
//     ...extras
//   };
// };
