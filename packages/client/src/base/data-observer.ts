import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

export class DataObserver<T> {
  dataBehavious$: BehaviorSubject<T | any | null>;
  entityName: string = 'data';
  initialQuery = null;
  initialData = {};
  dataSource$: Observable<T>;

  constructor(public options?: DataObserverOptions<T>) {
    if(options) this.setOptions(options)
    // this.data$().do((data) => this.onDataUpdate(data))
  }

  setOptions(options: DataObserverOptions<T> = {}) {
    this.setDataSource(options);
    this.setInitialData(options);
  }

  setDataSource(options: DataObserverOptions<T> = {}) {
    this.dataSource$ = options.dataSource$ || this.dataSource$
  }

  setInitialData(options: DataObserverOptions<T> = {}) {
    this.initialData = options.initialData || this.initialData;
  }

  data$() {
    return this.dataSource$ || this.getDataBehaviour().asObservable()
  }

  onDataUpdate(data: T) {
    console.log(data, this.entityName);
  }

  updateData(data: T) {
    if(!this.dataSource$) this.getDataBehaviour().next(data)
  }

  getDataBehaviour() {
    if(!this.dataBehavious$) {
      this.dataBehavious$ = new BehaviorSubject(this.initialData)
    }
    return this.dataBehavious$
  }
};

export interface DataObserverOptions<T> {
  initialData?: T,
  dataSource$?: Observable<T>
}