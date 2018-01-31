import {addMilliseconds, isSameMinute, subDays} from "date-fns";

// export function DayAgoISO() {
//   return subDays(new Date(), 1).toISOString();
// }

export function OffsetIsoTime(time: string, offset: number = 10) {
  return addMilliseconds(time, offset).toISOString()
}

export function GetMinute(time: string) {
  let timeStamp = new Date(time).getTime();
  return Math.round(timeStamp - timeStamp % 60000);
}

export function HasSameMinute(time1: string, time2: string) {
  return isSameMinute(time1, time2)
}
