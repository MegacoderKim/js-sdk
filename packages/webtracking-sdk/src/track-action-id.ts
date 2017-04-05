import {FetchAction} from "./helpers";
import {IAction, IDecoded} from "./model";
import {TrackAction} from "./track-action";

export class TrackActionId {
    trackAction: TrackAction;
    constructor(public actionId: string, public pk: string, public options) {
        this.getActionFromId(actionId)
    }

    private getActionFromId(actionId: string) {
        FetchAction(actionId, this.pk).then((data: IAction) => {
            console.log(data);
            this.trackAction = new TrackAction(data, this.pk, this.options)
        }, err => {
            this.options.onError && this.options.onError(err)
        })
    }

}

export function trackActionId (actionId: string, pk: string, options) {
    return new TrackActionId(actionId, pk, options).trackAction
}