import { Observable } from 'rxjs/Observable';
export declare const destroy$: symbol;
/**
 * an operator that takes until destroy it takes a components this a parameter
 * returns a lettable RxJS operator.
 */
export declare const untilDestroy: (component: any) => <T>(source: Observable<T>) => Observable<T>;
export declare function addDestroyObservableToComponent(component: any): void;
