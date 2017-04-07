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
        if(action.eta) {
            let img = Assets.destination;
            return `
        <div style="${Style.destinationMarker}${Style.noSelect}">
            <img height="58px" src="${img}" alt="">
            <div style="${Style.eta}">
                <div style="margin: auto; text-align: center"><span id="eta-time">${this.secToMin(action.display.duration_remaining)}</span><br> min</div>
            </div>
        </div>
        `
        } else {
            let img = Assets.destinationNoEta;
            return `
        <div style="${Style.destinationMarker}${Style.noSelect}">
            <img height="50px" src="${img}" alt="">
            <div style="${Style.eta}">
                
            </div>
        </div>
        `
        }



    }

    private secToMin(durationMin) {
        return Math.ceil(durationMin/ 60)
    }
}