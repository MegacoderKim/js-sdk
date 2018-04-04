import { Action } from '@ngrx/store';
import {IAccount, ISubAccount, PartialAccount, Partial, IAccountUser, IMembership} from "ht-models";

// export const ActionTypes = {
//     UPDATE_ACCOUNT_USER: type<'[ACCOUNT_USER] Update Account User'>('[ACCOUNT_USER] Update Account User'),
//     SET_ACCOUNT_USER: type<'[ACCOUNT_USER] Set Account User'>('[ACCOUNT_USER] Set Account User'),
//     UPDATE_ACCOUNT: type<'[ACCOUNT_USER] Update Account'>('[ACCOUNT_USER] Update Account'),
//     UPDATE_TOKEN_TYPE: type<'[ACCOUNT_USER] Update Token Type'>('[ACCOUNT_USER] Update Token Type')
// };

export const UPDATE_ACCOUNT_USER = '[ACCOUNT_USER] Update Account User';
export const PATCH_DEFAULT_ACCOUNT = '[ACCOUNT_USER] Patch Default Account';
export const PATCH_ACCOUNT = '[ACCOUNT_USER] Patch Account';
export const PATCH_MEMBERSHIPS = '[ACCOUNT_USER] Patch Memberships';
export const UPDATE_MEMBERSHIPS = '[ACCOUNT_USER] Update Memberships';
export const GET_ACCOUNT_USER = '[ACCOUNT_USER] Get Account User';
export const SET_ACCOUNT_USER = '[ACCOUNT_USER] Set Account User';
export const UPDATE_ACCOUNT = '[ACCOUNT_USER] Update Account';
export const SET_ACCOUNT = '[ACCOUNT_USER] Set Account';
export const UPDATE_SUB_ACCOUNT = '[ACCOUNT_USER] Update Sub Account';
export const SET_SUB_ACCOUNT = '[ACCOUNT_USER] Set Sub Account';

export class UpdateAccountUserAction implements Action {
    readonly type = UPDATE_ACCOUNT_USER;
    constructor(public payload: IAccountUserUpdatePayload) { }
}

export class PatchDefaultAccountAction implements Action {
    readonly type = PATCH_DEFAULT_ACCOUNT;
    constructor(public payload: IAccount) { }
}

export class PatchAccountAction implements Action {
    readonly type = PATCH_ACCOUNT;
    constructor(public payload: IAccount) { }
}

export class PatchMembershipsAction implements Action {
    readonly type = PATCH_MEMBERSHIPS;
    constructor(public payload: IAccount) { }
}

export class UpdateMembershipsAction implements Action {
    readonly type = UPDATE_MEMBERSHIPS;
    constructor(public payload: IMembership[]) { }
}

export class GetAccountUserAction implements Action {
    readonly type = GET_ACCOUNT_USER;
    constructor(public payload: string) { }
}

export class SetAccountUserAction implements Action {
    readonly type = SET_ACCOUNT_USER;
    constructor(public payload: IAccountUser) { }
}

export class UpdateAccountAction implements Action {
    readonly type = UPDATE_ACCOUNT;
    constructor(public payload: IAccountUpdatePayload) { }
}

export class SetAccountAction implements Action {
    readonly type = SET_ACCOUNT;
    constructor(public payload: IAccount) { }
}

export class UpdateSubAccountAction implements Action {
    readonly type = UPDATE_SUB_ACCOUNT;
    constructor(public payload: {data: Partial<ISubAccount>, item: string}) { }
}

export class SetSubAccountAction implements Action {
    readonly type = SET_SUB_ACCOUNT;
    constructor(public payload: IAccount) { }
}

// export class UpdateTokenTypeAction implements Action {
//     type = ActionTypes.UPDATE_TOKEN_TYPE;
//     constructor(public payload: 'test' | 'production') {}
// }

// export class UpdateAccountAction implements Action {
//     type = ActionTypes.UPDATE_ACCOUNT;
//     constructor(public payload: IAccount) { }
//
// }

export type Actions
    = UpdateAccountUserAction
    | PatchDefaultAccountAction
    | PatchAccountAction
    | PatchMembershipsAction
    | UpdateMembershipsAction
    | SetAccountUserAction
    | UpdateAccountAction
    | SetAccountAction
    | UpdateSubAccountAction
    | SetSubAccountAction

interface IAccountUserUpdatePayload {
    data: Partial<IAccountUser>,
    item: string
}
interface IAccountUpdatePayload {
    data: PartialAccount,
    item: string,
}
