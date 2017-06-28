import {IAction, IActionMap} from "../model/action";
import {GetDateRangeQuery} from "./time-utils";
import * as _ from "underscore";
import {NameCase} from "./name-case";

export function GetActionPosition(action: IAction | IActionMap): [number, number] | null {
    let position;
    if(action.completed_place && action.completed_place.location) {
        position = action.completed_place.location.coordinates
    } else if(action.expected_place && action.expected_place.location) {
        position = action.expected_place.location.coordinates;
    }
    return position ? [position[1], position[0]] : null;
}

export function GetActionMarkerFilter(key: string) {
    let filter = ActionMarkerFilterMap[key];
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

export function GetActionMarkerSeached(key: string) {
    return (action: IAction) => {
        return (action.lookup_id && action.lookup_id.indexOf(key) > -1) || (action.user && action.user.name.indexOf(key) > -1);
    }
}

const ActionMarkerFilterMap = {
    'assigned,started': (action: IAction) => {
        return action.status == 'assigned' || action.status == 'started'
    },
    'started,assigned': (action: IAction) => {
        return action.status == 'assigned' || action.status == 'started'
    },
    completed: (action: IAction) => {
        return action.status == 'completed'
    },
    created: (action: IAction) => {
        return action.status == 'created'
    }
};

export function IsValidActionMarker(action: IAction) {
    return !!((action.expected_place && action.expected_place.location) || (action.completed_place && action.completed_place.location));
}

export function GetActionDateRangeQuery(query) {
  return GetDateRangeQuery(query, 'created_at');
}

const statusString = {
    created: 'Not yet started',
    "assigned,started": 'Assigned',
    "started,assigned": 'Assigned',
    completed: 'Completed'
};

const ontimeString = {
  'action.delayed': 'Running delayed',
  'action.completed_late': 'Completed late'
};

const actionFilterKey = {...statusString, ...ontimeString};

const sortingString = {
  completed_at: 'Completed',
  type: 'Type',
  user__name: 'User name',
  status: 'Status'
};

export function  GetActionStatusString(status) {
    return statusString[status] || status
}

export function GetActionOntimeString(value) {
  return ontimeString[value] || value
}

export function GetActionFilterString(value) {
  return actionFilterKey[value] || value
}

export function GetActionSortingString(sorting: string) {
  return sortingString[sorting] || sorting;
}

const ActionStatusFilters = [
    { status: 'created'},
    { status: 'assigned,started'},
    { status: 'completed'},
];

const ActionOntimeFilters = [
  {event_flags: 'action.delayed'},
  {event_flags: 'action.completed_late'}
];

const ActionTypes = [
  'delivery',
  'pickup',
  'task',
  'visit',
  'stopover',
];

const ActionSorting = [
  'completed_at',
  'type',
  'user__name',
  'status'
];

export const GetActionStatusFiltersMap = _.map(ActionStatusFilters, (filter: object) => {
    let key = Object.keys(filter)[0];
    return {
        query: filter,
        label: GetActionStatusString(filter[key])
    }
});

export const GetActionOntimeFiltersMap = _.map(ActionOntimeFilters, (filter: object) => {
  let key = Object.keys(filter)[0];
  return {
    query: filter,
    label: GetActionOntimeString(filter[key])
  }
});

export const GetActionTypesMap = _.map(ActionTypes, (type: string) => {
  return {
    query: {type},
    label: NameCase(type)
  }
});

export const GetActionSortingMap = _.map(ActionSorting, (sort: string) => {
  return {
    key: sort,
    label: sortingString[sort]
  }
});
