import {Observable} from "rxjs/Observable";
import {Dispatcher} from "./dispatcher";
import * as fromQueryDispatch from "../dispatchers/query-dispatcher";
import * as fromUsersDispatch from "../dispatchers/user-dispatcher";

export function GetEffect(currentAction) {
  let action;
  switch (currentAction.type) {
    case fromQueryDispatch.SET_PLACELINE_ID:
      action = new fromUsersDispatch.SetUserData(null);
      break;
    default:

  }
  return Observable.of(action)
}

export class Effects {
  constructor(
    dispatcher: Dispatcher
  ) {
    dispatcher.flatMap((action) => GetEffect(action)).filter(data => !!data).subscribe((action) => {
      dispatcher.next(action)
    })
  }

}