import {IAction} from "../model";
import {GetLatLng, SetMap} from "../helpers";
import {Richmarker} from "./richmarker";
import {Assets} from "../assets";
import {Style} from "../style";

export class Destination {
    marker;
    constructor() {
        this.marker = Richmarker({
            flat: true
        })
    }

    update(action: IAction, map) {
        let finalPlace = action.completed_place || action.expected_place;
        if(finalPlace) {
            this.marker.setPosition(GetLatLng(finalPlace));
            this.marker.setContent(this.getContent(action));
            SetMap(this.marker, map)
        } else {
            this.clear()
        }
    }

    getPosition() {
        return this.marker.getPosition()
    }


    clear() {
        this.marker.setMap(null)
    }

    getMap() {
        return this.marker.getMap()
    }

    private getContent(action: IAction): string {
        let img = Assets.endPosition;
        return `
            <div style="${Style.endMarker}${Style.noSelect}">
                <img height="20px" src="${img}" alt="">
            </div>
        `;
    }

    private secToMin(durationMin) {
        return Math.ceil(durationMin/ 60)
    }
}