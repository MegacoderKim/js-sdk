import {HtBaseApi} from "./base";

export class HtUsersApi extends HtBaseApi{
    constructor(request) {
        super('users', request)
    }
}