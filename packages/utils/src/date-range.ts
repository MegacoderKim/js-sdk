import {
  addDays, endOfToday, endOfYesterday, isSameDay, startOfDay, startOfMonth, startOfToday,
  startOfYesterday
} from "date-fns";
import {IDateRange} from "ht-models";
import {DateString} from "./date-string";

export function isSameRange(range1, range2) {
  const start1 = range1.start;
  const start2 = range2.start;
  return isSameDay(start1, start2) && isSameDay(range1.end, range2.end)
}

export function IsRangeToday(range) {
  if (range.start && range.end) {
    return range.start == startOfToday().toISOString() && range.end == endOfToday().toISOString();
  } else if (!range.start && !range.end) {
    return true;
  } else {
    return false;
  }
}

export function GetDateRangeQuery(query, param = "created_at") {
  let start = query["start"];
  let end = query["end"];
  return {
    ...query,
    [`min_${param}`]: start,
    [`max_${param}`]: end,
    start: null,
    end: null
  };
}

export function IsRangeADay(range) {
  if (range.start && range.end) {
    return isSameDay(range.end, range.start)
    // return moment(range.end).diff(moment(range.start), "days") == 0;
  } else if (!range.start && !range.end) {
    return true;
  } else {
    return false;
  }
}

export function RangeHasToday(query): boolean {
  if (query.end) {
    return query.end == endOfToday().toISOString();
  } else {
    return true;
  }
}