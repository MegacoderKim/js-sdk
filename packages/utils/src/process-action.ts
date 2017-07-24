import * as moment from 'moment-mini';
import {IAction} from "ht-models";

export const getETATimestamp = (action: IAction) => {
  if (action.display.duration_remaining) {
    return moment(Date.now()).add(action.display.duration_remaining, 'seconds').toISOString();
  }
  return null;
};
