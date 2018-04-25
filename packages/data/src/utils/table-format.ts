import {DistanceLocale, TimeString, DateString, HMString, NameCase, DotString} from "ht-utility";
import {IUserAnalytics, IAction, IUser} from "ht-models";

export const tableFormat = (data: object, config: ITableFormatConfig) => {
  const format = config.format;
  return Object.keys(data).reduce((acc, key) => {
    const value = data[key];
    if (typeof value === 'number' || typeof value === 'string' && !!!config.excludes.includes(key)) {
      const formatKey = format[key];
      if (formatKey) {
        const label = formatKey.label || key;
        const formattedValue = formatKey.selector(data) || value;
        acc.push([label, formattedValue]);
      } else {
        const label = key;
        const formattedValue = value;
        acc.push([label, formattedValue]);
      }

      return acc
    } else {
      return acc
    }
  }, [])
};

export const actionTableFormat = {
  "unique_id": {
    label: "Unique ID",
    key: "unique_id",
    selector(action: IAction) {
      return action.unique_id
    }
  },
  "user": {
    label: "User",
    key: "user__name",
    selector(action: IAction) {
      return NameCase(action.user.name)
    }
  },
  "status": {
    label: "Status",
    key: "status",
    selector(action: IAction) {
      return NameCase(action.status)
    }
  },
  "status_dot": {
    label: "",
    key: "",
    isDot: true,
    selector(action: IAction) {
      return null
    }
  },
  "assigned_at": {
    label: "Assigned at",
    key: "assigned_at",
    selector(action: IAction) {
      return dateTimeString(action.created_at)
    }
  },
  "created_at": {
    label: "Created at",
    key: "created_at",
    selector(action: IAction) {
      return dateTimeString(action.created_at)
    }
  },
  "expected_at": {
    label: "Expected at",
    key: "expected_at",
    selector(action: IAction) {
      return action.expected_at ? dateTimeString(action.expected_at) : "--"
    }
  },
  "completed_at": {
    label: "Completed at",
    key: "completed_at",
    selector(action: IAction) {
      return dateTimeString(action.completed_at)
    }
  },
  "completed_at__eta": {
    label: "Completed at / ETA",
    key: "completed_at",
    selector(action: IAction) {
      return action.completed_at ? dateTimeString(action.completed_at) : dateTimeString(action.eta || action.expected_at)
    }
  },
  "distance": {
    label: "Distance",
    key: "distance",
    selector(action: IAction) {
      return action.distance || action.distance == 0 ? DistanceLocale(action.distance) : "--";
    }
  },
  "duration": {
    label: "Duration",
    key: "duration",
    selector(action: IAction) {
      return action.duration || action.duration == 0 ? HMString(action.duration, 60) : "--";
    }
  },
  "scheduled_at": {
    label: "Scheduled at",
    selector(action: IAction) {
      return dateTimeString(action['scheduled_at'])
    }
  },
  "distance&duration": {
    label: "Distance/Duration",
    selector(action: IAction) {
      return `${actionTableFormat.distance.selector(action)}/${actionTableFormat.duration.selector(action)}`
    }
  },
  "type": {
    label: "Type",
    key: "type",
    selector(action: IAction) {
      return NameCase(DotString(action.type))
    }
  }
};

export const userTableFormat = {
  "photo": {
    label: "",
    key: "",
    isPic: true,
    selector(user) {
      return user.photo
    }
  },
  "name": {
    label: "Name",
    key: "name",
    selector(user) {
      return NameCase(user.name)
    }
  },
  "stop_duration": {
    label: "Stop Duration",
    key: "stop_duration",
    selector(user: IUserAnalytics) {
      return HMString(user.stop_duration, 60)
    }
  },
  "last_heartbeat_at": {
    label: "Last updated at",
    key: "last_heartbeat_at",
    selector(user: IUserAnalytics) {
      return dateTimeString(user.last_heartbeat_at)
    }
  },
  "last_battery": {
    label: "Last battery",
    key: "health__battery_status",
    selector(user: IUser) {
      return user.health.battery_status + " %"
    }
  },
  "total_duration": {
    label: "Duration tracked",
    key: "total_duration",
    selector(user: IUserAnalytics) {
      return HMString(user.total_duration, 60)
    }
  },
  "num_places" : {
    label: "Number of stops",
    key: "num_places",
    selector(user: IUserAnalytics) {
      return user.num_places
    }
  },
  "location_disabled_duration": {
    label: "Location disabled duration",
    key: "location_disabled_duration",
    selector(user: IUserAnalytics) {
      return HMString(user.location_disabled_duration, 60)
    }
  },
  "total_distance": {
    label: "Total distance",
    key: "total_distance",
    selector(user: IUserAnalytics) {
      return DistanceLocale(user.total_distance)
    }
  },
  "num_trips": {
    label: "Number of trips",
    key: "num_trips",
    selector(user: IUserAnalytics) {
      return user.num_trips
    }
  },
  "network_offline_duration": {
    label: "Network offline duration",
    key: "network_offline_duration",
    selector(user: IUserAnalytics) {
      return HMString(user.network_offline_duration, 60)
    }
  },
  "num_actions": {
    label: "Number of actions",
    key: "num_actions",
    selector(user: IUserAnalytics) {
      return user.num_actions
    }
  },
  "status": {
    label: "Current status",
    key: "status",
    selector(user: IUserAnalytics) {
      return user.display.status_text
    }
  }
};

export interface ITableFormatConfig {
  excludes?: string[],
  format: { [key: string]: ITableFormat}
}

export interface ITableFormat {
  label: string,
  selector: (data) => string | number
}

function dateTimeString(time) {
  return time ?`${TimeString(time)}, ${DateString(time, 'short')}` : "--"
}