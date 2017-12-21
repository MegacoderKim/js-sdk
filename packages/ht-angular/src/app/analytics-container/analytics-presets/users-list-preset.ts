import {DistanceLocale, HMString} from "ht-utility";
import {IUsersAnalyticsListConfig} from "../../interfaces/analytics-list";
import {IUserAnalytics} from "ht-models";
import {UsersAnalyticsListService} from "../../users-analytics-list/users-analytics-list.service";
import {UsersSummaryService} from "../../users-summary-chart/users-summary.service";
import {IUsersSummaryConfig} from "../../interfaces/users-analytics";

export interface IPreset {
  service: any,
  initialConfig: IUsersAnalyticsListConfig | IUsersSummaryConfig
}
export interface IUsersListPreset {
  [name: string]: (...args: any[]) => IPreset
}
export const usersAnalyticsListPresets: IUsersListPreset = {
  max_location_disabled_duration() {
    return {
      service: UsersAnalyticsListService,
      initialConfig: {
        title: "Users with max location disabled duration",
        query: {ordering: "-location_disabled_duration"},
        tags: ['user behaviour', 'device health'],
        tableFormat: [
          {
            column: "Name",
            selector(user: IUserAnalytics) {
              return user.name
            }
          },
          {
            column: "Location disabled duration",
            selector(user: IUserAnalytics) {
              return user.location_disabled_duration ? HMString(user.location_disabled_duration / 60) : "--"
            }
          },
          {
            column: "% of total duration",
            selector(user: IUserAnalytics) {
              return user.total_duration && user.location_disabled_duration ?
                (100 * (user.location_disabled_duration / user.total_duration)).toFixed(1) :
                "NA"
            }
          }
        ]
      }
    }
  },
  max_stop_duration() {
    return {
      service: UsersAnalyticsListService,
      initialConfig: {
        title: "Users with max stop duration",
        query: {ordering: "-stop_duration"},
        tags: ['utilization'],
        tableFormat: [
          {
            column: "Name",
            selector(user: IUserAnalytics) {
              return user.name
            }
          },
          {
            column: "Stop duration",
            selector(user: IUserAnalytics) {
              return user.stop_duration ? HMString(user.stop_duration / 60) : "--"
            }
          },
          {
            column: "% of total duration",
            selector(user: IUserAnalytics) {
              return user.total_duration && user.stop_duration ?
                (100 * (user.stop_duration / user.total_duration)).toFixed(1) :
                "NA"
            }
          }
        ]
      }
    }

  },
  max_network_offline() {
    return {
      service: UsersAnalyticsListService,
      initialConfig: {
        title: "Users with max network offline duration",
        query: {ordering: "-network_offline_duration"},
        tags: ['device health'],
        tableFormat: [
          {
            column: "Name",
            selector(user: IUserAnalytics) {
              return user.name
            }
          },
          {
            column: "network offline duration",
            selector(user: IUserAnalytics) {
              return user.network_offline_duration ? HMString(user.network_offline_duration / 60) : "--"
            }
          },
          {
            column: "% of total duration",
            selector(user: IUserAnalytics) {
              return user.total_duration && user.network_offline_duration ?
                (100 * (user.network_offline_duration / user.total_duration)).toFixed(1) :
                "NA"
            }
          }
        ]
      }
    }

  },
  max_distance() {
    return {
      service: UsersAnalyticsListService,
      initialConfig: {
        title: "Users with max distance",
        query: {ordering: "-total_distance"},
        tags: ['utilization'],
        tableFormat: [
          {
            column: "Name",
            selector(user: IUserAnalytics) {
              return user.name
            }
          },
          {
            column: "total distance",
            selector(user: IUserAnalytics) {
              return user.total_distance ? DistanceLocale(user.total_distance) : "--"
            }
          }
        ]
      }
    }

  },
  users_summary(usersClient, title?, queryLabels?) {
    return {
      service: UsersSummaryService,
      initialConfig: {
        title: title || "Users status summary",
        queryLabels,
        usersClient,
      }
    }
  }
};

