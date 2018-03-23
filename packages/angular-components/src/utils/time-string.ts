import * as moment from "moment-mini"

const getNearestMinute = (date) => {
  // if (moment(date).seconds() > 30) {
  //   let roundedDate = moment(date).add(1, "minute");
  //   return moment(roundedDate).startOf('minute');
  // }
  return moment(date).startOf('minute');
};

export function TimeString(item: string, args?): string {
    if(typeof item == 'string' && item.length > 4 && moment(item).isValid() ) {
        return getNearestMinute(item).format('h:mm a');
    } else {
        return item;
    }
}
