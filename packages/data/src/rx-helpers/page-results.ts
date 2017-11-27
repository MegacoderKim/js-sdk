import {Observable} from "rxjs/Observable";
import {Page} from "ht-models";
import {map} from "rxjs/operators";

export const PageResults$ = (pageData$: Observable<Page<any> | null>): Observable<any[] | any> => {
  return pageData$.pipe(map((pageDate: Page<any> | null) => {
    return pageDate ? pageDate.results : pageDate;
  }))
};