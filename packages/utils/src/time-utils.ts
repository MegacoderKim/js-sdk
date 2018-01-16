import {differenceInDays, endOfToday, startOfToday} from "date-fns";

export function DayAgoISO() {
  return new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString();
}

export function TodayISO() {
  return startOfToday().toISOString();
}

export function TodayEndISO() {
  return endOfToday().toISOString();
}

export function OffsetIsoTime(time: string, offset: number = 10) {
  return new Date(new Date(time).getTime() + offset).toISOString();
}

export function IsRangeToday(range) {
  if (range.start && range.end) {
    return range.start == TodayISO() && range.end == TodayEndISO();
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
    return differenceInDays(range.end, range.start) == 0
    // return moment(range.end).diff(moment(range.start), "days") == 0;
  } else if (!range.start && !range.end) {
    return true;
  } else {
    return false;
  }
}

export function RangeHasToday(query): boolean {
  if (query.end) {
    return query.end == TodayEndISO();
  } else {
    return true;
  }
}

export function GetMinute(time: string) {
  let timeStamp = new Date(time).getTime();
  return Math.round(timeStamp - timeStamp % 60000);
}

export function HasSameMinute(time1: string, time2: string) {
  return GetMinute(time1) == GetMinute(time2);
}
