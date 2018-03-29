import {GetDateRangeQuery} from "./time-utils";
import * as _ from "underscore";
import {NameCase} from "ht-utility";
import {htAction} from "ht-data";
import { moment } from "moment-mini"

export function GetActionDateRangeQuery(query) {
  return GetDateRangeQuery(query, 'created_at');
}

const ActionStatusFilters = [
    { status: 'created'},
    { status: 'completed'},
];

export const GetActionStatusFiltersMap = _.map(ActionStatusFilters, (filter: object) => {
    let key = Object.keys(filter)[0];
    const prop = filter[key];

    return {
        query: filter,
        label: htAction().getStatusString(prop)
    }
});

export const GetActionOntimeFiltersMap = _.map(htAction().ontimeFilters, (filter: object) => {
  let key = Object.keys(filter)[0];
  return {
    query: filter,
    label: htAction().getOntimeString(filter[key])
  }
});

export const GetActionTypesMap = _.map(htAction().types, (type: string) => {
  return {
    query: {type},
    label: NameCase(type)
  }
});

export const GetActionSortingMap = _.map(htAction().sortings, (sort: string) => {
  return {
    key: sort,
    label: htAction().sortingQueryMap[sort]
  }
});

export const getETATimestamp = (action) => {
  if (action.display.duration_remaining) {
    return moment(Date.now()).add(action.display.duration_remaining, 'seconds').toISOString();
  }
  return null;
};
