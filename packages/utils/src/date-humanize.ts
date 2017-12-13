import * as moment from "moment-mini";

export function DateHumanize(value: string, arg: boolean = false): string {
  if (typeof value == "string" && value.length > 4 && moment(value).isValid()) {
    if (
      moment(value).isBetween(
        moment()
          .subtract(1, "days")
          .endOf("day"),
        moment().endOf("day")
      )
    ) {
      return "Today";
    } else if (
      moment(value).isBetween(
        moment()
          .subtract(2, "days")
          .endOf("day"),
        moment()
          .subtract(1, "days")
          .endOf("day")
      )
    ) {
      return "Yesterday";
    } else if (
      moment(value).isBetween(
        moment()
          .add(1, "days")
          .endOf("day"),
        moment().endOf("day")
      )
    ) {
      return "Tomorrow";
    } else {
      return moment(value).format("D MMM");
    }
  } else {
    return value;
  }
}
