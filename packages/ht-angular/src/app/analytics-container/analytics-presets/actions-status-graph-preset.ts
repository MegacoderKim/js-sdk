import {IActionStatusGraph} from "ht-models";
import {DateRangeMap, actionTableFormat} from "ht-data";
import {ActionsStatusGraphService} from "../../actions-status-graph/actions-status-graph.service";
import {IAnalyticsPresets} from "./users-list-preset";
import {ActionsAnalyticsListService} from "../../actions-analytics-list/actions-analytics-list.service";
import {DateString, DistanceLocale, HMString, NameCase, TimeString} from "ht-utility";
import {IAction} from "ht-models";
import {ActionsSummaryService} from "../../actions-summary-chart/actions-summary.service";

export const actionsConfigPreset: IAnalyticsPresets = {
  status() {
    return {
      service: ActionsStatusGraphService,
      initialConfig: {
        title: "Actions status chart",
        initialDateRange: DateRangeMap.last_30_days,
        tags: [],
        chartFormat: [
          {
            title: "Completed",
            selector(graphData: IActionStatusGraph) {
              return graphData.completed
            }
          },
          {
            title: "Assigned",
            selector(graphData: IActionStatusGraph) {
              return graphData.assigned
            }
          }

        ]
      }
    }
  },
  max_distance() {
    return {
      service: ActionsAnalyticsListService,
      initialConfig: {
        title: "Actions with max distance",
        tags: ['distance'],
        query: {ordering: '-distance'},
        tableFormat: [
          {
            label: "id",
            selector(action: IAction) {
              return action.lookup_id || "NA"
            }
          },
          {
            label: "Type",
            selector(action: IAction) {
              return action.type
            }
          },
          actionTableFormat.distance,
          actionTableFormat.duration
        ]
      }
    }
  },
  recently_assigned() {
    return {
      service: ActionsAnalyticsListService,
      initialConfig: {
        title: "Most Recent assigned actions",
        tags: ['live'],
        query: {ordering: '-assigned_at', status: 'assigned,started'},
        updateStrategy: "live",
        hideDatePicker: true,
        initialDateRange: DateRangeMap.last_30_days,
        tableFormat: [
          {
            label: "User",
            selector(action: IAction) {
              return action.user ? NameCase(action.user.name) : "NA";
            }
          },
          {
            label: "Type",
            selector(action: IAction) {
              return action.type
            }
          },
          actionTableFormat.assigned_at,
          {
            label: "Expected at",
            selector(action: IAction) {
              return action.expected_at ?
                TimeString(action.expected_at) + " " + DateString(action.expected_at, 'short') : action.eta ?
                  TimeString(action.eta) + " " + DateString(action.eta, 'short') : "--"
            }
          },
          {
            label: "Distance remaining",
            selector(action: IAction) {
              return action.display.distance_remaining ? DistanceLocale(action.display.distance_remaining) : "--"
            }
          }
        ]
      }
    }
  },
  recently_completed() {
    return {
      service: ActionsAnalyticsListService,
      initialConfig: {
        title: "Most Recent completed actions",
        tags: ['live'],
        query: {ordering: '-completed_at', status: 'completed'},
        updateStrategy: "live",
        hideDatePicker: true,
        initialDateRange: DateRangeMap.last_30_days,
        tableFormat: [
          {
            label: "User",
            selector(action: IAction) {
              return action.user ? NameCase(action.user.name) : "NA";
            }
          },
          {
            label: "Type",
            selector(action: IAction) {
              return action.type
            }
          },
          actionTableFormat.completed_at,
          {
            label: "Ontime",
            selector(action: IAction) {
              return action.display.is_late ? "Late" : "Ontime"
            }
          },
          actionTableFormat['distance&duration']
        ]
      }
    }
  },
  max_duration() {
    return {
      service: ActionsAnalyticsListService,
      initialConfig: {
        title: "Actions with max duration",
        query: {ordering: '-duration'},
        tableFormat: [
          {
            label: "User",
            selector(action: IAction) {
              return  action.user ? NameCase(action.user.name) : "NA";
            }
          },
          {
            label: "Type",
            selector(action: IAction) {
              return action.type
            }
          },
          actionTableFormat.duration,
          actionTableFormat.distance
        ]
      }
    }
  },
  users_on_action() {
    return {
      service: ActionsAnalyticsListService,
      initialConfig: {
        title: "Most recent user on action",
        query: {ordering: '-assigned_at'},
        tags: ['users', 'live'],
        updateStrategy: 'live',
        hideDatePicker: true,
        tableFormat: [
          {
            label: "Name",
            selector(action: IAction) {
              return action.user ? action.user.name : "NA"
            }
          },
          actionTableFormat.assigned_at,
          {
            label: "Last updated at",
            selector(action: IAction) {
              return action.user ? TimeString(action.user.last_heartbeat_at) : "--"
            }
          },
          {
            label: "Action type",
            selector(action: IAction) {
              return action.type
            }
          },
          {
            label: "Expected At",
            selector(action: IAction) {

              return action.expected_at ?
                TimeString(action.expected_at) + " " + DateString(action.expected_at, 'short') : action.eta ?
                  TimeString(action.eta) + " " + DateString(action.eta, 'short') : "--"
            }
          }
        ]
      }
    }
  },
  summary(actionsClient?, dateRangeService?, title?, queryLabels?) {
    return {
      service: ActionsSummaryService,
      initialConfig: {
        title: title || "Actions status summary",
        updateStrategy: 'live',
        tags: ['live'],
        query: {},
        queryLabels,
        dateRangeService,
        client: actionsClient
      }
    }
  }
};
