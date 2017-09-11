import {Observable} from "rxjs/Observable";
import * as _ from "underscore";

export abstract class EntityClient {

  dataArrayWithSelected$(id$, dataArray$, selected$) {
    const userId$ = id$;
    const placelinePage$ = selected$.distinctUntilChanged()
      .map((data) => {
        return data ? [data] : null;
      }); //todo take query from placeline


    const array$ = Observable.combineLatest(
      placelinePage$,
      userId$,
      dataArray$,
      (placelinePage, userId, dataArray) => {
        return placelinePage && userId ? placelinePage : _.filter(dataArray, (user) => {
          return userId ? user.id == userId : true;
        })
      }
    );


    return array$
  }

  clearData() {

  }

}