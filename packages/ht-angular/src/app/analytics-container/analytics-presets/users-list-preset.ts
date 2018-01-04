import {DateString, DistanceLocale, HMString, TimeString} from "ht-utility";
import {IAnalyticsListConfig} from "../../interfaces/analytics-list";
import {IUserAnalytics} from "ht-models";
import {UsersAnalyticsListService} from "../../users-analytics-list/users-analytics-list.service";
import {UsersSummaryService} from "../../users-summary-chart/users-summary.service";
import {ISummaryConfig} from "../../interfaces/users-analytics";
import {IActionsTrendlineConfig} from "../../interfaces/trendline";
import {DateRangeMap, userTableFormat} from "ht-data";

export interface IPreset {
  service: any,
  initialConfig: IAnalyticsListConfig | ISummaryConfig<any> | IActionsTrendlineConfig
}
export interface IAnalyticsPresets {
  [name: string]: (...args: any[]) => IPreset
}
export const usersAnalyticsListPresets: IAnalyticsPresets = {
  max_location_disabled_duration() {
    return {
      service: UsersAnalyticsListService,
      initialConfig: {
        title: "Users with max location disabled duration",
        query: {ordering: "-location_disabled_duration"},
        tags: ['user behaviour', 'device health'],
        tableFormat: [
          {
            label: "Name",
            selector(user: IUserAnalytics) {
              return user.name
            }
          },
          userTableFormat.location_disabled_duration,
          {
            label: "% of total duration",
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
  current_location_disabled() {
    return {
      service: UsersAnalyticsListService,
      initialConfig: {
        title: "Most recent users with location disabled",
        query: {status: 'location_disabled', show_all: true, ordering: '-last_heartbeat'},
        updateStrategy: 'live',
        hideDatePicker: true,
        tags: ['user behaviour', 'device health', 'live'],
        tableFormat: [
          {
            label: "Name",
            selector(user: IUserAnalytics) {
              return user.name
            }
          },
          userTableFormat.last_heartbeat_at
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
        tags: ['activity'],
        tableFormat: [
          {
            label: "Name",
            selector(user: IUserAnalytics) {
              return user.name
            }
          },
          userTableFormat.stop_duration,
          {
            label: "% of total duration",
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
            label: "Name",
            selector(user: IUserAnalytics) {
              return user.name
            }
          },
          userTableFormat.network_offline_duration,
          {
            label: "% of total duration",
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
        tags: ['distance'],
        tableFormat: [
          {
            label: "Name",
            selector(user: IUserAnalytics) {
              return user.name
            }
          },
          userTableFormat.total_distance
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
        client: usersClient,
      }
    }
  },
  last_recorded() {
    return {
      service: UsersAnalyticsListService,
      initialConfig: {
        title: "Most Recent active users",
        query: {ordering: "-last_heartbeat_at"},
        tags: ['live'],
        initialDateRange: DateRangeMap.last_30_days,
        hideDatePicker: true,
        tableFormat: [
          {
            label: "Name",
            selector(user: IUserAnalytics) {
              return user.name
            }
          },
          userTableFormat.last_heartbeat_at
        ]
      }
    }
  },
  users_actions() {
    return {
      service: UsersAnalyticsListService,
      initialConfig: {
        title: "Users with max actions",
        query: {ordering: "-num_actions"},
        tags: ['actions'],
        initialDateRange: DateRangeMap.today,
        tableFormat: [
          {
            label: "Name",
            selector(user: IUserAnalytics) {
              return user.name
            }
          },
          userTableFormat.num_actions
        ]
      }
    }
  }
};

