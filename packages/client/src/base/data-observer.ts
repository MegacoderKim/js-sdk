import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import {DataObserverOptions} from "../interfaces";

/**
 * This class is used to create a observable from a provided observable source or created a new observable using `BehaviousSubject`
 * @class
 */
export class DataObserver<T> {
  /** Inbuild observable */
  dataBehavious$: BehaviorSubject<T | any | null>;
  entityName: string = 'data';
  initialData = {};
  /**
   * Provided data source
   */
  dataSource$: Observable<T>;

  /**
   *
   * @param {DataObserverOptions<T>} options - Options for data Observable
   */
  constructor(public options?: DataObserverOptions<T>) {
    if(options) this.setOptions(options)
    // this.data$().do((data) => this.onDataUpdate(data))
  }

  setOptions(options: DataObserverOptions<T> = {}) {
    this.setDataSource(options.dataSource$);
    this.setInitialData(options.initialData);
  }

  /**
   *
   * @param dataSource$   Sets dataSource if not null
   *
   */
  setDataSource(dataSource$) {
    this.dataSource$ = dataSource$ || this.dataSource$
  }

  /**
   *
   * @param initialData Sets initial Data if not null
   */
  setInitialData(initialData) {
    this.initialData = initialData || this.initialData;
  }

  /**
   *
   * @returns {Observable<T> | Observable<any | any | T>} Return Inbuild data source or provided data source
   */
  data$() {
    return this.dataSource$ || this.getDataBehaviour().asObservable()
  }

  onDataUpdate(data: T) {
    console.log(data, this.entityName);
  }

  /**
   * Updated data of inbuilt data source, would not work for provided data source
   * @param {T} data
   */
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