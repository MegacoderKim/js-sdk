import * as moment from "moment-mini";

export const DateMapService = (() => {
  let instance;
  return {
    getInstance() {
      if(!instance) {
        instance = {
          today_end:   moment().endOf('day').toISOString(),
          today_start: moment().startOf('day').toISOString(),
          yesterday_start: moment().subtract(1, 'days').toISOString(),
          yesterday_end: moment().subtract(1, 'days').endOf('day').toISOString(),
          day_7_start: moment().subtract(6, 'days').toISOString(),
          month_start: moment().startOf('month').toISOString(),
          day_30_start: moment().subtract(29, 'days').toISOString(),
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

export const isSameDateRange = (range1, range2) => {
  function nearTime(t1, t2) {
    return Math.abs(new Date(t1).getTime() - new Date(t2).getTime()) < 1000;
  }
  return (nearTime(range1.start, range2.start) && nearTime(range1.end, range2.end))
};