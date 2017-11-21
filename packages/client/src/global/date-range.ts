import {IDateRange} from "../interfaces";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import * as moment from 'moment-mini'

export const defaultDateRange = {
  start: moment().startOf('day').toISOString(),
  end: moment().endOf('day').toISOString()
};

export const dateRangeFactory = (initialDate: Partial<IDateRange> = {}) => {
  return new BehaviorSubject({...defaultDateRange, ...initialDate})
};

export const dateRangeService = (() => {
  var instance;

  return {
    getInstance(initialDate?: IDateRange) {
      if ( !instance ) {
        instance = dateRangeFactory(initialDate);
      }
      return instance;
    }
  }
})();
