import {HtBaseApi} from "./base";
import {Observable} from "rxjs/Observable";
import {IAction, ITrackAction, Page} from "ht-models";
import {map} from "rxjs/operators";

export class HtTrackingApi extends HtBaseApi {
    name = "Tracking";
    trackType = {
        shortCode: "short_code",
        lookupId: 'lookup_id',
        collectionId: 'collection_id',
        actionId: 'id'
    };

    constructor(request) {
        super(request, "actions");
    }

    track(id: string, idType: 'shortCode' | 'lookupId' | 'collectionId' | 'actionId' = 'shortCode'): Observable<IAction[]> {
        let trackKey = this.trackType[idType];
        if(trackKey) {
            const query = {[trackKey]: id};
            const path = `${this.base}/track/`;
            return this.api$(path, query);
        } else {
            console.error('Invalid Tracking type ' + idType)
        }

    }
}