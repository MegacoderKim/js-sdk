import {config} from "./config";
import {IAction, IMapOptions, IPlace, ITrackingOptions} from "./model";

export const GetBaseUrl = (env: string = 'production'): string => {
    return config[env] ? config[env].baseUrl : ""
};

export function GetReqOpt(pk: string, options: Partial<ITrackingOptions> = {}) {
    return {
        headers: {
            "authorization": "token " + pk,
            "content-type": "application/json",
            "X-Hypertrack-Client": options.clientType || "hypertrack/javascript-SDK"
        }
    }
}

export function addISOTime(time: string, timeToAdd: number): string {
  return new Date(new Date(time).getTime() + timeToAdd).toISOString();
}