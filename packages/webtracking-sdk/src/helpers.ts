import * as $ from "jquery";
import {config} from "./config";
import {IAction, IMapOptions, IPlace} from "./model";
import {DefaultGMapsStyle, DefaultGoogleMapOptions} from "./defaults";
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

export function GetLatLng(place: IPlace | any, key: string = 'location') {
    if(!place || !place[key]) return null;
    return new google.maps.LatLng(place[key].coordinates[1], place[key].coordinates[0])
}

export function FetchAction(actionId: string, pk: string) {
    return $.ajax({
        url: `${GetBaseUrl()}actions/${actionId}/detailed/`,
        ...GetReqOpt(pk)
    })
}

export function SetMap(item, map) {
    if(!item.getMap()) item.setMap(map)
}

export function RenderGoogleMap(mapId: string, mapOptions: IMapOptions, origin?: LatLng) {
    let googleMapOptions = {
        ...DefaultGoogleMapOptions
    };
    if (mapOptions.gMapsStyle) {
        googleMapOptions.styles = mapOptions.gMapsStyle;
    }
    if (origin) {
        googleMapOptions.center = origin;
    }
    return new google.maps.Map(document.getElementById(mapId), googleMapOptions);
}

export function GetActionBounds(action: IAction) {
    if (this.action.encoded_polyline) {
        let polylineArray = google.maps.geometry.encoding.decodePath(this.action.encoded_polyline);
        let bounds = new google.maps.LatLngBounds();
        polylineArray.forEach((latLngPoint: LatLng) => {
            bounds.extend(latLngPoint);
        });
        return bounds;
    }
}