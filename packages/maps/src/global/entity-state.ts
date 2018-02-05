import {ReplaySubject} from "rxjs/ReplaySubject";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {distinctUntilChanged, pluck} from "rxjs/operators";

export class EntityState<S = any> {
  stateSubject$: BehaviorSubject<object> = new BehaviorSubject<object>({});
  state$: Observable<object> = this.stateSubject$.asObservable();

  dataSubject$: ReplaySubject<S[]> = new ReplaySubject<S[]>();
  data$ = this.dataSubject$.asObservable();

  setState(selector, value) {
    const state = {...this.stateSubject$.getValue(), [selector]: value};
    this.stateSubject$.next(state)
  };

  selector(selector): Observable<any> {
    return this.state$.pipe(
      pluck(selector),
      distinctUntilChanged()
    )
  }

  setData(data: S[]) {
    this.dataSubject$.next(data)
  }
}