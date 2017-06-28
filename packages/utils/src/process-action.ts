import {IAction} from "../model/action";
import * as moment from 'moment-mini';

export const getETATimestamp = (action: IAction) => {
  if (action.display.duration_remaining) {
    return moment(Date.now()).add(action.display.duration_remaining, 'seconds').toISOString();
  }
  return null;
};
