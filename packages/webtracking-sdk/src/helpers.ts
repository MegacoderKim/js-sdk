import * as $ from "jquery";
import {config} from "./config";
import {IPlace} from "./model";

export const GetBaseUrl = (env: string = 'production'): string => {
    return config[env] ? config[env].baseUrl : ""
};

export function GetReqOpt(pk: string) {
    return {
        headers: {
            "authorization": "token " + pk,
            "content-type": "application/json"
        }
    }
}

export function GetLatLng(place: IPlace | any, key: string = 'location') {
    if(!place) return null;
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