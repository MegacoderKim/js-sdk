import {startOfMinute, format} from "date-fns";

const getNearestMinute = date => {
  // if (moment(date).seconds() > 30) {
  //   let roundedDate = moment(date).add(1, "minute");
  //   return moment(roundedDate).startOf('minute');
  // }
  return startOfMinute(date);
};

export function TimeString(item: string, args?): string {
  if (typeof item == "string" && item.length > 4) {
    return format(getNearestMinute(item), "h:mm a");
    // return getNearestMinute(item).format("h:mm a");
  } else {
    return item;
  }
}
