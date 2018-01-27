import {
  addDays, endOfToday, endOfYesterday, isSameDay, startOfDay, startOfMonth, startOfToday,
  startOfYesterday
} from "date-fns";
import {IDateRange} from "ht-models";
import {DateString} from "./date-string";

export const DateMapService = (() => {
  let instance;
  return {
    getInstance() {
      if(!instance) {
        instance = {
          today_end:   endOfToday().toISOString(),
          today_start: startOfToday().toISOString(),
          yesterday_start: startOfYesterday().toISOString(),
          yesterday_end: endOfYesterday().toISOString(),
          day_7_start: startOfDay(addDays(new Date(), -6)).toISOString(),
          month_start: startOfMonth(new Date()).toISOString(),
          day_30_start: startOfDay(addDays(new Date(), -29)).toISOString(),
        };
      }
      return instance;
    }
  }

})();
export const DateRangeMap = {
  "today": {
    start: DateMapService.getInstance().today_start,
    end: DateMapService.getInstance().today_end
  },
  "yesterday": {
    start: DateMapService.getInstance().yesterday_start,
    end: DateMapService.getInstance().yesterday_end,
  },
  "last_7_days": {
    start: DateMapService.getInstance().day_7_start,
    end: DateMapService.getInstance().today_end
  },
  "this_month": {
    start: DateMapService.getInstance().month_start,
    end: DateMapService.getInstance().today_end
  },
  "last_30_days": {
    start: DateMapService.getInstance().day_30_start,
    end: DateMapService.getInstance().today_end
  }
};

export const DateRangeLabelMap = [
  {
    label: "Today",
    range: DateRangeMap.today,
    isSingleDay: true,
    hasToday: true
  },
  {
    label: "Yesterday",
    range: DateRangeMap.yesterday,
    isSingleDay: true,
    hasToday: false
  },
  {
    label: "Last 7 days",
    range: DateRangeMap.last_7_days,
    isSingleDay: false,
    hasToday: true
  },
  {
    label: "This month",
    range: DateRangeMap.this_month,
    isSingleDay: false,
    hasToday: true
  },
  {
    label: "Last 30 days",
    range: DateRangeMap.last_30_days,
    isSingleDay: false,
    hasToday: true
  }
];


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


export const dateRangeDisplay = (range: IDateRange): string => {
  let rangeItem = DateRangeLabelMap.find(item => {
    return isSameDateRange(item.range, range)
  });
  if(rangeItem) return  rangeItem.label;
  // const matchKey = Object.keys(DateRangeMap).find((key) => {
  //   return isSameDateRange(DateRangeMap[key], range)
  // });
  // return "";
  let customDate = DateRangeLabelMap.find((data) => {
    let customRange = data.range;
    return isSameRange(range, customRange)
  });

  if (customDate) return customDate.label;
  let isSingleDay = IsRangeADay(range);
  if (isSingleDay) {
    let isToday = IsRangeToday(range);
    let suffix = isToday ? "Today " : "";
    let string = suffix + DateString(range.start);
    return string;
  } else {
    // console.log(DateString(range.start), range.start);
    return DateString(range.start) + " - " + DateString(range.end);
  }
};

export const isSameDateRange = (range1: IDateRange, range2: IDateRange) => {
  function nearTime(t1, t2) {
    return isSameDay(t1, t2);
  }

  return (nearTime(range1.start, range2.start) && nearTime(range1.end, range2.end))
};