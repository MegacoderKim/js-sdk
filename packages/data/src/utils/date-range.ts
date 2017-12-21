import * as moment from "moment-mini";

export const DateRangeMap = {
  "today": {
    start: moment().startOf('day').toISOString(),
    end: moment().endOf('day').toISOString()
  },
  "yesterday": {
    start: moment().subtract(1, 'days').toISOString(),
    end: moment().subtract(1, 'days').endOf('day').toISOString()
  },
  "last_7_days": {
    start: moment().subtract(6, 'days').toISOString(),
    end: moment().endOf('day').toISOString()
  },
  "this_month": {
    start: moment().startOf('month').toISOString(),
    end: moment().endOf('day').toISOString()
  },
  "last_30_days": {
    start: moment().subtract(29, 'days').toISOString(),
    end: moment().endOf('day').toISOString()
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

export const isSameDateRange = (range1, range2) => {
  return (range1.start == range2.start && range1.end == range2.end)
};