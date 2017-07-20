import * as _ from 'underscore';
import {IAccount, IToken} from "ht-models";

export function GetSecretToken (account: IAccount, tokenType: 'test' | 'production'): string {
    return getToken(getSubAccountToken(account, tokenType), 'secret')
}

export const getToken = (subAccounts: IToken[], type: string): string => {
    // let subAccountToken = getSubAccountToken(account, type);
    // console.log(subAccountToken, "sub");
    let tokenObject = _.find(subAccounts, token => {
        return token.scope == type
    });
    return tokenObject ? tokenObject.key : null;
}

function getSubAccountToken(account: IAccount, type) {
    return _.find(account.sub_accounts, subAccount => {
        return subAccount.type == type;
    }).tokens
}