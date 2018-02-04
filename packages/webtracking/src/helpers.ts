import {config} from "./config";
import {IAction, IMapOptions, IPlace} from "./model";
import * as moment from "moment";
import LatLng = google.maps.LatLng;

export const GetBaseUrl = (env: string = 'production'): string => {
    return config[env] ? config[env].baseUrl : ""
};

export function GetReqOpt(pk: string) {
    return {
        headers: {
            "authorization": "token " + pk,
            "content-type": "application/json",
            "X-Hypertrack-Client": "hypertrack/javascript-SDK"
        }
    }
}

export function GetActionsBounds(actions: IAction[]) {
    let bounds = new google.maps.LatLngBounds();
    actions.forEach((action: IAction) => {
        if (action.encoded_polyline) {
            let polylineArray = google.maps.geometry.encoding.decodePath(action.encoded_polyline);
            polylineArray.forEach((latLngPoint: LatLng) => {
                bounds.extend(latLngPoint);
            });
        }
    });
    return bounds;
}

export function addISOTime(time: string, timeToAdd: number): string {
  return moment(time).add(timeToAdd, 'milliseconds').toISOString();
}