import {GetUrlParam} from "./getUrlParam";
import {config} from "../app/config";
import {environment} from '../environments/environment';
var Cookies = require('js-cookie');

export function GetToken (): string {
    return GetUrlParam('key') || Cookies.get(environment.tokenName) || config.token
}

export function GetAdminToken(): string {
    return Cookies.get(`${environment.tokenName}-admin`)
}

export function GetReadOnlyToken(): string {
  return Cookies.get('ht-readonly-token');
}
