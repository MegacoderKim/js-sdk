import {IAccount} from "./account";

export interface IMembership {
    id: string,
    role: string,
    status: string,
    account: IAccount,
    read_token: string
}
