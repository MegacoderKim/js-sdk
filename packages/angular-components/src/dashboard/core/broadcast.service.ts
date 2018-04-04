import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class BroadcastService {

  private _eventBus: Subject<BroadcastEvent>;

  constructor() {
    this._eventBus = new Subject<BroadcastEvent>();
  }

  emit(key: any, data?: any) {
    this._eventBus.next({key, data});
  }

  on<T>(key: any): Observable<T> {
    return this._eventBus.asObservable()
        .filter(event => event.key === key)
        .map(event => <T>event.data);
  }

  onScrollEnd(): Observable<boolean> {
    return this.on('scroll-end')
        .distinctUntilChanged()
        .filter(scrollEnd => !!scrollEnd)
      .map(data => !!data)
  }

  onRangeChange(): Observable<boolean> {
    return this.on('range-change')
  }

}

interface BroadcastEvent {
  key: any;
  data?: any;
}
